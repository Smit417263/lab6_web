const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('chat', ChatSchema)