const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user.model').UserSchema;

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
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
},
    { usePushEach: true }
);

const Publisher = mongoose.model('publishers', PublisherSchema);

module.exports= Publisher;
