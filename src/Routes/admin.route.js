const router=require('express').Router();
let Authority=require('../Model/Admin.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const path=require('path')
const saltRound=8;
//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
const nodemailer=require('nodemailer');


router.route('/add').post((req,res)=>{
    
    Authority.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err)
        }
        if(!user)
        {
            console.log(req.body)
            if(req.body==null){
                return 
            }
            const Id=req.body.id
            const email=req.body.email            
            const password=req.body.password
            const level=req.body.level
            const designation=req.body.designation
            const resetToken=' '
            const newUser=new Authority({Id,email,password,level,designation,resetToken})
            bcrypt.hash(newUser.password,saltRound,(err,hash)=>{
                if (err) throw err;
                newUser.password=hash;
                newUser.save((err,user)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        let payload={subject:user.Id}
                        let token=jwt.sign(payload,process.env.SECRET_KEY)
                        res.status(200).send({token,user})
                    }
                }) 
            })
            
             
             /*.then(res=>{
                 console.log(res.email)
                 let payload={subject:res.email}
                 let token=jwt.sign(payload,process.env.SECRET_KEY)
                 res.status(200).send({token})
             })
             .catch(err=> res.status(400).json('Error:'+err))*/

        }
        else if(user){
            res.status(401).send('Authority Already exists')
        }
    })
    
})
router.get("/user/:id", (req, res) => {
    Authority.findById(req.params.id)
        .then(user => {
            res.send(user)
        }).catch(err => {
        res.status(404).send("user not found")
    })
})
router.post('/login',(req,res)=>{

    Authority.findOne({Id:req.body.id},(err,user)=>{
         
        if(err){
            console.log(err)
        }
        else{
            if(!user){
                res.status(401).send('invalid Email')
            }else{
                bcrypt.compare(req.body.password,user.password).then(isMatch=>{
                    if(isMatch){
                            let payload={subject:user._id}
                            let token=jwt.sign(payload,process.env.SECRET_KEY)
            
                            res.status(200).send({user,token})
                    }
                    else{
                        res.status(401).send('invalid Password')
                    }
                })
            }
        }
    })
})




router.delete('/delete/:id',(req,res)=>{
    Authority.findByIdAndDelete(req.params.id)
    .then(()=>res.status(200).json('Deleted successfully'))
    .catch(err=>res.status(400).json('Error:'+err))
})
router.put('/promoteLevel',(req, res)=>{
    Authority.findOne({email:req.body.email},(err,admin)=>{
        admin.level+=1
        admin.save()
        .then(()=>res.status(200).send('Promoted Sucessfully'))
        .catch(err=>{
            res.status(500)._send('Error: ' + err.message)
        })
    })
})
router.post('/forgot-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        else{
            const token =buffer.toString("hex")
            Authority.findOne({email:req.body.email},(err,user)=>{
            if(err || !user){
                res.status(422).send('No user with this email id available')
            }
            else{
                user.resetToken=token
                //user.expiresToken=Date.now()+3600000
                user.save()
                .then(user=>{
                    console.log('hello')
                    transporter.sendMail({
                        to:user.email,
                        from:"savishkargec@gmail.com",
                        subject:"password reset",
                        html:`
                        <p>Hi ${user.firstname}, forgot your password.<br/> Don't worry we got you covered</p>
                        <h5><a href="https://savishkar-webapp.herokuapp.com/update-password/${token}">click here</a></h5>
                        <p>link expires in one hour, thank you</p>
                        `
                    },(err,result)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.send("success")
                        }
                        transporter.close()
                    })

                    res.send({
                        message: 'An email has been sent to the provided email with further instructions.'
                    });
                    
                })
                .catch(err=>res.status(400).json('Error:'+err))

                    
               }
        })
        }
    })
    
})
router.post('/new-password',(req,res)=>{
    console.log(req.body)
    const password=req.body.password
    const sentToken=req.body.token
    console.log(sentToken)
    Authority.findOneAndUpdate({resetToken:req.body.token})
    .then(user=>{
                
                console.log('in here')
                bcrypt.hash(password,saltRound,(err,hash)=>{
                    if (err) throw err;
                    console.log(hash)
                    user.password=hash;
                    user.resetToken=' ';
                    //user.expiresToken=' ';
                    user.save()
                    .then(result=>res.status(200).json("success"))
                    .catch(err=>{
                        console.log(err);
                        res.status(400).json('Error:'+err)})
                })
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json('oopsy doopsy sorry'+err)})
})
router.get("/user/:id", (req, res) => {
    Authority.findById(req.params.id)
        .then(user => {
            res.send(user)
        }).catch(err => {
        res.status(404).send("user not found")
    })
})

module.exports=router