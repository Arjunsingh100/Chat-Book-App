//defines either a one-to-one or group chat
const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
},{timestamps: true});


const chatModel =mongoose.Model('chats', chatSchema)
module.exports = chatModel;