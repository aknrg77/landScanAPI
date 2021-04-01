const shortid = require('shortid');
const Vector = require('../models/vector');
const {classIdFilter} = require('../helper/vectorHelper');

const createVector = async (req,res) =>{
    const vector = new Vector();
    vector.uid = shortid.generate();
    vector.name = req.body.name;
    vector.desciption = req.body.desciption;
    vector.classId = req.body.classId;
    vector.className = classIdFilter(req.body.classId);
    vector.polygon = req.body.polygon;
    vector.region = res.locals.region;
    vector.owner = req.user;
    try{
        await vector.save();
    }catch(error){
        return res.status(500).json({"Message" : error.message});
    }
    return res.status(201).json({vector});
}

const updateVector = async (req,res) =>{

    res.locals.vector.name = req.body.name ? req.body.name : res.locals.vector.name;
    res.locals.vector.desciption = req.body.desciption ? req.body.desciption : res.locals.vector.desciption;
    res.locals.vector.polygon= req.body.polygon ? req.body.polygon : res.locals.vector.polygon ;
    res.locals.vector.classId= req.body.classId ? req.body.classId : res.locals.vector.classId ;

    try{
        await res.locals.vector.save();
    }
    catch(error){
        return res.status(500).json({"Message" : error.message});
    }
    return res.status(201).json(res.locals.vector);

}

module.exports = {
    createVector,
    updateVector
}