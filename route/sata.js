const express = require('express');
const app = express();
const router = express.Router();
// const router = express.Router();
// const Users = require('../models/users');
const Satta = require('../models/sata');
const AuthMiddleware = require('../middleware/auth');

router.get('/get',AuthMiddleware,async (req,res) => {
    let satta = await Satta.find();
    // console.log(req.body);
    // console.log(req);
    // console.log('sata',satta);
    return res.status(200).send(satta);
});

router.post('/satta',AuthMiddleware,async (req,res) => {
    // console.log('body ==> ',req.body);
    // console.log('Params ==> ',req.params);
    const savingDataGot = {
        title : req.body.title,
        description: req.body.description,
        resultDate: req.body.resultDate,
        resultDateTime: req.body.resultDate,
        resultA: req.body.resultA || NULL,
        resultB: req.body.resultB || NULL,
        resultC: req.body.resultC || NULL,
    };
    console.log(savingDataGot);
    try {
        const sattaData = await Satta.create(savingDataGot);
        return res.status(200).send(sattaData);
    } catch (error) {
        console.log(error);
        return res.status(500).send({'message' : 'Error while saving data','error' : error});
    }
});

module.exports = router;