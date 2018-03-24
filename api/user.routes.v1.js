const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const User = require('../model/user.model');
const Publisher = require('../model/publisher.model');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'spaherkansing2.2@gmail.com',
    pass: 'SPAHerkansing123'
  }
});

routes.post('/register', function (req, res) {
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    const emailToken = Math.floor(Math.random() * 10000);


    User.findOne({email: userEmail}).then((user) => {
      if (!user) {

    var mailOptions = {
      from: 'noreply@spaherkansing.nl',
      to: userEmail,
      subject: 'Confirm your Email address',
      html: '<h2>Thank you for registering</h2> <h4>This is the token to confirm your Email address:</h4>' + emailToken
    };

        User.create({email: userEmail, password: userPassword, emailVerifyToken: emailToken})
            .then((user) => {
              transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
                res.status(200).send(user);
            })
      } else {
        res.status(401).json({succes: false, message: 'User already exists'})
      }
    })
        .catch((error) => res.status(400).json(error));
});

routes.post('/verify', function (req, res) {
  const userEmail = req.body.email;
  const userVerifyToken = req.body.emailVerifyToken;

  User.findOne({email: userEmail}).then((user) => {
    if (user.emailVerifyToken === userVerifyToken) {
      user.isVerified = true;
      user.save();
      res.status(200).json({success: true, message: 'Email address verified'})
    } else {
      res.status(400).json({success: false, message: 'Wrong token'})
    }
  })
  .catch((error) => res.status(400).json(error));

});

routes.post('/resendemail', function (req, res) {
  const userEmail = req.body.email;
  const emailToken = Math.floor(Math.random() * 10000);

  var mailOptions = {
    from: 'noreply@spaherkansing.nl',
    to: userEmail,
    subject: 'Confirm your Email address',
    html: '<h2>Thank you for registering</h2> <h4>This is the token to confirm your Email address:</h4>' + emailToken
  };

  User.findOne({email: userEmail}).then((user) => {
    user.emailVerifyToken = emailToken;
    user.save();
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).json(true);
}).catch((error) => res.status(400).json(error));

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
