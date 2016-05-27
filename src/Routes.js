module.exports = function(app){
  app.get('/', (req, res) => res.status(200, "MOM, IM ON A CLOUD!"))

  app.get('/webhooks', (req, res) => {
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
}
