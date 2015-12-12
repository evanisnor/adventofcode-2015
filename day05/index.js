var readInput = require('../util.js').readInput;

var isStringNicePart1 = function (string) {
  var badStrings = new RegExp('ab|cd|pq|xy', 'g');
  var atLeastThreeVowels = new RegExp('^(?:[^aeiou]*([aeiou])(?!.*?\1)){3}');
  var lettersThatAppearTwiceInARow = string.match(/(\D)(?=\1)/g);

  return !badStrings.test(string) &&
         atLeastThreeVowels.test(string) &&
         (lettersThatAppearTwiceInARow != null && lettersThatAppearTwiceInARow.length > 0);
}

var isStringNicePart2 = function (string) {
  var repeatingPair = string.match(/([a-zA-Z]{2})[a-zA-Z]*(?=\1)/g);
  var repeatingWithALetterInBetween = string.match(/([a-zA-Z])[a-zA-Z](?=\1)/g);

  return (repeatingPair != null && repeatingPair.length > 0) &&
         (repeatingWithALetterInBetween != null && repeatingWithALetterInBetween.length > 0);
}

var countNiceStrings = function (strings, comparator) {
  var niceStrings = 0;
  for (var i = 0; i < strings.length; i++) {
    if (comparator(strings[i])) {
      niceStrings++;
    }
  }
  return niceStrings;
}

exports.run = function () {
  var strings = readInput(__dirname).split('\n');
  console.log("Number of nice strings in Part 1:", countNiceStrings(strings, isStringNicePart1));
  console.log("Number of nice strings in Part 2:", countNiceStrings(strings, isStringNicePart2));
}