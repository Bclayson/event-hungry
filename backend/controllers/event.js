var express = require('express'),
    Event = require('../models/event');

var eventRouter = express.Router();

eventRouter.route('/')
    .get(function(req, res) {

    })
    .post(function(req, res) {
        var newEvent = req.body
        newEvent.user = req.user
        Event.create(newEvent, function (err, createdEvent) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send({success: true, event: createdEvent})
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


