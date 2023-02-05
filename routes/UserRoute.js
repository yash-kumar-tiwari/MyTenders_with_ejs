import express from 'express';
import adminController from '../controllers/adminController.js';
import userController from '../controllers/userController.js';
import * as url from 'url';


const router = express.Router();

//middleware to apply security : user panel
router.use((req,res,next)=>{
    if(req.session.sessUserNm==undefined || req.session.sessUserRole!="user")
    {
        res.redirect("/login");
    }
    next();
});


router.get("/", (req,res)=>{
    res.render("userhome",{"sessUserNm":req.session.sessUserNm});
});

router.get("/funds", (req,res)=>{
    var paypalURL="https://www.sandbox.paypal.com/cgi-bin/webscr";
    var paypalID="sb-od4343w22349561@business.example.com";
    //sb-uwxzi23525512@personal.example.com
    var amount=100;
    res.render("funds",{"sessUserNm":req.session.sessUserNm,"paypalURL":paypalURL,"paypalID":paypalID,"amount":amount});
  });

router.get("/searchtenders", (req,res)=>{
    userController.fetchCategory({}).then((result)=>{
        // console.log(result);
        res.render("searchtenders",{"catDetails":result,"sessUserNm":req.session.sessUserNm});
        // res.json({"catDetails":result});
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/showsubcategory/:catnm", (req,res)=>{
    
    // console.log(req.params);
    userController.fetchSubCategory(req.params).then((result)=>{
        // console.log(result);
        res.render("showsubcategory",{"catnm":req.params.catnm ,"subCatDetails":result,"sessUserNm":req.session.sessUserNm});
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/showtenders/:subcatnm", (req,res)=>{
    userController.fetchTenders(req.params).then((result)=>{
        // console.log(result);
        res.render("showtenders",{"subCatNm":req.params.subcatnm, "tenDetails":result ,"sessUserNm":req.session.sessUserNm});
        // res.json({"catDetails":result});
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/applytender", (req,res)=>{
    var urlobj = url.parse(req.url,true).query;
    var tenid = urlobj.tenid;
    var enddate = urlobj.enddate;

    //time stamp creation and comparison 
    var nowDate = new Date() ;
    var endDate = new Date(enddate) ;
    // console.log(nowDate.getTime());
    // console.log(endDate.getTime());
    
    //comparing time stamp for decision making for tender closed status
    var status;
    if(nowDate > endDate)
      status=0
    else
      status=1
    res.render("applytender",{"sessUserNm":req.session.sessUserNm,"status":status});
});

router.get("/epuser", (req,res)=>{
    // console.log(req.session);
    // console.log(req.session.sessUserNm);
    adminController.fetchUsers({"email":req.session.sessUserNm}).then((result)=>{
        // console.log(result);
        var m,f;
        if(result[0].gender=="male")
        {
            m="checked";
        }
        else
        {
            f="checked"
        }
        res.render("epuser",{"output":"","m":m,"f":f,"sessUserNm":req.session.sessUserNm,"userDetails":result[0]});
    }).catch((err)=>{
        console.log(err);
    });
});

router.post("/epuser", (req,res)=>{
    // console.log(req.body);
    var userDetails = req.body;
    var condData = {"email":userDetails.email};
    var updData = {"name":userDetails.name,"mobile":userDetails.mobile,"address":userDetails.address,"city":userDetails.city,"gender":userDetails.gender};
    
    adminController.registerUpdateMaster(condData,updData).then((result)=>{
        res.redirect("/user/epuser");
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/cpuser", (req,res)=>{
    res.render("cpuser",{"sessUserNm":req.session.sessUserNm,"output":""});
});

router.post("/cpuser", (req,res)=>{
    var oldpass = req.body.oldpass;
    var newpass = req.body.newpass;
    var confpass = req.body.confpass;
    var sessUserNm = req.session.sessUserNm;

    adminController.fetchUsers({"email":sessUserNm,"password":oldpass}).then((result)=>{
        // console.log(result);
        if(result.length!=0)
        {
            if(newpass==confpass)
            {
                adminController.registerUpdateMaster({"email":sessUserNm},{"password":confpass}).then((result)=>{
                    res.render("cpuser",{"sessUserNm":sessUserNm,"output":"Password Changed Successfully"});
                }).catch((err)=>{
                    console.log(err);
                });
            }
            else
            res.render("cpuser",{"sessUserNm":sessUserNm,"output":"New Password & Old Password Mismatch"});
        }
        else
        res.render("cpuser",{"sessUserNm":sessUserNm,"output":"Invalid Old Password"});
    }).catch((err)=>{
        console.log(err);
    });
});


export default router;