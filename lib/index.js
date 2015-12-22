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

function bundle(path, callback) {
    return jsBeautify(replaceRequire(path));
}

module.exports = bundle;
