/* ===== Z-STACK 3 LAYERS + CAROUSEL — FINAL WORKING VERSION ===== */

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

const rows = document.querySelectorAll('.event-row');
const THRESHOLD = window.innerHeight * 0.5;

// ===== IMAGE DATA =====
const imageGroups = {
    gtech: { images: ['Event Coverage/EC - GTECH (1).JPG','Event Coverage/EC - GTECH (2).JPG','Event Coverage/EC - GTECH (3).JPG','Event Coverage/EC - GTECH (4).JPG'], title: 'Google - Tech Summit', location: 'IRTC, TUP Manila', link: 'https://www.facebook.com/share/p/14QLXcZYXoU/', infoClass: 'gtech' },
    hawk: { images: ['Event Coverage/EC - Hawk-A-Thon (1).JPG','Event Coverage/EC - Hawk-A-Thon (2).JPG','Event Coverage/EC - Hawk-A-Thon (3).JPG','Event Coverage/EC - Hawk-A-Thon (4).JPG'], title: 'UI/UX - Hawk-A-Thon', location: 'TUP Manila', link: 'https://www.facebook.com/share/p/17C1u9Gj9z/', infoClass: 'hawk' },
    pasik: { images: ['Event Coverage/EC - Pasiklaban (1).jpg','Event Coverage/EC - Pasiklaban (2).jpg','Event Coverage/EC - Pasiklaban (3).jpg','Event Coverage/EC - Pasiklaban (4).jpg'], title: 'TUP 3rd Pasiklaban ', location: 'TUP Manila', link: 'https://www.facebook.com/share/p/17ZqQdwHoL/', infoClass: 'pasik' },
    hayo: { images: ['Event Coverage/EC - TUP Hayo (1).jpg','Event Coverage/EC - TUP Hayo (2).jpg','Event Coverage/EC - TUP Hayo (3).jpg','Event Coverage/EC - TUP Hayo (4).jpg'], title: 'TUP Hayò', location: 'TUP Manila', link: 'https://www.facebook.com/share/p/16LntKfkVJ/', infoClass: 'hayo' },
    smileglad: {
        images: Array.from({length: 27}, (_, i) => `Event Coverage/EC - Smile and Glad Birthday Party  (${i+1}).jpg`),
        title: 'Smile & Glad Birthday Party',
        location: 'Shakey’s MCU, Edsa, Caloocan',
        link: 'https://www.facebook.com/share/p/19rF6RXSTK/',
        infoClass: 'smileglad'
    }
};

// ===== 3-LAYER Z-STACK ANIMATION (GUARANTEED) =====
function updateZStack() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / THRESHOLD, 2);

    rows.forEach((row, i) => {
        let z, scale, opacity, blur;

        if (progress < 1) {
            if (i === 0) { z = -180 * progress; scale = 1 - 0.22 * progress; opacity = 1 - 0.55 * progress; blur = progress * 2; }
            else if (i === 1) { z = -120 + 120 * progress; scale = 0.88 + 0.12 * progress; opacity = 0.55 + 0.45 * progress; blur = 1 - progress; }
            else { z = -280; scale = 0.72; opacity = 0.3; blur = 4; }
        } else {
            const p2 = progress - 1;
            if (i === 0) { z = -180; scale = 0.78; opacity = 0.45; blur = 2; }
            else if (i === 1) { z = -180 * p2; scale = 1 - 0.22 * p2; opacity = 1 - 0.55 * p2; blur = p2 * 2; }
            else { z = -280 + 280 * p2; scale = 0.72 + 0.28 * p2; opacity = 0.3 + 0.7 * p2; blur = 4 - 4 * p2; }
        }

        row.style.transform = `translateZ(${z}px) scale(${scale})`;
        row.style.opacity = opacity;
        row.style.filter = `blur(${blur}px)`;
    });
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateZStack);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });
window.addEventListener('load', updateZStack);
window.addEventListener('resize', updateZStack);

// ===== CAROUSEL =====
function openCarousel(e) {
    const key = e.currentTarget.dataset.key;
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
    infoElement.onclick = () => window.open(currentGroup.link, '_blank');
    viewBtn.href = currentGroup.link;
}

function prevSlide() { currentIndex = (currentIndex - 1 + currentGroup.images.length) % currentGroup.images.length; updateCarouselImage(); }
function nextSlide() { currentIndex = (currentIndex + 1) % currentGroup.images.length; updateCarouselImage(); }

function closeCarousel() {
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(() => imageWrapper.src = '', 400);
}

// EVENT LISTENERS
document.querySelectorAll('.event-img-wrapper').forEach(w => w.addEventListener('click', openCarousel));
leftBtn.addEventListener('click', prevSlide);
rightBtn.addEventListener('click', nextSlide);
overlay.addEventListener('click', e => e.target === overlay && closeCarousel());
document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('visible')) return;
    if (e.key === 'Escape') closeCarousel();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});
if (closeBtn) closeBtn.addEventListener('click', closeCarousel);
