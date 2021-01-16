const { route } = require("../app");
const Complain = require("../Model/Complain.model");
const router = require("express").Router();
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'Gmail' ,
    
    auth:{
        user:'savishkargec@gmail.com',
        pass:process.env.GMAIL_KEY
   }
})
router.get("/getLocation", (req, res) => {
  Complain.find()
    .then((complain) => {
      var location = complain.map((cmp) => {
        return { lat: cmp.lat, long: cmp.long };
      });
      res.status(200).send({ location });
    })
    .catch((err) => {
      res.status(500).send("Error: " + err.message);
    });
});
router.post("/checklocation", (req, res) => {
  var lat1, lat2, long1, long2;
  Complain.find().then((complain) => {
    for (var i = 0; i < complain.length; i++) {
      lat1 = parseFloat(complain[i].lat);
      lat2 = parseFloat(req.body.lat);
      lon1 = parseFloat(complain[i].long);
      lon2 = parseFloat(req.body.long);
      if (lat1 == lat2 && lon1 == lon2) {
        res.status(401).send("Complain to this location Already exists");
        return;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        console.log(dist);
        if (dist * 1000 > 100) {
          res.status(200).send("Lodge the new complain");
          return;
        } else {
          res.status(401).send("Complain to this location Already exists");
          return;
        }
      }
    }
  });
});
router.post("/addcomplain", (req, res) => {
  console.log(req.body, req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let sampleFile;
  let uploadPath;
  var comemail = [];
  var compname = [];
  sampleFile = req.files.file;
  uploadPath = __dirname + "/Data/" + sampleFile.name;
  const priority = req.body.priority;
  const upvotes = 1;
  const level = 0;
  const discription = req.body.description;
  const ward=req.body.ward
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const img = uploadPath;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
      //   return res.status(500).send(err);
    } else {
      comemail.push(req.body.email);
      compname.push(req.body.name);
      const regDate = Date(req.body.date);
      console.log(comemail, compname, img);
      const NewComplain = new Complain({
        priority,
        status,
        upvotes,
        discription,
        ward,
        level,
        lat,
        long,
        img,
        comemail,
        compname,
        regDate,
      });
      console.log(NewComplain);
      NewComplain.save()
        .then(() => {
          //   return res.status(200).send("Complain Registered Sucessfully");
        })
        .catch((err) => {
          console.log(err);
          //   return res.status(500).send("Error :" + err);
        });
    }
  });
  //   comemail.push(req.body.email);
  //   compname.push(req.body.name);
  //   const regDate = Date(req.body.date);
  //   console.log(comemail, compname, img);
  //   const NewComplain = new Complain({
  //     priority,
  //     status,
  //     upvotes,
  //     level,
  //     lat,
  //     long,
  //     img,
  //     comemail,
  //     compname,
  //     regDate,
  //   });
  //   console.log(NewComplain);
  //   NewComplain.save()
  //     .then(() => {
  //       return res.status(200).send("Complain Registered Sucessfully");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).send("Error :" + err);
  //     });
});

router.get("/get-ward-complains/:id", (req, res) => {
  Complain.find({ ward: Number(req.params.id) })
    .then((complain) => {
      res.status(200).json(complain);
    })
    .catch((err) => {
      res.status(500).send("Error:" + err.message);
    });
});

router.get("/get-levelwise/:level", (req, res) => {
  Complain.find({ level: Number(req.params.level) })
    .then((complain) => {
      res.status(200).json(complain);
    })
    .catch((err) => {
      res.status(500).send("Error:" + err.message);
    });
});

router.put("/upvote", (req, res) => {
  Complain.findById(req.body.id).then((complain) => {
    console.log(complain);
    for (var i = 0; i < complain.comemail.length; i++) {
      if (complain.comemail[i].localeCompare(req.body.email) == 0) {
        res.status(401).send("your upvote has been already Registered");
      }
    }
    complain.comemail.push(req.body.email);
    complain.compname.push(req.body.name);
    complain.upvotes += 1;
    if (complain.upvotes % 10 == 0 && complain.priority <= 40) {
      complain.priority += 1;
    }
    complain
      .save()
      .then(() => {
        res.status(200).send("Complain Registered successfully");
      })
      .catch((err) => {
        res.status(500).send("Error:" + err.message);
      });
  });
});
router.put("/levelUpdate", (req, res) => {
  Complain.findById(req.body.id).then((complain) => {
    complain.level += 1;
    if (complain.level >= 4) {
      complain.ActionDate = new Date();
    }
    complain
      .save()
      .then(() => {
        res.status(200).send("Level Updated Sucessfully");
      })
      .catch((err) => {
        res.status(500).send("Error: " + err.message);
      });
  });
});
router.get("/getall", (req, res) => {
  Complain.find()
    .then((complain) => {
      res.status(200).send(complain);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err.message);
    });
});

router.get("/getlevel/:level", (req, res) => {
  Complain.find({ level: req.params.level })
    .then((complain) => {
      res.status(200).send(complain);
    })
})
// Naya hai yah
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
        for(var i=0;i<result.comemail.length;i++){
            transporter.sendMail({
                to:result.comemail[i],
                from:"savishkargec@gmail.com",
                subject:"Action Taken",
                html:`
                <p> Dear user, the complain registered by you has been officially looked into and a pertiular action was taken
                <br />Action:${req.body.action}<br />
                Officer who took the Action:${req.body.officer}
                <br />
                Thank you 
                </p>
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
        } 
        })
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

//Naya hai yaahh
router.get('/getAction/:id',(req, res) =>{
    Complain.findById(req.params.id)
    .then(complain=> {
        console.log(complain)
      var ActionArray = complain.ActionTaken
      res.status(200).send({ ActionArray });
    })
    .catch((err) => {
      res.status(500).send("Error: " + err.message);
    });
})

router.get("/getstats", async (req, res) => {
  const passed = await Complain.find({
    level: 2,
    ward: req.query.ward,
  });
  const all = await Complain.find({ ward: req.query.ward });
  res.status(200).json({
    passed: passed.length,
    pending: all.length - passed.length,
    all: all.length,
  });
});

module.exports = router;
