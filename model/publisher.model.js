const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user.model').UserSchema;

const PublisherSchema = new Schema({
    publisherName:{
        type: String,
        required: [true, 'PublisherName is required.']
    },
    founder: {
      type: String,
      required: [true, 'Founder is required.']
    },
    ceo: {
      type: String,
      required: [true, 'CEO is required.']
    },
    yearFounded: {
      type: Date
    },
    publisherWebsite: {
      type: String
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
