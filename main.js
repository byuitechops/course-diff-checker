/* GET INPUTS */
var getInput = require('./input.js');
var input = getInput();

/* DIFF CHECKER */
var getCustomDiffInput = require('./getCustomDiffInput.js');
var getDiff = require('./diffChecker.js');

// remove files that won't work in getDiff()
var courseData = getCustomDiffInput(input);

// run diff checker
getDiff(courseData.parent, courseData.child);

// TODO: CHECK FOR GROUPS/SETTINGS IN COURSES AND RUN DIFF-CHECK

/* PRINT RESULTS */