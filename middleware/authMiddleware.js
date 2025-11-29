const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    console.log("Auth Middleware Token:", token);
    if(!token){
        return res.status(401).json({message: "Not authorized, no token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        // console.log("Authenticated User:", req.user);
        next();
    }catch(err){
        res.status(401).json({message: "Not authorized, token failed"});
    }
}