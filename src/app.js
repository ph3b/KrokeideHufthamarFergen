const restify = require('restify')
const starwars = require('starwars')
const app = restify.createServer();
const Message = require('./Controllers/Message')
const FerryMan = require('./Controllers/FerryMan')
process.env.TZ = 'Europe/Oslo';

app.use(restify.acceptParser(app.acceptable));
app.use(restify.bodyParser())
app.use(restify.queryParser())
app.use(restify.gzipResponse());
var moment = require('moment-timezone')

function convertToMomentTime(date){
  return moment.tz(date, "Europe/Oslo")
}

app.get('/', (req, res) => res.status(200, "MOM, IM ON A CLOUD!"))

app.get('/webhooks', (req, res) => {
	if(req.query.hub.verify_token === "muchsecret"){
		res.send(200, parseInt(req.query.hub.challenge))
	} else {
		res.send(200, 'Error, wrong validation token')
	}
})

app.post('/webhooks', (req, res, next) => {
	let event = Message.parseFacebookMessage(req);
	if(event.sender && event.text){
		const randomStarwarsQuote = starwars()
		const ferryManAnswer = FerryMan.askForTime(event.text, convertToMomentTime(new Date()))
		Message.sendMessageTo(event.sender, ferryManAnswer)
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
