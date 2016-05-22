var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var starwars = require('starwars')
app.use(bodyParser.json())
var Message = require('./Controllers/Message')

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
		if(event.sender && event.text){
			Message.sendMessageTo(event.sender, starwars())
			.then(() => {
				res.sendStatus(200)
			})
			.catch((error) => {
			})
		} else {
			res.sendStatus(200)
		}
})

module.exports = {
  server: null,
  start: function(port, cb){
    this.server = app.listen(port, () => {
      if(typeof(cb) === typeof(Function)) cb(port);
    });
  },
  stop: function(cb){
    if(this.server){
      this.server.close(() => {
        if(typeof(cb) === typeof(Function)) cb();
      });
    }
  }
};
