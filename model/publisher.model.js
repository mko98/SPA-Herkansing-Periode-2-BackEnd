const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GameSchema = require('./game.model').GameSchema;

const PublisherSchema = new Schema({
    publisherName:{
        type: String,
        required: true
    },
    founder: {
      type: String,
      required: true
    },
    ceo: {
      type: String,
      required: true
    }
},
    { usePushEach: true }
);

const Publisher = mongoose.model('publishers', PublisherSchema);

module.exports= Publisher;
