var starwars = require('starwars');
var app_token = "EAASB2AZAcnz4BAKHQBEV3yJ5cmwSZBkCuEwJbJP2M6VqCumxlR84hvn8pNDsvH0EnCXq4ChZCr2FPDwuSvXyESTLeBWHTPZBcrrKTZAO14J4sX7Iwul7Yofce31ykpWT3GSAmswLR0ltPdVJxhk8HamSD6vC3RAlMxhEIBcZByHQZDZD"
var axios = require('axios')

function sendTextMessageTo(sender, text){
  messageData = {
    text:text
  }
	axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${app_token}`,{
			recipient: { id: sender},
			message: messageData,
		})
		.then(function(res){
			console.log("Status " + res.status)
	})
}

module.exports = function(req, res){
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log(sender + " " + text)
      sendTextMessageTo(sender, starwars())
    }
  }
  res.sendStatus(200);
}
