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

// ==================== MENU HAMBURGER ==================== 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.navLinks');

// Fonction pour fermer le menu
const closeMenu = () => {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-label', 'Menu');
};

// Ouvrir/fermer le menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-label', navMenu.classList.contains('active') ? 'Fermer le menu' : 'Menu');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fermer le menu quand on clique ailleurs
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        closeMenu();
    }
});

// Fermer le menu au scroll
window.addEventListener('scroll', closeMenu);

// ==================== TYPED.JS ==================== 
const typed = new Typed('.multiple', {
    strings: ["Je suis une développeuse en Formation", "J'aime le design", "J'aime la musique"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==================== SCROLL REVEAL TEXT ==================== 
function initScrollReveal() {  
    const el = document.querySelector(".scroll-reveal");
    if (!el) return;

    const text = el.textContent.trim();
    el.textContent = "";

    // Découper en mots
    const words = text.split(" ").map(word => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.classList.add("word");
        el.appendChild(span);
        return span;
    });

    let timeouts = [];

    function playAnimation() {
        words.forEach(span => span.classList.remove("visible"));
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        words.forEach((span, i) => {
            const t = setTimeout(() => {
                span.classList.add("visible");
            }, i * 150);
            timeouts.push(t);
        });
    }

    function revealOnScroll() {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            playAnimation();
        } else {
            words.forEach(span => span.classList.remove("visible"));
            timeouts.forEach(t => clearTimeout(t));
            timeouts = [];
        }
    }

    window.addEventListener("scroll", revealOnScroll, { passive: true });
    window.addEventListener("load", revealOnScroll);
}

// ==================== LOGO LOOP ==================== 
function initLogoLoop() { 
    const track = document.querySelector('.logo-track');
    if (!track) return;

    const logos = document.querySelectorAll('.logo-track img');

    logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        logo.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });

        // Touch support
        logo.addEventListener('touchstart', () => {
            track.style.animationPlayState = 'paused';
        }, { passive: true });

        logo.addEventListener('touchend', () => {
            track.style.animationPlayState = 'running';
        }, { passive: true });
    });
}

// ==================== INTERSECTION OBSERVER ==================== 
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = (index % 5) * 0.1 + 's';
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.project-card, .contact-wrapper, .neon-button, .section-title');
    elementsToObserve.forEach(el => {
        el.classList.add('observe');
        observer.observe(el);
    });
}

// ==================== SMOOTH SCROLL FALLBACK ==================== 
if (!('scrollBehavior' in document.documentElement.style)) {
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.hash) {
            e.preventDefault();
            const target = document.querySelector(e.target.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==================== VIEWPORT HEIGHT FIX FOR MOBILE ==================== 
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

window.addEventListener('resize', setVH);
window.addEventListener('load', setVH);
setVH();

// ==================== INITIALIZE ON DOM READY ==================== 
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initLogoLoop();
    initIntersectionObserver();

    // Empêcher le zoom sur double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// ==================== PERFORMANCE: Update on visibility change ==================== 
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});
