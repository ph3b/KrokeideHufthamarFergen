const restify = require('restify')
const starwars = require('starwars')
const app = restify.createServer();
const Message = require('./Controllers/Message')

app.use(restify.acceptParser(app.acceptable));
app.use(restify.bodyParser())
app.use(restify.queryParser())
app.use(restify.gzipResponse());

app.get('/', (req, res) => res.status(200, "MOM, IM ON A CLOUD!"))

app.get('/webhooks', (req, res) => {
	console.log(req.query)
	if(req.query['hub.verify_token'] === "muchsecret"){
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong validation token')
})

app.post('/webhooks', (req, res, next) => {
	let event = Message.parseMessage(req);
	if(event.sender && event.text){
		const randomStarwarsQuote = starwars()
		Message.sendMessageTo(event.sender, randomStarwarsQuote)
		.then(() => {
			res.send(200, null)
		})
		.catch((error) => {
			console.log(error)
		})
	} else {
		res.send(200, null)
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
