const mongoose = require('mongoose');
const geoJson = require('geojson');

const regionSchema = new mongoose.Schema({
    type :{
        type: String
     },
    geometry : {
        type : {
            type: String,
        },
        coordinates : [
            {
            type: Number
            }
        ]
    },
    properties : {
        name :{
            type : String
        },
        desc : {
            type : String
        }
    }

});
//geoJson.parse(regionSchema.location,{Point:['lat','lng']});
var Region = mongoose.model('Region',regionSchema);
module.exports = Region;
