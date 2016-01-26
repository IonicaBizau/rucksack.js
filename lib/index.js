const fs = require("fs")
    , readFile = require("read-utf8")
    , path = require("path")
    , jsBeautify = require("js-beautify")
    , falafel = require("falafel")
    ;

function replaceAt(content, what, start, end) {
    return content.substring(0, start) + what + content.substring(end + 1);
}

function replaceRequire(modulePath, content) {

    if (content === undefined) {
        return replaceRequire(modulePath, readFile(modulePath));
    }
    output = falafel(content, function (node) {
        debugger
        if (node.name === "exports" && node.type === "Identifier") {
            node.update("");
            if (node.parent.object.name === "module" && node.parent.object.type === "Identifier") {
                node.parent.object.update("");
            }
        }
        if (node.type === "CallExpression" && node.callee.name === "require") {
            var requirePath = node.arguments[0].value;
            var moduleDir = path.dirname(modulePath);
            requirePath = require.resolve(moduleDir + "/" + requirePath);
            node.update(
                falafel("(function () { return " + replaceRequire(requirePath) + " })()", function () {})
            );
        }
    });

    return output.toString();
    //     modContent = modContent.replace("module.exports = ", "");
    //     content = replaceAt(content, modContent, requireStartIndex, requireEndIndex);
    //     content = content.replace(/\n\;/gm, "");
    //     content = content.replace(/\}\;\n\n?\}\;/gm, "}\n};\n");
    // } while (true)
}

function bundle(path, globalName) {
    var content = jsBeautify(replaceRequire(path))
      , lines = content.split("\n")
      , finalLines = []
      ;

    return content;

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
