var readInput = require('../util.js').readInput;

var getArea = function (l, w, h) {
  return 2*l*w + 2*w*h + 2*h*l;
}

var getSmallestSide = function (l, w, h) {
  var sides = [l*w, h*l, w*h];
  var smallestSide = sides[0];
  for (var i = 1; i < sides.length; i++) {
    if (sides[i] < smallestSide) {
      smallestSide = sides[i];
    }
  }
  return smallestSide;
}

var getRibbonLength = function (l, w, h) {
  var perimeters = [l+l+w+w, w+w+h+h, h+h+l+l];
  var shortestPerimeter = perimeters[0];
  for (var i = 1; i < perimeters.length; i++) {
    if (perimeters[i] < shortestPerimeter) {
      shortestPerimeter = perimeters[i];
    }
  }
  return shortestPerimeter;
}

var getBowLength = function (l, w, h) {
  return l * w * h;
}

var parseBox = function (boxString) {
  var b = boxString.split('x');
  for (var i = 0; i < b.length; i++) {
    b[i] = parseInt(b[i]);
  }
  return b;
}

exports.measure = function (boxes) {
  var totals = {
    paper: 0,
    ribbon: 0
  };

  for (var i = 0; i < boxes.length; i++) {
    var box = parseBox(boxes[i]);
    if (box.length != 3) {
      continue;
    }
    var area = getArea.apply(this, box);
    var smallestSide = getSmallestSide.apply(this, box);

    var ribbonLength = getRibbonLength.apply(this, box);
    var bowLength = getBowLength.apply(this, box);

    totals.paper += area + smallestSide;
    totals.ribbon += ribbonLength + bowLength;
  }
  return totals;
}

exports.run = function () {
  var boxes = readInput(__dirname).split('\n');

  var totals = exports.measure(boxes);
  console.log("Total Paper Required:", totals.paper + " square feet");
  console.log("Total Ribbon Required:", totals.ribbon + " feet");
}
