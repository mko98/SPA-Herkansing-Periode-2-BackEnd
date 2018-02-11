const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GameSchema = require('./game.model').GameSchema;

const PublisherSchema = new Schema({
    name:{
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

Publisher.count({}, function (err, count) {
    if(count < 1){
        console.log('Adding publisher');
        const publisher = new Publisher({
            name: "Electronic Arts",
            founder: "Trip Hawkins",
            ceo: "Andrew Wilson",
            _id: "5a3fd41e3ef7ccda81e7dda4"
        });
        publisher.save();
    }
    else {
        console.log('There already is a publisher in the database')
    }
});

module.exports= Publisher;
