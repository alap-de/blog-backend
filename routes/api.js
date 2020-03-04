const bodyParser = require('body-parser');
const postRoutes = require('./post');
const userRoutes = require('./user');
const auth = require('../middleware/auth');
const errorHandler = require('../middleware/error');





module.exports = (app) => {
    app.use(bodyParser.json());

    app.use('/user', userRoutes);

    app.use('/post', postRoutes);

    app.use(errorHandler);
};

