const fs = require('fs');
const path = require('path');

const depensFolders = [
    path.join(__dirname, '..', 'public', 'uploads'),
    path.join(__dirname, '..', 'public', 'media'),
    path.join(__dirname, '..', 'public', 'media', 'docs'),
    path.join(__dirname, '..', 'public', 'media', 'videos'),
    path.join(__dirname, '..', 'public', 'media', 'docs'),
    path.join(__dirname, '..', 'public', 'media', 'images'),
    path.join(__dirname, '..', 'public', 'media', 'images', 'origin'),
    path.join(__dirname, '..', 'public', 'media', 'images', 'min'),
];

function makeDir(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (err) {
        console.error(err);
    }

    console.log(`created: ${path}`);
}
depensFolders.forEach((folder) => {
    makeDir(folder);
});
