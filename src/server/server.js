const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');



const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/ass3',
  port: 8000
};

mongoose
    .connect(config.mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true})
    .then(() => console.log('connected to database!'))
    .catch(err => console.log(err));



const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/app', require('./api/app'));
app.use('/api/user_login', require('./api/user_login'));
// app.use('/api/app', require('./api/app'));

app.listen(8000,
    () => console.log(`Listening on port 8000!`));

