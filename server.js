//Base setup
//=======================================================================
//I just love this comment design 


//call the needed packages
var mongoose = require('mongoose'); // calls mongoose
mongoose.connect('mongodb://Jamesjay:James    1@ds161016.mlab.com:61016/firstdb');

var express = require('express');	 //calls express
var app = express();				 // define app using express					
var bodyParser = require('body-parser');

var Bear = require('./app/models/bear');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;		//set the port to be used


//ROUTES for the api
//=======================================================================================
var router = express.Router();				//get an instance of express router

//middleware to use for all requests
router.use(function(req, res, next){
	//do logging
	console.log('Something is happening');
	next();  //make sure we go to the next route and don't stop there
});
//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res){
	res.json({message: 'hooray! welcome to James api!'});
});

// more routes for our api will happen here

//register our routes ----------------------------------------------------------------
//all of our routes will be prefixed with /api
app.use('/api', router);

//Start the server
//====================================================================================
app.listen(port);
console.log('Magic happens on port '+ port);