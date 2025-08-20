const express = require('express');
const { serachFriendsController } = require('../controllers/searchController');
const { addFriendsController, getAllFriends } = require('../controllers/friendsController');
const router = express.Router();

//search friends router
router.get('/searchFriends/:searchKeyword', serachFriendsController)
router.post('/addFriend/', addFriendsController);
router.get('/getContacts/:userId', getAllFriends)

module.exports = router;