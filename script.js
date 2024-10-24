// script.js
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      navbar.style.background = `rgba(19, 19, 31, ${Math.min(self.progress * 2, 0.8)})`;
    }
  });

  // Smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80
          },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // Animation for hero section
  gsap.from('.hero-content', {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power3.out'
  });

  // Animate features on scroll
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: i * 0.1
    });
  });

  // Animate process steps
  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
      duration: 0.8,
      delay: i * 0.2
    });
  });

  // Pricing cards animation
  gsap.utils.toArray('.price-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      delay: i * 0.1
    });
  });

  // Parallax effect for gradient sphere
  gsap.to('.gradient-sphere', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 200,
    opacity: 0
  });
});

// Smooth scroll resistance
let touchStart = 0;
let touchEnd = 0;

window.addEventListener('wheel', (e) => {
  const delta = e.deltaY;
  const modified = delta * 0.5;
  window.scrollBy({
    top: modified,
    behavior: 'smooth'
  });
}, { passive: true });

// Mobile touch handling
window.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  touchEnd = e.touches[0].clientY;
  const delta = touchStart - touchEnd;
  const modified = delta * 0.5;
  window.scrollBy({
    top: modified,
    behavior: 'smooth'
  });
}, { passive: true });