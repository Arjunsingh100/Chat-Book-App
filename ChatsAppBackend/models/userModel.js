const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    password: {
        type: String,
        require: true
    },
    phone : {
        type: String,
        require: true
    },
    emailISVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    isImageSet : {
        type: Boolean,
        default: false
    },
    roll: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;