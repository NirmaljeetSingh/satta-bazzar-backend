const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer'); // npm install --save body-parser multer
const fileUpload = multer();
const bodyParser = require('body-parser');
var cors = require('cors')


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('../../ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('../../ssl/certificate.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// app.use(cors()); // Use this after the variable declaration
// const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

// www/ssl/

// certificate.crt
// key.pem
/*************************************************************** */
// app.use(cors({
//     origin: ['*','www.nvasaverasatta.com','localhost:3000']
// })) // Use this after the variable declaration

// app.use(cors('*'));
// app.use(bodyParser.urlencoded({ extended: false }))
/*************************************************************** */

app.use(express.json())

// app.use(express.urlencoded({ extended: true }))
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(fileUpload.array()); 
require('dotenv/config');

app.get('/',(req,res) => {
    console.log(req);
    
    console.log(res);
    res.send('hello');
})


// app.use(bodyParser.urlencoded({ extended : false}));       
const api = require('./route/sata');
const adminApi = require('./route/admin');
app.use('/api',api);
app.use('/api/admin',adminApi);


const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser : true
},() => console.log('mongo connected !!'));

// app.listen(PORT,(req,res) => {
//     console.log('Listen to '+PORT);
// });
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT,(req,res) => {
        console.log('Listen to '+PORT);
    });