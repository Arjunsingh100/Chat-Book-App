const express = require('express');
const { retrieveAllMessages, createMessage } = require('../controllers/messageController');
const router = express.Router();

//route for fetching all messages
router.post('/fetchMessages', retrieveAllMessages);
//route for creating message in db
router.post('/createMessage', createMessage);




module.exports = router;