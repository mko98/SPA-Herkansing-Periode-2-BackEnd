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
    publishers: [{
        type: Schema.Types.ObjectId,
        ref: 'publishers'
    }],

},
    { usePushEach: true }
    );




const Game = mongoose.model('games', GameSchema);

Game.count({}, function (err, count) {
    if(count < 1){
        console.log('adding a game');
        const game = new Game({
            title: "Battlefield 1",
            genre: "First-person shooter",
            engine: "Frostbite",
            publishers: "5a3fd41e3ef7ccda81e7dda4"
        });
        game.save();
    }

    else {
        console.log('There already is a game in the database')
    }
});




module.exports = Game;
