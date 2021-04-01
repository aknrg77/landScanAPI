const Vector = require('../models/vector');

const vectorExist = async (req,res,next) => {
    let vector;
    let id = req.params.vectorUid;
    try{
        vector = await Vector.findOne({uid:id});
    }catch(error){
        return res.status(500).json({"Message" : error.message});
    }

    if(!vector){
        return res.status(404).json({"Message" : "Vector Not found"});
    }
    res.locals.vector = vector;

    return next();

}

module.exports = {
    vectorExist
}