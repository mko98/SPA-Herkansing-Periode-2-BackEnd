const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PublisherSchema = require('./publisher.model').PublisherSchema;

const GameSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    genre: {
      type: String,
      required: [true, 'Genre is required.']
    },
    engine: {
      type: String,
      required: [true, 'Engine is required.']
    },
    imagePath: {
      type: String
    },
    platforms: [{
      type: String
    }],
    gameWebsite: {
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
