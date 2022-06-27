const express = require('express');
const app = express();
const router = express.Router();
// const router = express.Router();
// const Users = require('../models/users');
const Satta = require('../models/sata');
const SattaCity = require('../models/sattaCity');
const Annoucment = require('../models/announcment');
const AuthMiddleware = require('../middleware/auth');
const { date } = require('joi');
var moment = require('moment');

router.get('/get',AuthMiddleware,async (req,res) => {
    // let satta = await Satta.find();
    // console.log(req.body);
    // console.log(req);
    // console.log('sata',satta);
    // let date = req.query.date;
    // console.log(date);
    // let begin = date+'T00:00:00.000Z'
    // let end = date+'T23:59:59.000Z'
    // let satta = await Satta.find(
    //     {
    //         resultDateTime:  {
    //             '$gte': begin,
    //             '$lte': end
    //         }
    //     }
    // );
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
router.get('/city/get',AuthMiddleware,async (req,res) => {
    // console.log(req.query);
    // let date = req.query.date;
    // console.log(date);
    // let begin = date+'-01T00:00:00.000Z'
    // let end = date+'-31T23:59:59.000Z'
    // console.log('begin date ===> '+begin);
    // console.log('end date ===> '+end);
    // let satta = await SattaCity.find(
    //     {
    //         resultDateTime:  {
    //             '$gte': begin,
    //             '$lte': end
    //         }
    //     }
    // );
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
});
router.get('/announcment',AuthMiddleware,async (req,res) => {
    console.log(req.params);
    let satta = await Annoucment.findOne();
    return res.status(200).send(satta);
});

module.exports = router;