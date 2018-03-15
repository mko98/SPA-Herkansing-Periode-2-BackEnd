const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const User = require('../model/user.model');
const Publisher = require('../model/publisher.model');
const mongoose = require('mongoose');

routes.post('/register', function (req, res) {
    const usersProps = req.body;
    console.log(usersProps);

    User.create(usersProps)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/login', function (req, res) {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  console.log('email:', loginEmail);
  console.log('password:', loginPassword);

  User.findOne({email: loginEmail})
  .then((user) => {
    if (user.password === loginPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({succes: false, message: 'login failed. Password wrong.'});
    }
  })
  .catch((error) => res.status(401).json({success: false, message: 'login failed. User not found.'}))
});
module.exports = routes;
