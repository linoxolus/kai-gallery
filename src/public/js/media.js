const mediaModal = document.querySelector('.media-modal');
const mediaItems = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');
const overlay = document.querySelector('.overlay');
const mediaMain = document.querySelector('.media-main');
const prevBtn = document.querySelector('.media-icon.arrow.prev');
const nextBtn = document.querySelector('.media-icon.arrow.next');
var mediaLength = document.querySelectorAll('.media-item').length;
var currentIndex = 0;
var currentMedia;

function updateMedia(index) {
    currentMedia = mediaItems[index];
    originMedia = currentMedia.dataset.path;
    minMedia = currentMedia.src;
    mediaMain.src = minMedia;
    mediaMain.src = originMedia;
    mediaModal.classList.remove('closed');    
}

function openModal(e) {
    currentIndex = Number(e.target.dataset.index);
    updateMedia(currentIndex);
}

function closeModal(e) {
    mediaModal.classList.add('closed');
}

function prevMedia(e) {
    // If currentIndex < 0, set currentIndex = mediaLength - 1
    currentIndex = (currentIndex - 1 + mediaLength) % mediaLength;
    updateMedia(currentIndex);
}

function nextMedia(e) {
    // If currentIndex >= mediaLength, set currentIndex = 0
    currentIndex = (currentIndex + 1) % mediaLength;
    updateMedia(currentIndex);
}

mediaItems.forEach(mediaItem => {
    mediaItem.addEventListener('click', openModal);
})

closeBtn.addEventListener('click', (e) => {
    closeModal();
});

document.documentElement.onkeyup = (e) => {
    switch (e.keyCode) {
        case 27:
            closeModal();
            break;
        case 37:
            prevMedia();
            break;
        case 39:
            nextMedia();
            break;
    }
};

prevBtn.onclick = prevMedia;
nextBtn.onclick = nextMedia;

overlay.onclick = closeModal;