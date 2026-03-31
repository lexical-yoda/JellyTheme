# l3xj Jellyfin Theme - Amber

A custom Jellyfin theme with an amber accent color, glassmorphism floating header pill, atmospheric wallpaper, and cinematic detail page layouts.

## Screenshots

_Add screenshots here_

## Features

- **Amber accent color** throughout the UI (buttons, tabs, indicators, progress bars, hover states)
- **Floating pill header** - transparent at top, transitions to a glassmorphism pill on scroll
- **Atmospheric wallpaper** - warm amber gradient background on the home screen
- **Cinematic detail pages** - backdrop pushed right with gradient overlay, large bold titles
- **Card hover effects** - lift + zoom with amber glow on desktop, disabled on touch devices
- **Custom font** - Space Grotesk
- **Mobile optimized** - performance fallbacks, compact tab layout, disabled heavy blurs on touch
- **MediaBar compatible** - seamless transition between the MediaBar plugin and page content

## Requirements

- Jellyfin 10.9+
- [JS Injector Plugin](https://github.com/nicholasamiller/jellyfin-plugin-js-injector) (for the custom JS)
- A modern browser with CSS `:has()` support (Chrome 105+, Firefox 121+, Safari 15.4+)

## Installation

### Custom CSS

1. Go to **Dashboard > General > Custom CSS**
2. Paste the contents of `custom.css`

### Custom JS

1. Install the **JS Injector Plugin** from the Jellyfin plugin catalog
2. Add the contents of `custom.js` as an injected script

## What each file does

### `custom.css`

| Section | Description |
|---------|-------------|
| Root Variables | Amber palette, background color |
| Custom Font | Space Grotesk applied globally |
| Base Theme Overrides | Surfaces, inputs, buttons, list items |
| Accent Color Override | Amber applied to checkboxes, toggles, progress bars, indicators |
| Active Tabs & Links | Tab text color, hover states, nav menu |
| Floating Pill Header | Transparent base state, glassmorphism pill on scroll |
| Card Hover & Zoom | Lift, shadow, image zoom with blur layer on desktop |
| Detail Page Layout | Cinematic backdrop, large titles, actor page layout |
| Wallpaper Background | Atmospheric amber gradient on home screen |
| Sticky Content Tabs | Section tabs stay visible while scrolling |
| Progress Bars | Amber gradient progress indicators |
| Inputs & Focus | Amber border on focused inputs |
| Scrollbar | Custom thin scrollbar with amber hover |
| Indicators & Badges | Amber played/count indicators |
| Drawer / Sidebar | Themed nav icons and hover states |
| Mobile Optimization | Disabled transforms, blurs, and animations on touch devices |

### `custom.js`

- **Pill header toggle** - adds/removes `l3xj-pill-active` class on `.skinHeader` based on scroll position
- **Sticky tabs** - adds `l3xj-sticky-tabs` class to `.headerTabs.sectionTabs` elements
- Uses `ResizeObserver` to track header height and `requestAnimationFrame` for smooth scroll handling

## Optional Plugins

These plugins pair well with the theme:

- [MediaBar](https://github.com/IAmParadox27/Jellyfin-Media-Bar) - hero slideshow on home screen
- [Jellyfin Enhanced](https://github.com/prayag17/jellyfin-enhanced) - additional UI features

## Customization

### Change accent color

Replace the amber variables in `:root`:

```css
:root {
    --amber: #E8920D;        /* Primary accent */
    --amber-bright: #FF9900; /* Hover state */
    --amber-deep: #D84315;   /* Progress bars, gradients */
}
```

### Change wallpaper

Edit the `body::before` background in section 4. You can replace the CSS gradients with an image:

```css
background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('your-image-url-here');
```

### Change font

Replace the Google Fonts import and font-family declarations at the top of the file.

## Credits

- Inspired by [H-Tv](https://github.com/Hu1k1e) Jellyfin theme
- Font: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) by Florian Karsten

## License

MIT
