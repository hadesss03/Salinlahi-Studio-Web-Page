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
    haven: {
        images: [
            'Portrait/P - TUP Lib (1).jpg',
            'Portrait/P - TUP Lib (2).jpg',
            'Portrait/P - TUP Lib (3).jpg',
            'Portrait/P - TUP Lib (4).jpg'
        ],
        title: 'A Haven for Knowledge and Growth',
        location: 'TUP Manila',
        link: 'https://www.facebook.com/share/p/1FivgetsvF/',
        infoClass: 'haven'
    },
    grad: {
        images: [
            'Portrait/P -CJ Grad (1).jpg',
            'Portrait/P -CJ Grad (2).jpg',
            'Portrait/P -CJ Grad (3).jpg',
            'Portrait/P -CJ Grad (4).jpg',
            'Portrait/P -CJ Grad (5).jpg',
            'Portrait/P -CJ Grad (6).jpg',
            'Portrait/P -CJ Grad (7).jpg',
            'Portrait/P -CJ Grad (8).jpg'
        ],
        title: 'Christian Jyreh’s Graduation',
        location: 'UST, Sampaloc, Manila',
        link: 'https://www.facebook.com/share/p/1DC6aRKKgo/',
        infoClass: 'grad'
    },
    awslc: {
        images: [
            'Portrait/P - AWS X Salinlahi Studio (1).jpg',
            'Portrait/P - AWS X Salinlahi Studio (2).jpg',
            'Portrait/P - AWS X Salinlahi Studio (3).jpg',
            'Portrait/P - AWS X Salinlahi Studio (4).jpg',
            'Portrait/P - AWS X Salinlahi Studio (5).jpg',
            'Portrait/P - AWS X Salinlahi Studio (6).jpg',
            'Portrait/P - AWS X Salinlahi Studio (7).jpg',
            'Portrait/P - AWS X Salinlahi Studio (8).jpg'
        ],
        title: 'AWSLC TUP Manila x Salinlahi Studio',
        location: 'TUP Manila',
        link: 'https://www.facebook.com/share/p/1J6LhUanFD/',
        infoClass: 'awslc'
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