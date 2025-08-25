const messageModel = require('../models/messageModel')

//fetch all message from db
module.exports.retrieveAllMessages = async (req, res) => {
    try {
        const { from, to} = req.body;
        const messages = await messageModel.find({ 
            $or: [{chat: to, sender: from},{sender: to, chat: from}]
        }).sort({_id: 1});
        res.status(200).send({success: true, message: 'Messages retrieved successfully', allMessages: messages})
    } catch (error) {
        res.status(400).send({success: false, message: 'Facing error while fetching messages from db'})
    }
}
//controller for creating messages
module.exports.createMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const msg = await new messageModel({ chat: to, sender: from, content: message })
        msg.save();
        res.status(200).send({success: true, message: 'Message saved successfully in db'})
    } catch (error) {
        res.status(402).send({ success: false, message: "Error while creating message in db" })
    }
}