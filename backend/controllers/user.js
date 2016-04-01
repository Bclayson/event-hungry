var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/user'),
    _ = require('underscore-node'),
    jwt = require('jsonwebtoken');

var userRouter = express.Router();

function hasEmail (users, email) {
    return _isEmpty(_.where(users, {email: email}))
}

userRouter.route('/signup')
    .post(function (req, res) {
        var newUser = req.body;
        User.find({username: newUser.username}, function (err, users) {
            if (err) res.status(500).send(err);
            if (!_.isEmpty(users)) {
                if (hasEmail(users, newUser.email)) {
                    res.status(401).send({success: false, message: 'User with that username and email already exists'})
                } else {
                    res.status(401).send({success:false, message: 'Someone already has that username. Try another.'})
                }
            } else {
                User.create(newUser, function (err, createdUser) {
                    if (err) res.status(500).send(err);
                    var token = jwt.sign(createdUser, config.secret, {expiresIn: '24h'})
                    res.send({token: token, success: true, message: "JWt's authentication", user: createdUser})
                })
            }
        })
    })

userRouter.route('/login')
    .post(function (req, res) {
        var username = req.body.username,
            password = req.body.password;
        User.findOne({username: username}, function (err, user) {
            if (!user) {
                res.status(401).json({success: false, message: "User with the provided username was not found"})
            } else {
                if (user.password == password) {
                    var token = jwt.sign(user, config.secret, {expiresIn: "24h"});
                    res.send({token: token, success: true, message: "JWT's authentication", user: user})
                } else {
                    res.status(401).send({success: false, message: "Incorrect password"})
                }
            }
        })
    })

//userRouter.route('/user')
//    .put(function (req, res) {
//        var userInfo = req.body._id
//        User.findById(userInfo._id, function (err, user) {
//            user.email = userInfo.email;
//            user.save();
//            res.send({success: true, message: "User email was successfully updated"})
//        })
//    })


module.exports = userRouter;