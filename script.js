// Smooth scrolling is handled by CSS scroll-behavior property

// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // For organic scrolling effect, using GSAP and ScrollTrigger
  
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  
    // Apply the effect to all sections
    gsap.utils.toArray('.section').forEach((section, index) => {
      gsap.fromTo(section, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true
        }
      });
  
      // Adding slight resistance effect between sections
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const progress = self.progress;
          const resistance = 50; // Adjust resistance value
          section.style.transform = `translateY(${progress * resistance}px)`;
        }
      });
    });
  } else {
    console.warn('GSAP or ScrollTrigger not loaded');
  }
  