const rucksack = require("../lib");

// math.js:
// const sum = require("./sum.js");
// const square = require("./square.js");
//
// module.exports = {
//     sum: sum
//   , square: square
// };

// sum.js:
// module.exports = (a, b) => a + b;

// square.js:
// module.exports = x => x * x;

console.log(rucksack(`${__dirname}/math.js`, "Math"));
// =>
// "use strict";
// (function() {
//     var _rucksackModule = typeof module !== "undefined" ? module : {};
//     const sum = (a, b) => a + b;
//     const square = x => x * x;
//
//     _rucksackModule.exports = {
//         sum: sum,
//         square: square
//     };
//     if (typeof module !== "object")
//         window.Math = _rucksackModule.exports
// })();
