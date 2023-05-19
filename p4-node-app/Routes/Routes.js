const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');

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

//Get all users
router.get('/user/', (req, res) => {
  try {
    User.find({}).then((users) => {
      res.status(200).send({ users: users });
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolios
router.get('/user/portfolios/:username', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      res.status(200).send({ portfolios: user.portfolios });
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolio
router.get('/user/:username/:portfolioname', (req, res) => {
  User.findOne({ username: req.params.username }).then((user) => {
    portfolio = user.portfolios.filter((e) => e.alias == req.params.portfolioname);
    res.send({ portfolio: portfolio[0] });
  });
});

//Get portfolio wallets
router.get('/user/:username/:portfolioname/wallets', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.params.portfolioname);
      console.log(portfolio[0].wallets);
      res.send({ wallets: portfolio[0].wallets });
    });
  } catch (e) {
    throw e;
  }
});

//Get wallet
router.get('/user/:username/:portfolioname/:walletname', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.params.portfolioname);
      wallet = portfolio[0].wallets.filter((e) => e.alias == req.params.walletname);
      res.send({ wallets: wallet[0] });
    });
  } catch (e) {
    throw e;
  }
});

//Create User
router.post('/register', (req, res) => {
  try {
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then( dbres => {
      console.log('hola')
      console.log(dbres)
      if (dbres.length > 0) {
        res.status(400).send({ error: 'Username and email should be unique' });
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = new User({ username: req.body.username, email: req.body.email, password: hash });
          user.save().then((data) => {
            res.status(201).send(data);
          });
        });
      }
    });
  } catch (e) {
    throw e;
  }
});

//Add Portfolio to user
router.post('/user/portfolios/:username', (req, res) => {
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
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.body.alias);
      portfolio[0].wallets.push({ alias: req.body.walletAlias, address: req.body.walletAddress });
      user.save().then((data) => {
        res.send(data);
      });
    });
  } catch (e) {
    throw e;
  }
});

//Update password

//Delete User
router.delete('/user/:username', (req, res) => {
  User.findOne({ username: req.params.username }).then((user) => {
    user.isDeleted = true;
    user.save().then((data) => res.status(200).send({ message: `User ${req.params.username} is deleted`, data: data }));
  });
});
//Delete Portfolio
router.delete('/user/portfolios/:username', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      user.portfolios = user.portfolios.filter((e) => e.alias != req.body.alias);
      console.log('hello');
      user.save().then((data) => res.send(data));
    });
  } catch (e) {
    throw e;
  }
});

//Delete Wallet
router.delete('/user/portfolios/wallets/:username', (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.body.alias);
      portfolio[0].wallets = portfolio[0].wallets.filter((e) => e.alias != req.body.walletAlias);
      user.save().then((user) => res.status(200).send(user));
    });
  } catch (e) {
    throw e;
  }
});

//Log User
router.post('/login', (req, response) => {
  User.findOne({ username: req.body.username }).then((res) => {
    if(!res){
      response.status(404).send({error: 'User not found'})
    }else{
      bcrypt.compare(req.body.password, res.password).then((isValid) => {
        if (!isValid) {
          response.status(404).send({ error: 'Invalid credentials' });
        } else {
          response.status(200).send({ message: 'Login success!' });
        }
      });
    }
  });
});

module.exports = router;
