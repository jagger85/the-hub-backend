const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Portfolio = require("../Models/Portfolio");
const Wallet = require("../Models/Wallet");

//Get User
router.get('/user/:username', (req, res)=>{
    try{
        User.find({username: req.params.username}).then(data =>{
          res.status(200).send({user: data})
        })
    }catch(e){
        throw e
    }
})

//Get User portfolios
router.get('/user/:username/portfolios', (req, res)=>{
    try{
        

    }catch(e){
        throw e
    }
})

//Get User portfolio
router.get('/', (req, res)=>{
    try{

    }catch(e){
        throw e
    }
})

//Get portfolio wallets
router.get('/', (req, res)=>{
    try{

    }catch(e){
        throw e
    }
})

//Get wallet
router.get('/', (req, res)=>{
    try{

    }catch(e){
        throw e
    }
})
//Create User
router.post('/user/:username/', (req, res)=>{
    //TODO check if user exist
    try{
    const user = new User({username : req.params.username, email: req.body.email, password: req.body.password})
    user.save().then(data => {
        res.status(201).send(data)
    })
    }catch(e){
        throw e
    }
})

//Add Portfolio to user

router.put('/user/:username/portfolios/:portfolio', (req, res)=>{
    //TODO check if portfolio exist
    try{

    }catch(e){
        throw e
    }
})

//Create Wallet

//Update password

//Delete User

//Delete Portfolio

//Delete Wallet


module.exports = router