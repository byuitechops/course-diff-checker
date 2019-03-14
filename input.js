const fs = require('fs');
const path = require('path');

const parentPath = './input/seth-bolander-diff-test-export';
const childPath = './input/seth-bolander-diff-test-child-export';
const extension = 'xml';

var parent = {};
var child = {};

function isExtensionOf(file) {
    return file.split('.').pop().toLowerCase() === extension ? true : false;
}

function fromDir(startPath, course) {
    // console.log(`Reading files in ${startPath}`);
    var files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, course); // recursively search all dir below startPath
        } else if (isExtensionOf(filename)) {
            course[filename] = fs.readFileSync(filename, 'utf-8');
        }
    }
}

module.exports = function getInput() {
    fromDir(parentPath, parent);
    fromDir(childPath, child);

    return {
        parent,
        child
    }
}