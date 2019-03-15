// Get inputs
var getInput = require('./input.js');
var courseData = getInput();

// Diff checker
var getDiff = require('./diffChecker.js');

// LIST OF UNSORTED FILES, BAD STRUCTURE
var badFiles = ['files_meta.xml'];

getDiff(courseData.parent, courseData.child);

// Print results