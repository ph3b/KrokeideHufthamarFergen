const expect = require('expect.js')
const MessageParser = require('../../src/Controllers/MessageParser');


describe('MessageParser', function(){

  it('Should extract location krokeide from message', () => {
    let actual = MessageParser.getLocation("Når går neste ferge fra krokeide?")
    let expected = "krokeide";
    expect(actual).to.be.eql(expected)
  })

  it('Should extract location huftamar from message', () => {
    let actual = MessageParser.getLocation("Når går neste ferge fra hufthamar?")
    let expected = "hufthamar";
    expect(actual).to.be.eql(expected)
  })

  it('Shoud get directetion', () => {
    let actual = MessageParser.getDirection("Når går neste ferge fra hufthamar?")
    let expected = "fra";
    expect(actual).to.be.eql(expected)
  })

  it('Shoud get directetion', () => {
    let actual = MessageParser.getDirection("Når går neste ferge til krokeide?")
    let expected = "til";
    expect(actual).to.be.eql(expected)
  })

  it('Should return the correct from-destinations based on message', () => {
    let actual = MessageParser.getStartLocation("Når går neste ferge fra krokeide?")
    let expected = "krokeide"
    expect(actual).to.be.eql(expected)
  })

  it('Should return the correct from-destinations based on message', () => {
    let actual = MessageParser.getStartLocation("Når går neste ferge til krokeide?")
    let expected = "hufthamar"
    expect(actual).to.be.eql(expected)
  })

  it('Should return the correct from-destinations based on message', () => {
    let actual = MessageParser.getStartLocation("Neste ferge til hufthamar???")
    let expected = "krokeide"
    expect(actual).to.be.eql(expected)
  })


})
