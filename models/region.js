const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
        
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
    location:{
        type: {
            type: String
        },
        geometry: {
            type: {
                type:String
            },
            coordinates: [Number]
        }
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
});

regionSchema.index({ location: '2dsphere' });

regionSchema.pre('findOne',function(next){
    this.populate("owner");
    next();
});

module.exports = mongoose.model("region",regionSchema);





