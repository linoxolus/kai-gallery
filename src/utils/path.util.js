function getValidPath(path) {
    var path = path.split('/');
    path.shift();
    path.shift();

    return '/' + path.join('/');
}

function getMinPath(path) {
    var path = path.split('/');
    path.splice(path.length - 1, 0, 'min');
    return path.join('/');
}

function shiftPath(path, count = 0) {
    var path = path.split('/');
    for(i = 0; i < count; i++) {
        path.shift();
    }

    return path.join('/');
}

module.exports = { getValidPath, getMinPath, shiftPath };
