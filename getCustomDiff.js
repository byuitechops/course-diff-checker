const cheerio = require('cheerio');

function getDifferences(srcFile, destFile) {

}

function matchFiles(srcFiles, destFiles) {
    var pairs = [];
    srcFiles.map(srcFile => {
        var matches = destFiles.filter(destFile => srcFile.title === destFile.title && srcFile.type === destFile.type);
        if (matches.length === 1) {
            pairs.push({
                srcFile: srcFile,
                destFile: matches[0]
            });
        } else if (matches.length < 1) {
            throw `No matches for ${srcFile.title}\nLocation: ${srcFile.path}`;
        } else if (matches.length > 1) {
            throw `Type/Title error: Multiple matching titles and types for src: ${srcFile.title}\nmatches: ${matches}`;
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
        'assignmentGroup',
        'course',
        'file',
        'gradingStandard',
        'learningOutcome',
        'learningOutcomeGroup',
        'manifest',
        'item',
        'resource'
    ];
    var idTags = [
        'image_identifier_ref',
        'root_account_uuid',
        'content_id',
        'external_identifier'
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

function parseFiles(courseArray) {
    var courseFiles = courseArray.map(file => {
        var dom = cheerio.load(file.data, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        file.title = file.path.split('\\').pop().split('.').shift();
        file.type = file.path.split('\\').slice(-2).shift() == 'course_settings' ? 'course_settings' : file.title;
        file.dom = removeIds(dom);

        return file;
    });

    return courseFiles;
}

module.exports = function (src, dest) {
    var parentFiles = parseFiles(src);
    var childFiles = parseFiles(dest);
    var filePairs = matchFiles(parentFiles, childFiles);
    filePairs.forEach(pair => {
        pair.diff = getDifferences(pair.srcFile, pair.destFile);
    });

    return filePairs;
}