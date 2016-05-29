var FerryController = require('./FerryController');
var MessageParser = require('./MessageParser')

function askForTime(message, date){
  let startLocation = MessageParser.getStartLocation(message)
  let endLocation = MessageParser.getEndLocation(message)
  let direction = MessageParser.getDirection(message)
  let answer = "";
  if(startLocation && endLocation && direction){
    let nextFerryTime = FerryController.getNextFerryFrom(startLocation, date)
    if(direction === "fra"){
      answer = `Neste ferge går fra ${startLocation} klokken ${nextFerryTime.time}`;
    }
    if(direction === "til"){
      answer = `Neste ferge går til ${endLocation} fra ${startLocation} klokken ${nextFerryTime.time}`;
    }
    return answer;
  }
  answer = "Jeg forstår ikke hva du mener!"
  return answer;
}

exports.askForTime = askForTime;
