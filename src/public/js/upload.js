var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var datas = [];
var progressUploads = [];
var currentIndex = 0;
var isInited = false;
var totalAllBytes = 0;

function formatBytes(bytes) {
    const sizes = ['b', 'kb', 'mb', 'gb'];
    let sizesIndex = 0;

    for (; bytes >= 1024 && sizesIndex < sizes.length - 1; sizesIndex++) {
        bytes /= 1024;
    }

    return `${bytes.toFixed(2)}${sizes[sizesIndex]}`;
}

function getUploadProcess(currentIndex) {
    if (isInited) {
        const { uploadingBytes, uploadTotalBytes } =
            progressUploads[currentIndex];
        return `${formatBytes(uploadingBytes)}/${formatBytes(
            uploadTotalBytes
        )}`;
    }
}

function addListItem(file) {
    let fileNameSplit = file.name.split('.');

    filesList.innerHTML += `
    <li class='upload-file__item'>
    <div class='upload-file__icon'>
        <div class='upload-file__type'>
        ${
            fileNameSplit[fileNameSplit.length - 1].length <= 3 &&
            fileNameSplit[fileNameSplit.length - 1].length !== 0
                ? fileNameSplit[fileNameSplit.length - 1]
                : '<h2>?</h2>'
        }
        </div>
    </div>
    <div class='upload-file__content'>
        <div class='upload-file__info'>
            <div class='upload-file__name'>
                ${file.name}
            </div>
            <div class='upload-file__progress' data-id="${currentIndex}">
                ${getUploadProcess(currentIndex)}
            </div>
        </div>
        <div class='upload-file__status'>
            <i class='fa-regular fa-circle-xmark'></i>
            <!-- <i class="fa-solid fa-check check"></i> -->
        </div>
    </div>
</li>
    `;
}

// Update upload progess
function updateUploadProgress() {
    var i = 0;
    for (const progress of progressUploads) {
        var uploadProgressElement = document.querySelector(
            `.upload-file__progress[data-id="${progress.id}"]`
        );

        if (uploadProgressElement) {
            uploadProgressElement.textContent = getUploadProcess(i);
        }
        i++;
    }
}
var req = new XMLHttpRequest();
req.addEventListener('load', () => {});
req.upload.addEventListener('progress', (e) => {
    const uploadingBytes = e.loaded;
    const uploadTotalBytes = e.total;
    
    progressUploads[currentIndex] = {
        id: currentIndex,
        uploadingBytes,
        uploadTotalBytes,
    };
    
    updateUploadProgress();
});

req.upload.addEventListener('load', (e) => {
    updateUploadProgress();
    console.log('Upload Successly'); 
    isInited = false;
});

function uploadFile(index) {
    if (index >= filesInput.files.length) {
        return;
    }

    req.open('POST', '/store');
    req.onload = function () {
        currentIndex++;
        uploadFile(currentIndex);
    };

    if (!datas[index]) {
        datas[index] = {
            id: index,
            data: new FormData(),
        };
        datas[index].data.append('files', filesInput.files[index]);
    }

    addListItem(filesInput.files[index]);
    req.send(datas[index].data);
    updateUploadProgress();
    isInited = true;
}

function filesListLoad(e) {
    uploadFile(currentIndex);
}

filesInput.onchange = filesListLoad;
