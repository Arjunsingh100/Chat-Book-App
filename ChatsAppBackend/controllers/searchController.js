const userModel = require('../models/userModel.js')
module.exports.serachFriendsController = async (req,res) => {
    try {
        const { searchKeyword } = req.params;
        const friends = await userModel.find(
            {
                $or: [
                    { username: { $regex:searchKeyword, $options: 'i' } },
                    { email: { $regex: searchKeyword, $options: 'i' } }
                ]
            }
        ).select('-otp');
        res.status(201).send({
            success: true,
            friends
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while searching products'
        })
    }
}