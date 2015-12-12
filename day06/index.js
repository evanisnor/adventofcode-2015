var readInput = require('../util.js').readInput;

var parseInstruction = function (string) {
  var matches = string.match(/(turn off|turn on|toggle) (\d+),(\d+) through (\d+),(\d+)/);
  return {
    command: matches[1],
    start: {
      x: parseInt(matches[2]),
      y: parseInt(matches[3])
    },
    end: {
      x: parseInt(matches[4]),
      y: parseInt(matches[5])
    }
  }
}

var initializeBinaryLights = function (width, height) {
  var lights = [];
  for (var x = 0; x < width; x++) {
    lights.push([]);
    for (var y = 0; y < height; y++) {
      lights[x].push(false); // Lights are OFF by default.
    }
  }
  return lights;
}

var initializeVariableLights = function (width, height) {
  var lights = [];
  for (var x = 0; x < width; x++) {
    lights.push([]);
    for (var y = 0; y < height; y++) {
      lights[x].push(0); // Lights are 0 brightness by default.
    }
  }
  return lights;
}

var applyBinaryInstruction = function (lights, instruction) {
  for (var x = instruction.start.x; x <= instruction.end.x; x++) {
    for (var y = instruction.start.y; y <= instruction.end.y; y++) {
      switch (instruction.command) {
        case 'turn on':
          lights[x][y] = true;
          break;
        case 'turn off':
          lights[x][y] = false;
          break;
        case 'toggle':
          lights[x][y] = !lights[x][y];
          break;
      }
    }
  }
}

var applyBrightnessInstruction = function (lights, instruction) {
  for (var x = instruction.start.x; x <= instruction.end.x; x++) {
    for (var y = instruction.start.y; y <= instruction.end.y; y++) {
      switch (instruction.command) {
        case 'turn on':
          lights[x][y]++;
          break;
        case 'turn off':
          var brightness = lights[x][y];
          lights[x][y] = brightness > 0 ? --brightness : 0;
          break;
        case 'toggle':
          lights[x][y] += 2;
          break;
      }
    }
  }
}

var deckTheHalls = function (instructions) {
  var binaryLights = initializeBinaryLights(1000, 1000);
  var variableLights = initializeVariableLights(1000, 1000);

  for (var i = 0; i < instructions.length; i++) {
    var instruction = parseInstruction(instructions[i]);
    applyBinaryInstruction(binaryLights, instruction);
    applyBrightnessInstruction(variableLights, instruction);
  }

  return {
    binary: binaryLights,
    variable: variableLights
  };
}

var countLightsOn = function (lights) {
  var lightsOn = 0;
  for (var x = 0; x < lights.length; x++) {
    for (var y = 0; y < lights[x].length; y++) {
      if (lights[x][y]) {
        lightsOn++;
      }
    }
  }
  return lightsOn;
}

var measureTotalBrightness = function (lights) {
  var brightness = 0;
  for (var x = 0; x < lights.length; x++) {
    for (var y = 0; y < lights[x].length; y++) {
        brightness += lights[x][y];
    }
  }
  return brightness;
}

exports.run = function () {
  var instructions = readInput(__dirname).split('\n');
  var lights = deckTheHalls(instructions);
  console.log("Lights that are on:", countLightsOn(lights.binary));
  console.log("Total brightness:", measureTotalBrightness(lights.variable));
}