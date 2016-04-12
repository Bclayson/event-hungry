var express = require('express'),
    Event = require('../models/event');

var eventRouter = express.Router();

eventRouter.route('/')
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


eventRouter.route('/:id')
    .delete(function(req, res) {
        var userId = req.user._doc._id
        Event.remove({event_id: req.params.id, user: userId}, function (err, event) {
            if (err) res.status(401).send(err)
            res.send(event);
        })
    })

module.exports = eventRouter;


