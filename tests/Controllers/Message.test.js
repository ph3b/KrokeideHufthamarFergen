const message = require('../../src/Controllers/Message');
const expect = require('expect.js')
const mockPayload = require('../MockFacebookMessagePayload.json')
const sinon = require('sinon');
const axios = require('axios');

describe('Message Controller', () => {

  it('parseMessage() should return user_id and text', () => {
    let request = {
      "body" : {
        "object":"page",
        "entry":[
          {
            "id":"727108284097435",
            "time":1463925395237,
            "messaging": [
              {
                "sender": {
                  "id":"USER_ID"
                },
                "recipient": {
                  "id":"727108284097435"
                },
                "message": {
                  "mids": ["mid.1463924345868:93409b5d6193b7c492"],
                  "watermark":1463924345924,
                  "seq":193,
                  "text": "hello"
                }
              }
            ]}
          ]}
      }

    let actual = message.parseMessage(request)
    let expected = { sender: "USER_ID", text: "hello" }
    expect(actual).to.be.eql(expected)
  })

  it('sendMessageTo() should send post to fb api', () => {
    let payload = {
      recipient: "somefacebookid",
      text: "sometext"
    }
    const axiosStub = sinon.stub(axios, 'post', () => {
      return Promise.resolve()
    })
    return message.sendMessageTo(payload.recipient, payload.text)
      .then(() => {
        axiosStub.restore();
        const actualArgument1 = axiosStub.getCall(0).args[1]
        expect(actualArgument1).to.be.eql(
          {
            recipient: {
              id: 'somefacebookid'
            },
            message: {
              text: 'sometext'
            }
          })
      })
  })

})
