var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    eventRouter = require('./controllers/event'),
    userRouter = require('./controllers/user')
    cors = require('cors'),
    morgan = require('morgan'),
    middleware = require('./middleware');
    config = require('./config'),
    expressJwt = require("express-jwt");

mongoose.connect(config.database)

var app = express();

app.listen(config.port, function () {
    console.log("App is running at http://localhost:" + config.port)
})

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', expressJwt({secret: config.secret}));

// Base routes
app.use('/auth', userRouter);
app.use('/api/event', eventRouter);
