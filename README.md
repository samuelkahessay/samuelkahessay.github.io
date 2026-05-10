# samuelkahessay.github.io

Hidden direct-link pages hosted on GitHub Pages.

The canonical personal site is [skahessay.dev](https://skahessay.dev/). This repository should not become a second portfolio, project index, or public lab directory.

## Purpose

- Keep Sonora support, privacy, and terms pages reachable at stable App Store URLs.
- Keep any direct-link utility artifacts reachable by exact URL only.
- Avoid sitemaps, public indexes, root navigation, or discovery pages.
- Avoid root redirects or robots rules that could interfere with other GitHub Pages project sites under `samuelkahessay.github.io`, especially `squash-analysis`.

## Important URLs

- `https://samuelkahessay.github.io/sonora/`
- `https://samuelkahessay.github.io/sonora/privacy-policy.html`
- `https://samuelkahessay.github.io/sonora/terms-of-service.html`
- `https://samuelkahessay.github.io/sonora/support.html`

## Local Check

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/sonora/support.html` or another exact URL.
