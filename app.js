const express = require('express');
const routes = require('./routes/api');
const app = express();
const bodyParser= require("body-parser");
//connecting to database 
const db = require('./config/mongoose');
app.use(bodyParser.urlencoded({
	extended: true
 }));

app.use(bodyParser.json());

app.use('/api',routes);

app.listen(process.env.port|| 3000, () =>{
	console.log('server listening on port 3000');
});