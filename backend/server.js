// requiring packages and modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cakeRoutes = require('./routes/cakeRoutes');

// setting up express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

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
