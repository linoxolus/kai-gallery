var filesInput = document.querySelector('#filesData');
var filesList = document.querySelector('.upload-files__list');
var data = new FormData();

function appendData() {
    for (var i = 0; i < filesInput.files.length; i++) {
        data.append('files', filesInput.files[i]);
    }
    console.log(data);
}

function uploadFiles(e) {
    appendData();
    fetch('/store', {
      method: "POST",
      body: data,
      headers: {
        // "Content -Type": "multipart/form-data",
      },
    })
    .then(res => res.json())
    .catch(() => console.log('Bug!!'))
}

function getListItem(file) {
    
}

function filesListLoad() {
    
}

filesInput.onchange = uploadFiles;
