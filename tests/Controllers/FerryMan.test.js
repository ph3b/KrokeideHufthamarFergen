var FerryMan = require('../../src/Controllers/FerryMan')
var expect = require('expect.js');
var moment = require('moment-timezone')

function convertToMomentTime(date){
  return moment.tz(date, "Europe/Oslo")
}

describe('FerryMan', () => {

  it('Should tell us when the next ferry leaves from hufthamar', () => {
    const monday = convertToMomentTime(new Date(2016, 04, 23, 12, 0))
    const actual = FerryMan.askForTime("Når går neste ferge fra krokeide?", monday)
    const expected = "Neste ferge går fra krokeide klokken 12:15";
    expect(actual).to.be.eql(expected)
  })

  it('Should tell us when the next ferry leaves from krokeide', () => {
    const monday = convertToMomentTime(new Date(2016, 04, 23, 14, 0))
    const actual = FerryMan.askForTime("Når går neste ferge til hufthamar?", monday)
    const expected = "Neste ferge går til hufthamar fra krokeide klokken 14:10";
    expect(actual).to.be.eql(expected)
  })

})
