const express = require('express');
const routes = express.Router();
const mongodb = require('../config/mongo.db');
const mongoose = require('mongoose');
const neo4j = require('neo4j-driver').v1;
var Publisher = require('../model/publisher.model');
var Game = require('../model/game.model');

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));
const session = driver.session();

routes.get('/publishers/published/:id', function(req, res) {
    res.contentType('application/json');
  var ids = [];
  const id = req.param('id');

  session
    .run("MATCH (n:Publisher{mongoPublisherId: {idNeo}})--(b:Game) RETURN b", {idNeo: id})
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoGameId);
      });
      console.log(ids);
      return ids;
    })
    .then((ids)=>{
      Game.find({_id: { $in: ids}})
          .then((games) => {
          res.status(200).json(games);
        })
    })
    .catch((error) => {
      res.status(400).json(error);
    })
});

routes.get('/publishers/publishedby/:id', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const id = req.param('id');

  session

    .run("MATCH (publisher:Publisher {mongoPublisherId: {idNeo}})-[:PUBLISHED_BY]->(game:Game) RETURN game", {idNeo: id})
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoGameId);
      });
      console.log(ids);
      return ids;
    })
    .then((ids)=>{
          res.status(200).json(ids);
    })
    .catch((error) => {
      res.status(400).json(error);
    })
});

routes.post('/publishers/makeconnection/:id/:gameid', function (req, res) {
    res.contentType('application/json');

    const id = req.param('id');
  const gameid = req.param('gameid');

    session
    .run("MERGE (n:Publisher {mongoPublisherId:{idNeo}}) MERGE (b:Game {mongoGameId:{idNeoGame}}) MERGE (n)-[:PUBLISHED_BY]->(b) MERGE (b)-[:PUBLISHED_BY]->(n)", {idNeo: id, idNeoGame: gameid})
    .then(function(result) {
      res.status(200).json({"response": "Publisher added to game list."});
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


routes.delete('/publishers/removeconnection/:id/:gameId', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const id = req.param('id');
  const gameId = req.param('gameId');


  session
    .run("MATCH (n:Publisher{mongoPublisherId: {idNeo}}) MATCH (b:Game{mongoGameId: {idNeoGame}}) MATCH (n)-[r:PUBLISHED_BY]-(b) DELETE r", {idNeo: id, idNeoGame: gameId})
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoPublisherId);
      });
      res.status(200).json({"status": "relationship removed"});
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.delete('/publishers/deletegame/:gameId', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const gameId = req.param('gameId');


  session
    .run("MATCH (game:Game{mongoGameId: {idNeoGame}}) OPTIONAL MATCH (game)-[r]-() DELETE game, r", {idNeoGame: gameId})
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoPublisherId);
      });
      res.status(200).json({"status": "game deleted"});
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.delete('/publishers/deletepublisher/:id', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const id = req.param('id');


  session
    .run("MATCH (publisher:Publisher{mongoPublisherId: {idPublisher}}) OPTIONAL MATCH (publisher)-[r]-() DELETE publisher, r", {idPublisher: id})
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoPublisherId);
      });
      res.status(200).json({"status": "game deleted"});
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.delete('/publishers/deletegameconnection/:gameId', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const gameId = req.param('gameId');


  session
  // .run("MATCH (n:Publisher) MATCH (b:Game{mongoGameId: {idNeoGame}}) MATCH (n)-[r:PUBLISHED_BY]-(b) DELETE r", {idNeo: id, idNeoGame: gameId})
    .run("MATCH (game:Game{mongoGameId: {idNeoGame}}) MATCH (game)-[r]-() DELETE r", {idNeoGame: gameId})
    .then(function(result) {
      res.status(200).json({"status": "game relationship deleted"});
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.delete('/publishers/deletepublisherconnection/:id', function(req, res) {
  res.contentType('application/json');
  var ids = [];
  const id = req.param('id');


  session
  // .run("MATCH (n:Publisher) MATCH (b:Game{mongoGameId: {idNeoGame}}) MATCH (n)-[r:PUBLISHED_BY]-(b) DELETE r", {idNeo: id, idNeoGame: gameId})
    .run("MATCH (publisher:Publisher{mongoPublisherId: {idPublisher}}) MATCH (publisher)-[r]-() DELETE r", {idPublisher: id})
    .then(function(result) {
      res.status(200).json({"status": "publisher relationship deleted"});
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

routes.get('/publishers', function(req, res) {
    res.contentType('application/json');
    Publisher.find({})
        .then((publisher) => {
        res.status(200).send(publisher);
})
    .catch((error) => res.status(400).json(error));
});

routes.get('/publishers/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    Publisher.findOne({_id: id})
        .then((publisher) => {
        res.status(200).send(publisher);
})
    .catch((error) => res.status(400).json(error));
});

routes.get('/test/:gameid', function(req, res) {
    res.contentType('application/json');
    const test = req.param('eventid');
    Publisher.find( { events: { $in: [test] } } )
        .then((publisher) => {
            res.status(200).send(publisher);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/publishers', function(req, res) {
    res.contentType('application/json');

    const publishersProps = req.body;

    Publisher.create(publishersProps)
        .then((publisher) => {
        res.status(200).send(publisher)
})
    .catch((error) => res.status(400).json(error))
});

routes.put('/publishers/:id', function(req, res) {
    res.contentType('application/json');
    const publisherId = req.params.id;
    const publisherProps = req.body;

    Publisher.findByIdAndUpdate({_id: publisherId}, publisherProps)
    .then((publisher) => res.send(publisher))
    .catch((error) => res.status(400).json(error))

});

routes.delete('/publishers/:id', function(req, res) {
    const id = req.param('id');
    Publisher.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
    .catch((error) => res.status(400).json(error))
});


module.exports = routes;
