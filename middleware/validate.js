const { validationResult } = require('express-validator');


module.exports = (req, res, next) => {
    const formattedValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                [error.param]: error.msg
            };
        }
    })

    const errors = formattedValidationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    next();
}