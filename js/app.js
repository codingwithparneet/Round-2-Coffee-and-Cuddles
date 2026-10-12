/**
 * Coffee & Cuddles - Main Application Logic
 * Rajpur Road, Dehradun
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLiveStatus();
  initNavigation();
  initMenu();
  initWorldMap();
  initSpaceGalleryModal();
  initReservationForm();
  initScrollAnimations();
  initAmbientAudio();
});

/* ==========================================================================
   1. Theme Management (Beige Light <-> Dark Espresso)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('cc_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cc_theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Live "Today's Status" Badge (8:00 AM - 10:00 PM)
   ========================================================================== */
function initLiveStatus() {
  const statusBadges = document.querySelectorAll('.live-status-target');

  function updateStatus() {
    // Calculate Dehradun / IST time (UTC + 5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const dehradunTime = new Date(utcTime + istOffset);

    const hours = dehradunTime.getHours();
    const minutes = dehradunTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Opening hours: 8:00 AM (480 mins) to 10:00 PM (1320 mins)
    const openMinutes = 8 * 60;   // 08:00
    const closeMinutes = 22 * 60; // 22:00

    const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

    statusBadges.forEach(badge => {
      if (isOpen) {
        badge.classList.remove('closed');
        badge.classList.add('open');
        const textElem = badge.querySelector('.status-text');
        if (textElem) {
          textElem.textContent = 'Open · Closes 10 PM';
        }
      } else {
        badge.classList.remove('open');
        badge.classList.add('closed');
        const textElem = badge.querySelector('.status-text');
        if (textElem) {
          textElem.textContent = 'Closed · Opens 8 AM';
        }
      }
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

/* ==========================================================================
   3. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('open');
      });
    });
  }

  // Scrollspy active links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. The Coffee Menu (Filtering, Searching & Rendering)
   - Strictly NO prices anywhere, as requested by owners!
   ========================================================================== */
let activeCategory = 'all';
let activeNote = 'all';
let searchKeyword = '';

function initMenu() {
  const categoryContainer = document.getElementById('category-filter-pills');
  const notesContainer = document.getElementById('notes-filter-pills');
  const searchInput = document.getElementById('menu-search-input');

  // Render category buttons
  if (categoryContainer && typeof CATEGORIES !== 'undefined') {
    categoryContainer.innerHTML = CATEGORIES.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat.slug}">
        ${cat.name}
      </button>
    `).join('');

    categoryContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        renderMenuList();
      });
    });
  }

  // Render tasting note buttons
  if (notesContainer && typeof TASTING_PROFILES !== 'undefined') {
    notesContainer.innerHTML = TASTING_PROFILES.map((note, idx) => `
      <button class="note-btn ${idx === 0 ? 'active' : ''}" data-note="${note.tag}">
        ${note.name}
      </button>
    `).join('');

    notesContainer.querySelectorAll('.note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        notesContainer.querySelectorAll('.note-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeNote = btn.getAttribute('data-note');
        renderMenuList();
      });
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.trim().toLowerCase();
      renderMenuList();
    });
  }

  // Initial render
  renderMenuList();
}

function renderMenuList() {
  const menuGrid = document.getElementById('menu-items-grid');
  const menuCountEl = document.getElementById('menu-visible-count');
  if (!menuGrid || typeof MENU_ITEMS === 'undefined') return;

  const filteredItems = MENU_ITEMS.filter(item => {
    // Category match
    const categoryMatch = activeCategory === 'all' || item.categorySlug === activeCategory;

    // Note tag match
    const noteMatch = activeNote === 'all' || (item.noteTags && item.noteTags.includes(activeNote));

    // Keyword match
    const kwMatch = !searchKeyword || 
      item.name.toLowerCase().includes(searchKeyword) ||
      item.category.toLowerCase().includes(searchKeyword) ||
      item.tastingNote.toLowerCase().includes(searchKeyword) ||
      item.inspiredBy.toLowerCase().includes(searchKeyword) ||
      item.description.toLowerCase().includes(searchKeyword);

    return categoryMatch && noteMatch && kwMatch;
  });

  if (menuCountEl) {
    menuCountEl.textContent = `${filteredItems.length} coffees displayed`;
  }

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.5rem;">No coffees match your selection</p>
        <p style="font-size: 0.9rem;">Try choosing another category or clearing your search filter.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="resetMenuFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  menuGrid.innerHTML = filteredItems.map(coffee => `
    <article class="menu-item-card" id="coffee-${coffee.id}">
      <div>
        <div class="menu-item-header">
          <h3 class="menu-item-name">${coffee.name}</h3>
          <span class="menu-item-category">${coffee.category}</span>
        </div>
        <p class="menu-item-note">“${coffee.tastingNote}”</p>
        <p class="menu-item-desc">${coffee.description}</p>
      </div>
      <div class="menu-item-footer">
        <span class="inspired-pill" title="Inspiration Origin">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Inspired by ${coffee.inspiredBy}
        </span>
        <button class="btn-origin-detail" onclick="openOriginModal('${coffee.id}')">
          Read Story →
        </button>
      </div>
    </article>
  `).join('');
}

window.resetMenuFilters = function() {
  activeCategory = 'all';
  activeNote = 'all';
  searchKeyword = '';
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('#category-filter-pills .filter-btn').forEach((b, i) => {
    b.classList.toggle('active', i === 0);
  });
  document.querySelectorAll('#notes-filter-pills .note-btn').forEach((b, i) => {
    b.classList.toggle('active', i === 0);
  });

  renderMenuList();
};

/* ==========================================================================
   5. Interactive World Coffee Map
   ========================================================================== */
function initWorldMap() {
  const pinsGroup = document.getElementById('map-pins-layer');
  const popup = document.getElementById('map-story-popup');
  const cityChipsContainer = document.getElementById('map-cities-strip');

  if (!pinsGroup || typeof MENU_ITEMS === 'undefined') return;

  // Map coordinates projection (approximate Equirectangular to SVG viewport 1000x500)
  // X: (lng + 180) / 360 * 1000
  // Y: (90 - lat) / 180 * 500
  function project(lat, lng) {
    const x = ((lng + 180) / 360) * 1000;
    // Slight latitude adjustment for aesthetic balance on standard projection
    const y = ((90 - lat) / 180) * 500;
    return { x, y };
  }

  // Render SVG pins
  pinsGroup.innerHTML = MENU_ITEMS.map(item => {
    const { x, y } = project(item.coordinates.lat, item.coordinates.lng);
    const isHome = item.id === 'hills-special';
    return `
      <g class="map-pin ${isHome ? 'pin-dehradun' : ''}" data-id="${item.id}" transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
        <circle class="pin-ring" cx="0" cy="0" r="${isHome ? '11' : '8'}"></circle>
        <circle class="pin-dot" cx="0" cy="0" r="${isHome ? '6' : '4.5'}"></circle>
      </g>
    `;
  }).join('');

  // Add click handlers on pins
  const pins = pinsGroup.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      const coffeeId = pin.getAttribute('data-id');
      selectMapLocation(coffeeId);
    });
  });

  // Render quick city chips
  if (cityChipsContainer) {
    cityChipsContainer.innerHTML = MENU_ITEMS.map((item, idx) => `
      <button class="btn-city-chip ${idx === 0 ? 'active' : ''}" data-id="${item.id}">
        ${item.inspiredBy.split(',')[0]}
      </button>
    `).join('');

    cityChipsContainer.querySelectorAll('.btn-city-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        cityChipsContainer.querySelectorAll('.btn-city-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectMapLocation(chip.getAttribute('data-id'));
      });
    });
  }

  // Set default selection (Hills Special / Dehradun or Addis Ababa)
  selectMapLocation('hills-special');
}

function selectMapLocation(coffeeId) {
  const item = MENU_ITEMS.find(c => c.id === coffeeId);
  if (!item) return;

  // Highlight SVG pin
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.classList.toggle('active', pin.getAttribute('data-id') === coffeeId);
  });

  // Highlight chip
  document.querySelectorAll('.btn-city-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-id') === coffeeId);
  });

  // Update popup
  const popup = document.getElementById('map-story-popup');
  if (popup) {
    popup.innerHTML = `
      <div class="popup-location-tag">${item.inspiredBy}</div>
      <h4 class="popup-coffee-title">${item.name}</h4>
      <p class="popup-tasting-note">“${item.tastingNote}”</p>
      <p class="popup-curator-note">${item.curatorNote}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn btn-primary btn-sm" onclick="highlightInMenu('${item.id}')">
          View in Menu
        </button>
      </div>
    `;
  }
}

window.highlightInMenu = function(coffeeId) {
  // Reset category to all so it is visible
  window.resetMenuFilters();
  const el = document.getElementById(`coffee-${coffeeId}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.borderColor = 'var(--color-coffee)';
    el.style.boxShadow = '0 0 0 3px rgba(118, 68, 35, 0.25)';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, 2800);
  }
};

/* ==========================================================================
   6. Table Reservation Form Logic & Validation
   - Complete validation as required by brief
   - No browser alerts! Clear messages beside fields!
   - 10-digit phone verification
   - Date not in past
   - Time between 8:00 AM and 9:30 PM
   - Pet terrace suggestion prompt
   - Full confirmation receipt screen replacement
   ========================================================================== */
function initReservationForm() {
  const form = document.getElementById('table-reservation-form');
  const dateInput = document.getElementById('res-date');
  const timeInput = document.getElementById('res-time');
  const petCheckbox = document.getElementById('res-pet');
  const petNotice = document.getElementById('pet-terrace-notice');
  const btnSwitchTerrace = document.getElementById('btn-switch-terrace');
  const radioLabels = document.querySelectorAll('.seating-radio-label');
  const confirmCard = document.getElementById('reservation-confirmation-card');
  const btnNewRes = document.getElementById('btn-new-reservation');

  if (!form) return;

  // Set minimum date to today (Indian Standard Time / local date)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDateStr = `${yyyy}-${mm}-${dd}`;
  if (dateInput) {
    dateInput.min = minDateStr;
    // Default to today
    dateInput.value = minDateStr;
  }

  // Radio styling & sync
  radioLabels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      label.classList.add('checked');
    }

    label.addEventListener('click', () => {
      radioLabels.forEach(l => l.classList.remove('checked'));
      label.classList.add('checked');
      if (radio) radio.checked = true;
      checkPetTerraceNotice();
    });
  });

  // Pet terrace gentle notice handler
  function checkPetTerraceNotice() {
    const isPetChecked = petCheckbox ? petCheckbox.checked : false;
    const selectedSeating = form.querySelector('input[name="seating_preference"]:checked')?.value;

    if (isPetChecked && selectedSeating && selectedSeating !== 'Terrace') {
      petNotice?.classList.add('show');
    } else {
      petNotice?.classList.remove('show');
    }
  }

  if (petCheckbox) {
    petCheckbox.addEventListener('change', checkPetTerraceNotice);
  }

  if (btnSwitchTerrace) {
    btnSwitchTerrace.addEventListener('click', () => {
      const terraceRadio = form.querySelector('input[name="seating_preference"][value="Terrace"]');
      if (terraceRadio) {
        terraceRadio.checked = true;
        radioLabels.forEach(l => {
          const r = l.querySelector('input[type="radio"]');
          l.classList.toggle('checked', r && r.value === 'Terrace');
        });
        checkPetTerraceNotice();
      }
    });
  }

  // Clear field errors on user input
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('has-error');
      const errElem = document.getElementById(`${input.id}-error`);
      if (errElem) errElem.textContent = '';
    });
  });

  // Form submission validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // 1. Full name
    const nameInput = document.getElementById('res-name');
    const nameError = document.getElementById('res-name-error');
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your full name.');
      hasError = true;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      hasError = true;
    }

    // 2. Phone number (must be 10 digits)
    const phoneInput = document.getElementById('res-phone');
    const phoneError = document.getElementById('res-phone-error');
    const phoneClean = phoneInput.value.replace(/\D/g, ''); // strip non-digits
    if (!phoneInput.value.trim()) {
      showError(phoneInput, phoneError, 'Please provide your 10-digit mobile number.');
      hasError = true;
    } else if (phoneClean.length !== 10) {
      showError(phoneInput, phoneError, 'Phone number must be exactly 10 digits.');
      hasError = true;
    }

    // 3. Email (optional, but validate format if filled)
    const emailInput = document.getElementById('res-email');
    const emailError = document.getElementById('res-email-error');
    if (emailInput.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        hasError = true;
      }
    }

    // 4. Date (not in the past)
    const dateVal = dateInput.value;
    const dateError = document.getElementById('res-date-error');
    if (!dateVal) {
      showError(dateInput, dateError, 'Please pick a reservation date.');
      hasError = true;
    } else {
      const selectedDate = new Date(dateVal + 'T00:00:00');
      const todayDate = new Date();
      todayDate.setHours(0,0,0,0);
      if (selectedDate < todayDate) {
        showError(dateInput, dateError, 'Date cannot be in the past.');
        hasError = true;
      }
    }

    // 5. Time (between 8:00 AM and 9:30 PM / 08:00 and 21:30)
    const timeVal = timeInput.value;
    const timeError = document.getElementById('res-time-error');
    if (!timeVal) {
      showError(timeInput, timeError, 'Please choose a seating time.');
      hasError = true;
    } else {
      const [h, m] = timeVal.split(':').map(Number);
      const totalTimeMin = h * 60 + m;
      const minOpenTime = 8 * 60;        // 08:00 AM
      const maxLastSeating = 21 * 60 + 30; // 09:30 PM

      if (totalTimeMin < minOpenTime || totalTimeMin > maxLastSeating) {
        showError(timeInput, timeError, 'Seating time must be between 8:00 AM and 9:30 PM.');
        hasError = true;
      }
    }

    // 6. Number of guests (1 to 12)
    const guestsInput = document.getElementById('res-guests');
    const guestsError = document.getElementById('res-guests-error');
    const guestsNum = parseInt(guestsInput.value, 10);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 12) {
      showError(guestsInput, guestsError, 'Number of guests must be between 1 and 12.');
      hasError = true;
    }

    // 7. Seating preference
    const seatingSelected = form.querySelector('input[name="seating_preference"]:checked');
    const seatingError = document.getElementById('res-seating-error');
    if (!seatingSelected) {
      if (seatingError) {
        seatingError.textContent = 'Please choose a seating preference.';
        seatingError.style.display = 'block';
      }
      hasError = true;
    }

    // 8. Consent checkbox (required)
    const consentCheckbox = document.getElementById('res-consent');
    const consentError = document.getElementById('res-consent-error');
    if (!consentCheckbox.checked) {
      if (consentError) {
        consentError.textContent = 'Please consent to be contacted for table confirmation.';
        consentError.style.display = 'block';
      }
      hasError = true;
    } else {
      if (consentError) consentError.style.display = 'none';
    }

    if (hasError) {
      // Smooth scroll to first error
      const firstError = form.querySelector('.has-error, .field-error-msg:not(:empty)');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Successful Submission: Replace form with confirmation receipt!
    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      date: dateVal,
      time: formatTimeString(timeVal),
      guests: guestsNum,
      seating: seatingSelected.value,
      occasion: document.getElementById('res-occasion')?.value || 'Coffee & Conversation',
      bringingPet: petCheckbox.checked ? 'Yes' : 'No'
    };

    displayConfirmation(formData);
  });

  function showError(input, errorElem, message) {
    if (input) input.classList.add('has-error');
    if (errorElem) {
      errorElem.textContent = message;
      errorElem.style.display = 'block';
    }
  }

  function formatTimeString(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function displayConfirmation(data) {
    const formCard = document.getElementById('reservation-form-wrapper');
    const confirmCard = document.getElementById('reservation-confirmation-card');

    // Populate receipt details
    document.getElementById('conf-guest-name').textContent = data.name;
    document.getElementById('conf-date').textContent = formatDateDisplay(data.date);
    document.getElementById('conf-time').textContent = data.time;
    document.getElementById('conf-guests').textContent = `${data.guests} Guest${data.guests > 1 ? 's' : ''}`;
    document.getElementById('conf-seating').textContent = data.seating;
    document.getElementById('conf-contact').textContent = data.phone;
    if (document.getElementById('conf-pet')) {
      document.getElementById('conf-pet').textContent = data.bringingPet;
    }

    // Hide form, show confirmation
    if (formCard) formCard.style.display = 'none';
    if (confirmCard) {
      confirmCard.classList.add('show');
      confirmCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function formatDateDisplay(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (btnNewRes) {
    btnNewRes.addEventListener('click', () => {
      form.reset();
      radioLabels.forEach(l => l.classList.remove('checked'));
      const defaultRadio = form.querySelector('input[name="seating_preference"][value="Main room"]');
      if (defaultRadio) {
        defaultRadio.checked = true;
        defaultRadio.closest('.seating-radio-label')?.classList.add('checked');
      }
      petNotice?.classList.remove('show');

      const formCard = document.getElementById('reservation-form-wrapper');
      if (formCard) formCard.style.display = 'block';
      if (confirmCard) confirmCard.classList.remove('show');
      formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* ==========================================================================
   7. Editorial Magazine Lightbox Modal
   ========================================================================== */
function initSpaceGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('modal-close-btn');

  const galleryItems = document.querySelectorAll('.magazine-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.magazine-caption-title')?.textContent;
      const sub = item.querySelector('.magazine-caption-sub')?.textContent;

      if (modal && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) modalTitle.textContent = title || 'Coffee & Cuddles';
        if (modalCaption) modalCaption.textContent = sub || 'Rajpur Road, Dehradun';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

window.openOriginModal = function(coffeeId) {
  const item = MENU_ITEMS.find(c => c.id === coffeeId);
  if (!item) return;

  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCaption = document.getElementById('modal-caption');

  if (modal) {
    if (modalImg) {
      modalImg.src = `https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80`;
      modalImg.alt = item.name;
    }
    if (modalTitle) modalTitle.textContent = `${item.name} · Inspired by ${item.inspiredBy}`;
    if (modalCaption) modalCaption.innerHTML = `
      <p style="font-style: italic; margin-bottom: 0.5rem; color: var(--color-coffee);">“${item.tastingNote}”</p>
      <p style="font-size: 0.95rem; line-height: 1.7;">${item.curatorNote}</p>
    `;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

/* ==========================================================================
   8. Subtle Ambient Sound Synthesizer (Vinyl & Jazz chords)
   - Built directly via Web Audio API: no external mp3 needed!
   ========================================================================== */
function initAmbientAudio() {
  const audioBtn = document.getElementById('btn-ambient-sound');
  if (!audioBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let noiseNode = null;
  let gainNode = null;
  let chordsInterval = null;

  audioBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  });

  function startAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Master gain
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Soft background whisper
      gainNode.connect(audioCtx.destination);

      // 1. Soft vinyl crackle generator (pinkish noise burst)
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.08;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;
      noiseNode.connect(gainNode);
      noiseNode.start();

      // 2. Gentle Rhodes / Jazz electric piano soft chord swells
      playGentleChord();
      chordsInterval = setInterval(playGentleChord, 5500);

      isPlaying = true;
      audioBtn.classList.add('playing');
      const textSpan = audioBtn.querySelector('.sound-btn-text');
      if (textSpan) textSpan.textContent = 'Mute Cafe Vinyl';
    } catch (err) {
      console.log('Web audio initialized quietly', err);
    }
  }

  function playGentleChord() {
    if (!audioCtx || audioCtx.state === 'closed') return;

    // Jazz voicings: warm major 7th and 9th chords (Fmaj7, Am7, Bbmaj7)
    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [233.08, 293.66, 349.23, 440.00], // Bbmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    const chord = chords[Math.floor(Math.random() * chords.length)];

    chord.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Soft attack & slow decay
      oscGain.gain.setValueAtTime(0, audioCtx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 1.8);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 5.2);

      osc.connect(oscGain);
      oscGain.connect(gainNode);

      osc.start();
      osc.stop(audioCtx.currentTime + 5.4);
    });
  }

  function stopAmbientSound() {
    if (chordsInterval) clearInterval(chordsInterval);
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    isPlaying = false;
    audioBtn.classList.remove('playing');
    const textSpan = audioBtn.querySelector('.sound-btn-text');
    if (textSpan) textSpan.textContent = 'Play Cafe Atmosphere';
  }
}

/* ==========================================================================
   9. Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-visible'));
  }
}
