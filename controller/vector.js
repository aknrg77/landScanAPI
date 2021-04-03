const shortid = require('shortid');
const Vector = require('../models/vector');
const Region = require('../models/region')
const {classIdFilter} = require('../helper/vectorHelper');
const {Buffer} = require('buffer');
const {parseAreaVectors,parsePerimeterVectors} = require('../helper/parseVectors');

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

const deleteVector = async (req,res) => {
    
    if(res.locals.vector.owner.uid == req.user.uid){
        try{
        await Vector.deleteOne({uid:res.locals.vector.uid});
        }catch(error){
            return res.status(500).json({"Message" : error.message});
        }
    }else{
        return res.status(401).json({"Message" : "Unauthorized!!!"});
    }
    return res.status(203).send();

}

const getVector = async (req,res) =>{

    let classNameFilter = [];
    if(req.query.className){
        classNameFilter = [{'className' : {$eq : req.query.className}}]
    }
    
    let vectorFilter = [];
    if(req.query.uid){
    vectorFilter = [{'uid' : {$eq : req.query.uid}}]
    }

    let ownerFilter = [];
    if(req.query.ownerUid){
        ownerFilter = [{'owner.uid' : {$eq : req.query.ownerUid}}]
    }

    let regionFilter = [];
    if(req.query.regionUid){
        regionFilter = [{'region.uid' : {$eq : req.query.regionUid}}]
    }
    let all = [{'uid': {$ne : null}}];
    let result;

    let polygonStage = [];
    if(req.query.polygon){
       let buf = JSON.parse(Buffer.from(req.query.polygon,'base64').toString('utf8'));

       polygonStage =  [{
                "region.location.geometry" : {
                    $geoWithin : {
                        $geometry : buf.geometry
                }
            }
        }]
    }


    try{
        result = await Vector.aggregate(
            [
                
                {
                    $lookup : {
                        from : 'regions',
                        localField : 'region',
                        foreignField : '_id',
                        as : 'region'
                    }
                },
                {
                    $unwind :'$region'
                },
                {
                    $lookup : {
                        from : 'users',
                        localField : 'owner',
                        foreignField : '_id',
                        as : 'owner'
                    }
                },
                {
                    $unwind :'$owner'
                },
                
                {
                    $match : {
                        $and : [
                            ...polygonStage,
                            ...all,
                            ...ownerFilter,
                            ...regionFilter,
                            ...vectorFilter,
                            ...classNameFilter
                        ]
                    }
                }
            ]
        )


       

    }catch(error){
        console.log(error);
        return res.status(500).json({"Message" : error.message});
    }
    if(req.query.area){
        parseAreaVectors(result);
    }
    if(req.query.area){
        parsePerimeterVectors(result);
    }
   

    return res.status(200).json({result});

}

module.exports = {
    createVector,
    updateVector,
    deleteVector,
    getVector
}