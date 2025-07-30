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
        recentVideosTitle: "Recent Videos",
        hotkeyTitle: "Keyboard Shortcuts",
        hotkeyHelp: "Show this help menu",
        hotkeyMenu: "Toggle menu",
        hotkeyScrollTop: "Scroll to top",
        hotkeyScrollBottom: "Scroll to bottom",
        hotkeyClose: "Close menu or dialog",
        cookieConsentText: `We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.`,
        cookieAcceptAll: "Accept All",
        cookieRejectAll: "Reject All",
        cookieCustomize: "Customize",
        cookieSettingsTitle: "Privacy Settings",
        cookieEssential: "Essential Cookies (Required)",
        cookieAnalytics: "Analytics Cookies",
        cookieMarketing: "Marketing Cookies",
        cookieSaveSettings: "Save Settings",
        cookieResetSettings: "Reset to Default",
        viewMoreVideos: "View More Videos"
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
        recentVideosTitle: "Neueste Videos",
        hotkeyTitle: "Tastaturkürzel",
        hotkeyHelp: "Dieses Hilfemenü anzeigen",
        hotkeyMenu: "Menü umschalten",
        hotkeyScrollTop: "Nach oben scrollen",
        hotkeyScrollBottom: "Nach unten scrollen",
        hotkeyClose: "Menü oder Dialog schließen",
        cookieConsentText: `Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern, personalisierte Anzeigen oder Inhalte bereitzustellen und unseren Traffic zu analysieren. Indem Sie auf "Alle akzeptieren" klicken, stimmen Sie der Verwendung von Cookies zu.`,
        cookieAcceptAll: "Alle akzeptieren",
        cookieRejectAll: "Alle ablehnen",
        cookieCustomize: "Anpassen",
        cookieSettingsTitle: "Datenschutzeinstellungen",
        cookieEssential: "Essenzielle Cookies (Erforderlich)",
        cookieAnalytics: "Analyse-Cookies",
        cookieMarketing: "Marketing-Cookies",
        cookieSaveSettings: "Einstellungen speichern",
        cookieResetSettings: "Auf Standard zurücksetzen",
        viewMoreVideos: "Weitere Videos anzeigen"
    }
};

const GA_MEASUREMENT_ID = 'G-EG0GH8DHMB';

