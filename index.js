var zeroPadInt = function (i) {
  if (i < 10) {
    return "0" +i;
  }
  return i;
}

var run = function (day) {
  var dayModule = require('./day' + zeroPadInt(day));
    if (dayModule) {
      console.log('------------------- Day ' + day + ' -------------------');
      dayModule.run();
    }
}

var runAll = function () {
  for (var d = 1; d <= 6; d++) {
    run(d);
  }
}

if (process.argv[2]) {
  var day = process.argv[2];
  run(day);
} else {
  runAll();
}