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

    gsap.from('.hero-content .button-group', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out'
    });
  };

  initialAnimations();

  // Section animations
  const sections = ['#benefits', '#use-cases', '#how-it-works', '#api', '#pricing'];
  
  sections.forEach(section => {
    // Heading animations with refined trigger points
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

  // Improved smooth scroll navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        // Get target's position
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // Only scroll smoothly if we're not very close to the target
        if (Math.abs(distance) > window.innerHeight * 0.3) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetPosition - 80,
              autoKill: false
            },
            ease: 'power2.inOut'
          });
        } else {
          // If we're close, just jump to the position
          window.scrollTo({
            top: targetPosition - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Smooth scroll resistance with proximity-based snap
  let isScrolling;
  let lastScrollTop = window.pageYOffset;
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('wheel', (e) => {
    clearTimeout(isScrolling);
    
    const currentScroll = window.pageYOffset;
    const scrollDirection = e.deltaY > 0 ? 1 : -1;
    
    // Find the closest section
    let closestSection = null;
    let closestDistance = Infinity;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });
    
    // If we're very close to a section (within 100px)
    if (closestDistance < 100) {
      const targetPosition = closestSection.offsetTop - 80;
      gsap.to(window, {
        duration: 0.3,
        scrollTo: {
          y: targetPosition,
          autoKill: false
        },
        ease: 'power2.out'
      });
    } else {
      // Normal smooth scroll
      const delta = e.deltaY * 0.5;
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: currentScroll + delta,
          autoKill: false
        },
        ease: 'power2.out'
      });
    }
    
    lastScrollTop = currentScroll;
    
    isScrolling = setTimeout(() => {
      // After scrolling ends, snap to nearest section if we're close
      const finalPosition = window.pageYOffset;
      let closestSection = null;
      let closestDistance = Infinity;
      
      sections.forEach(section => {
        const distance = Math.abs(section.offsetTop - finalPosition - 80);
        if (distance < closestDistance && distance < window.innerHeight * 0.2) {
          closestDistance = distance;
          closestSection = section;
        }
      });
      
      if (closestSection) {
        gsap.to(window, {
          duration: 0.3,
          scrollTo: {
            y: closestSection.offsetTop - 80,
            autoKill: false
          },
          ease: 'power2.out'
        });
      }
    }, 150);
  }, { passive: true });

  // Touch handling for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
    const modified = delta * 0.5;
    
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: window.pageYOffset + modified,
        autoKill: false
      },
      ease: 'power2.out'
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