// ============================================================
//  l3xj Jellyfin Custom JS
//  1. Floating pill header on scroll
//  2. Sticky content tabs
// ============================================================

(function l3xjInit() {
    'use strict';

    // ── 1. Pill Header ──────────────────────────────────────
    // Toggle class on .skinHeader when user scrolls past threshold

    const PILL_CLASS = 'l3xj-pill-active';
    const SCROLL_THRESHOLD = 0;

    function initPillHeader() {
        const header = document.querySelector('.skinHeader');
        if (!header) return;

        // Measure header height and set CSS variable
        const updateHeaderHeight = () => {
            const h = header.offsetHeight || 64;
            document.documentElement.style.setProperty('--l3xj-header-height', h + 'px');
        };
        updateHeaderHeight();

        // Debounced resize observer for header height
        const ro = new ResizeObserver(updateHeaderHeight);
        ro.observe(header);

        // Scroll handler
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (window.scrollY > SCROLL_THRESHOLD) {
                    header.classList.add(PILL_CLASS);
                } else {
                    header.classList.remove(PILL_CLASS);
                }
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // set initial state
    }


    // ── 2. Sticky Content Tabs ──────────────────────────────
    // Add sticky class to .headerTabs.sectionTabs

    const STICKY_CLASS = 'l3xj-sticky-tabs';

    function initStickyTabs() {
        // Jellyfin dynamically creates tabs, so we observe for them
        const observer = new MutationObserver(() => {
            const tabBars = document.querySelectorAll('.headerTabs.sectionTabs');
            tabBars.forEach(tabBar => {
                if (!tabBar.classList.contains(STICKY_CLASS)) {
                    tabBar.classList.add(STICKY_CLASS);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Also check immediately
        document.querySelectorAll('.headerTabs.sectionTabs').forEach(tabBar => {
            tabBar.classList.add(STICKY_CLASS);
        });
    }


    // ── 3. Noise Texture Overlay ──────────────────────────────
    // Inject an SVG noise texture for wallpaper grain

    function initNoiseTexture() {
        if (document.querySelector('.l3xj-noise')) return;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('l3xj-noise');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.innerHTML = `
            <filter id="l3xj-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#l3xj-grain)"/>
        `;
        document.body.appendChild(svg);
    }


    // ── Boot ─────────────────────────────────────────────────
    // Wait for DOM + Jellyfin UI to be ready

    function boot() {
        if (document.querySelector('.skinHeader')) {
            initPillHeader();
            initStickyTabs();
            initNoiseTexture();
        } else {
            // Jellyfin may not have rendered yet; retry
            setTimeout(boot, 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();