// Initializes Google Analytics
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
const darkFaviconUrl = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconDark.png';
const lightFaviconUrl = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconLight.png';

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    let currentFaviconUrl = lightFaviconUrl;

    if (theme === 'light') {
        document.body.classList.add('light-theme');
        currentFaviconUrl = lightFaviconUrl;
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        currentFaviconUrl = darkFaviconUrl;
    } else if (theme === 'system') {
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            currentFaviconUrl = darkFaviconUrl;
        } else {
            document.body.classList.add('light-theme');
            currentFaviconUrl = lightFaviconUrl;
        }
    }
    localStorage.setItem('theme', theme);
    if (faviconLink) {
        faviconLink.href = currentFaviconUrl;
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
    initGoogleAnalytics();
    const savedConsentSettings = localStorage.getItem('cookieConsentSettings');
    if (savedConsentSettings) {
        updateGtagConsent(JSON.parse(savedConsentSettings));
    }

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

    locoScroll.on('scroll', (args) => {
        const header = document.getElementById('mainHeader');
        if (args.scroll.y > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', args.scroll.y > window.innerHeight / 2);
        }
    });
    
    imagesLoaded(scrollContainer, { background: true }, () => {
        if (locoScroll) locoScroll.update();
    });
    
    new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);

    const header = document.getElementById('mainHeader');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

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
        });
        closeMenuBtn.addEventListener('click', toggleMenu);
        
        document.addEventListener('click', (event) => {
            if (sideMenu.classList.contains('visible') && !sideMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                toggleMenu();
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
                }
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    }
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            if (locoScroll) locoScroll.scrollTo('top');
        });
    }

    const reduceMotionToggle = document.getElementById('reduceMotionToggle');
    const cursorOptionsContainer = document.querySelector('.cursor-options');
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
        if (isReduced) {
            document.body.classList.add('reduce-motion');
            cursorRadios.forEach(radio => {
                radio.disabled = true;
            });
            const defaultCursorRadio = document.querySelector('input[name="cursor-style"][value="default"]');
            if (defaultCursorRadio) {
                defaultCursorRadio.checked = true;
                updateCursorStyle('default');
            }
        } else {
            document.body.classList.remove('reduce-motion');
            cursorRadios.forEach(radio => {
                radio.disabled = false;
            });
            const ambientDotRadio = document.querySelector('input[name="cursor-style'][value="ambient-dot"]');
            if (ambientDotRadio) {
                ambientDotRadio.checked = true;
                updateCursorStyle('ambient-dot');
            }
        }
    }

    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            applyTheme(e.target.value);
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
    });
    
    const hotkeyModal = document.getElementById('hotkeyHelpModal');
    const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');

    function showHelpModal() { hotkeyModal.hidden = false; }
    function hideHelpModal() { hotkeyModal.hidden = true; }

    closeHelpModalBtn.addEventListener('click', hideHelpModal);

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }
        
        const key = e.key.toLowerCase();

        if (e.key === '?' || key === 'h') {
            showHelpModal();
        }
        if (key === 'm') {
            toggleMenu();
        }
        if (key === 't') {
            locoScroll.scrollTo('top');
        }
        if (key === 'b') {
            locoScroll.scrollTo('bottom');
        }
        if (e.key === 'Escape') {
            if (!hotkeyModal.hidden) {
                hideHelpModal();
            } else if (sideMenu.classList.contains('visible')) {
                toggleMenu();
            } else if (!cookieSettingsModal.hidden) {
                hideCookieSettingsModal();
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
        });
    });
    
    const initialCursor = localStorage.getItem('cursorStyle') || document.querySelector('input[name="cursor-style"][value="ambient-dot"]').value;
    updateCursorStyle(initialCursor);

    document.querySelectorAll('a, button, .faq-question, .slider, select').forEach(el => {
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

    const allVideosData = [
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/d3oIJsELCoM/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=uL_f_3x_4y_5",
            title: "Further Into The Depths (Hindi) | Subnautica Part 3 | Sam Plays"
        },
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/u6PCFCBlMA8/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=rC500sK_t2o",
            title: "Surviving as an Undercover Cop (Hindi) | Sleeping Dogs Episode 1 | Sam Plays"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/eRou7u-pUdw/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=eRou7u-pUdw",
            title: "Surviving my First day in Liberty City (Hindi) | GTA III Story Mode Walkthrough | Episode 1"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/Hy67SdfabQQ/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=Hy67SdfabQQ",
            title: "Making my First Farm [Minecraft Part 6]"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/tWY0ghnb8-Y/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=tWY0ghnb8-Y",
            title: "Can i beat this guy? [Akinator Part 2]"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/lS8X0lv1Xm8/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=lS8X0lv1Xm8",
            title: "Playing this game once again... [Minecraft Survival Part 5]"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/_xAe_RBzuYM/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=_xAe_RBzuYM",
            title: "Exploring The Mysterious Depths! | Subnautica Part 2"
        },
        {
            thumbnailUrl: "https://img.youtube.com/vi/lDNlLVJVNgc/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=lDNlLVJVNgc",
            title: "Ocean World with Aliens | Subnautica Part - 1"
        },
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/n5c0EJnTRAQ/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=5L-1aB2c3D4",
            title: "A Bad Decision"
        },
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/qTBNixDtIxo/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=xY_z_1a2b3c",
            title: "Would You Rather (Episode 2)"
        },
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/919shCeew-M/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=8Pq2vGj-0s4",
            title: "WE DID IT! A Difficult Game About Climbing (Episode 4)"
        },
        {
            thumbnailUrl: "https://i3.ytimg.com/vi/1I74ECLn_5g/sddefault.jpg", 
            videoUrl: "https://www.youtube.com/watch?v=kM0nO_p1q2r",
            title: "  Ultimate Comeback! A Difficult Game About Climbing (Episode 3)"
        }
    ];

    const videosPerPage = 6;
    let currentVideoIndex = 0;
    const videoContainer = document.getElementById('videoContainer');
    const viewMoreBtn = document.getElementById('viewMoreBtn');

    function renderVideos() {
        const endIndex = currentVideoIndex + videosPerPage;
        const videosToRender = allVideosData.slice(currentVideoIndex, endIndex);

        videosToRender.forEach((video, index) => {
            const videoBox = document.createElement('div');
            videoBox.className = 'video-box';
            videoBox.setAttribute('data-scroll', '');
            videoBox.setAttribute('data-scroll-class', 'is-inview');
            videoBox.setAttribute('data-scroll-delay', `${0.05 * (currentVideoIndex + index + 1)}`); 

            const videoLink = document.createElement('a');
            videoLink.href = video.videoUrl;
            videoLink.target = '_blank';
            videoLink.title = `Watch ${video.title}`;

            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'thumbnail-container';

            const thumbnailImg = document.createElement('img');
            thumbnailImg.className = 'video-thumbnail';
            thumbnailImg.src = video.thumbnailUrl;
            thumbnailImg.alt = `${video.title} Thumbnail`;
            thumbnailImg.onerror = function() { this.onerror=null; this.src='https://placehold.co/600x338/0a0f14/cce7ff?text=Video+Not+Found'; };
            thumbnailImg.loading = 'lazy'; 

            const videoTitle = document.createElement('p');
            videoTitle.className = 'video-title';
            videoTitle.textContent = video.title;

            thumbnailContainer.appendChild(thumbnailImg);
            videoLink.appendChild(thumbnailContainer);
            videoLink.appendChild(videoTitle);
            videoBox.appendChild(videoLink);
            videoContainer.appendChild(videoBox);
        });

        currentVideoIndex = endIndex;
        if (currentVideoIndex >= allVideosData.length) {
            viewMoreBtn.style.display = 'none';
        } else {
            viewMoreBtn.style.display = 'inline-flex';
        }
        if (locoScroll) locoScroll.update();
    }

    renderVideos(); 

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', renderVideos);
    }
});
