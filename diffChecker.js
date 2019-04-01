const cheerio = require('cheerio');

function getDifferences(srcFile, destFile) {

}

function unparseFiles() {

}

function matchFiles(srcFiles, destFiles) {
    var pairs = [];
    srcFiles.map(srcFile => {
        var matches = destFiles.filter(destFile => srcFile.title === destFile.title && srcFile.assessmentType === destFile.assessmentType);
        if (matches.length === 1 && srcFile.type === matches[0].type) {
            pairs.push({
                src: srcFile,
                dest: matches[0]
            });
        } else if (matches.length === 1 && srcFile.type !== matches[0].type) {
            throw `Type error: src: ${srcFile.type}, dest: ${matches[0].type}\nsrcLocation: ${srcFile.path}\ndestLocation:${matches[0].path}`;
        } else if (matches.length < 1) {
            if (srcFile.title !== 'Unnamed Quiz') {
                throw `No matches for ${srcFile.title}\nLocation: ${srcFile.path}`;
            }
        } else if (matches.length > 1) {
            matches = matches.filter(destFile => srcFile.type === destFile.type);
            if (matches.length === 1) {
                pairs.push({
                    src: srcFile,
                    dest: matches[0]
                });
            } else if (matches.length < 1) {
                throw `Type error: Multiple matching titles but no matching types for src: ${srcFile.type}`;
            } else if (matches.length > 1) {
                console.log(matches);
                throw `Type error: Multiple matching titles and types for src: ${srcFile.type}`;
            }
        }
    });

    return pairs;
}

function removeIds($) {
    var ids = [
        'id',
        'ident',
        'identifier',
        'identifierref'
    ];
    var idAttributeTags = [
        'assessment',
        'assignment',
        'assignmentGroup',
        'course',
        'file',
        'gradingStandard',
        'item',
        'learningOutcome',
        'learningOutcomeGroup',
        'manifest',
        'module',
        'objectbank',
        'quiz',
        'resource',
        'rubric',
        'topicMeta'
    ];
    var idTags = [
        'assignment_group_identifierref',
        'fieldentry',
        'content_id',
        'identifierref',
        'image_identifier_ref',
        'root_account_uuid',
        'rubric_identifierref',
        'topic_id',
        'quiz_identifierref'
    ];

    idAttributeTags.forEach(idTag => {
        ids.forEach(id => {
            $(idTag).removeAttr(id);
        });
    });

    idTags.forEach(tag => {
        $(tag).remove();
    });

    if ($('meta').attr('name') == 'identifier') {
        $('meta').removeAttr('content');
    }

    return $;
}

function getAssessmentType(path) {
    if (path.slice(-7, -4) === 'eta') {
        return 'meta';
    } else if (path.slice(-7, -4) === 'qti') {
        return 'qti';
    } else {
        return null;
    }
}

function getType(dom, path) {
    var numTypeTags = [
        'assessment',
        'assignment',
        'assignmentGroups',
        'course',
        'gradingStandards',
        'learningOutcomeGroup',
        'manifest',
        'media_tracks',
        'modules',
        'quiz',
        'rubrics',
        'topic',
        'topicMeta',
        'webLink'
    ];
    var typeDirs = [
        'external_content',
        'non_cc_assignments',
        'wiki_content'
    ];

    var type = '';

    var assocTags = numTypeTags.filter(tag => dom(tag).get().length === 1);
    if (assocTags.length === 1) {
        type = assocTags[0];
    } else if (assocTags.length > 1) {
        if (dom('topicMeta').get().length > 0) {
            type = 'topicMeta';
        } else if (dom('quiz').get().length > 0) {
            type = 'quiz';
        } else {
            type = 'unknown';
            console.log(`More than one file type tag in file: ${path}`);
        }
    } else if (assocTags.length < 1) {
        type = 'unknown';
        console.log(`No file type tags in file: ${path}`);
    }

    typeDirs.forEach(dir => {
        if (path.split('\\')[-2] == dir) {
            type = dir;
        }
        return;
    });

    return type;
}

function getTitle(dom, path) {
    var titles = [
        dom('lomimscc\\:title').text(),
        dom('title').text(),
        dom('assessment').attr('title')
    ];
    titles = titles.filter(title => title !== '');
    if (titles.length > 0 || titles[0] !== undefined) {
        try {
            var titleOut = titles[0].trim();
        } catch (e) {
            throw path;
        }
    } else {
        var titleOut = '';
        console.log(path);
    }

    return titleOut;
}

function parseFiles(courseArray) {
    var courseFiles = courseArray.map(file => {
        var dom = cheerio.load(file.data, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        file.title = getTitle(dom, file.path);
        file.type = getType(dom, file.path);
        file.dom = removeIds(dom);
        file.assessmentType = getAssessmentType(file.path);

        return file;
    });

    return courseFiles;
}

module.exports = function (src, dest) {
    var differences = [];

    var parentFiles = parseFiles(src);
    var childFiles = parseFiles(dest);

    var matchedFiles = matchFiles(parentFiles, childFiles);

    return differences;
}