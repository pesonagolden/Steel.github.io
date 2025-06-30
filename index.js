
const menuElement = document.querySelector('.menu');
const linksElement = document.querySelector('.links');
const popupModal = document.getElementById('popupModal');
const closePopupBtn = document.getElementById('closePopup');
.setHeader('Access-Control-Allow-Origin', 'https://pesonagolden.netlify.app');

menuElement.addEventListener('click', openNav);
closePopupBtn.addEventListener('click', closePopup);

function openNav(e) {
    document.body.style.overflowY = 'hidden';
    linksElement.classList.toggle('show');
    if(linksElement.getAttribute('class') == 'links') {
        document.body.style.overflow = 'auto';
    }
}

function closePopup() {
    popupModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

window.addEventListener('load', () => {
    popupModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

console.log(linksElement.getAttribute('class'));




