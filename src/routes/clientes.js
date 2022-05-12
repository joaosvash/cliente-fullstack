const express = require("express");
const req = require("express/lib/request");
const router=express.Router();



const Cliente=require('../models/Cliente');
const{isAuthenticated}=require('../helpers/auth')


router.get('/cliente/add', isAuthenticated,(req,res)=>{
    res.render('clientes/new-cliente.hbs')
})

router.post('/clientes/new-cliente', isAuthenticated, async (req,res)=>{
    const {nombre,apellido,edad,fechnac} = req.body;
    const errors=[];
    if(!nombre){
        errors.push({text:'Inserte un cliente por favor '});
    }
    if(!apellido){
        errors.push({text:'Ingresar apellido por favor'});
    }
    if(!edad){
        errors.push({text:'Ingresar edad por favor'});
    }
    if(!fechnac){
        errors.push({text:'Ingresar fecha por favor'});
    }
    if(errors.length > 0){
        res.render('clientes/new-cliente.hbs',{
            errors,
            nombre,
            apellido,
            edad,
            fechnac
        });
    }
    else{
       const newCliente= new Cliente({nombre,apellido,edad,fechnac});
       newCliente.user=req.user.id;
       await newCliente.save();
       req.flash('success_msg', 'Cliente agregado satisfactoriamente')
       res.redirect('/cliente')
    }});


router.get('/cliente', isAuthenticated,async (req,res)=>{
        const clientes=await Cliente.find().lean().sort({date:'desc'});
        res.render('clientes/all-clientes.hbs',{clientes});
   
});
router.get('/cliente/listclientes', isAuthenticated,async (req,res)=>{
    const clientes=await Cliente.find().lean().sort({date:'desc'});
    res.render('clientes/all-clientes.hbs',{clientes});

});

router.get('/cliente/kpideclientes/', isAuthenticated,async (req,res)=>{
  const average = await Cliente.aggregate([
    {'$group': { _id: null, avgEdad:{ $avg: '$edad' },ageStdDev: { $stdDevSamp: "$edad" }}} ])
    res.render('clientes/kpi-clientes.hbs',{average});
});

router.get('/clientes/edit/:id', isAuthenticated,async (req,res)=>{
    const cliente=await Cliente.findById(req.params.id).lean();
    res.render('clientes/edit-clientes.hbs',{cliente});
});

router.put('/clientes/edit-clientes/:id', isAuthenticated,async (req,res)=>{
    const {nombre,apellido,edad,fechnac}=req.body;
    await Cliente.findByIdAndUpdate(req.params.id);
    req.flash('success_msg','Cliente Actualizado Satisfactoriamente')
    res.redirect('/cliente');
  
});

router.delete('/clientes/delete/:id', isAuthenticated,async (req,res)=>{
    await Cliente.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Cliente Eliminado Satisfactoriamente')
    res.redirect('/cliente');
});


module.exports=router;