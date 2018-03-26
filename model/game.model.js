const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PublisherSchema = require('./publisher.model').PublisherSchema;

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
      type: String,
      required: true
    },
    engine: {
      type: String,
      required: true
    },
    imagePath: {
      type: String
    },
    platforms: [{
      type: String
    }],
    website: {
      type: String
    },
    releaseDate: {
      type: Date
    },
    publishers: [{
        type: Schema.Types.ObjectId,
        ref: 'publishers'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],

},
    { usePushEach: true }
    );




const Game = mongoose.model('games', GameSchema);

module.exports = Game;
