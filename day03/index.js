var readInput = require('../util.js').readInput;

var trackLocation = function (houses, point) {
  var key = point.x + ',' + point.y;
  var visits = houses[key];
  if (visits === undefined) {
    visits = 0;
  }
  houses[key] = ++visits;
};

var movePoint = function (point, direction) {
  switch (direction) {
    case '^':
      point.y++;
      break;
    case '>':
      point.x++;
      break;
    case '<':
      point.x--;
      break;
    case 'v':
      point.y--;
      break;
    }
}

exports.traverseMap = function (map) {
  var houses = {};
  var santa = {
    x: 0,
    y: 0
  };

  trackLocation(houses, santa); 
  for (var i = 0; i < map.length; i++) {
    var direction = map[i];
    movePoint(santa, direction);
    trackLocation(houses, santa); 
  }
  
  return Object.keys(houses).length;
};

exports.traverseMapWithRoboSanta = function (map) {
  var houses = {};
  var santa = {
    x: 0,
    y: 0
  };
  var roboSanta = {
    x: 0,
    y: 0
  };

  trackLocation(houses, santa); 
  for (var i = 0; i < map.length; i += 2) {
    movePoint(santa, map[i]);
    trackLocation(houses, santa); 
    movePoint(roboSanta, map[i+1]);
    trackLocation(houses, roboSanta); 
  }
  
  return Object.keys(houses).length;
};

exports.run = function () {
  var map = readInput(__dirname);
  console.log('Houses to receive at least one present:', exports.traverseMap(map));
  console.log('Houses to receive at least one present with RoboSanta\'s help:', exports.traverseMapWithRoboSanta(map));
}
