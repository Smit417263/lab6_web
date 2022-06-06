const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
});

module.exports = Item = mongoose.model('user', UserSchema)