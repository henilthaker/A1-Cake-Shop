// requiring packages and modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
// const requireAuth = require('./middleware/requireAuth');

// setting up express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// app.use(requireAuth); // we cannot use requierAuth middleware here coz then authorization will be checked for every route and hence I won't be able to even login coz even for login I will require a user token

// routes
app.use('/api/user', userRoutes);
app.use('/api/cakes',cakeRoutes);

// connecting to database and listening to requests
const url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(() => {
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log('listening to port '+port);
        })
    })
    .catch(error=>{
        console.log(error);
    })
