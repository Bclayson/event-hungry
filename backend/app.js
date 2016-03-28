var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    eventRouter = require('./controllers/event'),
    userRouter = require('./controllers/user')
    cors = require('cors'),
    morgan = require('morgan'),
    middleware = require('./middleware');
    config = require('./config');

mongoose.connect(config.database)

var app = express();

app.listen(config.port, function () {
    console.log("App is running at http://localhost:" + config.port)
})

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware.genericErrorHandler)

app.get('/', function (req, res) {
    res.send('sup homie!!')
})
app.use('/user', userRouter);
app.use('/event', eventRouter);