const locations = ["krokeide", "hufthamar"]
const directions = ["til", "fra"]

function getLocation(unformattedString){
  let formattedString = unformattedString.replace(/[^a-zA-Z ]/g, "")
  let predictedLocation = null;
  formattedString.split(" ").forEach((word) => {
    if(locations.indexOf(word) > -1) predictedLocation = word
  })
  return predictedLocation
}

function getDirection(unformattedString){
  let formattedString = unformattedString.replace(/[^a-zA-Z ]/g, "")
  let predictedDirection = null;
  formattedString.split(" ").forEach((word) => {
    if(directions.indexOf(word) > -1) predictedDirection = word;
  })
  return predictedDirection
}

function getStartLocation(message){
  let direction = getDirection(message);
  let location = getLocation(message);
  if(direction && location){
    if(direction === "fra") return location;
    if(direction === "til") return locations.find(loc => loc !== location)
  }
}

function getEndLocation(message){
  let startLocation = getStartLocation(message)
  return locations.find(dir => dir !== startLocation)
}

exports.getLocation = getLocation;
exports.getDirection = getDirection;
exports.getStartLocation = getStartLocation;
exports.getEndLocation = getEndLocation;
