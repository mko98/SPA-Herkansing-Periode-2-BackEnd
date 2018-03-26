const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    emailVerifyToken: {
      type: String,
      required: [true, 'EmailVerifyToken is required.']
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
    { usePushEach: true }
    );




const User = mongoose.model('user', UserSchema);

module.exports = User;
