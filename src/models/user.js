const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    }
});

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;