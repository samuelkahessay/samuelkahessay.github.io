/**
 * Accessibility utilities and enhancements
 */

/**
 * Create and insert skip link for keyboard navigation
 */
export function createSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.cssText = `
      position: absolute;
      left: 6px;
      top: 7px;
      z-index: 999999;
      padding: 8px 16px;
      background: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 3px;
    `;
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Announce content to screen readers
 */
export function announceToScreenReader(message, priority = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Manage focus for modal-like interactions
 */
export class FocusManager {
  constructor(container) {
    this.container = container;
    this.focusableElements = null;
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.previouslyFocused = null;
  }

  init() {
    this.focusableElements = this.container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );

    if (this.focusableElements.length === 0) return;

    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];

    this.container.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  trapFocus() {
    this.previouslyFocused = document.activeElement;
    this.firstFocusable?.focus();
  }

  releaseFocus() {
    this.previouslyFocused?.focus();
  }

  handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable?.focus();
      }
    }
  }
}

/**
 * Add ARIA labels dynamically based on content
 */
export function enhanceAriaLabels() {
  // Enhance buttons without labels
  document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
    const text = button.textContent.trim();
    if (!text && button.querySelector('svg, img')) {
      console.warn('Button without accessible text found:', button);
    }
  });

  // Enhance links that open in new windows
  document.querySelectorAll('a[target="_blank"]:not([aria-label])').forEach(link => {
    const currentLabel = link.getAttribute('aria-label') || link.textContent.trim();
    link.setAttribute('aria-label', `${currentLabel} (opens in new tab)`);
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Ensure minimum color contrast for dynamic content
 */
export function checkColorContrast(foreground, background) {
  // Simple contrast ratio calculation
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(val => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const fgLuminance = getLuminance(foreground);
  const bgLuminance = getLuminance(background);

  const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) /
                  (Math.min(fgLuminance, bgLuminance) + 0.05);

  return {
    ratio: contrast,
    AA: contrast >= 4.5,
    AAA: contrast >= 7
  };
}