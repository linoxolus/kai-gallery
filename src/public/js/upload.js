var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var datas = [];
var progressUploads = [];
var currentIndex = 0;
var isInited = false;
var totalAllBytes = 0;

// Middle variable
var filesInputFilesTemp = [];

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
    var htmlString = `
    <li class='upload-file__item uploading'>
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
            <div class='loading'>
                <svg
                    width='25'
                    height='25'
                    viewBox='0 0 160 160'
                    style='transform: rotate(-90deg)'
                >
                    <circle
                        r='70'
                        cx='80'
                        cy='80'
                        fill='transparent'
                        stroke='#fff'
                        stroke-linecap='round'
                        stroke-width='12px'
                        stroke-dasharray='439.6px'
                        stroke-dashoffset='109.9px'
                    ></circle>
                </svg>
            </div>
            <i class='fa-regular fa-circle-xmark close'></i>
            <i class="fa-solid fa-check check"></i>
        </div>
    </div>
</li>
    `;

    var total = htmlString + filesList.innerHTML;

    filesList.innerHTML = total;
}

// Update upload progess
function updateUploadProgress() {
    var i = 0;

    for (const progress of progressUploads) {
        const { uploadingBytes, uploadTotalBytes } = progressUploads[i];
        var uploadProgressElement = document.querySelector(
            `.upload-file__progress[data-id="${progress.id}"]`
        );

        var uploadElement =
            uploadProgressElement.parentElement.parentElement.parentElement;

        if (uploadProgressElement) {
            uploadProgressElement.textContent = getUploadProcess(i);
        }
        i++;

        if (uploadingBytes === uploadTotalBytes) {
            uploadElement.classList.remove('uploading');
            uploadElement.classList.add('uploaded');
        }
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
    if (index >= filesInputFilesTemp.length) {
        return;
    }

    req.open('POST', '/store');
    req.onload = function () {
        currentIndex++;
        uploadFile(currentIndex);
    };

    if (!filesInputFilesTemp[index]) {
        return;
    }

    datas[index] = {
        id: index,
        data: new FormData(),
    };
    datas[index].data.append('files', filesInputFilesTemp[index]);

    addListItem(filesInputFilesTemp[index]);
    req.send(datas[index].data);
    updateUploadProgress();
    isInited = true;
}

function filesListLoad(e) {
    for (i = 0; i < filesInput.files.length; i++) {
        filesInputFilesTemp.push(filesInput.files[i]);
    }
    uploadFile(currentIndex);
}

filesInput.onchange = filesListLoad;
