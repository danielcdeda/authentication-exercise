require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
 
const app = express();
 
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
 
 
main().catch(err => console.log(err));

app.use(session({
    secret: 'Little secret',
    resave: false,
    saveUninitialized: false,
  }))
 
app.use(passport.initialize());
app.use(passport.session());


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    const userSchema = new mongoose.Schema ({
        email:String,
        password:String
    });

    userSchema.plugin(passportLocalMongoose);
 
    const User = mongoose.model('User',userSchema);
    
    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.get("/",(req,res)=>{
        res.render('home');
    });
    
    app.get("/register",(req,res)=>{
        res.render('register');
    });
 
    app.post("/register",async(req,res)=>{
       
    });
 
 
    app.get("/login",(req,res)=>{
        res.render('login');
    });
    
    app.post("/login",async(req,res)=>{
        
    });
    
    app.listen(3000,()=>{
        console.log("Server is runing on port 3000...   ");
    });
 
 
}
 