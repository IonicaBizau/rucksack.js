const fs = require("fs")
    , readFile = require("read-utf8")
    , path = require("path")
    , jsBeautify = require("js-beautify")
    , requireResolve = require("resolve")
    , abs = require("abs")
    ;

function replaceAt(content, what, start, end) {
    return content.substring(0, start) + what + content.substring(end + 1);
}

function replaceRequire(modulePath, content, callback) {

    if (content === undefined) {
        return replaceRequire(modulePath, readFile(modulePath));
    }

    do {
        var req = "require("
          , requireStartIndex = content.indexOf(req)
          ;

        if (requireStartIndex === -1) {
            return content;
        }

        var requireEndIndex = content.indexOf(")", requireStartIndex)
          , requirePath = content.substring(
                requireStartIndex + 9
              , requireEndIndex - 1
            )
          , moduleDir = path.dirname(modulePath)
          ;


          debugger
          module.paths.push(moduleDir + "/node_modules");
          debugger
       // process.env.NODE_PATH = moduleDir;
        requirePath = requireResolve.sync(
            requirePath[0] == "."
                ? path.resolve(moduleDir + "/" + requirePath)
                : requirePath
          , { basedir: moduleDir }
        );
        var modContent = replaceRequire(requirePath);
        modContent = modContent.replace("module.exports = ", "");
        content = replaceAt(content, modContent, requireStartIndex, requireEndIndex);
        content = content.replace(/\n\;/gm, "");
        content = content.replace(/\}\;\n\n?\}\;/gm, "}\n};\n");
    } while (true)
}

/**
 * bundle
 * Bundles the dependencies of the provided file.
 *
 * @name bundle
 * @function
 * @param {String} path The path to the javascript file you want to bundle.
 * @param {String} globalName If provided, when the bundle is not used in a commonjs environment the global variable will be created.
 * @returns {String} The raw bundled js code.
 */
function bundle(path, globalName) {

    if (typeof path !== "string" || !path.length) {
        throw new TypeError("The input file path should be a valid path.");
    }

    path = abs(path);

    var content = jsBeautify(replaceRequire(path))
      , lines = content.split("\n")
      , finalLines = []
      ;

    finalLines.push("\"use strict\";");
    finalLines.push("(function () {");
    finalLines.push("  var _rucksackModule = typeof module !== \"undefined\" ? module : {};");
    lines.forEach(function (c) {
        finalLines.push(c);
    });

    if (globalName) {
        finalLines.push("if (typeof module !== \"object\")");
        finalLines.push(`  window.${globalName} = _rucksackModule.exports`);
    }

    finalLines.push("})();");

    return jsBeautify(finalLines.join("\n").replace("module.exports", "_rucksackModule.exports"));
}

module.exports = bundle;
