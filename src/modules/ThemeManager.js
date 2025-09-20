/**
 * ThemeManager - Handles dark/light theme switching and persistence
 */
export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.html = document.documentElement;

    this.initTheme();
  }

  initTheme() {
    if (!this.themeToggle || !this.themeIcon) return;

    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.html.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.setTheme(newTheme);
        }
      });
    }
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon(theme);

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }

  updateThemeIcon(theme) {
    if (!this.themeIcon) return;
    this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  getCurrentTheme() {
    return this.html.getAttribute('data-theme') || 'light';
  }

  // Public method to set theme programmatically
  setThemePreference(theme) {
    if (theme === 'dark' || theme === 'light') {
      this.setTheme(theme);
    }
  }
}