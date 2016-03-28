var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/user');

var userRouter = express.Router();

userRouter.route('/signup')
    .post(function (req, res) {
        var newUser = req.body;
        User.find({username: newUser.username}, function (error) {

        })
    })

userRouter.route('/login')
    .post(function (req, res) {
        var username = req.body.username,
            password = req.body.password;
        User.findOne({username: username}).then(function (err, user) {
            if (!user) {
                res.status(401).json({success: false, message: "User with the provided username was not found"})
            } else {
                if (user.password == password) {
                    var token = jwt.sign(user, config.secret, {expiresIn: "24h"});
                    res.send({token: token, success: true, message: "JWT's authentication"})
                } else {
                    res.status(401).send({success: false, message: "Incorrect password"})
                }
            }
        })
    })


module.exports = userRouter;