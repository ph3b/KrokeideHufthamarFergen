var FerryController = require('../../src/Controllers/FerryController');
var expect = require('expect.js')

describe('Ferry Controller', function(){
  it('Should give all ferry times from krokeide on a regular week', () => {
    expect(FerryController.getWeekTimesFrom("krokeide").length).to.be.eql(18)
  })

  it('Should give all ferry times from krokeide on a saturday', () => {
    expect(FerryController.getSaturdayTimesFrom("krokeide").length).to.be.eql(13)
  })

  it('Should give all ferry times from krokeide on a sunday', () => {
    expect(FerryController.getSundayTimesFrom("krokeide").length).to.be.eql(17)
  })

  it('Should give all ferry times from hufthamar on a regular week', () => {
    expect(FerryController.getWeekTimesFrom("hufthamar").length).to.be.eql(19)
  })

  it('Should give all ferry times from hufthamar on a day during the week', () => {
    let monday = new Date(2016, 4, 23) // Monday 23. of May
    let actual = FerryController.getWeekTimesFrom("krokeide")
    expect(FerryController.getTimesFor("krokeide", monday)).to.be.eql(actual)
  })

  it('Should give all ferry times from hufthamar on a saturday', () => {
    let saturday = new Date(2016, 4, 28, 17, 0) // Saturday 28. of May
    let actual = FerryController.getSaturdayTimesFrom("krokeide")
    expect(FerryController.getTimesFor("krokeide", saturday)).to.be.eql(actual)
  })

  it('Should give all ferry times from hufthamar on a saturday', () => {
    let saturday = new Date(2016, 4, 29, 17, 0) // Sunday 29. of May
    let actual = FerryController.getSundayTimesFrom("krokeide")
    expect(FerryController.getTimesFor("krokeide", saturday)).to.be.eql(actual)
  })

  it("Should give next ferry time on thursday 16:00 from krokeide", () => {
    let time = new Date(2016, 4, 26, 16, 0);
    expect(FerryController.getNextFerryFrom("krokeide", time).time).to.be.eql("16:20")
  })

  it("Should give next ferry time on saturday 14:00 from hufthamar", () => {
    let time = new Date(2016, 4, 28, 14, 0);
    expect(FerryController.getNextFerryFrom("hufthamar", time).time).to.be.eql("14:15")
  })

  it("Should give next ferry time on sunday 22:00 from krokeide", () => {
    let time = new Date(2016, 4, 29, 22, 0);
    expect(FerryController.getNextFerryFrom("krokeide", time).time).to.be.eql("23:20")
  })

  it("Should give next ferry time on tuesday 08:00 from hufthamar", () => {
    let time = new Date(2016, 4, 24, 8, 0);
    expect(FerryController.getNextFerryFrom("hufthamar", time).time).to.be.eql("08:10")
    expect(FerryController.getNextFerryFrom("hufthamar", time).alternativeFerry).to.be.eql(true)
  })

  it("Should give the 3 next ferry times on tuesday 08:00 from hufthamar", () => {
    let time = new Date(2016, 4, 24, 8, 0);
    let actualDateList = FerryController.getNNextFerriesFrom("hufthamar", time, 3);
    let firstDate = actualDateList[0]
    let secondDate = actualDateList[1]
    let thirdDate = actualDateList[2]
    expect(firstDate.date.getHours()).to.be.eql(8)
    expect(firstDate.date.getMinutes()).to.be.eql(10)
    expect(secondDate.date.getHours()).to.be.eql(8)
    expect(secondDate.date.getMinutes()).to.be.eql(55)
    expect(thirdDate.date.getHours()).to.be.eql(10)
    expect(thirdDate.date.getMinutes()).to.be.eql(15)
    expect(actualDateList.length).to.be.eql(3)
  })

})
