module.exports = function (input) {
    var customDiffFilePaths = [
        'input\\seth-bolander-diff-test-export\\course_settings\\files_meta.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\files_meta.xml',
        'input\\seth-bolander-diff-test-export\\course_settings\\media_tracks.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\media_tracks.xml',
        'input\\seth-bolander-diff-test-export\\course_settings\\assignment_groups.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\assignment_groups.xml',
        'input\\seth-bolander-diff-test-export\\course_settings\\course_settings.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\course_settings.xml',
        'input\\seth-bolander-diff-test-export\\course_settings\\grading_standards.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\grading_standards.xml',
        'input\\seth-bolander-diff-test-export\\course_settings\\learning_outcomes.xml',
        'input\\seth-bolander-diff-test-child-export\\course_settings\\learning_outcomes.xml',
        'input\\seth-bolander-diff-test-export\\imsmanifest.xml',
        'input\\seth-bolander-diff-test-child-export\\imsmanifest.xml',
    ];

    var customDiffFiles = [];

    var parentData = input.parent.filter(file => {
        for (let i = 0; i < customDiffFilePaths.length; i++) {
            if (customDiffFilePaths[i] === file.path) {
                customDiffFiles.push(file);
                return false;
            }
        }
        return true;
    });
    var childData = input.child.filter(file => {
        for (let i = 0; i < customDiffFilePaths.length; i++) {
            if (customDiffFilePaths[i] === file.path) {
                customDiffFiles.push(file);
                return false;
            }
        }
        return true;
    });

    return {
        parent: parentData,
        child: childData,
        customDiff: customDiffFiles
    }
}