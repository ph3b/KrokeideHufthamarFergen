const expect = require('expect.js')
const sinon = require('sinon')
const axios = require('axios')
const port = 7999
const apiUrl = `http://localhost:${port}`
const App = require('../../src/app')
const fetch = require('node-fetch')

describe('Webhooks API endpoints', function(){
  before((done) => {
    App.start(port, () => {
      done()
    })
  })
  after((done) => {
    App.stop(() => {
      done()
    })
  })

  it('Should respond with 200', () => {
    const mockRequest = require('../MockFacebookMessagePayload.json').body
    const axiosStub = sinon.stub(axios, 'post', () => {
      return Promise.resolve()
    })
    return fetch(apiUrl + '/webhooks', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(mockRequest)
    })
    .then(function(res) {
      const actualArgument1 = axiosStub.getCall(0).args[1]
      expect(actualArgument1.recipient.id).to.be.eql("USER_ID")
      expect(actualArgument1.message.text).to.a('string')
      expect(res.status).to.be.eql(200)
      axiosStub.restore();
    })
  })

  it('Should respond with 200 and the sent hub.challenge', () => {
    const mockRequest = require('../MockFacebookMessagePayload.json').body
    return axios.get(apiUrl + '/webhooks?hub.verify_token=muchsecret&hub.challenge=12345')
    .then(function(res) {
      expect(res.data).to.be.eql(12345)
    })
  })
})
