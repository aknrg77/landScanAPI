const mongoose = require('mongoose');

const vectorSchema = new mongoose.Schema({
        
    uid:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required:true
        
    },
    desciption:{
        type: String
    },
    classId:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    polygon:{
        type: {
            type: String
        },
        geometry: {
            type: String,
            coordinates: [[[Number]]]
        }
    },
    region:{
        type:mongoose.Schema.ObjectId,
        ref:"region"
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref : "user"
    }

});



module.exports = mongoose.Schema("vector",vectorSchema);





