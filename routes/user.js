const express = require('express');
const routes = express.Router();
const {createUser,loginUser} = require('../controller/user');
const {validateBody} = require('../middleware/user');

routes.post('/signup',validateBody,createUser);

routes.post('/login',validateBody,loginUser);


module.exports = routes;
