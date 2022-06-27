const Joi = require('joi'); // npm i joi
const bcrypt = require('bcrypt');  // npm i bcrypt
const express = require('express');
const app = express();
const router = express.Router();;
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const AdminMiddleware = require('../middleware/adminauth');
const Satta = require('../models/sata');
const SattaCity = require('../models/sattaCity');
const Annoucment = require('../models/announcment');
var moment = require('moment');

router.post('/login', async (req,res) => {
    console.log(req.body);
    console.log("============== 9");
    let validation = Joi.object({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password : Joi.string().required()
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(200).send(error.message);
    let emailExist = await Admin.findOne({email:req.body.email});
    if(!emailExist) return res.status(200).send({message : 'Email not found !!'});
    const isMactch = await bcrypt.compare(req.body.password,emailExist.password);
    console.log(isMactch);
    if(!isMactch) return res.send({message:'Invalid Password !!'});
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: emailExist._id,
    }
    const token =  await jwt.sign(data, jwtSecretKey);
    // res.send(token);
    return res.status(200).send({token : token,userData : emailExist});
});
router.post('/signup', async (req,res) => {
    console.log(req.body);
    // Admin
    let validation = Joi.object({
                name : Joi.string().min(5).required(),
                email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password : Joi.string().min(6).required()
            });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({message : error.message});

    let emailExist = Admin.findOne({email:req.body.email});
    if(error) return res.status(202).send({message : 'Email Already Exists !!'});
    let AdminData;
    try {
        const salt = await bcrypt.genSalt(10);
        AdminData = await Admin.create({
            name : req.body.name,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password, salt),
        });
    } catch (error) {
        return res.status(500).send(error);
    }

    return res.status(201).send(AdminData);
});
router.get('/get',AdminMiddleware,async (req,res) => {
    if(req.query.date)
    {
        
        let date = req.query.date;
        let begin = moment(date).utc()
        let end = moment(date).add('1','day').utc()
        let satta = await Satta.find(
            {
                resultDateTime:  {
                    '$gte': begin,
                    '$lte': end
                }
            }
        );
        return res.status(200).send(satta);
    }
    let satta = await Satta.find();
    // console.log(req.body);
    // console.log(req);
    // console.log('sata',satta);
    return res.status(200).send(satta);
});
router.get('/get/:id',AdminMiddleware,async (req,res) => {
    console.log(req.params);
    let satta = await Satta.findById(req.params.id);
    // console.log(req.body);
    // console.log(req);
    console.log('sata',satta);
    // if(!sata) return res.status(404).send({message : 'Not Found !!'});
    return res.status(200).send(satta);
});

