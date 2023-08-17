var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var data = new FormData();

function appendData() {
    for (var i = 0; i < filesInput.files.length; i++) {
        data.append('files', filesInput.files[i]);
        getListItem(filesInput.files[i]);
    }
}

function uploadFiles() {
    appendData();
    fetch('/store', {
        method: 'POST',
        body: data,
        headers: {
            // "Content -Type": "multipart/form-data",
        },
    })
        .then((res) => res.json())
        .catch(() => console.log('Bug!!'));
}

function getListItem(file) {
    filesList.innerHTML += `
    <li class="upload-file__item">
                <div class="upload-file__icon">
                    <div class="upload-file__type">
                        ${file.type.split('/')[1].length <= 3 ? file.type.split('/')[1] : "<h2>?</h2>"}
                    </div>
                </div>
                <div class="upload-file__info">
                    <div class="upload-file__name">
                        ${file.name}
                    </div>
                    <div class="upload-file__progress">
                        1.46mb/2.34mb
                    </div>
                </div>
                <div class="upload-file__status">
                    <i class="fa-regular fa-circle-xmark"></i>
                    <!-- <i class="fa-solid fa-check check"></i> -->
                </div>
            </li>
    `;
}

function filesListLoad(e) {
    uploadFiles();
}

filesInput.onchange = filesListLoad;
