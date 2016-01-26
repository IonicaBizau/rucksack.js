[![rucksack](http://i.imgur.com/hSPcrjC.png)](#)

# `$ rucksack` [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/rucksack.svg)](https://www.npmjs.com/package/rucksack) [![Downloads](https://img.shields.io/npm/dt/rucksack.svg)](https://www.npmjs.com/package/rucksack) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Bundle js files by replacing the require calls in-place.

**Note:** The current version is not really production ready.
It does work for my use-cases, but it should be improved by
parsing the real tree. Check out the `falafel` branch.
Contributions in this direction are really welcome! :sparkling_heart:

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g rucksack
```

Then, run `rucksack --help` and see what the CLI tool can do.

```sh
$ rucksack --help
Usage: rucksack [options]

Options:
  -p, --path <path>               Sets the input js file path.                     
  -g, --global <global-variable>  Global variable name (it will be created when the
                                  commonjs environment will not be available)      
  -o, --output <path>             Specify an output file where to write the bundle 
                                  code.                                            
  -h, --help                      Displays this help.                              
  -v, --version                   Displays version information.                    

Examples:
  rucksack -p input.js
  rucksack -p input.js -o bundle.js
  rucksack -p input.js -o bundle.js -g LibraryName

Documentation can be found at https://github.com/IonicaBizau/rucksack#readme
```

## Example

Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save rucksack
```

```js
const rucksack = require("rucksack");

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
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md