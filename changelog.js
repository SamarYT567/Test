const translations = {
    'en': {
        channelTitle: "Sam Plays",
        navHome: "Home",
        navAbout: "About",
        navRecentVideos: "Recent Videos",
        navChangelog: "Changelog",
        headingAccessibility: "Accessibility",
        optionReduceMotion: "Reduce Motion",
        headingCursorStyle: "Cursor Style",
        cursorAmbientDot: "Ambient Dot",
        cursorDefault: "Default",
        cursorCrosshair: "Crosshair",
        headingTheme: "Theme",
        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",
        headingLanguage: "Language",
        hotkeyTitle: "Keyboard Shortcuts",
        hotkeyHelp: "Show this help menu",
        hotkeyMenu: "Toggle menu",
        hotkeyScrollTop: "Scroll to top",
        hotkeyScrollBottom: "Scroll to bottom",
        hotkeyClose: "Close menu or dialog",
        cookieConsentText: "We use cookies to enhance your Browse experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
        cookieAcceptAll: "Accept All",
        cookieRejectAll: "Reject All",
        cookieCustomize: "Customize",
        cookieSettingsTitle: "Privacy Settings",
        cookieEssential: "Essential Cookies (Required)",
        cookieAnalytics: "Analytics Cookies",
        cookieMarketing: "Marketing Cookies",
        cookieSaveSettings: "Save Settings",
        cookieResetSettings: "Reset to Default",
    },
    'de': {
        channelTitle: "Sam Spielt",
        navHome: "Startseite",
        navAbout: "Über Mich",
        navRecentVideos: "Neueste Videos",
        navChangelog: "Änderungsprotokoll",
        headingAccessibility: "Barrierefreiheit",
        optionReduceMotion: "Bewegung reduzieren",
        headingCursorStyle: "Cursor-Stil",
        cursorAmbientDot: "Umgebungs-Punkt",
        cursorDefault: "Standard",
        cursorCrosshair: "Fadenkreuz",
        headingTheme: "Thema",
        themeSystem: "System",
        themeLight: "Hell",
        themeDark: "Dunkel",
        headingLanguage: "Sprache",
        hotkeyTitle: "Tastaturkürzel",
        hotkeyHelp: "Dieses Hilfemenü anzeigen",
        hotkeyMenu: "Menü umschalten",
        hotkeyScrollTop: "Nach oben scrollen",
        hotkeyScrollBottom: "Nach unten scrollen",
        hotkeyClose: "Menü oder Dialog schließen",
        cookieConsentText: "Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Anzeigen oder Inhalte bereitzustellen und unseren Traffic zu analysieren. Indem Sie auf \"Alle akzeptieren\" klicken, stimmen Sie der Verwendung von Cookies zu.",
        cookieAcceptAll: "Alle akzeptieren",
        cookieRejectAll: "Alle ablehnen",
        cookieCustomize: "Anpassen",
        cookieSettingsTitle: "Datenschutzeinstellungen",
        cookieEssential: "Essenzielle Cookies (Erforderlich)",
        cookieAnalytics: "Analyse-Cookies",
        cookieMarketing: "Marketing-Cookies",
        cookieSaveSettings: "Einstellungen speichern",
        cookieResetSettings: "Auf Standard zurücksetzen",
    }
};

const GA_MEASUREMENT_ID = 'G-EG0GH8DHMB';

// Initializes Google Analytics and sets default consent
function initGoogleAnalytics() {
    // Prevent re-initialization
    if (window.gtag) {
        return;
    }
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    // Set default consent to 'denied' before any events are sent
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
    });

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    console.log('Google Analytics Initialized');
}

// Updates Google Analytics consent based on user settings
function updateGtagConsent(settings) {
    if (!window.gtag) {
        console.error("gtag not initialized");
        return;
    }
    const consentState = {
        'analytics_storage': settings.analytics ? 'granted' : 'denied',
        'ad_storage': settings.marketing ? 'granted' : 'denied',
        'ad_user_data': settings.marketing ? 'granted' : 'denied',
        'ad_personalization': settings.marketing ? 'granted' : 'denied',
    };
    gtag('consent', 'update', consentState);
    console.log('Google Analytics consent updated:', consentState);
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = translations[lang][key];
        if (translation) {
            el.innerHTML = translation;
        }
    });
    if (locoScroll) locoScroll.update();
}

const themeRadios = document.querySelectorAll('input[name="theme-style"]');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const faviconLink = document.getElementById('favicon');
const darkModeFavicon = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconDark.png';
const lightModeFavicon = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconLight.png';

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    let currentFavicon = darkModeFavicon;

    if (theme === 'light') {
        document.body.classList.add('light-theme');
        currentFavicon = lightModeFavicon;
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        currentFavicon = darkModeFavicon;
    } else if (theme === 'system') {
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            currentFavicon = darkModeFavicon;
        } else {
            document.body.classList.add('light-theme');
            currentFavicon = lightModeFavicon;
        }
    }
    localStorage.setItem('theme', theme);
    if (faviconLink) {
        faviconLink.href = currentFavicon;
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    const initialThemeRadio = document.querySelector(`input[name="theme-style"][value="${savedTheme}"]`);
    if (initialThemeRadio) {
        initialThemeRadio.checked = true;
    }
}

