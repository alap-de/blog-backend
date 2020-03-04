const bcrypt = require('bcrypt');
const { body } = require('express-validator');

const User = require('../model/user');
const ErrorUtil = require('../util/error');

module.exports.register = async (req, res) => {

    try{
        const doesEmailExist = await User.findOne({email: req.body.email});
        
        if(!doesEmailExist){
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            user = await user.save();
    
            const token = user.generateToken();
    
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            });
        }else{
            throw ErrorUtil.error("email already exists", 400);
        }
        
    }catch(err){
        throw err;
    }
        
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        throw ErrorUtil.error('Invalid email or password', 400);
    }

    const isPassowrdValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPassowrdValid){
        throw ErrorUtil.error('Invalid email or password', 400);
    }

    const token = user.generateToken();
    
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
    });
}

module.exports.validate = (toValidate) => {

    switch (toValidate) {
        case 'register':
            return [
                body('email', 'email is required').exists().bail().isEmail().bail().normalizeEmail(),
                body('name', 'name is required').exists().bail().notEmpty().bail().isString().withMessage('name has to be a string'),
                body('password', 'password is required').exists().bail().notEmpty().bail().isLength({min: 4}).withMessage('password length should be more than 4')
            ]
            break;
        case 'login':
            return [
                body('email', 'email is required').exists().bail().isEmail().bail().normalizeEmail(),
                body('password', 'password is required').exists().bail().notEmpty()
            ]
            break;
    
        default:
            break;
    }
}