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
router.get('/', (req, res)=>{
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

//Create Portfolio

//Create Wallet

//Update password

//Delete User

//Delete Portfolio

//Delete Wallet


module.exports = router