var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var datas = [];
var progressUploads = [];
var currentUploadingIndex = 0;
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

function getUploadProcess(currentIndex, index) {
    if (isInited) {
        const { uploadingBytes, uploadTotalBytes } =
            progressUploads[currentIndex][index];
        return `${formatBytes(uploadingBytes)}/${formatBytes(
            uploadTotalBytes
        )}`;
    }
}

function addListItem(file) {
    fileNameSplit = file.name.split('.');

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
                ${getUploadProcess(currentIndex, progressUploads.length - 1)}
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
    for (const progresses of progressUploads) {
        for (const progress of progresses) {
            var uploadProgressElement = document.querySelector(
                `.upload-file__progress[data-id="${progress.id}"]`
            );

            if (uploadProgressElement) {
                for (var j = 0; j < progresses.length; j++) {
                    uploadProgressElement.textContent = getUploadProcess(
                        i,
                        j
                    );
                }
            }
        }
        i++;
    }
}

function filesListLoad(e) {
    for (var i = 0; i < filesInput.files.length; i++) {
        const req = new XMLHttpRequest();
        req.open('POST', '/store');
        datas.push({
            id: i,
            data: new FormData(),
        });
        datas[i].data.append('files', filesInput.files[i]);
        addListItem(filesInput.files[i]);
        req.addEventListener('load', () => {});
        req.upload.addEventListener('progress', (e) => {
            const uploadingBytes = e.loaded;
            const uploadTotalBytes = e.total;

            if (!progressUploads[currentIndex]) {
                progressUploads[currentIndex] = [];
            }
            progressUploads[currentIndex][currentUploadingIndex] = {
                id: currentUploadingIndex,
                uploadingBytes,
                uploadTotalBytes,
            };
            currentUploadingIndex++;

            if (uploadingBytes === uploadTotalBytes) {
                currentIndex++;
                currentUploadingIndex = 0;
            }
        });
        req.send(datas[i].data);
    }
    isInited = true;
}

filesInput.onchange = filesListLoad;

setInterval(() => {
    updateUploadProgress();
}, 100);
