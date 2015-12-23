const fs = require("fs")
    , readFile = require("read-utf8")
    , path = require("path")
    , jsBeautify = require("js-beautify")
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


        requirePath = require.resolve(moduleDir + "/" + requirePath)
        var modContent = replaceRequire(requirePath);
        modContent = modContent.replace("module.exports = ", "");
        content = replaceAt(content, modContent, requireStartIndex, requireEndIndex);
        content = content.replace(/\n\;/gm, "");
        content = content.replace(/\}\;\n\n?\}\;/gm, "}\n};\n");
    } while (true)
}

function bundle(path, globalName) {
    var content = jsBeautify(replaceRequire(path))
      , lines = content.split("\n")
      , finalLines = []
      ;

    finalLines.push("(function () {");
    lines.forEach(function (c) {
        if (~c.indexOf("module.exports = ")) {
            finalLines.push("if (typeof module === \"object\")");
            finalLines.push(c);
            if (globalName) {
                finalLines.push("else");
                finalLines.push(c.replace("module.exports", `window.${globalName}`));
            }
        } else {
            finalLines.push(c);
        }
    });
    finalLines.push("})();");

    return finalLines.join("\n");
}

module.exports = bundle;
