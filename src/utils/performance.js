/**
 * Performance monitoring and optimization utilities
 */

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener('load', () => {
    measurePageLoadTime();
    measureResourceTiming();
  });

  // Monitor largest contentful paint
  if ('PerformanceObserver' in window) {
    observeLCP();
    observeFID();
    observeCLS();
  }
}

/**
 * Measure and log page load time
 */
function measurePageLoadTime() {
  if ('performance' in window) {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;

    console.log(`⚡ Page loaded in ${loadTime}ms (DOM ready: ${domReady}ms)`);

    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'load',
        value: loadTime
      });
    }
  }
}

/**
 * Monitor resource loading performance
 */
function measureResourceTiming() {
  if (!performance.getEntriesByType) return;

  const resources = performance.getEntriesByType('resource');
  const slowResources = resources.filter(resource => resource.duration > 1000);

  if (slowResources.length > 0) {
    console.warn('🐌 Slow loading resources detected:', slowResources);
  }
}

/**
 * Observe Largest Contentful Paint (LCP)
 */
function observeLCP() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    console.log(`🖼️ LCP: ${lastEntry.startTime.toFixed(2)}ms`);

    if (lastEntry.startTime > 2500) {
      console.warn('⚠️ LCP is slower than recommended (>2.5s)');
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

/**
 * Observe First Input Delay (FID)
 */
function observeFID() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`⌨️ FID: ${entry.processingStart - entry.startTime}ms`);

      if (entry.processingStart - entry.startTime > 100) {
        console.warn('⚠️ FID is slower than recommended (>100ms)');
      }
    });
  });

  observer.observe({ entryTypes: ['first-input'] });
}

/**
 * Observe Cumulative Layout Shift (CLS)
 */
function observeCLS() {
  let clsValue = 0;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();

    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });

    console.log(`📏 CLS: ${clsValue.toFixed(4)}`);

    if (clsValue > 0.1) {
      console.warn('⚠️ CLS is higher than recommended (>0.1)');
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

/**
 * Debounce function for performance optimization
 */
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy loading utility for images
 */
export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };

    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );

      this.loadElements();
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImages();
    }
  }

  loadElements() {
    const lazyElements = document.querySelectorAll('[data-src], [data-srcset]');
    lazyElements.forEach(element => {
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadElement(element) {
    const src = element.dataset.src;
    const srcset = element.dataset.srcset;

    if (src) {
      element.src = src;
      element.removeAttribute('data-src');
    }

    if (srcset) {
      element.srcset = srcset;
      element.removeAttribute('data-srcset');
    }

    element.classList.add('loaded');
  }

  loadAllImages() {
    const lazyElements = document.querySelectorAll('[data-src], [data-srcset]');
    lazyElements.forEach(element => {
      this.loadElement(element);
    });
  }
}

/**
 * Prefetch resources for better performance
 */
export function prefetchResource(url, type = 'prefetch') {
  if (!url) return;

  const link = document.createElement('link');
  link.rel = type;
  link.href = url;

  document.head.appendChild(link);
}

/**
 * Monitor memory usage (Chrome only)
 */
export function monitorMemoryUsage() {
  if (!performance.memory) {
    console.log('Memory monitoring not supported');
    return;
  }

  const formatBytes = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const logMemoryUsage = () => {
    const memory = performance.memory;
    console.log(`💾 Memory Usage:
      Used: ${formatBytes(memory.usedJSHeapSize)}
      Total: ${formatBytes(memory.totalJSHeapSize)}
      Limit: ${formatBytes(memory.jsHeapSizeLimit)}`);
  };

  logMemoryUsage();

  // Monitor every 30 seconds
  setInterval(logMemoryUsage, 30000);
}