/**
 * NavigationManager - Handles navigation functionality including mobile menu and scroll tracking
 */
export class NavigationManager {
  constructor() {
    this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    this.mobileNav = document.getElementById('mobileNav');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.scrollProgress = document.getElementById('scrollProgress');
    this.sections = document.querySelectorAll('section[id]');
    this.header = document.querySelector('.header');

    this.initMobileMenu();
    this.initScrollProgress();
    this.initActiveNavigation();
    this.initSmoothScrolling();
  }

  initMobileMenu() {
    if (!this.mobileMenuToggle) return;

    this.mobileMenuToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.header.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const isActive = this.mobileMenuToggle.classList.contains('active');

    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileNav) return;

    this.mobileMenuToggle.classList.add('active');
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileNav) return;

    this.mobileMenuToggle.classList.remove('active');
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  initScrollProgress() {
    if (!this.scrollProgress) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      this.scrollProgress.style.width = `${Math.min(scrollPercentage, 100)}%`;

      // Header background on scroll
      if (this.header) {
        if (scrollTop > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      }
    });
  }

  initActiveNavigation() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveNavLink(entry.target.id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === activeId) {
        link.classList.add('active');
      }
    });
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target && this.header) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          this.closeMobileMenu();
        }
      });
    });
  }
}