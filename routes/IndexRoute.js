import express from 'express';
import indexController from '../controllers/indexController.js ';
import indexModel from '../models/indexModel.js';
import * as url from 'url';

const router = express.Router();

//middleware to manage user details in cookie
var cookUserNm="", cookUserPass="";
router.use("/login",(req,res,next)=>{
    if(req.cookies.cookUserNm!=undefined)
    {
        cookUserNm = req.cookies.cookUserNm;
        cookUserPass = req.cookies.cookUserPass;        
    }
    next()
});

router.get("/", (req,res)=>{
    res.render("index");
});

router.get("/about", (req,res)=>{
    res.render("about");
});

router.get("/contact", (req,res)=>{
    res.render("contact");
});

router.get("/service", (req,res)=>{
    res.render("service");
});

router.get("/register", (req,res)=>{
    res.render("register",{"output":""});
});

router.post("/register", (req,res)=>{
    // console.log(req.body);
    indexController.registerUser(req.body).then((result)=>{
        res.render("register", {"output":"User Detail Registered Successfully..."});
    }).catch((err)=>{
        res.render("register", {"output":err});
    });
});

router.get("/checkEmailApi", (req,res)=>{
    var email = url.parse(req.url, true).query.email;
    var regex=`^${email}`;
    indexModel.fetchUsers({"email":{$regex: regex}}).then((result)=>{
        res.send(result); 
    }).catch((err)=>{
        console.log(err);
    });
});

router.get("/login", (req,res)=>{
    if(req.session.sessUserNm!=undefined)
    {
        req.session.sessUserNm=undefined;
        req.session.sessUserRole=undefined;
    }
    res.render("login", {"output":"","cookUserNm":cookUserNm,"cookUserPass":cookUserPass});
});

router.post("/login", (req,res)=>{
    // console.log(req.body);
    var userDetail = {"email":req.body.email,"password":req.body.password}
    indexController.userLogin(userDetail).then((result)=>{
        //to store user details in cookie on remember me
        if(req.body.chk!=undefined)
        {
            res.cookie("cookUserNm", req.body.email , {"maxAge":3600000});
            res.cookie("cookUserPass", req.body.password , {"maxAge":3600000});

        }
        if(result.status==1 || result.status==2)
        {
            req.session.sessUserNm=result.userDetailsRes.email;
            req.session.sessUserRole=result.userDetailsRes.role;
        }
        (result.status==0)?res.render("login", {"output":"Login Failed, Invalid User or Verify Your Account","cookUserNm":cookUserNm,"cookUserPass":cookUserPass}):(result.status==1)?res.redirect("/admin"):res.redirect("/user");
    }).catch((err)=>{
        res.render("login", {"output":err,"cookUserNm":cookUserNm,"cookUserPass":cookUserPass});
    });
});

export default router;