/* ============================================================================
 * main.js — Shared Logic for ilios Restaurant & Lounge Multi-Page Website
 * ============================================================================
 * Loaded with defer AFTER data.js. Zero external dependencies.
 * ========================================================================= */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
   * 1. JS ACTIVATION & REVEAL FALLBACK
   * ----------------------------------------------------------------------- */
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  /* Safety fallback: if IntersectionObserver or slow assets stall reveals */
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.active)').forEach(function (el) {
      el.classList.add('active');
    });
  }, 3000);

  /* --------------------------------------------------------------------------
   * 2. GA4 TRACKING HELPER
   * ----------------------------------------------------------------------- */
  function initGA4() {
    if (typeof CONFIG === 'undefined' || !CONFIG.GA4_ID) return;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_ID);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.GA4_ID);
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  /* --------------------------------------------------------------------------
   * 3. DATE & PHONE HELPERS
   * ----------------------------------------------------------------------- */
  function getISTDate() {
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 5.5));
  }

  function formatDateDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length === 3) {
      return parts[2] + '/' + parts[1] + '/' + parts[0];
    }
    return dateStr;
  }

  function getTodayISO() {
    var ist = getISTDate();
    var y = ist.getFullYear();
    var m = String(ist.getMonth() + 1).padStart(2, '0');
    var d = String(ist.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function validateIndianPhone(value) {
    if (!value) return null;
    var cleaned = value.replace(/[\s\-\+]/g, '').replace(/^91/, '').replace(/^0/, '');
    if (/^[6-9]\d{9}$/.test(cleaned)) {
      return cleaned;
    }
    return null;
  }

  /* --------------------------------------------------------------------------
   * 4. WHATSAPP MESSAGE BUILDER (Single Source of Truth for Booking Text)
   * ----------------------------------------------------------------------- */
  function openWhatsApp(type, data, source) {
    data = data || {};
    source = source || 'website';
    var text = '';
    var waNumber = (typeof CONFIG !== 'undefined' && CONFIG.WHATSAPP_NUMBER) ? CONFIG.WHATSAPP_NUMBER : '917065041400';

    if (type === 'quick') {
      text = "Hi ilios! I'd like to book a table. Could you share availability?\n(via website – " + source + ")";
    } else if (type === 'live_night') {
      text = "Hi ilios! I'd like to book a table for " + (data.eventName || 'Live Night') +
             " on " + (data.dateStr || '') + " (" + (data.time || '8:30 PM') + "). How many people: __\n" +
             "(via website – Live Nights: " + (data.eventName || 'Event') + ")";
    } else if (type === 'reserve') {
      text = "Hi ilios! Table booking request:\n" +
             "Name: " + (data.name || '') + "\n" +
             "Phone: " + (data.phone || '') + "\n" +
             "Date: " + formatDateDDMMYYYY(data.date) + "\n" +
             "Time: " + (data.time || '') + "\n" +
             "Guests: " + (data.guests || '') + "\n" +
             "Table: " + (data.tableType || 'No preference') + "\n" +
             "Note: " + (data.note || '–') + "\n" +
             "(via website – Reserve form)";
    } else if (type === 'party') {
      text = "Hi ilios! Party enquiry:\n" +
             "Name: " + (data.name || '') + "\n" +
             "Phone: " + (data.phone || '') + "\n" +
             "Event date: " + formatDateDDMMYYYY(data.date) + "\n" +
             "Guests: " + (data.guests || '') + "\n" +
             "Occasion: " + (data.occasion || '') + "\n" +
             "Budget per person: " + (data.budget || 'Not decided') + "\n" +
             "(via website – Party form)";
    } else {
      text = "Hi ilios! I have an enquiry.\n(via website – " + source + ")";
    }

    trackEvent('whatsapp_click', { source: source, type: type });

    var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Expose globally for inline onclick if needed
  window.openWhatsApp = openWhatsApp;

  /* --------------------------------------------------------------------------
   * 5. NAVIGATION (Desktop Dropdowns & Mobile Accordion)
   * ----------------------------------------------------------------------- */
  function initNav() {
    var nav = document.getElementById('main-nav');
    var isSolid = nav && nav.classList.contains('site-nav--solid');

    // Scroll listener for transparent home nav
    if (nav && !isSolid) {
      window.addEventListener('scroll', function () {
        var threshold = window.innerHeight * 0.75;
        if (window.scrollY > threshold) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Desktop dropdowns
    var navItems = document.querySelectorAll('.nav-item.has-dropdown');
    navItems.forEach(function (item) {
      var toggle = item.querySelector('.nav-dropdown-toggle');
      var menu = item.querySelector('.nav-dropdown-menu');

      if (toggle && menu) {
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          var isOpen = item.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) {
            item.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });

    function closeAllDropdowns() {
      navItems.forEach(function (item) {
        item.classList.remove('open');
        var toggle = item.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }

    // Close dropdowns on outside click or Esc
    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        closeMobileMenu();
      }
    });

    // Mobile menu toggle
    var toggleBtn = document.getElementById('menu-toggle-btn');
    var overlay = document.getElementById('mobile-nav-overlay');

    if (toggleBtn && overlay) {
      toggleBtn.addEventListener('click', function () {
        var isOpen = overlay.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    function openMobileMenu() {
      if (!overlay || !toggleBtn) return;
      overlay.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('mobile-menu-open');
    }

    function closeMobileMenu() {
      if (!overlay || !toggleBtn) return;
      overlay.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('mobile-menu-open');
    }

    // Mobile accordions
    var accHeaders = document.querySelectorAll('.mobile-accordion-header');
    accHeaders.forEach(function (hdr) {
      hdr.addEventListener('click', function () {
        var panel = hdr.nextElementSibling;
        if (!panel) return;
        var isOpen = panel.classList.contains('open');

        // Close other panels
        document.querySelectorAll('.mobile-accordion-panel').forEach(function (p) {
          p.classList.remove('open');
        });
        document.querySelectorAll('.mobile-accordion-header span:last-child').forEach(function (s) {
          s.textContent = '+';
        });

        if (!isOpen) {
          panel.classList.add('open');
          hdr.querySelector('span:last-child').textContent = '–';
        }
      });
    });

    // Close mobile menu on any link click
    var mobileLinks = document.querySelectorAll('.mobile-overlay a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close button in mobile overlay header
    var overlayCloseBtn = document.getElementById('mobile-overlay-close-btn');
    if (overlayCloseBtn) {
      overlayCloseBtn.addEventListener('click', closeMobileMenu);
    }
  }

  /* --------------------------------------------------------------------------
   * 5b. MOBILE STICKY BOTTOM BAR OBSERVER & KEYBOARD HANDLER
   * ----------------------------------------------------------------------- */
  function initStickyBar() {
    var bar = document.querySelector('.mobile-bottom-bar');
    if (!bar) return;

    var hero = document.getElementById('hero');
    if (hero) {
      bar.classList.add('bar-hidden');
      if ('IntersectionObserver' in window) {
        var heroObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              bar.classList.add('bar-hidden');
            } else {
              bar.classList.remove('bar-hidden');
            }
          });
        }, { threshold: 0.1 });
        heroObserver.observe(hero);
      } else {
        window.addEventListener('scroll', function () {
          if (window.scrollY < (hero.offsetHeight - 80)) {
            bar.classList.add('bar-hidden');
          } else {
            bar.classList.remove('bar-hidden');
          }
        }, { passive: true });
      }
    }

    // Hide while any form input is focused (virtual keyboard is open)
    document.addEventListener('focusin', function (e) {
      if (e.target && e.target.matches && e.target.matches('input, select, textarea')) {
        document.body.classList.add('keyboard-open');
      }
    });

    document.addEventListener('focusout', function (e) {
      if (e.target && e.target.matches && e.target.matches('input, select, textarea')) {
        document.body.classList.remove('keyboard-open');
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 6. SCROLL REVEALS
   * ----------------------------------------------------------------------- */
  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('active');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('active');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
   * 7. COUNT-UP ANIMATION
   * ----------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      counters.forEach(function (c) {
        var target = parseFloat(c.getAttribute('data-target'));
        var isDecimal = c.getAttribute('data-decimal') === '1';
        var isComma = c.getAttribute('data-format') === 'comma';
        if (isDecimal) c.textContent = target.toFixed(1);
        else if (isComma) c.textContent = target.toLocaleString('en-IN');
        else c.textContent = target;
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var counter = entry.target;
          var target = parseFloat(counter.getAttribute('data-target'));
          var isDecimal = counter.getAttribute('data-decimal') === '1';
          var isComma = counter.getAttribute('data-format') === 'comma';
          var current = 0;
          var increment = target / 50;

          var updateCount = function () {
            current += increment;
            if (current < target) {
              if (isDecimal) counter.textContent = current.toFixed(1);
              else if (isComma) counter.textContent = Math.floor(current).toLocaleString('en-IN');
              else counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCount);
            } else {
              if (isDecimal) counter.textContent = target.toFixed(1);
              else if (isComma) counter.textContent = target.toLocaleString('en-IN');
              else counter.textContent = target;
            }
          };
          updateCount();
          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* --------------------------------------------------------------------------
   * 8. MENU TABS & DYNAMIC RENDERING (for /menu.html)
   * ----------------------------------------------------------------------- */
  function initMenuTabs() {
    var container = document.getElementById('menu-items-container');
    var tabBtns = document.querySelectorAll('.menu-tab-btn');
    if (!container || !tabBtns.length || typeof MENU === 'undefined') return;

    function renderCategory(catKey) {
      var items = MENU.filter(function (item) {
        return item.category === catKey;
      });

      if (!items.length) {
        container.innerHTML = '<p style="text-align:center; grid-column:span 2; padding:2rem; color:var(--text-muted);">No items currently available in this section.</p>';
        return;
      }

      var html = '';
      items.forEach(function (item) {
        var dietClass = item.veg ? 'diet-icon--veg' : 'diet-icon--nonveg';
        var dietLabel = item.veg ? 'Vegetarian' : 'Non-Vegetarian';
        html += '<div class="menu-item-row">' +
                  '<div class="menu-item-top">' +
                    '<div class="menu-item-name">' +
                      '<span class="diet-icon ' + dietClass + '" title="' + dietLabel + '" aria-label="' + dietLabel + '"></span>' +
                      '<span>' + item.name + '</span>' +
                    '</div>' +
                    '<span class="menu-item-price">' + item.price + '</span>' +
                  '</div>' +
                  '<p class="menu-item-desc">' + item.desc + '</p>' +
                '</div>';
      });
      container.innerHTML = html;
      trackEvent('menu_tab_view', { tab: catKey });
    }

    function activateTab(tabBtn) {
      tabBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabBtn.classList.add('active');
      tabBtn.setAttribute('aria-selected', 'true');
      var category = tabBtn.getAttribute('data-tab');
      renderCategory(category);
    }

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn);
      });
    });

    // Hash handling: e.g. #mains activates Mains tab
    var hash = window.location.hash.replace('#', '');
    var targetTab = null;
    if (hash) {
      // Map hash alias
      var catMap = {
        'small-plates': 'small_plates',
        'mains': 'mains',
        'pizza-pasta': 'pizza_pasta',
        'shakes': 'shakes',
        'bar': 'bar'
      };
      var targetCat = catMap[hash] || hash;
      targetTab = document.querySelector('.menu-tab-btn[data-tab="' + targetCat + '"]');
    }

    if (targetTab) {
      activateTab(targetTab);
    } else {
      // Default to first active tab
      var initialActive = document.querySelector('.menu-tab-btn.active') || tabBtns[0];
      if (initialActive) activateTab(initialActive);
    }
  }

  /* --------------------------------------------------------------------------
   * 9. LIVE EVENTS CALENDAR RENDERER
   * ----------------------------------------------------------------------- */
  function renderLiveEvents(containerId, count) {
    var container = document.getElementById(containerId);
    if (!container || typeof getUpcomingEvents !== 'function') return;

    var events = getUpcomingEvents(count || 4);
    if (!events.length) return;

    var html = '';
    events.forEach(function (evt) {
      var badgeClass = evt.isTonight ? 'event-badge event-badge--tonight' : 'event-badge';
      var badgeText = evt.isTonight ? '★ Tonight' : evt.tag;
      var dowShort = evt.dayShort || (evt.dayName ? evt.dayName.substring(0, 3).toUpperCase() : 'SUN');
      var dateNumVal = evt.dateNum || (evt.dateStr ? evt.dateStr.split('/')[0] : '15');
      var monShort = evt.monthShort || 'NOV';
      var screenDisplayDate = evt.displayDate || (evt.dayName.substring(0, 3) + ', ' + dateNumVal + ' ' + monShort);

      html += '<article class="event-card reveal' + (evt.isTonight ? ' event-card--tonight' : '') + '">' +
                '<span class="' + badgeClass + '">' + badgeText + '</span>' +
                '<div class="event-card-inner">' +
                  '<div class="event-date-block" aria-hidden="true">' +
                    '<span class="event-dow">' + dowShort + '</span>' +
                    '<span class="event-day-num">' + dateNumVal + '</span>' +
                    '<span class="event-mon">' + monShort + '</span>' +
                  '</div>' +
                  '<div class="event-info-col">' +
                    '<div class="event-heading-row">' +
                      '<h3 class="event-title">' + evt.title + '</h3>' +
                      (evt.isTonight ? '<span class="tonight-dot-badge"><span class="gold-dot"></span> Tonight</span>' : '') +
                    '</div>' +
                    '<p class="event-genre">' + evt.genre + '</p>' +
                    '<div class="event-time-row">' +
                      '<span class="event-display-date">' + screenDisplayDate + '</span>' +
                      '<span class="event-time-sep">·</span>' +
                      '<span class="event-time-val">' + evt.time + '</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="event-cta-wrap">' +
                  '<button type="button" class="btn btn-primary event-cta" onclick="openWhatsApp(\'live_night\', { eventName: \'' + evt.title.replace(/'/g, "\\'") + '\', dateStr: \'' + evt.dateStr + '\', time: \'' + evt.time + '\' }, \'Live Nights: ' + evt.title.replace(/'/g, "\\'") + '\')">' +
                    'Reserve' +
                  '</button>' +
                '</div>' +
              '</article>';
    });

    container.innerHTML = html;
  }

  /* --------------------------------------------------------------------------
   * 10. HERO CHIP RENDERER (Homepage)
   * ----------------------------------------------------------------------- */
  function renderHeroChip() {
    var chip = document.getElementById('hero-event-chip');
    var singleChip = document.getElementById('hero-single-chip');
    if (typeof getTonightOrNextEvent !== 'function') return;

    var evt = getTonightOrNextEvent();
    if (!evt) return;

    if (chip && evt.text) {
      chip.textContent = evt.text;
      chip.style.display = 'inline-flex';
    }
    if (singleChip && evt.mobileText) {
      singleChip.textContent = evt.mobileText;
    }
  }

  /* --------------------------------------------------------------------------
   * 11. TABLE PRESELECTION & SCROLL (/reserve.html)
   * ----------------------------------------------------------------------- */
  function syncTableChoiceChips(selectedVal) {
    var chips = document.querySelectorAll('.table-choice-chip');
    chips.forEach(function (chip) {
      var chipVal = chip.getAttribute('data-table-val') || chip.getAttribute('data-table');
      var isMatch = (chipVal === selectedVal) || (selectedVal === 'No preference' && chipVal === 'no-preference');
      chip.classList.toggle('active', isMatch);
      chip.setAttribute('aria-checked', isMatch ? 'true' : 'false');
    });
  }

  function initTableSelection() {
    var tableSelect = document.getElementById('book-table-type');
    var chips = document.querySelectorAll('.table-choice-chip');

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.getAttribute('data-table-val') || 'No preference';
        if (tableSelect) {
          tableSelect.value = val;
        }
        syncTableChoiceChips(val);
      });
    });

    if (!tableSelect) return;

    // Check URL params
    var urlParams = new URLSearchParams(window.location.search);
    var tableParam = urlParams.get('table');

    var paramMap = {
      'rooftop-corner': 'Rooftop Santorini Corner',
      'arch-booth': 'The Arch Booth',
      'stage-side': 'Stage-Side Table',
      'no-preference': 'No preference'
    };

    if (tableParam && paramMap[tableParam]) {
      tableSelect.value = paramMap[tableParam];
      syncTableChoiceChips(paramMap[tableParam]);
      var formEl = document.getElementById('form');
      if (formEl) {
        setTimeout(function () {
          formEl.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }

  window.selectBookingTable = function (slug) {
    var tableSelect = document.getElementById('book-table-type');
    var paramMap = {
      'rooftop-corner': 'Rooftop Santorini Corner',
      'arch-booth': 'The Arch Booth',
      'stage-side': 'Stage-Side Table',
      'no-preference': 'No preference'
    };
    var selectedName = paramMap[slug] || 'No preference';
    if (tableSelect) {
      tableSelect.value = selectedName;
    }
    syncTableChoiceChips(selectedName);
    var formEl = document.getElementById('form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* --------------------------------------------------------------------------
   * 12. RESERVE FORM HANDLER (/reserve.html)
   * ----------------------------------------------------------------------- */
  function initReserveForm() {
    var form = document.getElementById('table-reservation-form');
    if (!form) return;

    var successMsg = document.getElementById('reserve-success-msg');
    var errorMsg = document.getElementById('reserve-error-msg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorMsg) errorMsg.style.display = 'none';

      var name = document.getElementById('book-name').value.trim();
      var phoneInput = document.getElementById('book-phone').value.trim();
      var date = document.getElementById('book-date').value;
      var time = document.getElementById('book-time').value;
      var guests = document.getElementById('book-guests').value;
      var tableType = document.getElementById('book-table-type').value;
      var note = document.getElementById('book-note').value.trim();

      var validPhone = validateIndianPhone(phoneInput);
      if (!validPhone) {
        if (errorMsg) {
          errorMsg.textContent = 'Please enter a valid 10-digit Indian mobile number (e.g. 98110XXXXX).';
          errorMsg.style.display = 'block';
        }
        document.getElementById('book-phone').focus();
        return;
      }

      var data = {
        name: name,
        phone: validPhone,
        date: date,
        time: time,
        guests: guests,
        tableType: tableType,
        note: note
      };

      openWhatsApp('reserve', data, 'Reserve form');
      trackEvent('form_submit', { form: 'reserve' });

      if (successMsg) {
        successMsg.textContent = "WhatsApp is opening with your booking details. We'll confirm there during opening hours (12 noon – 12 midnight).";
        successMsg.style.display = 'block';
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 13. PARTY FORM HANDLER (/parties.html)
   * ----------------------------------------------------------------------- */
  function initPartyForm() {
    var form = document.getElementById('party-enquiry-form');
    if (!form) return;

    var successMsg = document.getElementById('party-success-msg');
    var errorMsg = document.getElementById('party-error-msg');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorMsg) errorMsg.style.display = 'none';

      var name = document.getElementById('party-name').value.trim();
      var phoneInput = document.getElementById('party-phone').value.trim();
      var date = document.getElementById('party-date').value;
      var guests = document.getElementById('party-guests').value;
      var occasion = document.getElementById('party-occasion').value;
      var budget = document.getElementById('party-budget').value;

      var validPhone = validateIndianPhone(phoneInput);
      if (!validPhone) {
        if (errorMsg) {
          errorMsg.textContent = 'Please enter a valid 10-digit Indian mobile number (e.g. 98100XXXXX).';
          errorMsg.style.display = 'block';
        }
        document.getElementById('party-phone').focus();
        return;
      }

      var data = {
        name: name,
        phone: validPhone,
        date: date,
        guests: guests,
        occasion: occasion,
        budget: budget
      };

      // Optional Google Sheet Webhook POST
      if (typeof CONFIG !== 'undefined' && CONFIG.SHEET_WEBHOOK) {
        try {
          fetch(CONFIG.SHEET_WEBHOOK, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              page: window.location.href,
              name: name,
              phone: validPhone,
              date: date,
              guests: guests,
              occasion: occasion,
              budget: budget
            })
          }).catch(function () {});
        } catch (err) {}
      }

      openWhatsApp('party', data, 'Party form');
      trackEvent('form_submit', { form: 'party', occasion: occasion });

      if (successMsg) {
        successMsg.textContent = "WhatsApp is opening with your details. Our events team will get back to you with a quote.";
        successMsg.style.display = 'block';
      }
    });
  }

  window.selectPartyOccasion = function (occasionName) {
    var occasionSelect = document.getElementById('party-occasion');
    if (occasionSelect) {
      occasionSelect.value = occasionName;
    }
    var formEl = document.getElementById('enquire');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* --------------------------------------------------------------------------
   * 14. GALLERY & LIGHTBOX (/gallery.html)
   * ----------------------------------------------------------------------- */
  function initGallery() {
    var filterChips = document.querySelectorAll('.filter-chip');
    var galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;

    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) {
          c.setAttribute('aria-pressed', 'false');
        });
        chip.setAttribute('aria-pressed', 'true');
        var filter = chip.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          var itemCategory = item.getAttribute('data-category');
          if (filter === 'all' || itemCategory === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        trackEvent('gallery_filter', { filter: filter });
      });
    });

    // Lightbox modal
    var lightbox = document.getElementById('gallery-lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg) {
      galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var img = item.querySelector('img');
          if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Gallery photo';
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
          }
        });
      });

      function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
      }

      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
          closeLightbox();
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 15. FAQ ACCORDION (/live-nights.html & /parties.html)
   * ----------------------------------------------------------------------- */
  function initFAQ() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        if (!item) return;
        var isOpen = item.classList.contains('open');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(function (it) {
          it.classList.remove('open');
          var itBtn = it.querySelector('.faq-question');
          if (itBtn) itBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 16. FOOTER SOCIAL ICONS RENDERER
   * ----------------------------------------------------------------------- */
  function renderSocialIcons() {
    var row = document.querySelector('.footer-social-row');
    if (!row || typeof SOCIAL_LINKS === 'undefined') return;

    var html = '';
    SOCIAL_LINKS.forEach(function (item) {
      html += '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="' + item.ariaLabel + '">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + item.svgPath + '"/></svg>' +
              '</a>';
    });
    row.innerHTML = html;
  }

  /* --------------------------------------------------------------------------
   * 17. DATE INPUT LIMITS & COPYRIGHT
   * ----------------------------------------------------------------------- */
  function initDateInputs() {
    var todayStr = getTodayISO();
    var dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(function (inp) {
      inp.min = todayStr;
    });
  }

  function initCopyright() {
    var yearSpans = document.querySelectorAll('.current-year');
    var year = getISTDate().getFullYear();
    yearSpans.forEach(function (sp) {
      sp.textContent = year;
    });
  }

  /* --------------------------------------------------------------------------
   * 18. TRACKING FOR CLICKS
   * ----------------------------------------------------------------------- */
  function initClickTracking() {
    document.addEventListener('click', function (e) {
      var telLink = e.target.closest('a[href^="tel:"]');
      if (telLink) {
        var source = telLink.getAttribute('data-source') || 'website';
        trackEvent('call_click', { source: source });
      }

      var dirLink = e.target.closest('.directions-link');
      if (dirLink) {
        var dirSource = dirLink.getAttribute('data-source') || 'visit_card';
        trackEvent('directions_click', { source: dirSource });
      }

      var navLink = e.target.closest('.nav-link');
      if (navLink) {
        var itemText = navLink.textContent.trim();
        trackEvent('nav_click', { item: itemText });
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 19. MASTER INIT ON DOMContentLoaded
   * ----------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initGA4();
    initNav();
    initStickyBar();
    initReveal();
    initCounters();

    // Context-dependent initializers
    if (document.getElementById('hero-event-chip')) renderHeroChip();
    if (document.getElementById('menu-items-container')) initMenuTabs();
    if (document.getElementById('home-live-events')) renderLiveEvents('home-live-events', 2);
    if (document.getElementById('live-events-container')) renderLiveEvents('live-events-container', 4);
    if (document.getElementById('table-reservation-form')) {
      initTableSelection();
      initReserveForm();
    }
    if (document.getElementById('party-enquiry-form')) initPartyForm();
    if (document.querySelector('.gallery-grid')) initGallery();
    if (document.querySelector('.faq-question')) initFAQ();

    renderSocialIcons();
    initDateInputs();
    initCopyright();
    initClickTracking();
  });

})();
