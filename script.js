// ==================== DARK MODE ====================
const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;

const enableDarkMode = () => {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
};

// Charger le mode sauvegardé
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
    darkModeButton.checked = false;
} else {
    disableDarkMode();
    darkModeButton.checked = true;
}

darkModeButton.addEventListener('change', () => {
    if (darkModeButton.checked) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// ==================== MENU HAMBURGER (MOBILE FIRST) ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');
const navLinks   = document.querySelectorAll('.navLinks');

const closeMenu = () => {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
    menuToggle.querySelector('i').className = 'fa-solid fa-bars';
};

const openMenu = () => {
    navMenu.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fermer le menu');
    menuToggle.querySelector('i').className = 'fa-solid fa-xmark';
};

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
});

// Fermer au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fermer au clic en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Fermer au scroll
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        if (navMenu.classList.contains('active')) closeMenu();
    }, 50);
}, { passive: true });

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
});

// Recalculer si redimensionnement (desktop : fermer le menu mobile si ouvert)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
}, { passive: true });

// ==================== TYPED.JS ====================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Typed !== 'undefined') {
        new Typed('.multiple', {
            strings: [
                "Je suis une développeuse en Formation",
                "J'aime le design",
                "J'aime la musique"
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1500,
            loop: true,
            smartBackspace: true
        });
    }
});

// ==================== SCROLL REVEAL TEXT ====================
function initScrollReveal() {
    const el = document.querySelector('.scroll-reveal');
    if (!el) return;

    const text = el.textContent.trim();
    el.textContent = '';

    const words = text.split(/\s+/).map((word, i, arr) => {
        const span = document.createElement('span');
        span.classList.add('word');
        // Ajouter l'espace APRÈS le mot (sauf le dernier)
        span.appendChild(document.createTextNode(word));
        el.appendChild(span);
        if (i < arr.length - 1) {
            el.appendChild(document.createTextNode(' '));
        }
        return span;
    });

    let timeouts = [];
    let isPlaying = false;

    function playAnimation() {
        if (isPlaying) return;
        isPlaying = true;
        words.forEach(span => span.classList.remove('visible'));
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        words.forEach((span, i) => {
            const t = setTimeout(() => {
                span.classList.add('visible');
            }, i * 120);
            timeouts.push(t);
        });

        // Réinitialiser le flag après la fin
        const totalTime = words.length * 120 + 500;
        setTimeout(() => { isPlaying = false; }, totalTime);
    }

    function hideAnimation() {
        words.forEach(span => span.classList.remove('visible'));
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];
        isPlaying = false;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playAnimation();
            } else {
                hideAnimation();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(el);
}

// ==================== LOGO LOOP (PAUSE AU SURVOL/TOUCH) ====================
function initLogoLoop() {
    const track = document.querySelector('.logo-track');
    if (!track) return;

    const logos = document.querySelectorAll('.logo-track img');
    let isPaused = false;

    const pause  = () => { track.style.animationPlayState = 'paused'; isPaused = true; };
    const resume = () => { track.style.animationPlayState = 'running'; isPaused = false; };

    logos.forEach(logo => {
        logo.addEventListener('mouseenter', pause);
        logo.addEventListener('mouseleave', resume);
        logo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isPaused ? resume() : pause();
        }, { passive: false });
    });
}

// ==================== INTERSECTION OBSERVER (CARTES) ====================
function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = (index % 4) * 0.1 + 's';
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        '.project-card, .contact-wrapper, .neon-button, .section-title'
    );
    elementsToObserve.forEach(el => {
        el.classList.add('observe');
        observer.observe(el);
    });
}

// ==================== VIEWPORT HEIGHT — FIX MOBILE (100vh) ====================
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

setVH();
window.addEventListener('resize', setVH, { passive: true });
window.addEventListener('orientationchange', () => {
    // Délai pour laisser le browser recalculer après rotation
    setTimeout(setVH, 200);
}, { passive: true });

// ==================== SMOOTH SCROLL FALLBACK ====================
if (!('scrollBehavior' in document.documentElement.style)) {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ==================== PRÉVENTION DOUBLE-TAP ZOOM (TOUCH) ====================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        // Ne bloquer que si ce n'est pas un lien ou bouton interactif
        if (!e.target.closest('a, button, input, label')) {
            e.preventDefault();
        }
    }
    lastTouchEnd = now;
}, { passive: false });

// ==================== PERFORMANCE : PAUSE ANIMATIONS TAB CACHÉ ====================
document.addEventListener('visibilitychange', () => {
    const track = document.querySelector('.logo-track');
    if (!track) return;
    track.style.animationPlayState = document.hidden ? 'paused' : 'running';
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initLogoLoop();
    initIntersectionObserver();
});