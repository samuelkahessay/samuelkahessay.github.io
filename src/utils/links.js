/**
 * Link handling utilities
 */

/**
 * Handle external links with error handling and analytics
 */
export function handleExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Add security attributes
    if (!link.rel.includes('noopener')) {
      link.rel = link.rel ? `${link.rel} noopener` : 'noopener';
    }
    if (!link.rel.includes('noreferrer')) {
      link.rel = link.rel ? `${link.rel} noreferrer` : 'noreferrer';
    }

    // Add error handling
    link.addEventListener('error', () => {
      console.warn('External link may be unavailable:', link.href);
    });

    // Add click tracking
    link.addEventListener('click', (e) => {
      trackLinkClick(link.href, 'external');
    });
  });

  // Handle internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href').substring(1);
      trackLinkClick(`#${target}`, 'internal');
    });
  });

  // Handle email links
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
      trackLinkClick(link.href, 'email');
    });
  });
}

/**
 * Track link clicks for analytics
 */
function trackLinkClick(url, type) {
  console.log(`🔗 Link clicked: ${url} (${type})`);

  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Link',
      event_label: url,
      link_type: type
    });
  }

  // Send to other analytics platforms
  if (window.analytics) {
    window.analytics.track('Link Clicked', {
      url: url,
      type: type
    });
  }
}

/**
 * Validate and sanitize URLs
 */
export function validateUrl(url) {
  try {
    const urlObj = new URL(url);

    // Check for allowed protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      console.warn('Potentially unsafe URL protocol:', urlObj.protocol);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Invalid URL:', url);
    return false;
  }
}

/**
 * Add loading state to links
 */
export function addLinkLoadingStates() {
  document.querySelectorAll('a[data-loading="true"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('loading')) {
        e.preventDefault();
        return;
      }

      link.classList.add('loading');
      link.setAttribute('aria-busy', 'true');

      // Remove loading state after navigation or timeout
      setTimeout(() => {
        link.classList.remove('loading');
        link.removeAttribute('aria-busy');
      }, 3000);
    });
  });
}

/**
 * Preload important links on hover
 */
export function preloadLinksOnHover() {
  const preloadedUrls = new Set();

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const url = link.href;

      if (preloadedUrls.has(url)) return;
      if (!url.startsWith(window.location.origin)) return; // Only preload same-origin links

      const linkElement = document.createElement('link');
      linkElement.rel = 'prefetch';
      linkElement.href = url;

      document.head.appendChild(linkElement);
      preloadedUrls.add(url);
    }, { once: true });
  });
}

/**
 * Handle broken links gracefully
 */
export function handleBrokenLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('error', (e) => {
      console.error('Broken link detected:', link.href);

      // Add visual indicator
      link.classList.add('broken-link');
      link.setAttribute('aria-label', `${link.textContent} (link may be broken)`);

      // Optionally report to error tracking service
      if (window.Sentry) {
        window.Sentry.captureMessage(`Broken link: ${link.href}`);
      }
    });
  });
}

/**
 * Add download attributes for file links
 */
export function enhanceFileLinks() {
  const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.png', '.jpg', '.jpeg'];

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.href.toLowerCase();
    const hasFileExtension = fileExtensions.some(ext => href.includes(ext));

    if (hasFileExtension && !link.hasAttribute('download')) {
      const filename = href.split('/').pop();
      link.setAttribute('download', filename);

      // Add file type indicator
      const fileType = filename.split('.').pop().toUpperCase();
      link.setAttribute('aria-label', `${link.textContent} (${fileType} file)`);
    }
  });
}

/**
 * Smart link behavior based on context
 */
export class SmartLinkHandler {
  constructor() {
    this.init();
  }

  init() {
    this.handleExternalLinks();
    this.handleFileLinks();
    this.handleSocialLinks();
  }

  handleExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.startsWith(window.location.origin)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // Add external link icon
        this.addExternalLinkIcon(link);
      }
    });
  }

  handleFileLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      if (this.isFileLink(link.href)) {
        this.addFileIcon(link);
      }
    });
  }

  handleSocialLinks() {
    const socialDomains = ['twitter.com', 'facebook.com', 'instagram.com', 'linkedin.com', 'github.com'];

    document.querySelectorAll('a[href]').forEach(link => {
      const isSocial = socialDomains.some(domain => link.href.includes(domain));
      if (isSocial) {
        link.classList.add('social-link');
        this.addSocialIcon(link);
      }
    });
  }

  isFileLink(url) {
    const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip'];
    return fileExtensions.some(ext => url.toLowerCase().includes(ext));
  }

  addExternalLinkIcon(link) {
    if (link.querySelector('.external-icon')) return;

    const icon = document.createElement('span');
    icon.className = 'external-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '↗';
    link.appendChild(icon);
  }

  addFileIcon(link) {
    if (link.querySelector('.file-icon')) return;

    const icon = document.createElement('span');
    icon.className = 'file-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '📄';
    link.appendChild(icon);
  }

  addSocialIcon(link) {
    // Social icons are handled via CSS or existing markup
    link.classList.add('has-social-icon');
  }
}