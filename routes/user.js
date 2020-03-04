const router = require('express').Router();

const UserController = require('../controller/user');
const validate = require('../middleware/validate');


router.post('/register',UserController.validate('register'), validate, UserController.register);

router.post('/login',UserController.validate('login'), validate, UserController.login);


module.exports = router;