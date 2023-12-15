const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true  
    },
    phoneNumber: {
        type: String,
        required: true
    },
    friends: [String]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;