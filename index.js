    const translations = {
        'en': {
            channelTitle: "Sam Plays",
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
            heroWelcome: "Welcome.",
            heroExperience: "Experience high-quality gaming content across titles like Minecraft, Subnautica and Grand Theft Auto.",
            heroSubscribe: "Subscribe",
            aboutTitle: "About Me",
            aboutParagraph: `Hey there! I'm Samar, the creator behind Sam Plays, where I dive into games like Minecraft, Would You Rather, and PUBG. It all started on a random day when a simple question popped into my head: "How do people upload videos to their channel?" That curiosity sparked something big—and just like that, Sam Plays was born. Now, I'm here to share my gaming adventures, have fun, and connect with awesome people like you. Hit that subscribe button and join the journey!`,
            quoteText: `"Sam Plays is a very good content creator. His gaming videos are engaging and entertaining. Keep up the great work, Sam Plays! Thank you for providing such awesome videos. I hope he never quits."`,
            faqTitle: "Frequently Asked Questions",
            faq1Question: "What types of games do you play?",
            faq1Answer: "I play a wide variety of games, from popular AAA titles to indie games. My main focus is on open-world, survival, and story-driven games, but I'm always open to trying new genres based on community suggestions!",
            faq2Question: "Do you create original gaming content?",
            faq2Answer: "Yes. 100% of my content is original. I handle everything from gameplay recording and editing to voiceovers and thumbnails. I haven't and don't plan to copy anyone's content.",
            faq3Question: "Can I request a specific game to be featured?",
            faq3Answer: "Absolutely! I welcome requests from my subscribers and consider featuring their favorite games in my upcoming videos. The best way to suggest a game is to leave a comment on my latest YouTube video.",
            faq4Question: "How frequently do you upload new videos?",
            faq4Answer: "Since I am the only person who makes the content, I am not very consistent, but I mostly upload at least two videos in a month. Quality is more important to me than quantity, so I take my time to make each video enjoyable.",
            changelogTitle: "Changelog",
            changelogEntry1Title: "Version 1.1 - July 23, 2025",
            changelogEntry1Features: `<li>Dynamic favicon based on current theme (dark/light mode).</li>
                                      <li>Improved side menu behavior: scrolling disabled on main body when menu is open (PC & mobile).</li>
                                      <li>Side menu now fills full screen on mobile and tablet views.</li>
                                      <li>Custom cursor now correctly hides on mobile/tablet/touch devices and when "Reduce Motion" is enabled.</li>`,
            socialsTitle: "My Socials",
            footerThanks: "Thanks for Visiting",
            footerContact: "Contact stgbussiness436@gmail.com for more info.",
            footerContactBtn: "Contact / Feedback",
            hotkeyTitle: "Keyboard Shortcuts",
            hotkeyHelp: "Show this help menu",
            hotkeyMenu: "Toggle menu",
            hotkeyScrollTop: "Scroll to top",
            hotkeyScrollBottom: "Scroll to bottom",
            hotkeyClose: "Close menu or dialog",
            cookieConsentText: "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
            cookieAcceptAll: "Accept All",
            cookieRejectAll: "Reject All",
            cookieCustomize: "Customize",
            cookieSettingsTitle: "Privacy Settings",
            cookieEssential: "Essential Cookies (Required)",
            cookieAnalytics: "Analytics Cookies",
            cookieMarketing: "Marketing Cookies",
            cookieSaveSettings: "Save Settings",
            cookieResetSettings: "Reset to Default",
        }
    };

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
      locoScroll.on('scroll', (args) => {
          lastScrollY = args.scroll.y;
          const header = document.getElementById('mainHeader');
          if (args.scroll.y > 50) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
          if (scrollTopBtn) {
              scrollTopBtn.classList.toggle('visible', args.scroll.y > window.innerHeight / 2);
          }
      });

      window.addEventListener('beforeunload', () => {
          sessionStorage.setItem('scrollPosition', lastScrollY);
      });
      
      const navigationEntries = performance.getEntriesByType("navigation");
      if (sessionStorage.getItem('scrollPosition') && navigationEntries.length > 0 && navigationEntries[0].type === 'back_forward') {
          const savedPosition = parseInt(sessionStorage.getItem('scrollPosition'), 10);
          if (!isNaN(savedPosition)) {
              setTimeout(() => {
                  locoScroll.scrollTo(savedPosition, { duration: 0, disableLerp: true });
                  sessionStorage.removeItem('scrollPosition');
              }, 100);
          }
      }

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
      }
      
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        button.addEventListener('click', () => {
          const wasActive = item.classList.contains('active');
          faqItems.forEach(otherItem => otherItem.classList.remove('active'));
          if (!wasActive) item.classList.add('active');
          setTimeout(() => { if (locoScroll) locoScroll.update(); }, 500);
        });
      });

      if (scrollTopBtn) {
          scrollTopBtn.addEventListener('click', () => {
            if (locoScroll) locoScroll.scrollTo('top');
          });
      }

      const reduceMotionToggle = document.getElementById('reduceMotionToggle');
      const cursorOptionsContainer = document.querySelector('.cursor-options');
      const cursorRadios = document.querySelectorAll('input[name="cursor-style"]');

      const cursorDot = document.querySelector('.cursor-dot');
      const cursorFollower = document.querySelector('.cursor-follower');
      
      let mouseX = 0, mouseY = 0;
      let followerX = 0, followerY = 0;
      
      window.addEventListener('mousemove', e => {
          mouseX = e.clientX;
          mouseY = e.clientY;
      });

      function animateCursor() {
          if (document.body.classList.contains('cursor-ambient-dot')) {
              cursorDot.style.left = `${mouseX}px`;
              cursorDot.style.top = `${mouseY}px`;
              followerX += (mouseX - followerX) * 0.1;
              followerY += (mouseY - followerY) * 0.1;
              cursorFollower.style.left = `${followerX}px`;
              cursorFollower.style.top = `${followerY}px`;
          }
          requestAnimationFrame(animateCursor);
      }
      animateCursor();


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
          } else {
              document.body.classList.remove('reduce-motion');
          }
          checkCursorSupport();
      }

      function checkCursorSupport() {
          const isMobileOrTablet = window.innerWidth <= 768 || ('ontouchstart' in window);
          const isReduceMotionActive = document.body.classList.contains('reduce-motion');

          if (isMobileOrTablet || isReduceMotionActive) {
              document.body.classList.add('no-custom-cursor');
              document.body.classList.remove('cursor-ambient-dot');
              document.body.style.cursor = 'default';
              if (cursorDot) cursorDot.style.display = 'none';
              if (cursorFollower) cursorFollower.style.display = 'none';

              cursorRadios.forEach(radio => {
                  radio.disabled = true;
                  radio.parentElement.style.opacity = '0.6';
                  radio.parentElement.style.cursor = 'not-allowed';
              });
              const defaultCursorRadio = document.querySelector('input[name="cursor-style"][value="default"]');
              if (defaultCursorRadio) {
                  defaultCursorRadio.checked = true;
              }

          } else {
              document.body.classList.remove('no-custom-cursor');
              const savedCursorStyle = localStorage.getItem('cursorStyle') || 'ambient-dot';
              updateCursorStyle(savedCursorStyle, false);

              cursorRadios.forEach(radio => {
                  radio.disabled = false;
                  radio.parentElement.style.opacity = '1';
                  radio.parentElement.style.cursor = 'pointer';
              });
          }
      }

      function updateCursorStyle(style, checkSupport = true) {
          if (checkSupport) {
              checkCursorSupport();
              if (document.body.classList.contains('no-custom-cursor')) {
                   return;
              }
          }

          document.body.classList.remove('cursor-ambient-dot');
          document.body.style.cursor = 'default';

          if (style === 'ambient-dot') {
              document.body.classList.add('cursor-ambient-dot');
              document.body.style.cursor = 'none';
              if (cursorDot) cursorDot.style.display = 'block';
              if (cursorFollower) cursorFollower.style.display = 'block';
          } else {
              document.body.style.cursor = style;
              if (cursorDot) cursorDot.style.display = 'none';
              if (cursorFollower) cursorFollower.style.display = 'none';
          }
          localStorage.setItem('cursorStyle', style);
      }
      
      checkCursorSupport();
      window.addEventListener('resize', checkCursorSupport);

      cursorRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          updateCursorStyle(e.target.value);
        });
      });
      
      document.querySelectorAll('a, button, .faq-question, .slider, select').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
      });

      themeRadios.forEach(radio => {
          radio.addEventListener('change', (e) => {
              applyTheme(e.target.value);
              checkCursorSupport();
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

      const cookieConsentBanner = document.getElementById('cookieConsentBanner');
      const acceptCookiesBtn = document.getElementById('acceptCookies');
      const rejectCookiesBtn = document.getElementById('rejectCookies');
      const customizeCookiesBtn = document.getElementById('customizeCookies');
      const cookieSettingsModal = document.getElementById('cookieSettingsModal');
      const closeCookieSettingsModalBtn = document.getElementById('closeCookieSettingsModalBtn');
      const essentialCookiesToggle = document.getElementById('essentialCookiesToggle');
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
        } else if (consentType === 'custom') {
          settings.analytics = analyticsCookiesToggle.checked;
          settings.marketing = marketingCookiesToggle.checked;
        }
        
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentSettings', JSON.stringify(settings));
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
