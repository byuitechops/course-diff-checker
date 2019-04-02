/* GET INPUTS */
var getInput = require('./input.js');
var input = getInput();

/* DIFF CHECKER */
var getCustomDiffInput = require('./getCustomDiffInput.js');
var getDiff = require('./diffChecker.js');
var getCustomDiff = require('./getCustomDiff.js');

// remove files that won't work in getDiff()
var courseData = getCustomDiffInput(input);

// run diff checker
// getDiff(courseData.parent, courseData.child);
getCustomDiff(courseData.customDiff.parent, courseData.customDiff.child);

/* PRINT RESULTS */