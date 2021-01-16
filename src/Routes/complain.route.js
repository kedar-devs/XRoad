const Admin=require('../Model/Admin.model')
const Complain=require('../Model/Complain.model')
const router=require('express').Router()
router.get('/getLocation',(req,res)=>{
    Complain.find()
    .then(complain=>{
        var location=complain.map(cmp=>{return{lat:cmp.lat,long:cmp.long}})
        res.status(200).send({location})
    })
    .catch(err=>{
        res.status(500).send('Error: ' + err.message)
    })
})
router.post('/checklocation',(req, res)=>{
    var lat1,lat2,long1,long2
    Complain.find()
    .then(complain=>{
        for(var i=0;i<complain.length;i++){
            lat1=parseFloat(complain[i].lat)
            lat2=parseFloat(req.body.lat)
            lon1=parseFloat(complain[i].long)
            lon2=parseFloat(req.body.long)
            if ((lat1 == lat2) && (lon1 == lon2)) {
                res.status(401).send('Complain to this location Already exists')
                return
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist);
		        dist = dist * 180/Math.PI;
		        dist = dist * 60 * 1.1515;
                console.log(dist)
                if ((dist*1000)>100) {
                    res.status(200).send('Lodge the new complain')
                    return
                }
                else{
                    res.status(401).send('Complain to this location Already exists')
                    return
                }
            }
        }
        

    })
})
router.post('/addcomplain',(req,res)=>{
    console.log(req.body,req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile
    let uploadPath
    var comemail=[]
    var compname=[]
    sampleFile = req.files.pic
    uploadPath = __dirname +'/Data/' + sampleFile.name
    const priority=req.body.body
    const status=0
    const upvotes=1
    const level=0
    const discription=req.body.discription
    const lat=req.body.lat
    const long=req.body.long
    const img=uploadPath
    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
        else{
            comemail.push(req.body.email)
        compname.push(req.body.name)
        const ward=req.body.ward
        const regDate=Date(req.body.date)
        console.log(comemail,compname,img)
        const NewComplain=new Complain({priority,status,upvotes,discription,level,lat,long,img,comemail,compname,ward,regDate})
        console.log(NewComplain)
        NewComplain.save()
        .then(()=>{
            res.status(200).send('Complain Registered Sucessfully')
        })
        .catch(err=>{
            res.status(500).send('Error :'+err)
        })
        }
        
      });
    // comemail.push(req.body.email)
    // compname.push(req.body.name)
    // const regDate=Date(req.body.date)
    // console.log(comemail,compname,img)
    // const NewComplain=new Complain({priority,status,upvotes,level,lat,long,img,comemail,compname,regDate})
    // console.log(NewComplain)
    // NewComplain.save()
    // .then(()=>{
    //     res.status(200).send('Complain Registered Sucessfully')
    // })
    // .catch(err=>{
    //     res.status(500).send('Error :'+err)
    // })

})
router.put('/upvote',(req,res)=>{
    Complain.findById(req.body.id)
    .then(complain=>{
        console.log(complain)
        for(var i=0;i<complain.comemail.length;i++){
            if(complain.comemail[i].localeCompare(req.body.email)==0){
                res.status(401).send('your upvote has been already Registered')
            }

        }
        complain.comemail.push(req.body.email)
        complain.compname.push(req.body.name)
        complain.upvotes+=1
        if(complain.upvotes%10==0 && complain.priority<=40){
            complain.priority+=1
        }
        complain.save()
        .then(()=>{
            res.status(200).send('Complain Registered successfully')
        })
        .catch(err=>{
            res.status(500).send('Error:'+err.message)
        })
    })
})

router.put('/statusUpdate',(req,res)=>{
    Complain.findById(req.body.id)
    .then(complain=>{
        complain.status+=1
        complain.level+=1
        if(complain.level>=4){
            complain.ActionDate=new Date()
        }
        complain.save()
        .then(result=>{
            console.log(result)            
            res.status(200).send('Status Updated Sucessfully')
        })
        .catch(err=>{
            res.status(500).send('Error: ' + err.message)
        })      
    })
})
router.get('/getall',(req,res)=>{
    Complain.find()
    .then(complain=>{
        res.status(200).send(complain)
    })
    .catch(err=>{
        res.status(500).send('Error: ' + err.message)
    })
})

router.get('/getlevel/:level',(req,res)=>{
    Complain.find({level:req.params.level})
    .then(complain=>{
        res.status(200).send(complain)
    })
    .catch(err=>{
        res.status(500).send('Error: ' + err.message)
    })
})
router.put('/putaction',(req,res)=>{
    let sampleFile
    let uploadPath
    sampleFile = req.files.pdf
    uploadPath = __dirname +'/Data/' + sampleFile.name
    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
        
    Complain.findOneAndUpdate({_id:req.body.id},{$push:{"ActionTaken":{
        "action":req.body.action,
        "link":uploadPath,
        "officer":req.body.officer
    }
    

    }})
    .then(result => {
        console.log("inthen")
        console.log(result)
        res.status(200).send('ACTION Added successfully')
    })
    .catch(err =>{
        console.log(err)
        console.log("inerror")
        res.status(500).send(err)
    })
})
})
module.exports=router