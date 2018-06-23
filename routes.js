var express = require("express");
var Zombie = require("./models/zombie");
var Arma = require("./models/arma")
var passport = require("passport");

var router = express.Router();

router.use((req,res,next)=>{
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/",(req,res,next)=>{
    Zombie.find()
    .sort({createdAt: "descending"})
    .exec((err,zombies)=>{
        if(err){
            return next (err);
        }
        res.render("index",{zombies:zombies});
    });
});

router.get("/verArmas",(req,res,next)=>{
    Arma.find()
    .sort({createdAt: "descending"})
    .exec((err,armas)=>{
        if(err){
            return next (err);
        }
        res.render("verArmas",{armas:armas});
    });
});

router.get("/singup",(req,res)=>{
    res.render("singup");

});
router.get("/verArmas",(req,res)=>{
    res.render("verArmas");

});
router.get("/agregarArma",(req,res)=>{
    res.render("agregarArma");

});

router.post("/signup",(req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({username: username},(err,zombie)=>{
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error","El nombre del usuario ya lo ha tomado otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });
        newZombie.save(next);
        return res.redirect("/");
    });
});

router.post("/agregarArma",(req,res,next)=>{
    var descripcion = req.body.descripcion;
    var categoria = req.body.categoria;
    var fuerza = req.body.fuerza;
    var municiones = req.body.municiones;

   
        var newArma = new Arma({
            descripcion:descripcion,
            categoria:categoria,
            fuerza:fuerza,
            municiones
        });
        newArma.save(next);
        return res.redirect("/verArmas");
    
});

module.exports=router;