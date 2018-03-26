const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongodb = require('./config/mongo.db');
const gameroutes_v1 = require('./api/game.routes.v1');
const publisherroutes_v1 = require('./api/publisher.routes.v1');
const userroutes_v1 = require('./api/user.routes.v1');
const env = require('./config/env/env');

const app = express();

module.exports = {};

app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.set('port', (process.env.PORT | env.env.webPort));
app.set('env', (process.env.ENV | 'development'));

app.use(logger('dev'));

// CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/v1', gameroutes_v1);
app.use('/api/v1', publisherroutes_v1);
app.use('/api/v1', userroutes_v1);

app.use(function (err, req, res, next) {
    // console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
});

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

app.listen(env.env.webPort, function () {
    console.log('De server luistert op port ' + app.get('port'));
    console.log('Zie bijvoorbeeld http://localhost:3000/api/v1/games');
});

module.exports =app;
