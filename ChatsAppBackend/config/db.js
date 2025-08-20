const mongoose = require('mongoose')
const  colors = require('colors')

const DBConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('you have connected database successfully'.bgGreen.white)
    } catch (error) {
        console.log(`We occured error in Mongodb ${error}`.bgRed.red)
    }
}

module.exports = DBConnect;