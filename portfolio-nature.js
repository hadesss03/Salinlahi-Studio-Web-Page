/* ========================================
   Z-STACK + HOVER + CAROUSEL (FULLY WORKING)
   ======================================== */

const container = document.querySelector('.content-container');
const overlay = document.querySelector('.carousel-overlay');
const imageWrapper = overlay.querySelector('.carousel-image-wrapper img');
const infoElement = overlay.querySelector('.carousel-info');
const leftBtn = overlay.querySelector('.left-btn');
const rightBtn = overlay.querySelector('.right-btn');
const viewBtn = overlay.querySelector('.view-btn');
const closeBtn = overlay.querySelector('.close-btn');

let currentIndex = 0;
let currentGroup = null;
let ticking = false;

// === IMAGE DATA ===
const imageGroups = {
    baguio: {
        images: [
            'Nature/N - Baguio (1).jpg',
            'Nature/N - Baguio (2).jpg',
            'Nature/N - Baguio (3).jpg',
            'Nature/N - Baguio (4).jpg'
        ],
        title: 'Baguio Trip',
        location: 'Baguio, Philippines',
        link: 'https://www.facebook.com/share/p/1Ce935jGD5/',
        infoClass: 'baguio'
    }
};

// === SCROLL ANIMATION ===
const THRESHOLD = window.innerHeight * 0.35;
function updateScroll() {
    const scrollY = window.scrollY;
    container.classList.toggle('scrolled', scrollY > THRESHOLD);
    ticking = false;
}
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
}
window.addEventListener('scroll', requestTick, { passive: true });

// === CAROUSEL LOGIC ===
function openCarousel(e) {
    const wrapper = e.currentTarget;
    const key = wrapper.dataset.key;
    currentGroup = imageGroups[key];
    if (!currentGroup) return;

    currentIndex = 0;
    updateCarouselImage();
    updateInfo();

    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function updateCarouselImage() {
    imageWrapper.style.opacity = '0';
    setTimeout(() => {
        imageWrapper.src = currentGroup.images[currentIndex];
        imageWrapper.style.opacity = '1';
    }, 200);
}

function updateInfo() {
    infoElement.innerHTML = `${currentGroup.title}<br>${currentGroup.location}`;
    infoElement.className = `carousel-info ${currentGroup.infoClass}`;
    // clicking the info also opens the link
    infoElement.onclick = () => window.open(currentGroup.link, '_blank');
    // set view button link
    if (viewBtn) {
        viewBtn.href = currentGroup.link || '#';
    }
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + currentGroup.images.length) % currentGroup.images.length;
    updateCarouselImage();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % currentGroup.images.length;
    updateCarouselImage();
}

function closeCarousel() {
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => imageWrapper.src = '', 400);
}

// Wire the exit (close) button
if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCarousel();
    });
}

// === EVENT LISTENERS ===
document.querySelectorAll('.event-img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', openCarousel);
});

leftBtn.addEventListener('click', prevSlide);
rightBtn.addEventListener('click', nextSlide);

overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCarousel();
});

document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('visible')) return;
    if (e.key === 'Escape') closeCarousel();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});