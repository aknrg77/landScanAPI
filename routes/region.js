const express = require('express');
const routes = express.Router();
const {create,update,deleteRegion,getRegion} = require('../controller/region');
const {regionExist} = require('../middleware/region');
const {vectorExist} = require('../middleware/vector');
const {createVector,updateVector} = require('../controller/vector');

routes.post('/',create);
routes.patch('/:regionUid',regionExist,update);
routes.delete('/:regionUid',regionExist,deleteRegion);
routes.get('/',getRegion);
routes.get('/:regionUid',regionExist,getRegion);

routes.post('/:regionUid/vectors',regionExist,createVector);
routes.patch('/:regionUid/vectors/:vectorUid',regionExist,vectorExist,updateVector);

//routes.patch('/:regionUid',regionExist,update);
//routes.delete('/:regionUid',regionExist,deleteRegion);
// routes.get('/vectors',getRegion);
// routes.get('/vectors/:vectorUid',regionExist,getRegion);




module.exports = routes;
