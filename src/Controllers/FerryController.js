var ferryData = require('./FerryData.json');
var moment = require('moment')

function checkFerryLocation(ferryLocation){
  if(ferryLocation !== "krokeide" && ferryLocation !== "hufthamar"){
    throw new Error("Ferry location can only be krokeide of huftmar")
  }
}

function getWeekTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  let dates = ferryData[ferryLocation]["week"];
  dates = dates.map(formatDate)
  return dates
}

function getSaturdayTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  let dates = ferryData[ferryLocation]["saturday"];
  dates = dates.map(formatDate)
  return dates;
}

function getSundayTimesFrom(ferryLocation){
  checkFerryLocation(ferryLocation)
  let dates = ferryData[ferryLocation]["sunday"];
  dates = dates.map(formatDate)
  return dates;
}

function formatDate(dateString){
  let dateComponents = dateString.split(":")
  let hours = dateComponents[0]
  let minutes = dateComponents[1]
  let alternativeFerry = dateComponents[2] === "*" ? true : false;
  return { time: `${hours}:${minutes}`, alternativeFerry }
}

function getTimesFor(ferryLocation, date){
  checkFerryLocation(ferryLocation)
  date = date || new Date(); // Default date is today.
  const dayOfTheWeek = date.getDay()
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
  let hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours()
  let minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()
  return `${hours}:${minutes}`
}

function getNNextFerriesFrom(ferryLocation, date, n){
  checkFerryLocation(ferryLocation)
  date = date || new Date()
  let ferryTimesForDay = getTimesFor(ferryLocation, date)
  let nextFerryTimes = ferryTimesForDay.map((ferryTime) => {
    let ferryTimeString = ferryTime.time
    let hours = parseInt(ferryTimeString.split(":")[0])
    let minutes = parseInt(ferryTimeString.split(":")[1])
    let ferryDateTime = new Date(date.getTime())
    ferryDateTime.setHours(hours)
    ferryDateTime.setMinutes(minutes)
    ferryTime.date = ferryDateTime
    return ferryTime
  }).filter(ferryTime => {
    return ferryTime.date.getTime() > date.getTime()
  }).sort((a, b) => {
    return a.date.getTime() - b.date.getTime()
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
