const express = require('express');
const jwt = require('jsonwebtoken');

const isAdmin = async(req,res,next) => {
    const token = req.headers['token'];
    // console.log('jwt token',token);
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
        });
  
    try {
        const verified = jwt.verify(token, jwtSecretKey);
        if(!verified){
            return res.send("Successfully Verified");
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
    next();
}
module.exports = isAdmin;