const fs = require('fs');
const path = require('path');

// directory paths of parent and child courses
const parentPath = './input/seth-bolander-diff-test-export';
const childPath = './input/seth-bolander-diff-test-child-export';
/**************************************************************
 * File extension to search for. Must be any of: 
 * 'xml', 'html', 'json', 'txt', or 'qti' (for .xml.qti files) 
 **************************************************************/
const extension = 'xml';
// Read all files? If ===false, 'const extension' is required. If ===true, 'const extension' not required.
const searchAllFiles = false;

var parent = [];
var child = [];

// test if file extension === extension
function isExtensionOf(file) {
    return file.split('.').pop().toLowerCase() === extension ? true : false;
}

// search a directory for for all files and subdirectories
// recursively search subdirectories and read file data of correct extensions
function fromDir(startPath, course) {
    var files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            // recursively search all dir below startPath
            fromDir(filename, course);
        } else if (isExtensionOf(filename) && !searchAllFiles) {
            // else read correctly extensioned file data to course array node [{path:'path/to/file.ext', data:'<xml>file data</xml>'}, ...]
            course.push({
                path: filename,
                data: fs.readFileSync(filename, 'utf-8')
            });
        } else if (searchAllFiles) {
            // if `searchAllFiles === true` read all files to course object
            course.push({
                path: filename,
                data: fs.readFileSync(filename, 'utf-8'),
                extension: filename.split('.').pop().toLowerCase()
            });
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