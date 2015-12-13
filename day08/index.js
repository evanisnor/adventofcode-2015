var readInput = require('../util.js').readInput;

var expressions = {
  quoted: /\"(.*)\"/,
  encoded: /(\\[^x])|(?:\\x([0-9a-fA-F]{2}))/g,
  unencoded: /("|\\)/g
}

var decode = function (string) {
  var unquotedString = expressions.quoted.exec(string)[1];
  return unquotedString.replace(expressions.encoded, function (match, p1, p2) {
    if (p1) {
      return p1.substring(1);
    } else if (p2) {
      return String.fromCharCode(parseInt(p2, 16));
    }
  });
}

var encode = function (string) {
  return '"' + string.replace(expressions.unencoded, function (match, p1) {
    return "\\" + match;
  }) + '"';
}

var getStringStats = function (strings) {
  var stats = {
    originalLength: 0,
    decodedLength: 0,
    encodedLength: 0
  }

  for (var i = 0; i < strings.length; i++) {
    stats.originalLength += strings[i].length;
    stats.decodedLength += decode(strings[i]).length;
    stats.encodedLength += encode(strings[i]).length;
  }

  return stats;
}

exports.run = function () {
  var strings = readInput(__dirname).split('\n');
  var stats = getStringStats(strings);
  console.log("In code length minus in memory length:", stats.originalLength - stats.decodedLength);
  console.log("Encoded length minus in code length:", stats.encodedLength - stats.originalLength);
}