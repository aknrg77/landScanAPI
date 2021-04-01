const express = require('express');
const routes = express.Router();


routes.get('/',(req,res)=>{
    res.send("hello vector");
})



module.exports = routes;
