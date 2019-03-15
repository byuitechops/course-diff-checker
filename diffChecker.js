const cheerio = require('cheerio');

function getDifferences() {

}

function unparseFiles() {

}

function matchFiles(srcFiles, destFiles) {
    srcFiles.map(srcFile => {
        var matches = destFiles.filter(destFile => srcFile.title === destFile.title);
        return matches.reduce((accum, match) => {
            accum[srcFile.title] = Array.isArray(accum[srcFile.title]) ? accum[srcFile.title] : [];
            accum[srcFile.title] = getDiff(srcFile, match);
            return accum;
        }, {});
    })
}

function removeTags($) {
    var badIds = [
        'identifier',
        'ident',
        'identifierref',
        'id'
    ];
    var badIdTags = [
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
    var badTags = [
        'topic_id',
        'assignment_group_identifierref',
        'rubric_identifierref',
        'image_identifier_ref',
        'identifierref',
        'root_account_uuid',
        'content_id',
        'fieldentry'
    ];

    badIdTags.forEach(idTag => {
        badIds.forEach(id => {
            $(idTag).removeAttr(id);
        });
    });

    badTags.forEach(tag => {
        $(tag).remove();
    });

    return $;
}

function getTitle(dom, key) {
    var titles = [dom('lomimscc\\:title').text(),
        dom('title').text(),
        dom('assessment').attr('title')
    ]
    titles = titles.filter(title => title !== '');
    if (titles.length > 0 || titles[0] !== undefined) {
        try {
            var titleOut = titles[0].trim();
        } catch (e) {
            throw key;
        }
    } else {
        var titleOut = '';
        console.log(key);
    }

    return titleOut;
}

function parseFiles(courseObj) {
    var courseFiles = Object.keys(courseObj).map(key => {
        var dom = cheerio.load(courseObj[key]);
        var file = {
            path: key,
            dom: dom,
            title: getTitle(dom, key),
        };

        file.dom = removeTags(file.dom);

        return file;
    });

    return courseFiles;
}

module.exports = function getDiff(src, dest) {
    var differences = {};

    var parentFiles = parseFiles(src);
    var childFiles = parseFiles(dest);

    return differences;
}