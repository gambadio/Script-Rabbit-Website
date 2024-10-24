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

  // Subtle logo text wobble animation
  const logoText = document.querySelector('.logo-link span');
  const wobbleTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 4
  });

  wobbleTimeline
    .to(logoText, {
      duration: 0.3,
      rotateY: 2,
      scale: 1.02,
      ease: "sine.inOut"
    })
    .to(logoText, {
      duration: 0.3,
      rotateY: -2,
      scale: 1.01,
      ease: "sine.inOut"
    })
    .to(logoText, {
      duration: 0.3,
      rotateY: 1,
      scale: 1.015,
      ease: "sine.inOut"
    })
    .to(logoText, {
      duration: 0.3,
      rotateY: -1,
      scale: 1.005,
      ease: "sine.inOut"
    })
    .to(logoText, {
      duration: 0.3,
      rotateY: 0,
      scale: 1,
      ease: "sine.inOut"
    });

  logoText.style.transformStyle = "preserve-3d";
  logoText.style.perspective = "1000px";

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
      
      if (this.closest('.logo-link')) {
        return;
      }

      const target = document.querySelector(targetId);
      
      if (target) {
        const windowHeight = window.innerHeight;
        const sectionHeight = target.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
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
  let isSnapping = false;
  let snapCooldown = 1000; // 1 second cooldown
  let lastSnappedSection = null;
  const sectionElements = document.querySelectorAll('section');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (isSnapping) return;
    
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
        
        if (distance < closestDistance && distance < 150) {
          closestDistance = distance;
          closestSection = section;
        }
      });
      
      if (closestSection && closestSection !== lastSnappedSection) {
        isSnapping = true;
        lastSnappedSection = closestSection;
        
        const sectionHeight = closestSection.offsetHeight;
        const centerPosition = closestSection.offsetTop - (windowHeight / 2) + (sectionHeight / 2);
        
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {
            y: centerPosition,
            autoKill: false
          },
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              isSnapping = false;
            }, snapCooldown);
          }
        });
      }
    }, 150);
  }, { passive: true });

  // Touch handling for mobile with reduced sensitivity
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (isSnapping) return;
    
    touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;
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
