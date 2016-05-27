const axios = require('axios')
const app_token = "EAASB2AZAcnz4BAKHQBEV3yJ5cmwSZBkCuEwJbJP2M6VqCumxlR84hvn8pNDsvH0EnCXq4ChZCr2FPDwuSvXyESTLeBWHTPZBcrrKTZAO14J4sX7Iwul7Yofce31ykpWT3GSAmswLR0ltPdVJxhk8HamSD6vC3RAlMxhEIBcZByHQZDZD"

exports.parseMessage = function parseMessage(req){
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      return { sender, text }
    }
  }
  return {sender: null, text: null}
}

exports.sendMessageTo = function sendMessageTo(recipient, text){
  return new Promise((resolve, reject) => {
    messageData = {
      text:text
    }
  	axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${app_token}`,{
  			recipient: { id: recipient},
  			message: messageData,
  		})
  		.then(res => {
  			resolve()
  	})
    .catch(error => {
      reject(error)
    })
  })
}
