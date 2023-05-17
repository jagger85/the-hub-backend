const express = require('express');
const router = express.Router();
const User = require('../Models/User');

//Get User
router.get('/user/:username', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      res.status(200).send({ user: user });
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolios
router.get('/user/portfolios/:username', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then( user => {
        res.status(200).send({portfolios : user.portfolios});
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolio
router.get('/user/:username/:portfolioname', (req, res) => {
 User.findOne({ username: req.params.username }).then( user => {
  portfolio = user.portfolios.filter( e => e.alias == req.params.portfolioname)
  res.send({portfolio : portfolio[0]})
 })

});

//Get portfolio wallets
router.get('/user/:username/:portfolioname/wallets', (req, res) => {
  try {
    User.findOne({ username: req.params.username}).then( user => {
      portfolio = user.portfolios.filter( e => e.alias == req.params.portfolioname)
      console.log(portfolio[0].wallets)
      res.send({wallets: portfolio[0].wallets})
    })
  } catch (e) {
    throw e;
  }
});

//Get wallet
router.get('/user/:username/:portfolioname/:walletname', (req, res) => {
  try {
    User.findOne({ username: req.params.username}).then( user => {
      portfolio = user.portfolios.filter( e => e.alias == req.params.portfolioname)
      wallet = portfolio[0].wallets.filter( e => e.alias == req.params.walletname)
      res.send({wallets: wallet[0]})
    })
  } catch (e) {
    throw e;
  }
});

//Create User
router.post('/user/:username/', (req, res) => {
  //TODO check if user exist
  try {
    const user = new User({ username: req.params.username, email: req.body.email, password: req.body.password });
    user.save().then((data) => {
      res.status(201).send(data);
    });
  } catch (e) {
    throw e;
  }
});

//Add Portfolio to user
router.post('/user/portfolios/:username', (req, res) => {
  /**
   * @TODO I should check if the user exist first I guess  🤷‍♂️
   */

  try {
    User.findOne({ username: req.params.username }).then((user) => {
      user.portfolios.push({ alias: req.body.alias });
      user.save().then((data) => res.send(data));
    });
  } catch (e) {
    throw e;
  }
});

//Add wallet to portfolio
router.post('/user/portfolios/wallets/:username', (req, res) => {
  /**
   * @TODO I should check if the user exist first I guess  🤷‍♂️
   */

  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter( e => e.alias == req.body.alias)
      portfolio[0].wallets.push({alias: req.body.walletAlias, address: req.body.walletAddress})
      user.save().then( data =>{
        res.send(data)
      })
    });
  } catch (e) {
    throw e;
  }
});

//Update password

//Delete User

//Delete Portfolio
router.delete('/user/portfolios/:username', (req, res) => {

  try {
    User.findOne({ username: req.params.username }).then((user) => {
      user.portfolios = user.portfolios.filter( e => e.alias != req.body.alias)
      user.save().then( data => res.send(data))
    });
  } catch (e) {
    throw e;
  }
});

//Delete Wallet
router.delete('/user/portfolios/:username', (req, res) => {

  try {
  } catch (e) {
    throw e;
  }
});

module.exports = router;
