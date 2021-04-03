const express = require('express');
const routes = express.Router();
const {create,update,deleteRegion,getRegion} = require('../controller/region');
const {regionExist} = require('../middleware/region');
const {vectorExist} = require('../middleware/vector');
const {createVector,updateVector,deleteVector,getVector} = require('../controller/vector');

routes.post('/',create);
routes.patch('/:regionUid',regionExist,update);
routes.delete('/:regionUid',regionExist,deleteRegion);
routes.get('/',getRegion);
routes.get('/vectors',getVector);
routes.get('/:regionUid',regionExist,getRegion);

routes.post('/:regionUid/vectors',regionExist,createVector);
routes.patch('/:regionUid/vectors/:vectorUid',regionExist,vectorExist,updateVector);
routes.delete('/:regionUid/vectors/:vectorUid',regionExist,vectorExist,deleteVector);





module.exports = routes;
