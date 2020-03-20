const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/region')
.then( () =>{ console.log('connected to DB');
	
}).catch(err =>{
	console.log('ERROR', err.message);
});