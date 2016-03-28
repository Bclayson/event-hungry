var express = require('express'),
    Event = require('../models/event');

var eventRouter = express.Router();

eventRouter.route('/')
    .get(function(req, res) {

    })
    .post(function(req, res) {

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


