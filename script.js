 const darkModeButton = document.getElementById('darkModeButton');
 const body = document.body;
 const enableDarkMode = () =>{
  body.classList.add('dark-mode');
 }
 const disableDarkMode = () =>{
  body.classList.remove('dark-mode');
 }
 darkModeButton.addEventListener('change',() =>{
  if (darkModeButton.checked){
    disableDarkMode();
  }
  else{
    enableDarkMode();
  }
 });
  const typed = new Typed ('.multiple',{
    strings:["Je suis une développeuse en Formation","J'aime le design","J'aime la musique"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
  });
 
function initScrollReveal() {  
  const el = document.querySelector(".scroll-reveal");
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

  let timeouts = []; // stocker les délais pour les annuler

  function playAnimation() {
    // Réinitialiser
    words.forEach(span => span.classList.remove("visible"));
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];

    // Relancer proprement
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
      // Quand on quitte la section, on réinitialise
      words.forEach(span => span.classList.remove("visible"));
      timeouts.forEach(t => clearTimeout(t));
      timeouts = [];
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
}

function initLogoLoop() { 
    const track = document.querySelector('.logo-track');
    const logos = document.querySelectorAll('.logo-track img');

    logos.forEach(logo => {
      logo.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused'; // stop la file
      });
      logo.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running'; // reprend la file
      });
    });
}

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

  // Observer les éléments
  const elementsToObserve = document.querySelectorAll('.project-card, .contact-wrapper, .neon-button, .section-title');
  elementsToObserve.forEach(el => {
    el.classList.add('observe');
    observer.observe(el);
  });
}

function initSplitText() {
  const marqueeText = document.querySelector('.section');

  // Pause au survol
  marqueeText.addEventListener('mouseenter', () => {
    marqueeText.style.animationPlayState = 'paused';
  });

  marqueeText.addEventListener('mouseleave', () => {
    marqueeText.style.animationPlayState = 'running';
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initLogoLoop();
  initSplitText();
  initIntersectionObserver();
});