router.post('/satta',AdminMiddleware,async (req,res) => {
    console.log('body ==> ',req.body);
    let validation = Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        resultDate : Joi.date().required(),
        resultA : Joi.required(),
        resultB : Joi.required(),
        resultC : Joi.required(),
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({ message : error.message});
    // console.log('Params ==> ',req.params);
    // console.log(moment(req.body.resultDate).unix());
    const savingDataGot = {
        title : req.body.title,
        description: moment(req.body.description).utc(),
        resultDate: moment(req.body.resultDate).utc(),
        resultDateTime: req.body.resultDate,
        resultA: req.body.resultA || null,
        resultB: req.body.resultB || null,
        resultC: req.body.resultC || null,
    };
    console.log(savingDataGot);
    try {
        const sattaData = await Satta.create(savingDataGot);
        return res.status(200).send({message : 'Data saved !!',data :sattaData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});
router.post('/satta/:id',AdminMiddleware,async (req,res) => {
    console.log('body ==> ',req.params);
    if(!req.params.id) return res.status(404).send({message : 'Invalid id !'});
    let findOne = await Satta.findById(req.params.id);
    if(!findOne) return res.status(404).send({message : 'Data not found !'});
    // return res.send(req.body)
    let validation = Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        resultDate : Joi.date().required(),
        resultA : Joi.required(),
        resultB : Joi.required(),
        resultC : Joi.required(),
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({ message : error.message});
    // console.log('Params ==> ',req.params);
    const savingDataGot = {
        title : req.body.title,
        description: moment(req.body.description).utc(),
        resultDate: moment(req.body.description).utc(),
        resultDateTime: req.body.resultDate,
        resultA: req.body.resultA,
        resultB: req.body.resultB,
        resultC: req.body.resultC,
    };
    console.log(savingDataGot);
    try {
        const sattaData = await Satta.findById(req.params.id).update(savingDataGot);
        // const sattaData = await Satta.create(savingDataGot);
        return res.status(200).send({message : 'Data update !!',data :sattaData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});

// for city result routes
router.get('/city/get',AdminMiddleware,async (req,res) => {
    console.log(req.query);
    // console.log(moment(req.query.date).add('1','month').utc());
    if(req.query.date)
    {
        let date = req.query.date;
        let begin = moment(date).utc()
        let end = moment(date).add('1','month').utc()
        let satta = await SattaCity.find({
            resultDateTime:  {
                '$gte': begin,
                '$lte': end
            }
        });
        return res.status(200).send(satta);
    }
    let satta = await SattaCity.find();
    // console.log(req.body);
    // console.log(req);
    // console.log('sata',satta);
    return res.status(200).send(satta);
});
router.get('/city/get/:id',AdminMiddleware,async (req,res) => {
    console.log(req.params);
    let satta = await SattaCity.findById(req.params.id);
    // console.log(req.body);
    // console.log(req);
    console.log('sata',satta);
    // if(!sata) return res.status(404).send({message : 'Not Found !!'});
    return res.status(200).send(satta);
});

router.post('/city/satta',AdminMiddleware,async (req,res) => {
    console.log('body ==> ',req.body);
    let validation = Joi.object({
        title : Joi.string().required(),
        resultDate : Joi.date().required(),
        resultA : Joi.required(),
        resultB : Joi.required(),
        resultC : Joi.required(),
        resultD : Joi.required(),
        resultE : Joi.required(),
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({ message : error.message});
    // console.log('Params ==> ',req.params);
    // console.log(new Date(req.body.resultDate).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}));
    const savingDataGot = {
        title : req.body.title,
        resultDate: req.body.resultDate,
        resultDateTime: req.body.resultDate,
        resultA: req.body.resultA || null,
        resultB: req.body.resultB || null,
        resultC: req.body.resultC || null,
        resultD: req.body.resultD || null,
        resultE: req.body.resultE || null,
    };
    console.log(savingDataGot);
    try {
        const sattaData = await SattaCity.create(savingDataGot);
        return res.status(200).send({message : 'Data saved !!',data :sattaData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});
router.post('/city/satta/:id',AdminMiddleware,async (req,res) => {
    console.log('body ==> ',req.params);
    if(!req.params.id) return res.status(404).send({message : 'Invalid id !'});
    let findOne = await SattaCity.findById(req.params.id);
    if(!findOne) return res.status(404).send({message : 'Data not found !'});
    // return res.send(req.body)
    let validation = Joi.object({
        title : Joi.string().required(),
        resultDate : Joi.date().required(),
        resultA : Joi.required(),
        resultB : Joi.required(),
        resultC : Joi.required(),
        resultD : Joi.required(),
        resultE : Joi.required(),
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({ message : error.message});
    // console.log('Params ==> ',req.params);
    const savingDataGot = {
        title : req.body.title,
        resultDate: req.body.resultDate,
        resultDateTime: req.body.resultDate,
        resultA: req.body.resultA,
        resultB: req.body.resultB,
        resultC: req.body.resultC,
        resultD: req.body.resultD,
        resultE: req.body.resultE,
    };
    console.log(savingDataGot);
    try {
        const sattaData = await SattaCity.findById(req.params.id).update(savingDataGot);
        // const sattaData = await Satta.create(savingDataGot);
        return res.status(200).send({message : 'Data update !!',data :sattaData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});

// announcments

router.get('/announcment',AdminMiddleware,async (req,res) => {
    console.log(req.params);
    let satta = await Annoucment.findOne();
    // console.log(req.body);
    // console.log(req);
    console.log('sata',satta);
    // if(!sata) return res.status(404).send({message : 'Not Found !!'});
    return res.status(200).send(satta);
});

router.post('/announcment',AdminMiddleware,async (req,res) => {
    // console.log('body ==> ',req.body);
    let validation = Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        adminno : Joi.string().required(),
        importanttext : Joi.string().required(),
    });
    const {error,value} = validation.validate(req.body);
    if(error) return res.status(202).send({ message : error.message});
    // console.log('Params ==> ',req.params);
    const savingDataGot = {
        title : req.body.title,
        description: req.body.description,
        adminno: req.body.adminno || '',
        importanttext: req.body.importanttext | '',
    };
    // console.log(savingDataGot);
    try {
        let satta = await Annoucment.findOne();
        let sattaData;
        if(satta)
        {
            sattaData = await Annoucment.findOne().update(savingDataGot);
        }
        else
        {
            sattaData = await Annoucment.create(savingDataGot);
        }
        return res.status(200).send({message : 'Data saved !!',data :sattaData });
    } catch (error) {
        // console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});
module.exports = router;