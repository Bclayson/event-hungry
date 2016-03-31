var express = require('express'),
    Event = require('../models/event');

var eventRouter = express.Router();

eventRouter.route('/favorites')
    .get(function(req, res) {
        var userId = req.user._doc._id;
        var now = new Date();
        Event.find({user: userId, date: {$gte: now}}, function (err, events) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(events)
            }
        })
    })
    .post(function(req, res) {
        console.log(req.user)
        req.body.date = new Date(req.body.date)
        var event = new Event(req.body);
        event.user = req.user._doc._id
        event.save(function (err, newEvent) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send({success: true, event: newEvent})
            }
        })
    })

eventRouter.get('/:id')
    .get(function(req, res) {

     })
    .post(function(req, res) {

    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    })

module.exports = eventRouter;


