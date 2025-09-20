/**
 * LoadingManager - Handles page loading states and transitions
 */
export class LoadingManager {
  constructor() {
    this.pageLoader = document.getElementById('pageLoader');
    this.pageTransition = document.getElementById('pageTransition');
    this.isLoading = false;

    this.initPageLoader();
    this.initTransitions();
  }

  initPageLoader() {
    // Show loader until page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoader();
      }, 500);
    });

    // Add typing animation to loader text
    this.animateLoaderText();
  }

  animateLoaderText() {
    const text = 'Loading...';
    const loaderText = document.querySelector('.loader-text');
    if (!loaderText) return;

    let index = 0;

    const typeWriter = () => {
      if (index < text.length) {
        loaderText.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          loaderText.textContent = '';
          index = 0;
          typeWriter();
        }, 1000);
      }
    };

    typeWriter();
  }

  hideLoader() {
    if (!this.pageLoader) return;

    this.pageLoader.classList.add('fade-out');
    setTimeout(() => {
      this.pageLoader.style.display = 'none';
      document.body.classList.add('loaded');
    }, 600);
  }

  initTransitions() {
    // Only add transition for external links that navigate away from the page
    document.querySelectorAll('a[href^="http"], a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', (e) => {
        // Only show transition for links that actually navigate away (not _blank)
        if (link.target !== '_blank' && !link.href.startsWith('mailto:')) {
          e.preventDefault();
          this.showTransition();
          setTimeout(() => {
            window.location.href = link.href;
          }, 600);
        }
      });
    });

    // Add transition for same-origin page navigation (like sonora/index.html)
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      // Only if it's a relative link to another page
      if (!link.href.startsWith('http') && !link.href.includes('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showTransition();
          setTimeout(() => {
            window.location.href = link.href;
          }, 600);
        });
      }
    });
  }

  showTransition() {
    if (this.isLoading || !this.pageTransition) return;
    this.isLoading = true;
    this.pageTransition.classList.add('active');
  }

  hideTransition() {
    if (!this.pageTransition) return;

    setTimeout(() => {
      this.pageTransition.classList.remove('active');
      this.isLoading = false;
    }, 300);
  }
}