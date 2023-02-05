import express from 'express';
import adminController from '../controllers/adminController.js';
import userController from '../controllers/userController.js';
import * as url from 'url';
import * as path from 'path';

const router = express.Router();
const __dirname = url.fileURLToPath(new URL ('.', import.meta.url));

//middleware to apply security : admin panel
router.use((req,res,next)=>{
    if(req.session.sessUserNm==undefined || req.session.sessUserRole!="admin")
    {
        res.redirect("/login");
    }
    next();
});

//middleware to fetch category list
var catlist;

router.use("/addsubcategory",(req,res,next)=>{
    userController.fetchCategory({}).then((result)=>{
        // console.log(result);
        catlist = result;
        next();
    }).catch((err)=>{
        console.log(err);
    });
});

//middleware to fetch subcategory list
var subcatlist;

router.use("/launchtender",(req,res,next)=>{
    userController.fetchSubCategory({}).then((result)=>{
        // console.log(result);
        subcatlist = result;
        next();
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/", (req,res)=>{
    // console.log(req.session);
    res.render("adminhome",{"sessUserNm":req.session.sessUserNm});
});

router.get("/manageusers", (req,res)=>{
    adminController.fetchUsers({"role":"user"}).then((result)=>{
        // console.log(result);
        res.render("manageusers",{"userDetails":result,"sessUserNm":req.session.sessUserNm}); 
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/manageuserstatus/:status/:_id", (req,res)=>{
    // var urlDetails = url.parse(req.url, true).query;
    // console.log(urlDetails);   ------->    if using query string data attachment
    // console.log(req.params);
    adminController.manageUserStatus(req.params).then((result)=>{
        res.redirect('/admin/manageusers');
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/launchtender", (req,res)=>{
    res.render("launchtender",{"sessUserNm":req.session.sessUserNm,"output":"", "subcatlist":subcatlist});
});

router.post("/launchtender", (req,res)=>{
    var tenDetails = req.body;
    // console.log(tenDetails)
    var caticon = req.files.caticon;
    var tendocnm = req.files.tenderdocnm;
    var filename = Date.now()+"-"+tendocnm.name;
    // console.log(catnm+"------>"+filename);
    var filepath = path.join(__dirname, "../public/uploads/tenderdocs",filename);
    tenDetails = {...tenDetails, "tenderdocnm":filename};
    tendocnm.mv(filepath,(err)=>{
        if(err)
        res.render("launchtender", {"output":"Tender Uploading Failed","sessUserNm":req.session.sessUserNm,"subcatlist":subcatlist});
        else
        {
            // add tender docs into database 
            adminController.addTender(tenDetails).then((result)=>{
                res.render("launchtender", {"output":"Tender Uploaded Successfully","sessUserNm":req.session.sessUserNm,"subcatlist":subcatlist});
            }).catch((err)=>{
                console.log(err);
            });
        }
    });
});

router.get("/addcategory", (req,res)=>{
    res.render("addcategory", {"output":"","sessUserNm":req.session.sessUserNm});
});

router.post("/addcategory", (req,res)=>{
    // console.log(req.body);
    // console.log(req.files);
    var catnm = req.body.catnm;
    var caticon = req.files.caticon;
    var filename = Date.now()+"-"+caticon.name;
    // console.log(catnm+"------>"+filename);
    var filepath = path.join(__dirname, "../public/uploads/categoryicons",filename);
    caticon.mv(filepath,(err)=>{
        if(err)
        res.render("addcategory", {"output":"Category Uploading Failed","sessUserNm":req.session.sessUserNm});
        else
        {
            // add category into database 
            adminController.addCategory({"catnm":catnm, "caticonnm":filename}).then((result)=>{
                res.render("addcategory", {"output":"Add Category Successfully","sessUserNm":req.session.sessUserNm});
            }).catch((err)=>{
                console.log(err);
            });
        }
    });
});

router.get("/addsubcategory", (req,res)=>{
    res.render("addsubcategory", {"output":"","catlist":catlist,"sessUserNm":req.session.sessUserNm});
});

router.post("/addsubcategory", (req,res)=>{
    // console.log(req.body);
    // console.log(req.files);
    var catnm = req.body.catnm;
    var subcatnm = req.body.subcatnm;
    var caticon = req.files.caticon;
    var filename = Date.now()+"-"+caticon.name;
    // console.log(catnm+"------>"+filename);
    var filepath = path.join(__dirname, "../public/uploads/subcategoryicons",filename);
    caticon.mv(filepath,(err)=>{
        if(err)
        res.render("addsubcategory", {"output":"SubCategory Uploading Failed","catlist":catlist,"sessUserNm":req.session.sessUserNm});
        else
        {
            // add sub category into database 
            adminController.addSubCategory({"catnm":catnm,"subcatnm":subcatnm, "subcaticonnm":filename}).then((result)=>{
                res.render("addsubcategory", {"output":"Add SubCategory Successfully","catlist":catlist,"sessUserNm":req.session.sessUserNm});
            }).catch((err)=>{
                console.log(err);
            });
        }
    });
});

router.get("/epadmin", (req,res)=>{
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
        res.render("epadmin",{"output":"","m":m,"f":f,"sessUserNm":req.session.sessUserNm,"userDetails":result[0]});
    }).catch((err)=>{
        console.log(err);
    });
});

router.post("/epadmin", (req,res)=>{
    // console.log(req.body);
    var userDetails = req.body;
    var condData = {"email":userDetails.email};
    var updData = {"name":userDetails.name,"mobile":userDetails.mobile,"address":userDetails.address,"city":userDetails.city,"gender":userDetails.gender};
            
    adminController.registerUpdateMaster(condData,updData).then((result)=>{
        res.redirect("/admin/epadmin");
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/cpadmin", (req,res)=>{
    res.render("cpadmin",{"sessUserNm":req.session.sessUserNm,"output":""});
});

router.post("/cpadmin", (req,res)=>{
    var oldpass = req.body.oldpass;
    var newpass = req.body.newpass;
    var confpass = req.body.confpass;
    var sessUserNm = req.session.sessUserNm;

    adminController.fetchUsers({"email":sessUserNm,"password":oldpass}).then((result)=>{
        // console.log(result);
        var msg="";
        if(result.length!=0)
        {
            if(newpass==confpass)
            {
                adminController.registerUpdateMaster({"email":sessUserNm},{"password":confpass}).then((result)=>{
                    res.render("cpadmin",{"sessUserNm":sessUserNm,"output":"Password Changed Successfully"});
                }).catch((err)=>{
                    console.log(err);
                });
            }
            else
            res.render("cpadmin",{"sessUserNm":sessUserNm,"output":"New Password & Old Password Mismatch"});
        }
        else
        res.render("cpadmin",{"sessUserNm":sessUserNm,"output":"Invalid Old Password"});
    }).catch((err)=>{
        console.log(err);
    });
});


export default router;