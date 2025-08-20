const bcrypt = require('bcrypt')

module.exports.hashPassword = async (plainPassword) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(`There is some error while hassing your password`)
    }
}

module.exports.comparePassword = async (plainPass, hashedPass) => {
    try {
        return await bcrypt.compare(plainPass, hashedPass)
    } catch (error) {
        console.log(`There is some error while comparing your password`)
    }
}

