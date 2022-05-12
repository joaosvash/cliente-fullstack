const express = require("express");
const User = require("../models/User");
const router=express.Router();
const passport=require('passport');


router.get('/users/signin',(req,res)=>{
    res.render('users/signin.hbs')
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect:'/cliente',
    failureRedirect:'/users/signin',
    failureFlash:true
}))



router.get('/users/signup',(req,res)=>{
    res.render('users/signup.hbs')
});

router.post('/users/signup', async(req,res)=>{
    const{name,email,password,confirmpassword}=req.body;
    const errors=[];
    if(password!=confirmpassword){
        errors.push({text:'Las contraseñas no son similares'});
    }
    if(password.length<4){
        errors.push({text: 'Contraseña debe ser mayor a 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup.hbs',{errors,name,email,password,confirmpassword});
    }else{
        const emailUser=await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','El email esta en uso');
            res.redirect('/users/signup');
        }
        const newUSer=new User({name,email,password})
        newUSer.password=await newUSer.encryptPassword(password)
        await newUSer.save();
        req.flash('success_msg','Tu estas registrado');
        res.redirect('/users/signin');
    }
   
    
});

router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});




module.exports=router;