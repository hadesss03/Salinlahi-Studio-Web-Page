/* ========================================
   Z-STACK + DIRECT LINK TO FACEBOOK
   ======================================== */

const rows = document.querySelectorAll('.video-row');
let currentActive = 0;

// Facebook Links Only
const videoData = {
    gtech:   { link: 'https://www.facebook.com/share/p/1Si4oUrwmb/' },
    hawk:    { link: 'https://www.facebook.com/share/p/1BcALnQbAe/' },
    multo:   { link: 'https://www.facebook.com/share/v/1BecmXdu3F/' },
    ako:     { link: 'https://www.facebook.com/share/v/1Csq91eCbW/' },
    pasik:   { link: 'https://www.facebook.com/share/v/16g4jmgA82/' },
    cj:      { link: 'https://www.facebook.com/share/p/1DC6aRKKgo/' },
    scott:   { link: 'https://www.facebook.com/share/r/1CiJ8EUgog/' },
    hayo:    { link: 'https://www.facebook.com/share/v/17LGLRpnHy/' },
    aws:     { link: 'https://www.facebook.com/share/v/1MJzBr8kFW/' },
    birthday:{ link: 'https://www.facebook.com/share/p/1BT9USgG6y/' }
};

// Activate first row
rows[0].classList.add('active');

function updateStack() {
    const triggerPoint = window.innerHeight * 0.7;
    let newActive = 0;
    rows.forEach((row, i) => {
        if (row.getBoundingClientRect().top < triggerPoint) newActive = i;
    });
    if (newActive !== currentActive) {
        rows.forEach((row, i) => row.classList.toggle('active', i === newActive));
        currentActive = newActive;
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateStack();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Open Facebook link on click
document.querySelectorAll('.video-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const key = card.dataset.key;
        const url = videoData[key]?.link;
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    });
});