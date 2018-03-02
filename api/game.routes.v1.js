const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const Game = require('../model/game.model');
const Publisher = require('../model/publisher.model');
const mongoose = require('mongoose');

routes.delete('/games/:id/:gameid', function(req, res){
    res.contentType('application/json');
    const publisherId = req.params.id;
    const gameId = req.params.gameid;

    Game.findById(gameId)
        .then((game) => {
            game.publishers.remove(publisherId);
            game.save();
        })
        .then(() => res.status(200).json({
            'status': 'Publisher is deleted.'
        }))
        .catch((error) => res.status(400).json(error))
});



routes.get('/games', function(req, res) {
    res.contentType('application/json');
    Game.find({})
        .populate({
            path: 'games'
        })
        .then((games) => {
            res.status(200).json(games);
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/games/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');

    Game.findOne({_id: id})
        .populate({
            path: 'publishers'
        })
        .then((games) => {
            res.status(200).send(games);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/games', function(req, res) {
    const gamesProps = req.body;

    Game.create(gamesProps)
        .then((games) => {
            res.status(200).send(games)
        })
        .catch((error) => res.status(400).json(error))
});

routes.put('/games/:id/:gameid', function(req, res){
    res.contentType('application/json');
    const publisherId = req.param('id');
    const gameId = req.param('gameid');



    Game.findById(gameId)
        .then((game) => {
        game.publishers.push(publisherId);
    game.save();
})
.then(() => res.status(200).json({
        'status': 'Publisher is added.'
    }))
.catch((error) => res.status(400).json(error))
});


routes.put('/games/:id', function(req, res) {
    res.contentType('application/json');
    const gameId = req.params.id;
    const gameProps = req.body;

    Game.findByIdAndUpdate({_id: gameId}, gameProps)
        // .then(()=> games.findById({_id: gameId}))
        .then((games) => res.status(200).send(games))
        .catch((error) => res.status(400).json(error))

});

routes.delete('/games/:id', function(req, res) {
    const id = req.param('id');
    Game.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;
