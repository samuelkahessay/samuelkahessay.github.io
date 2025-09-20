/**
 * AnimationManager - Handles scroll-triggered animations and intersection observers
 */
export class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();

    this.initFadeInAnimations();
    this.initParallaxEffects();
    this.setupPerformanceOptimizations();
  }

  initFadeInAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          entry.target.classList.add('visible');
          this.animatedElements.add(entry.target);

          // Optionally unobserve after animation to improve performance
          if (entry.target.dataset.animateOnce !== 'false') {
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Store observer reference for cleanup
    this.observers.set('fadeIn', observer);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  initParallaxEffects() {
    // Only enable parallax on non-mobile devices for performance
    if (window.innerWidth < 768 || this.prefersReducedMotion()) {
      return;
    }

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollTop = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  }

  setupPerformanceOptimizations() {
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      const animatedElements = document.querySelectorAll('.fade-in.visible');

      if (document.hidden) {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'paused';
        });
      } else {
        animatedElements.forEach(el => {
          el.style.animationPlayState = 'running';
        });
      }
    });
  }

  // Utility method to check for reduced motion preference
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Method to trigger animations manually
  triggerAnimation(element, animationClass = 'animate') {
    if (!element) return;

    element.classList.add(animationClass);

    // Remove animation class after completion
    const handleAnimationEnd = () => {
      element.classList.remove(animationClass);
      element.removeEventListener('animationend', handleAnimationEnd);
    };

    element.addEventListener('animationend', handleAnimationEnd);
  }

  // Method to add new elements to be observed
  observeElement(element, options = {}) {
    const observer = this.observers.get('fadeIn');
    if (observer && element) {
      observer.observe(element);
    }
  }

  // Cleanup method for when component is destroyed
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.animatedElements.clear();
  }
}