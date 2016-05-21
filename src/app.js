var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || process.env.port;

// Set up express app
var HandleMessageController = require('./Routes/HandleMessageController');
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.send("MOM, IM ON A CLOUD!")
})

app.get('/webhooks', function(req, res){
	if(req.query['hub.verify_token'] === "muchsecret"){
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong validation token')
})

app.post('/webhooks', HandleMessageController)

app.listen(port, function(){
	console.log("Running on " + port)
})
