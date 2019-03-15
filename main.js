/* GET INPUTS */
var getInput = require('./input.js');
var courseData = getInput();

/* DIFF CHECKER */
var getDiff = require('./diffChecker.js');

// retrieve 'bad file' data and remove from courseData
var badFiles = {
    'input\\seth-bolander-diff-test-export\\course_settings\\files_meta.xml': courseData.parent['input\\seth-bolander-diff-test-export\\course_settings\\files_meta.xml'],
    'input\\seth-bolander-diff-test-child-export\\course_settings\\files_meta.xml': courseData.child['input\\seth-bolander-diff-test-child-export\\course_settings\\files_meta.xml'],
    'input\\seth-bolander-diff-test-export\\course_settings\\media_tracks.xml': courseData.parent['input\\seth-bolander-diff-test-export\\course_settings\\media_tracks.xml'],
    'input\\seth-bolander-diff-test-child-export\\course_settings\\media_tracks.xml': courseData.parent['input\\seth-bolander-diff-test-child-export\\course_settings\\media_tracks.xml'],
};
delete courseData.parent['input\\seth-bolander-diff-test-export\\course_settings\\files_meta.xml'];
delete courseData.parent['input\\seth-bolander-diff-test-export\\course_settings\\media_tracks.xml'];
delete courseData.child['input\\seth-bolander-diff-test-child-export\\course_settings\\files_meta.xml'];
delete courseData.child['input\\seth-bolander-diff-test-child-export\\course_settings\\media_tracks.xml'];

// run diff checker
getDiff(courseData.parent, courseData.child);

/* PRINT RESULTS */