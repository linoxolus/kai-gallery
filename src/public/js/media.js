const mediaModal = document.querySelector('.media-modal');
const mediaItem = document.querySelectorAll('.media-item');
const closeBtn = document.querySelector('.media-icon.times');

closeBtn.addEventListener('click', (e) => {
    mediaModal.classList.add('closed');
})

for(i = 0; i < mediaItem.length; i++) {
    mediaItem[i].addEventListener('click', (e) => {
        var id = e.target.dataset.id;
        
    })
}