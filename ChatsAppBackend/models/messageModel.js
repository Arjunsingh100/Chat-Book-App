//defines messages of users
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    content: {
        type: String,
        trim: true
    },
    media: {
        type: {
            type: String,
            enum: ['image','video','audio','file']
        },
        url: String
    },
    status: {
        type: String,
        enum: ['sent','delivered','read'],
        default: 'sent'
    }
},{timestamps:  true});

const messageModel = mongoose.model('message',messageSchema)
module.exports = messageModel;