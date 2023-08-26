const mediaModal = document.querySelector('.media-modal');
const mediaItems = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');
const overlay = document.querySelector('.overlay');
const mediaImage = document.querySelector('.media-image');
const prevBtn = document.querySelector('.media-icon.arrow.prev');
const nextBtn = document.querySelector('.media-icon.arrow.next');
var mediaLength = document.querySelectorAll('.media-item').length;
var currentIndex = 0;
var currentImage;

function updateImage(index) {
    currentImage = mediaItems[index];
    originImage = currentImage.dataset.image;
    minImage = currentImage.src;
    mediaImage.src = minImage;
    mediaImage.src = originImage;
    mediaModal.classList.remove('closed');    
}

function openModal(e) {
    currentIndex = Number(e.target.dataset.index);
    updateImage(currentIndex);
}

function closeModal(e) {
    mediaModal.classList.add('closed');
}

function prevImage(e) {
    currentIndex = (currentIndex - 1 + mediaLength) % mediaLength;
    updateImage(currentIndex);
}

function nextImage(e) {
    currentIndex = (currentIndex + 1) % mediaLength;
    updateImage(currentIndex);
}

mediaItems.forEach(mediaItem => {
    mediaItem.addEventListener('click', openModal);
})

closeBtn.addEventListener('click', (e) => {
    closeModal();
});

overlay.onclick = closeModal;

document.documentElement.onkeyup = (e) => {
    switch (e.keyCode) {
        case 27:
            closeModal();
            break;
        case 37:
            prevImage();
            break;
        case 39:
            nextImage();
            break;
    }
};

prevBtn.onclick = prevImage;
nextBtn.onclick = nextImage;
