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
        'topic_id'
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