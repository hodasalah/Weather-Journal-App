// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3000;
// spin up our server
const server = app.listen(port, listening);
function listening(){
	console.log(`running on localhost: ${port}`);
};
// GET route
app.get('/all', sendData);
function sendData (request, response) {
	response.send(projectData);
};
//POST route
app.post('/add', addData);

function addData(req,res){
	console.log(req)
  let newData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }
	projectData={...projectData , newData}
	console.log(projectData);
	return projectData;
} ;