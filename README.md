
[![rucksack.js](http://i.imgur.com/hSPcrjC.png)](#)

# `$ rucksack.js`

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/rucksack.js.svg)](https://www.npmjs.com/package/rucksack.js) [![Downloads](https://img.shields.io/npm/dt/rucksack.js.svg)](https://www.npmjs.com/package/rucksack.js)

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


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
