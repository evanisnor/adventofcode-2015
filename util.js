var fs = require('fs');
var path = require('path');

exports.readInput = function (dir) {
  return fs.readFileSync(path.join(dir, 'input'), 'utf8');
}