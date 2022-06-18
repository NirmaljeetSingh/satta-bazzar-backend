const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer'); // npm install --save body-parser multer
const fileUpload = multer();
const bodyParser = require('body-parser');
var cors = require('cors')


const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.use(cors()) // Use this after the variable declaration


// for parsing multipart/form-data
app.use(fileUpload.array()); 
require('dotenv/config');

app.get('/',(req,res) => {
    console.log(req);
    console.log("=============================");
    console.log(res);
    res.send('hello');
})


// app.use(bodyParser.urlencoded({ extended : false}));       
const api = require('./route/sata');
const adminApi = require('./route/admin');
app.use('/api',api);
app.use('/api/admin',adminApi);


const PORT = process.env.PORT || 3003;
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser : true
},() => console.log('mongo connected !!'));
app.listen(PORT,(req,res) => {
    console.log('Listen to '+PORT);
})