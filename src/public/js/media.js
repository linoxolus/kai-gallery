const mediaModal = document.querySelector('.media-modal');
const mediaItem = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');
const overlay = document.querySelector('.overlay');
const mediaImage = document.querySelector('.media-image');
const prevBtn = document.querySelector('.media-icon.arrow.prev');
const nextBtn = document.querySelector('.media-icon.arrow.next');
var currentIndex = 0;

function openModal(e) {
    originImage = e.target.dataset.image;
    minImage = e.target.src;
    currentIndex = Number(e.target.dataset.id);
    mediaImage.src = minImage;
    mediaImage.onload = (e) => {
        mediaImage.src = originImage;
    };
    mediaModal.classList.remove('closed');
}

function closeModal(e) {
    mediaModal.classList.add('closed');
}

function prevImage(e) {

}

function nextImage(e) {

}

for (i = 0; i < mediaItem.length; i++) {
    mediaItem[i].addEventListener('click', openModal);
}

closeBtn.addEventListener('click', (e) => {
    closeModal();
});

overlay.onclick = closeModal;

document.documentElement.onkeyup = (e) => {
    if(e.keyCode === 27) {
        closeModal();
    }
}