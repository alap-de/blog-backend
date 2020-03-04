const jwt = require('jsonwebtoken');

const ErrorUtil = require('../util/error');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader){
        throw ErrorUtil.error('not authenticated', 401);
    }

    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.private_key);
        req.user = decoded;
    }catch(err){
        if(err instanceof jwt.TokenExpiredError){
            err.statusCode = 401;
        }

        throw err;
    }

    next();
}