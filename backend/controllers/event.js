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


eventRouter.route('/favorites/:id')
    .delete(function(req, res) {
        Event.remove({_id: req.params.id}, function (err, event) {
            if (err) res.status(401).send(err)
            res.send(event);
        })
    })

module.exports = eventRouter;


