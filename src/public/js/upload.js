var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var data = new FormData();
var progressUpload;

// Current Index File Upload
var currentIndex = 0;

function appendData() {
    for (var i = 0; i < filesInput.files.length; i++) {
        data.append('files', filesInput.files[i]);
        getListItem(filesInput.files[i]);
    }
}

const req = new XMLHttpRequest();

req.open('POST', '/store')
req.upload.addEventListener('progress', (e) => {
  progressUpload = [e.loaded, e.total];
})

req.addEventListener('load', () => {
  
})

function getListItem(file) {
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
            <div class='upload-file__progress'>
                1.46mb/2.34mb
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

function filesListLoad(e) {
    // uploadFiles();
    appendData();
    req.send(data);
}

filesInput.onchange = filesListLoad;
