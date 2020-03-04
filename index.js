require('express-async-errors');
const app = require('express')();
const mongoose = require('mongoose');

// const app = express();


require('./routes/api')(app);

// app.use(routes);



mongoose.connect('mongodb://localhost/blog',
    { 
    useNewUrlParser: true ,
     useUnifiedTopology: true 
    })
    .then(app.listen(process.env.PORT || 3000))
    .catch(err => console.log('could not connect to mongodb..',err));




