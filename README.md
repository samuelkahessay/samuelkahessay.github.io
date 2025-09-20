# Samuel Kahessay - Portfolio Website

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript, enhanced with Vite for development and build optimization.

## ✨ Features

- **Modern Design**: Clean, professional layout with glassmorphism effects
- **Responsive**: Optimized for all device sizes
- **Accessible**: WCAG compliant with screen reader support
- **Performance**: Optimized images, lazy loading, and efficient animations
- **Dark Mode**: Automatic theme switching with system preference detection
- **Interactive**: Smooth animations and micro-interactions
- **Progressive**: Enhanced with modern web technologies

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Custom Properties
- **Icons**: Emoji-based icons for universal compatibility
- **Hosting**: GitHub Pages
- **Code Quality**: ESLint, Prettier
- **Type Safety**: TypeScript (for type checking)

## 🛠️ Development Setup

### Quick Start

The site is built with modern vanilla JavaScript and requires no build process for development.

#### Option 1: Simple Development Server

```bash
# Install deployment tools (optional)
npm install

# Start local development server
npm run dev
```

The site will be available at `http://localhost:8000`

#### Option 2: Direct File Access

Simply open `index.html` in your browser. The modular JavaScript will work with ES6 imports.

### Available Scripts

- `npm run dev` - Start Python development server on port 8000
- `npm run serve` - Alternative command for development server
- `npm run deploy` - Deploy directly to GitHub Pages
- `npm run lint` - Code quality placeholder
- `npm run format` - Code formatting placeholder

### Development Features

- **ES6 Modules**: Modern JavaScript with clean imports
- **Hot Reload**: Browser will refresh automatically with file changes
- **Direct Deployment**: No build step required for GitHub Pages
- **Performance**: Optimized vanilla code loads instantly

## 📁 Project Structure

```
├── index.html              # Main landing page
├── style.css              # Global styles and theme system
├── src/                   # Modular JavaScript
│   ├── main.js            # Application entry point
│   ├── modules/           # Core feature modules
│   │   ├── LoadingManager.js
│   │   ├── NavigationManager.js
│   │   ├── ThemeManager.js
│   │   └── AnimationManager.js
│   └── utils/             # Utility functions
│       ├── accessibility.js
│       ├── performance.js
│       └── links.js
├── sonora/                # Sonora app pages
│   ├── index.html         # Product page
│   ├── privacy-policy.html
│   ├── terms-of-service.html
│   └── support.html
├── package.json           # Dependencies and scripts
└── .gitignore             # Git ignore rules
```

## 🎨 Design System

### Color Palette

The site uses a carefully crafted color system with CSS custom properties for both light and dark themes:

- **Primary**: Blue tones for main actions and highlights
- **Accent**: Orange for secondary actions and emphasis
- **Text**: High-contrast colors for optimal readability
- **Backgrounds**: Layered surfaces with glassmorphism effects

### Typography

- **Font Stack**: System fonts for optimal performance
- **Scale**: Modular scale using CSS custom properties
- **Weights**: Strategic use of font weights for hierarchy
- **Line Heights**: Optimized for readability

### Animations

- **Micro-interactions**: Subtle hover and focus states
- **Page Transitions**: Smooth navigation between sections
- **Loading States**: Elegant loading animations
- **Accessibility**: Respects `prefers-reduced-motion`

## 🌐 Browser Support

- Chrome/Chromium (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📱 Responsive Design

The site is fully responsive with breakpoints at:
- Mobile: 480px and below
- Tablet: 768px and below
- Desktop: 1024px and above

## ♿ Accessibility Features

- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** optimized
- **High contrast** mode support
- **Focus management** for interactive elements
- **ARIA labels** and semantic HTML

## 🚀 Performance Optimizations

- **CSS**: Minified and optimized with PostCSS
- **JavaScript**: Tree-shaken and minified
- **Images**: Optimized loading and modern formats
- **Caching**: Optimized for browser caching
- **Lazy Loading**: Progressive content loading

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

Samuel Kahessay - [kahessay@icloud.com](mailto:kahessay@icloud.com)

Project Link: [https://samuelkahessay.github.io](https://samuelkahessay.github.io)

---

Built with ❤️ and modern web technologies