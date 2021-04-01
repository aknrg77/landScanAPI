const express = require('express');
const routes = express.Router();
const region = require('./region');
const user = require('./user');
const {setUser} = require('../middleware/user');


routes.get('/',(req,res)=>{
    res.send("hello india");
})

routes.use('/region',setUser,region);

routes.use('/user',user);


module.exports = routes;
