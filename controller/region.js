const shortid = require('shortid');
const Region = require('../models/region');

const create = async (req,res) =>{
    const region = new Region();
    region.uid = shortid.generate();
    region.name = req.body.name;
    region.desciption = req.body.desciption;
    region.location = req.body.location;
    region.owner = req.user;

    try{
        await region.save();
    }catch(error){
        return res.status(500).json({"Message" : error.message});
    }
    return res.status(201).json({region});
}

const update = async (req,res) =>{

    res.locals.region.name = req.body.name ? req.body.name : res.locals.region.name;
    res.locals.region.desciption = req.body.desciption ? req.body.desciption : res.locals.region.desciption;
    res.locals.region.location= req.body.location ? req.body.location : res.locals.region.location ;

    try{
        await res.locals.region.save();
    }
    catch(error){
        return res.status(500).json({"Message" : error.message});
    }
    return res.status(201).json(res.locals.region);

}

const deleteRegion = async (req,res) => {
    
    if(res.locals.region.owner.uid == req.user.uid){
        try{
        await Region.deleteOne({uid:res.locals.region.uid});
        }catch(error){
            return res.status(500).json({"Message" : error.message});
        }
    }else{
        return res.status(401).json({"Message" : "Unauthorized!!!"});
    }
    return res.status(203).send();

}

const getRegion = async (req,res) => {
    
    
    let regionFilters = [];

    if(req.query.regionUid){
        regionFilters = [{'uid' : {$eq : req.query.regionUid}}];
    }
    let ownerFilters = [];

    if(req.query.ownerUid){
        ownerFilters = [{'owner.uid' : {$eq : req.query.ownerUid}}];
    }
    let result;
    let all = [{'uid' : {$ne : null}}];
    try{
        result = await Region.aggregate([
            {
                $lookup:
                {
                    from : 'users',
                    localField : 'owner',
                    foreignField : '_id',
                    as : 'owner'
                },    
            },
            {
                $unwind:
                {
                    path :'$owner'
                }
            },
            {
                
                $match:
                {
                    $and : [...regionFilters, ...ownerFilters,...all]

                }
            }
        ])
        
    }
    catch(error){
        return res.status(500).json({"Message" : error.message});
    }
    
    if(req.params.regionUid){
        return res.status(200).json(res.locals.region);
    }else{
        return res.status(200).json({result});
    }
    

}

module.exports = {
    create,
    update,
    deleteRegion,
    getRegion
}




