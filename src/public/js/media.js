const mediaModal = document.querySelector('.media-modal');
const mediaItem = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');
const mediaImage = document.querySelector('.media-image');

closeBtn.addEventListener('click', (e) => {
    mediaModal.classList.add('closed');
})

for(i = 0; i < mediaItem.length; i++) {
    mediaItem[i].addEventListener('click', (e) => {
        var originImage = e.target.dataset.image;
        var minImage = e.target.src;
        mediaImage.src = minImage;
        mediaImage.onload = (e) => {
            mediaImage.src = originImage; 
        }
        mediaModal.classList.remove('closed');
    })
}