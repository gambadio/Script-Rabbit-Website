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

  // Initial animations
  const initialAnimations = () => {
    gsap.from('.hero-content h1', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.hero-content .cta-group', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out'
    });
  };

  initialAnimations();

  // Section animations
  const sectionIds = ['#benefits', '#use-cases', '#how-it-works', '#api', '#pricing'];
  
  sectionIds.forEach(section => {
    // Heading animations
    gsap.from(`${section} h2`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Card animations
    const cards = document.querySelectorAll(
      `${section} .benefit-card, 
       ${section} .use-case, 
       ${section} .step, 
       ${section} .api-card`
    );

    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out'
      });
    });
  });

  // Prevent logo click from scrolling
  document.querySelector('.logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scroll navigation with centered sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Don't process if it's the logo
      if (this.closest('.logo-link')) {
        return;
      }

      const target = document.querySelector(targetId);
      
      if (target) {
        const windowHeight = window.innerHeight;
        const sectionHeight = target.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        // Calculate position to center the section
        const centerPosition = targetPosition - (windowHeight / 2) + (sectionHeight / 2);
        
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: centerPosition,
            autoKill: false
          },
          ease: 'power2.inOut'
        });
      }
    });
  });

  // Enhanced scroll behavior with centered snapping
  let isScrolling;
  const sectionElements = document.querySelectorAll('section');
  let lastScrollPosition = window.pageYOffset;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      const currentPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Find the closest section
      let closestSection = null;
      let closestDistance = Infinity;
      
      sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionCenter = sectionTop + (sectionHeight / 2);
        const scrollCenter = currentPosition + (windowHeight / 2);
        const distance = Math.abs(scrollCenter - sectionCenter);
        
        // Only consider sections that are within 150px of current position
        if (distance < closestDistance && distance < 150) {
          closestDistance = distance;
          closestSection = section;
        }
      });
      
      // If we're close to a section, smoothly snap to center it
      if (closestSection) {
        const sectionHeight = closestSection.offsetHeight;
        const centerPosition = closestSection.offsetTop - (windowHeight / 2) + (sectionHeight / 2);
        
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {
            y: centerPosition,
            autoKill: false
          },
          ease: 'power2.out'
        });
      }
      
      lastScrollPosition = currentPosition;
    }, 150);
  }, { passive: true });

  // Touch handling for mobile with reduced sensitivity
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    
    // Reduce sensitivity for smoother scrolling
    const modified = delta * 0.5;
    
    window.scrollBy({
      top: modified,
      behavior: 'smooth'
    });
    
    touchStartY = touchEndY;
  }, { passive: true });

  // Enhanced hover animations
  document.querySelectorAll('.benefit-card, .use-case, .step, .api-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // Preload images for smoother experience
  const preloadImages = () => {
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        const newImg = new Image();
        newImg.src = src;
      }
    });
  };

  preloadImages();
});
