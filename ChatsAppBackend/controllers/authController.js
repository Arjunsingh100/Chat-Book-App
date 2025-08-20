const { hashPassword, comparePassword } = require("../helpers/authHelpers.js");
const userModel = require("../models/userModel.js");
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');



module.exports.registerController = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(200).send({ success: true, message: 'You already with this email, so login please' })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ username: username, email: email, password: hashedPassword, phone: phone }).save();
        res.status(201).send({ success: true, message: 'You have register successfully', user })
    } catch (error) {
        res.status(500).send({ success: false, message: 'Getting error while registering you, so please try again', Error: error })
    }
}

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.send({ success: false, message: 'You does not exits with these credentials' });
        }
        if (user?.emailISVerified == false) {
            return res.status(202).send({
                success: false,
                message: 'Your email is not verified so please verify your email',
                data: user
            })
        }
        const comparePass = await comparePassword(password, user?.password);
        // if(comparePass == false) {
        //     res.send({success: false, message: 'Please enter the correct username and password'})
        // }
        const token = await JWT.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '30h' })
        res.status(201).send({ success: true, message: 'You have login successfully', data: user, token: token })
    } catch (error) {

    }
}

//sent otp Controller
module.exports.sentOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        //save otp in database
        await userModel.findOneAndUpdate({email},{otp: otp, otpExpiry: expiry});

        //send otp Email
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, //true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            from: `"ChatsBook" process.env.EMAIL_USER`,
            to: email,
            subject: 'Your otp to verify  email',
            html: `<h4>Your otp is ${otp}</h4><br></br><h6>Your otp will expire within 5 minutes</h6>`
        })
        res.send({success: true, message: 'Otp sent successfully to your register email'})
    } catch (error) {
        res.status(404).send({ success: false, message: 'There is some error while updating otp in Database', error: error })
    }
}

//verify otp Controller
module.exports.verifyOtpController = async (req, res) => {
    try {
       const {email, otp} = req.body;
       const user = await userModel.findOne({email: email});
       if(!user) {
        return res.status(404).send({success: false, message: 'User not found in db'})
       }
       if(user.otp !== parseInt(otp) || Date.now() > user.otpExpiry) {
        return res.status(400).send({success: false, message: 'You have entered invalid or expired otp'})
       }
       user.emailISVerified = true;
       user.otp = null;
       user.otpExpiry = null;
       await user.save();

       res.status(200).send({success: true,  message: 'Email  verified successfully!'});
    } catch (error) {
       res.status(404).send({ success: false, message: 'There is some error while updating otp in Database', error: error }) 
    }
}

//fetch all contacts
module.exports.getAllContacts = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(402).send({success:false, message: 'Error while fetching all contacts'})
    }
}

