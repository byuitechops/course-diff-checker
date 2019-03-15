const cheerio = require('cheerio');

function getDifferences() {

}

function unparseFiles() {

}

function matchFiles() {

}

function removeTags() {
    var badIds = ['quiz', 'file', ];
    var badTags = [];
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


        return file;
    });

    return courseFiles;
}

module.exports = function getDiff(src, dest) {
    var differences = {};

    var parentFiles = parseFiles(src);

    return differences;
}