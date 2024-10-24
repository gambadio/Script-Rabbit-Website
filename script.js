// Initialize GSAP and its plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  
  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      const progress = Math.min(self.progress * 2, 1);
      navbar.style.background = `rgba(19, 19, 31, ${Math.min(progress + 0.8, 0.95)})`;
      if (self.progress > 0) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }
  });

  // Hero section animations
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero-content p', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-content .cta-group', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
  });

  // Gradient sphere parallax effect
  gsap.to('.gradient-sphere', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 200,
    opacity: 0.5
  });

  // Animate sections on scroll
  const sections = ['#benefits', '#use-cases', '#how-it-works', '#api', '#pricing', '#try-demo'];
  
  sections.forEach(section => {
    // Heading animations
    gsap.from(`${section} h2`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // Card animations for different section types
    const cardSelectors = {
      '#benefits': '.benefit-card',
      '#use-cases': '.use-case',
      '#how-it-works': '.step',
      '#api': '.api-card',
      '#pricing': '.pricing-card',
      '#try-demo': '.demo-limits, .demo-input'
    };

    if (cardSelectors[section]) {
      gsap.utils.toArray(`${section} ${cardSelectors[section]}`).forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out'
        });
      });
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
            offsetY: 100
          },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // Smooth scroll resistance
  let touchStart = 0;
  let touchEnd = 0;

  window.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    const modified = delta * 0.5;
    
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: window.scrollY + modified,
        autoKill: false
      },
      ease: 'power2.out'
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
    
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: window.scrollY + modified,
        autoKill: false
      },
      ease: 'power2.out'
    });
  }, { passive: true });

  // Demo button interactions
  const demoButton = document.querySelector('.demo-button');
  if (demoButton) {
    // Pulse animation
    gsap.to(demoButton, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Click handler
    demoButton.addEventListener('click', () => {
      // Add your demo functionality here
      console.log('Demo button clicked');
    });

    // Hover effects
    demoButton.addEventListener('mouseenter', () => {
      gsap.to(demoButton, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    demoButton.addEventListener('mouseleave', () => {
      gsap.to(demoButton, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }

  // Card hover animations
  const cards = document.querySelectorAll('.benefit-card, .use-case, .api-card, .step');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Pricing card special animation
  const pricingCard = document.querySelector('.pricing-card');
  if (pricingCard) {
    pricingCard.addEventListener('mouseenter', () => {
      gsap.to(pricingCard, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      });
    });

    pricingCard.addEventListener('mouseleave', () => {
      gsap.to(pricingCard, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      });
    });
  }

  // Background gradient animation
  gsap.to('.gradient-bg', {
    backgroundPosition: '200% 200%',
    duration: 20,
    repeat: -1,
    ease: 'none'
  });
});

// Optional: Preload images for smoother animations
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
});