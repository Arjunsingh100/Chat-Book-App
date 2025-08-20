//shows the presence status of a user
const mongoose = require('mongoose')


const presenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        unique: true
    },
    isOnline: Boolean,
    lastActive: Date
},{timestamps: true})


const presenceModel = mongoose.model('presence', presenceSchema)
module.exports = presenceModel;