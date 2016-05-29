var ferryData = require('./FerryData.json');
var moment = require('moment-timezone')

function checkFerryLocation(ferryLocation){
  if(ferryLocation !== "krokeide" && ferryLocation !== "hufthamar"){
    throw new Error("Ferry location can only be krokeide of huftmar")
  }
}

function getWeekTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  return ferryData[ferryLocation]["week"].map(formatDate)
}

function getSaturdayTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  return ferryData[ferryLocation]["saturday"].map(formatDate)
}

function getSundayTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  return ferryData[ferryLocation]["sunday"].map(formatDate)
}

function formatDate(dateString){
  let dateComponents = dateString.split(":")
  let hours = dateComponents[0]
  let minutes = dateComponents[1]
  let alternativeFerry = dateComponents[2] === "*" ? true : false;
  let ferryDateTime = moment.tz(new Date(), "Europe/Oslo")
  ferryDateTime.hours(hours)
  ferryDateTime.minutes(minutes)
  ferryDateTime.seconds(0)
  ferryDateTime.milliseconds(0)
  return { alternativeFerry, date: ferryDateTime, time: dateToString(ferryDateTime)}
}

function getTimesFor(ferryLocation, date){
  checkFerryLocation(ferryLocation)
  date = date || new Date(); // Default date is today.
  const dayOfTheWeek = date.day()
  if(dayOfTheWeek > 0 && dayOfTheWeek < 6){
    return getWeekTimesFrom(ferryLocation)
  }
  if(dayOfTheWeek === 6){
    return getSaturdayTimesFrom(ferryLocation)
  }
  if(dayOfTheWeek === 0){
    return getSundayTimesFrom(ferryLocation)
  }
  return null
}

function dateToString(date){
  let hours = (date.hours() < 10) ? "0" + date.hours() : date.hours()
  let minutes = (date.minutes() < 10) ? "0" + date.minutes() : date.minutes()
  return `${hours}:${minutes}`
}

function getNNextFerriesFrom(ferryLocation, date, n){
  checkFerryLocation(ferryLocation)
  date = date || new Date()
  let ferryTimesForDay = getTimesFor(ferryLocation, date)
  let nextFerryTimes = ferryTimesForDay.filter(ferryTime => {
    // Only keep times that are later than date.
    let adjustedDate = moment.tz(ferryTime.date, "Europe/Oslo")
    adjustedDate.year(date.year())
    adjustedDate.month(date.month())
    adjustedDate.date(date.date())
    return adjustedDate.valueOf()  > date.valueOf()
  }).sort((a, b) => {
    // Sort the dates with the earliest first.
    return a.date.valueOf() - b.date.valueOf()
  })
  if(n > 1){
    let timesArray = [];
    for(var i = 0; i < n; i++){
      timesArray.push(nextFerryTimes[i])
    }
    return timesArray
  }
  return nextFerryTimes[0]
}

function getNextFerryFrom(ferryLocation, date){
  checkFerryLocation(ferryLocation)
  return getNNextFerriesFrom(ferryLocation, date, 1)
}

exports.getWeekTimesFrom = getWeekTimesFrom;
exports.getSaturdayTimesFrom = getSaturdayTimesFrom;
exports.getSundayTimesFrom = getSundayTimesFrom;
exports.getTimesFor = getTimesFor;
exports.getNextFerryFrom = getNextFerryFrom;
exports.getNNextFerriesFrom = getNNextFerriesFrom;
