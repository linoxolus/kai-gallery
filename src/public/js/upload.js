var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var datas = [];
var progressUploads = [];
var currentIndex = 0;
var isInited = false;

function formatBytes(bytes) {
    const sizes = ['b', 'kb', 'mb', 'gb'];
    let sizesIndex = 0;

    for (; bytes >= 1024 && sizesIndex < sizes.length - 1; sizesIndex++) {
        bytes /= 1024;
    }

    return `${bytes.toFixed(2)}${sizes[sizesIndex]}`;
}

function getUploadProcess(index) {
    if (isInited) {
        const { uploadingBytes, uploadTotalBytes } = progressUploads[index];
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
                ${getUploadProcess(progressUploads.length - 1)}
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
    // var currentProgress;

    // for (var i = 0; i < progressUploads.length; i++) {
    //   var uploadProgressElement = document.querySelectorAll(
    //       '.upload-file__progress'
    //   );
    //   currentProgress = progressUploads.find(
    //         (progressUpload) => progressUpload.id == i
    //     );
    //     if (currentProgress ) {
    //         uploadProgressElement[i].textContent = getUploadProcess(i);
    //     } else {
    //         uploadProgressElement[i].textContent = `code not run`;
    //     }
    // }

    for (const progress of progressUploads) {
        const uploadProgressElement = document.querySelector(
            `.upload-file__progress[data-id="${progress.id}"]`
        );

        if (uploadProgressElement) {
            uploadProgressElement.textContent = getUploadProcess(progress.id);
        }
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

            progressUploads[currentIndex] = {
                id: currentIndex,
                uploadingBytes,
                uploadTotalBytes,
            };
            currentIndex++;
            e.loaded = 0;
            e.total = 0;
        });
        req.send(datas[i].data);
    }
    isInited = true;
}

filesInput.onchange = filesListLoad;

setInterval(() => {
    updateUploadProgress();
}, 100);
