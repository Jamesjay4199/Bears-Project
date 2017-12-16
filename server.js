//Base setup
//=======================================================================
//I just love this comment design 

//call the needed packages
var express = require('express');	 //calls express
var app = express();				 // define app using express					
var bodyParser = require('body-parser');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;		//set the port to be used


//ROUTES for the api
//=======================================================================================
var router = express.Router();				//get an instance of express router

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