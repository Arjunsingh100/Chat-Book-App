const express = require('express')
const router = express.Router();
const userModel = require('../models/userModel');
const { useId } = require('react');

//add friends controller
module.exports.addFriendsController = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const currentUser = await userModel.findOne({ _id: userId });
        if (!currentUser?.friends?.includes(`${friendId}`)) {
            currentUser.friends.push(friendId)
            await currentUser.save();
            res.status(200).send({ success: true, message: 'Friend added successfully!' })
        }
    } catch (error) {
        res.status(402).send({ success: false, message: 'Error while adding friends' })
    }
}

//fetch all friends controller
module.exports.getAllFriends = async (req, res) => {
    try {
       const {userId} = req.params;
       const contacts = await userModel.find({_id: userId}).select('friends').populate("friends");
       res.status(202).send({success: true, message: "Contacts fetched successfully", friends: contacts})
    } catch (error) {
        res.status(402).send({success: false, message: 'Error while fetching friends'})
    }
}