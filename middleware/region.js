const Region = require('../models/region');

const regionExist = async (req,res,next) => {
    let region;
    let id = req.params.regionUid;
    try{
        region = await Region.findOne({uid:id});
    }catch(error){
        return res.status(500).json({"Message" : error.message});
    }

    if(!region){
        return res.status(404).json({"Message" : "Region Not found"});
    }
    res.locals.region = region;

    return next();

}

module.exports = {
    regionExist
}