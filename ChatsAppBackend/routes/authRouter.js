const express = require('express');
const { registerController, loginController, sentOtpController, verifyOtpController } = require('../controllers/authController');
const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.post('/sentOtp', sentOtpController);
router.post('/verifyOtp', verifyOtpController);


module.exports = router;