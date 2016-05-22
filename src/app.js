var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || process.env.port;
var starwars = require('starwars')

// Set up express app
var HandleMessageController = require('./Routes/HandleMessageController');
var Message = require('./Controllers/Message')

app.use(bodyParser.json())

app.get('/', function(req, res){
	res.status(200).send("MOM, IM ON A CLOUD!")
})

app.get('/webhooks', function(req, res){
	if(req.query['hub.verify_token'] === "muchsecret"){
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong validation token')
})

app.post('/webhooks', (req, res) => {
		let event = Message.parseMessage(req);
		Message.sendMessageTo(event.sender, starwars())
		res.sendStatus(200)
})

app.listen(port, function(){
	console.log("Running on " + port)
})