prefersDarkScheme.addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});

const reduceMotion = localStorage.getItem('reduceMotion') === 'true';

let locoScroll;

document.addEventListener('DOMContentLoaded', () => {
    // --- START: GA & Cookie Consent Initialization ---
    initGoogleAnalytics();
    const savedConsentSettings = localStorage.getItem('cookieConsentSettings');
    if (savedConsentSettings) {
        updateGtagConsent(JSON.parse(savedConsentSettings));
    }
    // --- END: GA & Cookie Consent Initialization ---

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) return;

    initializeTheme();

    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 500);
    }

    locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: !reduceMotion,
        getDirection: true,
    });

    let lastScrollY = 0;
    const header = document.getElementById('mainHeader');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    locoScroll.on('scroll', (args) => {
        lastScrollY = args.scroll.y;
        if (args.scroll.y > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', args.scroll.y > window.innerHeight / 2);
        }
    });

    imagesLoaded(scrollContainer, { background: true }, () => {
        if (locoScroll) locoScroll.update();
    });
    
    new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);

    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    
    function toggleMenu() {
        const isOpen = menuBtn.classList.contains('open');
        menuBtn.classList.toggle('open', !isOpen);
        sideMenu.classList.toggle('visible', !isOpen);

        if (!isOpen) {
            document.body.classList.add('no-scroll');
            if (locoScroll) {
                locoScroll.stop();
            }
        } else {
            document.body.classList.remove('no-scroll');
            if (locoScroll) {
                locoScroll.start();
            }
        }
    }

    if (menuBtn && sideMenu && closeMenuBtn) {
        menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
            vibrate(50);
        });
        closeMenuBtn.addEventListener('click', () => {
            toggleMenu();
            vibrate(50);
        });
        
        document.addEventListener('click', (event) => {
            if (sideMenu.classList.contains('visible') && !sideMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                toggleMenu();
                vibrate(50);
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        sideMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchEndX = 0;
        });

        sideMenu.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        sideMenu.addEventListener('touchend', () => {
            if (sideMenu.classList.contains('visible') && touchEndX !== 0) {
                const swipeDistance = touchEndX - touchStartX;
                if (swipeDistance > minSwipeDistance) {
                    toggleMenu();
                    vibrate(50);
                }
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            if (locoScroll) locoScroll.scrollTo('top');
            vibrate(50);
        });
    }

    const reduceMotionToggle = document.getElementById('reduceMotionToggle');
    const cursorRadios = document.querySelectorAll('input[name="cursor-style"]');

    if (reduceMotionToggle) {
        reduceMotionToggle.checked = reduceMotion;
        applyReduceMotionSettings(reduceMotion);

        reduceMotionToggle.addEventListener('change', (e) => {
            localStorage.setItem('reduceMotion', e.target.checked);
            applyReduceMotionSettings(e.target.checked);
            location.reload();
        });
    }

    function applyReduceMotionSettings(isReduced) {
        document.body.classList.toggle('reduce-motion', isReduced);
        cursorRadios.forEach(radio => {
            radio.disabled = isReduced;
        });
        if (isReduced) {
            const defaultCursorRadio = document.querySelector('input[name="cursor-style"][value="default"]');
            if (defaultCursorRadio) {
                defaultCursorRadio.checked = true;
                updateCursorStyle('default');
            }
        } else {
            const savedCursor = localStorage.getItem('cursorStyle') || 'ambient-dot';
            const currentCursorRadio = document.querySelector(`input[name="cursor-style"][value="${savedCursor}"]`);
            if(currentCursorRadio) currentCursorRadio.checked = true;
            updateCursorStyle(savedCursor);
        }
    }

    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            applyTheme(e.target.value);
            vibrate(30);
        });
    });

    const languageSelector = document.getElementById('languageSelector');
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = savedLanguage;
    setLanguage(savedLanguage);

    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        setLanguage(selectedLang);
        vibrate(30);
    });
    
    const hotkeyModal = document.getElementById('hotkeyHelpModal');
    const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');

    function showHelpModal() { hotkeyModal.hidden = false; }
    function hideHelpModal() { hotkeyModal.hidden = true; }

    if(closeHelpModalBtn) closeHelpModalBtn.addEventListener('click', hideHelpModal);

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        const key = e.key.toLowerCase();

        if (e.key === '?' || key === 'h') {
            showHelpModal();
            vibrate(20);
        }
        if (key === 'm') {
            toggleMenu();
            vibrate(20);
        }
        if (key === 't' && locoScroll) {
            locoScroll.scrollTo('top');
            vibrate(20);
        }
        if (key === 'b' && locoScroll) {
            locoScroll.scrollTo('bottom');
            vibrate(20);
        }
        if (e.key === 'Escape') {
            if (!hotkeyModal.hidden) {
                hideHelpModal();
                vibrate(20);
            } else if (sideMenu.classList.contains('visible')) {
                toggleMenu();
                vibrate(20);
            } else if (!cookieSettingsModal.hidden) {
                hideCookieSettingsModal();
                vibrate(20);
            }
        }
    });

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    window.addEventListener('mousemove', e => {
        if (!('ontouchstart' in window) || document.body.classList.contains('cursor-ambient-dot')) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    });

    function animateCursor() {
        if (document.body.classList.contains('cursor-ambient-dot') && !('ontouchstart' in window)) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
            cursorDot.style.display = 'block';
            cursorFollower.style.display = 'block';
        } else {
            cursorDot.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    function updateCursorStyle(style) {
        document.body.classList.remove('cursor-ambient-dot');
        document.body.style.cursor = 'default';

        if (!('ontouchstart' in window)) {
            if (style === 'ambient-dot') {
                document.body.classList.add('cursor-ambient-dot');
                document.body.style.cursor = 'none';
            } else {
                document.body.style.cursor = style;
            }
        } else {
            document.body.style.cursor = 'default';
        }
        localStorage.setItem('cursorStyle', style);
    }
    
    cursorRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateCursorStyle(e.target.value);
            vibrate(30);
        });
    });
    
    const initialCursor = localStorage.getItem('cursorStyle') || document.querySelector('input[name="cursor-style"][value="ambient-dot"]').value;
    updateCursorStyle(initialCursor);
    const initialCursorRadio = document.querySelector(`input[name="cursor-style"][value="${initialCursor}"]`);
    if(initialCursorRadio) initialCursorRadio.checked = true;


    document.querySelectorAll('a, button, select').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!('ontouchstart' in window)) {
                cursorFollower.classList.add('active');
            }
        });
        el.addEventListener('mouseleave', () => {
            if (!('ontouchstart' in window)) {
                cursorFollower.classList.remove('active');
            }
        });
    });

    function vibrate(duration) {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }

    document.querySelectorAll('button, a.subscribe-button, #openFeedbackFormBtn, #acceptCookies, #rejectCookies, #customizeCookies, #saveCookieSettings, #resetCookieSettings').forEach(element => {
        element.addEventListener('click', () => {
            vibrate(50);
        });
    });

    const cookieConsentBanner = document.getElementById('cookieConsentBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    const customizeCookiesBtn = document.getElementById('customizeCookies');
    const cookieSettingsModal = document.getElementById('cookieSettingsModal');
    const closeCookieSettingsModalBtn = document.getElementById('closeCookieSettingsModalBtn');
    const analyticsCookiesToggle = document.getElementById('analyticsCookiesToggle');
    const marketingCookiesToggle = document.getElementById('marketingCookiesToggle');
    const saveCookieSettingsBtn = document.getElementById('saveCookieSettings');
    const resetCookieSettingsBtn = document.getElementById('resetCookieSettings');

    function showCookieBanner() {
        if (!localStorage.getItem('cookieConsent')) {
            cookieConsentBanner.classList.add('show');
        }
    }

    function hideCookieBanner() {
        cookieConsentBanner.classList.remove('show');
    }

    function showCookieSettingsModal() {
        cookieSettingsModal.hidden = false;
        const consent = JSON.parse(localStorage.getItem('cookieConsentSettings')) || {};
        analyticsCookiesToggle.checked = consent.analytics || false;
        marketingCookiesToggle.checked = consent.marketing || false;
    }

    function hideCookieSettingsModal() {
        cookieSettingsModal.hidden = true;
    }

    function saveCookieConsent(consentType) {
        let settings = {
            essential: true,
            analytics: false,
            marketing: false
        };

        if (consentType === 'acceptAll') {
            settings.analytics = true;
            settings.marketing = true;
        } else if (consentType === 'rejectAll') {
             // settings remain false
        } else if (consentType === 'custom') {
            settings.analytics = analyticsCookiesToggle.checked;
            settings.marketing = marketingCookiesToggle.checked;
        }
        
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentSettings', JSON.stringify(settings));
        
        updateGtagConsent(settings);

        hideCookieBanner();
        hideCookieSettingsModal();
        console.log('Cookie consent saved:', settings);
    }

    acceptCookiesBtn.addEventListener('click', () => saveCookieConsent('acceptAll'));
    rejectCookiesBtn.addEventListener('click', () => saveCookieConsent('rejectAll'));
    customizeCookiesBtn.addEventListener('click', showCookieSettingsModal);
    closeCookieSettingsModalBtn.addEventListener('click', hideCookieSettingsModal);
    saveCookieSettingsBtn.addEventListener('click', () => saveCookieConsent('custom'));
    resetCookieSettingsBtn.addEventListener('click', () => {
        analyticsCookiesToggle.checked = false;
        marketingCookiesToggle.checked = false;
    });

    setTimeout(showCookieBanner, 1000);
});
