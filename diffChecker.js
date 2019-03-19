const cheerio = require('cheerio');

function getDifferences(srcFile, destFile) {}

function unparseFiles() {

}

function matchFiles(srcFiles, destFiles) {
    srcFiles.map(srcFile => {
        var matches = destFiles.filter(destFile => srcFile.title === destFile.title);

        // NEEDS SOME WORK, ACCUM ISN'T AN ARRAY YA DUMB
        return matches.reduce((accum, match) => {
            accum[srcFile.title] = Array.isArray(accum[srcFile.title]) ? accum[srcFile.title] : [];
            accum[srcFile.title] = getDifferences(srcFile, match);
            return accum;
        }, {});
    })
}

function removeIds($) {
    var ids = [
        'identifier',
        'ident',
        'identifierref',
        'id'
    ];
    var idAttributeTags = [
        'quiz',
        'file',
        'item',
        'assessment',
        'topicMeta',
        'assignment',
        'assignmentGroup',
        'course',
        'gradingStandard',
        'learningOutcomeGroup',
        'learningOutcome',
        'module',
        'rubric',
        'resource'
    ];
    var idTags = [
        'topic_id',
        'assignment_group_identifierref',
        'rubric_identifierref',
        'image_identifier_ref',
        'identifierref',
        'root_account_uuid',
        'content_id',
        'fieldentry'
    ];

    idAttributeTags.forEach(idTag => {
        ids.forEach(id => {
            $(idTag).removeAttr(id);
        });
    });

    idTags.forEach(tag => {
        $(tag).remove();
    });

    return $;
}

function getType(dom, path) {
    var types = [
        dom('assignmentGroups').get().length,
        dom('topicMeta').get().length,
        dom('webLink').get().length,
        dom('topic').get().length,
        dom('assignmentGroups').get().length,

    ];
    return 'quiz';
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
        var dom = cheerio.load(file.data);
        file.title = getTitle(dom, file.path);
        file.type = getType(dom, file.path);
        file.dom = removeIds(dom);

        return file;
    });

    return courseFiles;
}

module.exports = function (src, dest) {
    var differences = [];

    var parentFiles = parseFiles(src);
    var childFiles = parseFiles(dest);

    // var differences = matchFiles(parentFiles, childFiles);

    return differences;
}