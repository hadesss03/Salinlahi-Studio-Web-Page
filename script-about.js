// =====================================================
//  SALINLAHI STUDIO – script-about.js
//  Full JS with Fixed Carousel (NO DOTS)
// =====================================================

// ————————————————————————————————————
// 1. Z-Stack Scroll Animation (Intersection Observer)
// ————————————————————————————————————
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // About section: logo + description
    const mainLogo = document.querySelector('.main-logo');
    const aboutDesc = document.querySelector('.about-description');
    if (mainLogo) observer.observe(mainLogo);
    if (aboutDesc) observer.observe(aboutDesc);

    // Package cards
    document.querySelectorAll('.package-link').forEach(card => {
        observer.observe(card);
    });

    // Carousel wrapper
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) observer.observe(carouselWrapper);

    // Trigger initial visibility check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// ————————————————————————————————————
// 2. CAROUSEL – NO DOTS VERSION
// ————————————————————————————————————
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-content');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselCard = document.querySelector('.carousel-card');

let touchStartX = 0;
let touchEndX = 0;
let isAnimating = false;

// Show slide with animation
function showSlide(index, direction = 'none') {
    if (isAnimating || slides.length === 0) return;
    isAnimating = true;

    const currentSlideEl = slides[currentSlide];
    const newSlideEl = slides[index];

    // Remove all animation classes
    slides.forEach(s => s.classList.remove(
        'slide-out-left', 'slide-out-right',
        'slide-in-left', 'slide-in-right'
    ));

    if (direction === 'next') {
        currentSlideEl.classList.add('slide-out-left');
        setTimeout(() => {
            currentSlideEl.classList.remove('active');
            newSlideEl.classList.add('active', 'slide-in-right');
        }, 50);
    } else if (direction === 'prev') {
        currentSlideEl.classList.add('slide-out-right');
        setTimeout(() => {
            currentSlideEl.classList.remove('active');
            newSlideEl.classList.add('active', 'slide-in-left');
        }, 50);
    } else {
        currentSlideEl.classList.remove('active');
        newSlideEl.classList.add('active');
    }

    currentSlide = index;

    setTimeout(() => { isAnimating = false; }, 500);
}

// Next / Prev functions
function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex, 'next');
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex, 'prev');
}

// Button clicks
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// ————————————————————————————————————
// 3. Touch & Mouse Swipe Support
// ————————————————————————————————————
if (carouselCard) {
    // Touch events
    carouselCard.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselCard.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    // Mouse drag
    let mouseStartX = 0;
    let isDragging = false;

    carouselCard.addEventListener('mousedown', e => {
        mouseStartX = e.screenX;
        isDragging = true;
        carouselCard.style.cursor = 'grabbing';
        e.preventDefault();
    });

    carouselCard.addEventListener('mousemove', e => {
        if (isDragging) e.preventDefault();
    });

    carouselCard.addEventListener('mouseup', e => {
        if (isDragging) {
            touchStartX = mouseStartX;
            touchEndX = e.screenX;
            handleSwipe();
            isDragging = false;
            carouselCard.style.cursor = 'grab';
        }
    });

    carouselCard.addEventListener('mouseleave', () => {
        isDragging = false;
        carouselCard.style.cursor = 'grab';
    });

    carouselCard.style.cursor = 'grab';
}

function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) nextSlide();   // swipe left → next
        else prevSlide();            // swipe right → prev
    }
}

// ————————————————————————————————————
// 4. Footer Visibility on Scroll
// ————————————————————————————————————
let lastScrollTop = 0;
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Show footer when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 300) {
        footer.classList.remove('hidden-footer');
        footer.classList.add('visible-footer');
    } else {
        footer.classList.add('hidden-footer');
        footer.classList.remove('visible-footer');
    }

    lastScrollTop = scrollTop;
});

// ————————————————————————————————————
// 5. Smooth Scroll Behavior
// ————————————————————————————————————
document.documentElement.style.scrollBehavior = 'smooth';