function getValidPath(path) {
    var path = path.split('/');
    path.shift();
    path.shift();

    return '/' + path.join('/');
}

module.exports = { getValidPath };
