const express = require('express');
const routes = express.Router();
const {create,update,deleteRegion,getRegion} = require('../controller/region');
const {regionExist} = require('../middleware/region');

routes.post('/',create);
routes.patch('/:regionUid',regionExist,update);
routes.delete('/:regionUid',regionExist,deleteRegion);
routes.get('/',getRegion);
routes.get('/:regionUid',regionExist,getRegion);

module.exports = routes;
