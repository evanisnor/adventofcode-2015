var readInput = require('../util.js').readInput;

var takeDirection = function (direction) {
  if (direction === '(') {
    return 1;
  } else if (direction === ')') {
    return -1;
  }
}

exports.traverseBuilding = function (directions) {
  var floor = 0;
  for (var i = 0; i < directions.length; i++) {
    floor += takeDirection(directions[i]);
  }
  return floor;
}

exports.findBasement = function (directions) {
  var floor = 0;
  for (var i = 0; i < directions.length; i++) {
    floor += takeDirection(directions[i]);
    if (floor === -1) {
      return i + 1; // Position is 1-based.
    }
  }
}

exports.run = function () {
  var directions = readInput(__dirname);
  console.log('Santa ends up on floor', exports.traverseBuilding(directions));
  console.log('Santa enters the basement at position', exports.findBasement(directions));
}
