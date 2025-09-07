// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.initTheme();
        this.initThemeToggle();
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.initSmoothScroll();
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observeElements();
    }

    observeElements() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements with fade-in class
        document.querySelectorAll('.fade-in, .section, .skill-tag, .project-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Header Scroll Effects
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.navbar');
        if (this.header) {
            this.initScrollEffect();
        }
    }

    initScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (this.header) {
                // Add/remove scrolled class for styling
                if (currentScrollY > 100) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
                
                // Hide/show header based on scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    this.header.style.transform = 'translateY(-100%)';
                } else {
                    this.header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Performance Monitoring (Optional)
class PerformanceMonitor {
    constructor() {
        this.monitorPerformance();
    }

    monitorPerformance() {
        // Monitor Core Web Vitals if supported
        if ('web-vital' in window) {
            // This would require the web-vitals library
            // For now, we'll just do basic performance monitoring
        }

        // Basic page load time tracking
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        });
    }
}

// Mobile Menu Handler (for future mobile navigation)
class MobileMenuHandler {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        
        if (this.menuToggle && this.mobileMenu) {
            this.initMobileMenu();
        }
    }

    initMobileMenu() {
        this.menuToggle.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                this.mobileMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.mobileMenu.classList.remove('active');
                this.menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Skip to Content Link (Accessibility)
class SkipToContent {
    constructor() {
        this.createSkipLink();
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Error Handler
class ErrorHandler {
    constructor() {
        this.initErrorHandling();
    }

    initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            // Could send errors to analytics service here
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new SmoothScroll();
    new AnimationObserver();
    new HeaderEffects();
    new MobileMenuHandler();
    new SkipToContent();
    new ErrorHandler();
    new PerformanceMonitor();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Initialize any page-specific functionality
    initPageSpecific();
});

// Page-specific initialization
function initPageSpecific() {
    const currentPage = window.location.pathname;
    
    // Home page specific
    if (currentPage === '/' || currentPage === '/index.html') {
        initHomePage();
    }
    
    // Sonora pages specific
    if (currentPage.includes('/sonora/')) {
        initSonoraPages();
    }
}

// Home page specific initialization
function initHomePage() {
    // Add any home page specific JavaScript here
    
    // Example: Typing animation for hero text
    const heroText = document.querySelector('.hero-title');
    if (heroText) {
        // Could add typing effect here if desired
    }
}

// Sonora pages specific initialization
function initSonoraPages() {
    // Add Sonora-specific functionality
    
    // Example: FAQ toggle functionality for support page
    if (window.location.pathname.includes('support.html')) {
        initFAQToggles();
    }
}

// FAQ toggle functionality
function initFAQToggles() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait, immediate) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for use in other scripts
window.utils = utils;