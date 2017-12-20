//Base setup
//=======================================================================
//I just love this comment design 


//call the needed packages
var mongoose = require('mongoose'); // calls mongoose
mongoose.connect('mongodb://james:james@ds141796.mlab.com:41796/api-bears');
// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("DB connection alive");
});
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

//on routes that end in /bears
//---------------------------------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })

    //get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res){
        Bear.find(function (err, bears) {
            if (err) 
                res.send(err);
            
            res.json(bears);
        });
    });
    
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function (req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function (err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })


    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    //register our routes ----------------------------------------------------------------
//all of our routes will be prefixed with /api
app.use('/api', router);

//Start the server
//====================================================================================
app.listen(port);
console.log('Magic happens on port '+ port);