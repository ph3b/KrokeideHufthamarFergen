var FerryController = require('./FerryController');
var MessageParser = require('./MessageParser')

function askForTime(message, date){
  console.log("This ran")
  let startLocation = MessageParser.getStartLocation(message)
  let endLocation = MessageParser.getEndLocation(message)
  let direction = MessageParser.getDirection(message)
  let nextFerryTime = FerryController.getNextFerryFrom(startLocation, date)
  let answer = "";

  if(direction === "fra"){
    answer = `Neste ferge går fra ${startLocation} klokken ${nextFerryTime.time}`;
  }
  if(direction === "til"){
    answer = `Neste ferge går til ${endLocation} fra ${startLocation} klokken ${nextFerryTime.time}`;
  }
  return answer;
}

exports.askForTime = askForTime;
