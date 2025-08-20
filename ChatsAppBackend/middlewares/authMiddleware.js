const JWT = require('jsonwebtoken');

//isLogin middleware
module.exports.requireSignIn = (req, res, next) => {
    try {
        const isLogin = JWT.verify(req.headers.authorization, process.env.SECRET_KEY);
        console.log(isLogin)
        req.from = isLogin;
        next();
    } catch (error) {
        console.log(error)
    }
}