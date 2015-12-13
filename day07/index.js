var readInput = require('../util.js').readInput;

var expressions = {
  input: new RegExp(/(.*) -> ([a-z]{1,2})/),
  operation: new RegExp(/(?:([a-z]{1,2})|(\d+)) (AND|OR|RSHIFT|LSHIFT) (?:([a-z]{1,2})|(\d+))/),
  not: new RegExp(/(NOT) (?:([a-z]{1,2})|(\d+))/),
  set: new RegExp(/(?:([a-z]{1,2})|(\d+))/)
}

var parseInstruction = function (string) {
  var instructionMatches = expressions.input.exec(string);
  var source = instructionMatches[1];
  var wireId = instructionMatches[2];

  if (expressions.operation.test(source)) {
    var operationMatches = expressions.operation.exec(source);
    var operation = {
      type: operationMatches[3],
    };

    if (operationMatches[2]) {
      operation.left = {
        isWire: false,
        value: parseInt(operationMatches[2]) & 0xFFFF
      };
    } else {
      operation.left = {
        isWire: true,
        value: operationMatches[1]
      };
    }

    if (operationMatches[5]) {
      operation.right = {
        isWire: false,
        value: parseInt(operationMatches[5]) & 0xFFFF
      };
    } else {
      operation.right = {
        isWire: true,
        value: operationMatches[4]
      };
    }

    return [wireId, operation];
  } else if (expressions.not.test(source)) {
    var notMatches = expressions.not.exec(source);
    if (notMatches[3]) {
      return [wireId, {
        type: 'NOT',
        isWire: false,
        value: parseInt(notMatches[3]) & 0xFFFF
      }];
    } else {
      return [wireId, {
        type: 'NOT',
        isWire: true,
        value: notMatches[2]
      }];
    }
  } else if (expressions.set.test(source)) {
    var setMatches = expressions.set.exec(source);
    if (setMatches[2]) {
      return [wireId, {
        type: 'SET',
        isWire: false,
        value: parseInt(setMatches[2]) & 0xFFFF
      }];
    } else {
      return [wireId, {
        type: 'SET',
        isWire: true,
        value: setMatches[1]
      }];
    }
  } 
}

var trace = function (wireId, circuitBoard, memory) {
  if (memory.hasOwnProperty(wireId) && parseInt(memory[wireId])) {
    return memory[wireId];
  }

  var instruction = circuitBoard[wireId];
  var value = 0;
  switch (instruction.type) {
    case 'SET':
      if (instruction.isWire) {
        value = trace(instruction.value, circuitBoard, memory);
      } else {
        value = instruction.value;
      }
      break;
    case 'NOT':
      if (instruction.isWire) {
        value = ~trace(instruction.value, circuitBoard, memory);
      } else {
        value = ~instruction.value;
      }
      break;
    case 'AND':
    case 'OR':
    case 'RSHIFT':
    case 'LSHIFT':
      var left, right;
      if (instruction.left.isWire) {
        left = trace(instruction.left.value, circuitBoard, memory);
      } else {
        left = instruction.left.value;
      }
      if (instruction.right.isWire) {
        right = trace(instruction.right.value, circuitBoard, memory);
      } else {
        right = instruction.right.value;
      }

      switch (instruction.type) {
        case 'AND':
          value = left & right;
          break;
        case 'OR':
          value = left | right;
          break;
        case 'RSHIFT':
          value = left >> right;
          break;
        case 'LSHIFT':
          value = left << right;
          break;
      }
      break;
  }
  memory[wireId] = value & 0xFFFF;
  return memory[wireId];
}

var renderCircuitBoard = function (instructions) {
  var circuitBoard = {};
  
  for (var i = 0; i < instructions.length; i++) {
    var instruction = parseInstruction(instructions[i]);
    circuitBoard[instruction[0]] = instruction[1];
  }

  return circuitBoard;
}

var executeCircuit = function (circuitBoard) {
  var memory = {};

  for (var wireId in circuitBoard) {
    memory[wireId] = trace(wireId, circuitBoard, memory);
  }
  return memory;
}

var setWireValue = function (wireId, newValue, circuitBoard) {
  circuitBoard[wireId] = {
    type: 'SET',
    isWire: false,
    value: newValue
  }
}

exports.run = function () {
  var instructions = readInput(__dirname).split('\n');
  var circuitBoard = renderCircuitBoard(instructions);

  var result = executeCircuit(circuitBoard);
  console.log("First signal value for wire a:", result['a']);

  setWireValue('b', result['a'], circuitBoard);

  result = executeCircuit(circuitBoard);
  console.log("Second signal value for wire a:", result['a']);

}
