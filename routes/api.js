const express = require('express');
const app = express();
const router = express.Router();
const geoJson = require('geojson');
const region = require('../models/regionDB');

router.get('/ninja', function(req, res){
	// db = region.find({},function(err,res){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	else{
	// 		//console.log(res);
	// 		var data = [
	// 			{ name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
	// 			{ name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
	// 			{ name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
	// 		  ];
	// 		a = geoJson.parse(data, {Point: ['lat', 'lng']});
	// 		console.log(a.features);

	// 	}
	// });
	res.send(req.body);


})

router.post('/add',function(req,res){
	// //saving the db
	l = geoJson.parse(req.body, {Point: ['lat', 'lng']});
	region.create({
        type:l.type,
        geometry:l.geometry,
		properties:l.properties
    },function(err,newRegion){
        if(err){
            console.log('error in creating new region');
            return;
        }
        console.log('******',newRegion);
        return res.send(newRegion);
	});

	// {
	// 	"type": "Feature",
	// 	"geometry": {
	// 		"type": "Point",
	// 		"coordinates": [
	// 			-75.343,
	// 			39.984
	// 		]
	// 	},
	// 	"properties": {
	// 		"name": "hello",
	// 		"desc": "there"
	// 	}
	// }
	//res.send(l.geometry.coordinates);
	console.log((l.geometry.coordinates[0]));




});

module.exports =router;