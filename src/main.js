/**
 * Main entry point for the portfolio website
 * Initializes all modules and components
 */

// Import modules
import { LoadingManager } from './modules/LoadingManager.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { ThemeManager } from './modules/ThemeManager.js';
import { AnimationManager } from './modules/AnimationManager.js';

// Import utilities
import { createSkipLink } from './utils/accessibility.js';
import { initPerformanceMonitoring } from './utils/performance.js';
import { handleExternalLinks } from './utils/links.js';

/**
 * Application class to manage the entire website functionality
 */
class PortfolioApp {
  constructor() {
    this.modules = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    if (this.isInitialized) {
      console.warn('Application already initialized');
      return;
    }

    try {
      // Initialize core modules
      this.modules.set('loading', new LoadingManager());
      this.modules.set('navigation', new NavigationManager());
      this.modules.set('theme', new ThemeManager());
      this.modules.set('animation', new AnimationManager());

      // Initialize utilities
      this.initUtilities();

      // Set up global event handlers
      this.setupGlobalHandlers();

      this.isInitialized = true;
      console.log('🚀 Portfolio app initialized successfully');

      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('app:ready', {
        detail: { app: this }
      }));

    } catch (error) {
      console.error('❌ Failed to initialize portfolio app:', error);
    }
  }

  /**
   * Initialize utility functions
   */
  initUtilities() {
    createSkipLink();
    initPerformanceMonitoring();
    handleExternalLinks();
  }

  /**
   * Set up global event handlers
   */
  setupGlobalHandlers() {
    // Handle theme changes
    window.addEventListener('themechange', (e) => {
      console.log(`🎨 Theme changed to: ${e.detail.theme}`);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleResize();
      }, 100);
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('📱 Page hidden - pausing non-essential operations');
      } else {
        console.log('👁️ Page visible - resuming operations');
      }
    });
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    // Close mobile menu if window becomes wide enough
    if (window.innerWidth > 768) {
      const navigationManager = this.modules.get('navigation');
      if (navigationManager) {
        navigationManager.closeMobileMenu();
      }
    }

    // Dispatch resize event for modules that need it
    window.dispatchEvent(new CustomEvent('app:resize', {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }));
  }

  /**
   * Get a specific module
   */
  getModule(name) {
    return this.modules.get(name);
  }

  /**
   * Get all modules
   */
  getModules() {
    return this.modules;
  }

  /**
   * Destroy the application and clean up
   */
  destroy() {
    this.modules.forEach((module, name) => {
      if (typeof module.destroy === 'function') {
        module.destroy();
      }
    });

    this.modules.clear();
    this.isInitialized = false;
    console.log('🗑️ Portfolio app destroyed');
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();

  // Make app globally accessible for debugging
  if (typeof window !== 'undefined') {
    window.portfolioApp = app;
  }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (window.portfolioApp) {
    window.portfolioApp.destroy();
  }
});

export { PortfolioApp };