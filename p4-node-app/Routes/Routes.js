const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.TOKEN_SECRET
const { verify } = require('../middlewares/auth')


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
router.get('/user/' ,(req, res) => {
  try {
    User.find({}).then((users) => {
      res.status(200).send({ users: users });
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolios
router.get('/user/portfolios/:username', verify, (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      res.status(200).send({ portfolios: user.portfolios });
    });
  } catch (e) {
    throw e;
  }
});

//Get User portfolio
router.get('/user/:username/:portfolioname', verify, (req, res) => {
  User.findOne({ username: req.params.username }).then((user) => {
    portfolio = user.portfolios.filter((e) => e.alias == req.params.portfolioname);
    res.send({ portfolio: portfolio[0] });
  });
});

//Get portfolio wallets
router.get('/user/:username/:portfolioname/wallets', verify, (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.params.portfolioname);
      res.send({ wallets: portfolio[0].wallets });
    });
  } catch (e) {
    throw e;
  }
});

//Get wallet
router.get('/user/:username/:portfolioname/:walletname', verify, (req, res) => {
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
router.post('/user/portfolios/:username', verify, (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      if(user.portfolios.every(x => x.alias != req.body.alias)){
        user.portfolios.push({ alias: req.body.alias });
        user.save().then((data) => res.send(data));
      }else{
        res.status(200).send({error: 'Portfolio already exist'})
      }
    });
  } catch (e) {
    throw e;
  }
});

//Add wallet to portfolio
router.post('/user/portfolios/wallets/:username', verify, (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      portfolio = user.portfolios.filter((e) => e.alias == req.body.alias);
      if(portfolio[0].wallets.every(wallet => wallet.alias != req.body.walletAlias & wallet.address != req.body.walletAddress)){
        portfolio[0].wallets.push({ alias: req.body.walletAlias, address: req.body.walletAddress });
        user.save().then((data) => {
          res.send(data);
        });
      }
      else if(portfolio[0].wallets.every(wallet => wallet.alias != req.body.walletAlias)) res.status(200).send({error: 'Wallet alias already exist'});
      else if(portfolio[0].wallets.every(wallet => wallet.address != req.body.walletAddress)) res.status(200).send({error: 'Wallet address already exist'});
      else{ res.status(200).send({error:'Wallet already exist'})}
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
router.delete('/user/portfolios/:username', verify, (req, res) => {
  try {
    User.findOne({ username: req.params.username }).then((user) => {
      user.portfolios = user.portfolios.filter((e) => e.alias != req.body.alias);
      user.save().then((data) => res.send(data));
    });
  } catch (e) {
    throw e;
  }
});

//Delete Wallet
router.delete('/user/portfolios/wallets/:username', verify, (req, res) => {
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
  User.findOne({ username: req.body.username }).then((dbres) => {
    if(!dbres){
      response.status(200).send({error: 'User not found'})
    }else{
      bcrypt.compare(req.body.password, dbres.password).then((isValid) => {
        if (!isValid) {
          response.status(200).send({ error: 'Invalid credentials' });
        } else {
          const token = jwt.sign({id: dbres._id, email: dbres.email}, SECRET )
          response.status(200).send({ message: 'Login success!', token: token});
        }
      });
    }
  });
});

//Set preferred portfolio
router.post('/settings/portfolio/:username',verify, (req, res) => {
  try{
    User.findOne({username: req.params.username}).then( user => {
    user.preferredPortfolio = req.body.preferredPortfolio
    user.save().then(user => res.status(200).send(user))
    })
  }catch (e) {
    throw e
  }
})

//Get preferred portfolio
router.get('/settings/portfolio/:username', verify, (req, res) =>{
  try{
    User.findOne({username: req.params.username}).then( user => {
      const portfolio = user.portfolios.filter( x => x.alias == user.preferredPortfolio)
      res.status(200).send(portfolio[0])
    })
  }catch (e) {
    throw e
  }
})


//Set preferred currency
router.post('/settings/currency/:username',verify, (req, res) => {
  try{
    User.findOne({username: req.params.username}).then( user => {
    user.currency = req.body.currency
    user.save().then(user => res.status(200).send(user))
    })
  }catch (e) {
    throw e
  }
})

//Get preferred currency
router.get('/settings/currency/:username', verify, (req, res) =>{
  try{
    User.findOne({username: req.params.username}).then( user => {
      res.status(200).send(user.currency)
    })
  }catch (e) {
    throw e
  }
})
module.exports = router;