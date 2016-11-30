
[![rucksack.js](http://i.imgur.com/hSPcrjC.png)](#)

# `$ rucksack.js`

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/rucksack.js.svg)](https://www.npmjs.com/package/rucksack.js) [![Downloads](https://img.shields.io/npm/dt/rucksack.js.svg)](https://www.npmjs.com/package/rucksack.js) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Bundle js files by replacing the require calls in-place.


**Note:** The current version is not really production ready.
It does work for my use-cases, but it should be improved by
parsing the real tree. Check out the `falafel` branch.
Contributions in this direction are really welcome! :sparkling_heart:


## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g rucksack.js
```


Then, run `rucksack --help` and see what the CLI tool can do.


```
$ rucksack --help
Usage: rucksack.js [options]

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

## :clipboard: Example


Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save rucksack.js
```



```js
const rucksack = require("rucksack.js");

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

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png


[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit

[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
