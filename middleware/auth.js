const express = require('express');

const verify = async(req,res,next) => {
    const token = req.headers['secret-key'] || '';

    // if(!token) return res.status(401).send({message:'Un-authorized !!'});
    // try {
    //     // const isVerified = await jwt.verify(token,jwtSecretKey);
    //     const token_app = '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#./';
    //     if(token != token_app) return res.status(401).send({message:'Invlaid token !!'});
    // } catch (error) {
    //     return res.status(401).send({message:'Invlaid token !!'});
    // }

    next();
}
module.exports = verify;