const mediaModal = document.querySelector('.media-modal');
const mediaItem = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');
const overlay = document.querySelector('.overlay');
const mediaImage = document.querySelector('.media-image');
const prevBtn = document.querySelector('.media-icon.arrow.prev');
const nextBtn = document.querySelector('.media-icon.arrow.next');
var mediaLength = document.querySelectorAll('.media-item').length;
var currentIndex = 0;
var currentImage;

function openModal(e) {
    originImage = e.target.dataset.image;
    minImage = e.target.src;
    currentIndex = Number(e.target.dataset.index);
    mediaImage.src = minImage;
    mediaImage.src = originImage;
    mediaModal.classList.remove('closed');
}

function closeModal(e) {
    mediaModal.classList.add('closed');
}

function prevImage(e) {
    if(currentIndex - 1 >= 0) {
        currentImage = document.querySelectorAll('.media-item')[currentIndex - 1];
        currentIndex--;
    } else {
        currentIndex = mediaLength - 1;
        currentImage = document.querySelectorAll('.media-item')[currentIndex];
    }
    originImage = currentImage.dataset.image;
    minImage = currentImage.src;
    mediaImage.src = minImage;
    mediaImage.src = originImage;
    mediaModal.classList.remove('closed');
}

function nextImage(e) {
    if(currentIndex + 1 < mediaLength) {
        currentImage = document.querySelectorAll('.media-item')[currentIndex + 1];
        currentIndex++;
    } else {
        currentIndex = 0;
        currentImage = document.querySelectorAll('.media-item')[currentIndex];
    }
    originImage = currentImage.dataset.image;
    minImage = currentImage.src;
    mediaImage.src = minImage;
    mediaImage.src = originImage;
    mediaModal.classList.remove('closed');
}

for (i = 0; i < mediaItem.length; i++) {
    mediaItem[i].addEventListener('click', openModal);
}

closeBtn.addEventListener('click', (e) => {
    closeModal();
});

overlay.onclick = closeModal;

document.documentElement.onkeyup = (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
};

prevBtn.onclick = prevImage;
nextBtn.onclick = nextImage;
