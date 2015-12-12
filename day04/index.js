var md5 = require('blueimp-md5').md5;
var readInput = require('../util.js').readInput;

var beginsWithLeadingZeros = function (hash, leadingZeros) {
  var re = new RegExp("^0{" + leadingZeros + "}.*")
  return re.test(hash);
}

exports.mine = function (secretKey, leadingZeros) {
  var result = {
    value: 0,
    hash: ''
  };

  while (true) {
    var hash = md5(secretKey + result.value);
    if (beginsWithLeadingZeros(hash, leadingZeros)) {
      result.hash = hash;
      return result;
    }
    result.value++;
  }
}

exports.run = function () {
  var secretKey = readInput(__dirname);

  console.log('Mining for ' + secretKey +' to 5 leading zeroes. This may take a while... ');
  console.log('Advent Coin mining:', exports.mine(secretKey, 5));

  console.log('Mining for ' + secretKey +' to 6 leading zeroes. This may take a while... ');
  console.log('Advent Coin mining:', exports.mine(secretKey, 6));
}
