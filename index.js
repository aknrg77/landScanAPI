const express = require('express');
require('dotenv').config();
const qs = require('query-string');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const routes = require('./routes/index');



const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req,res,next){
    req.query = qs.parse(req._parsedUrl.query,{parseBooleans: true,parseNumbers:true});
    return next();
});

app.use('/',routes);

app.listen(process.env.PORT,(err)=>{
    console.log(`Server is running on ${process.env.PORT}`);
})
