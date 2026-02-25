/* ═══════════════════════════════════════════════════
   TERUEL RURAL — Main Application
   ═══════════════════════════════════════════════════ */

import './style.css';

// ─── Mock Property Data ──────────────────────────────
const properties = [
  {
    id: 1,
    title: 'Masía de piedra en Valderrobres',
    location: 'Matarraña',
    price: 420,
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&q=80',
    beds: 3,
    baths: 2,
    area: 180,
    badge: 'new',
    features: ['Chimenea', 'Huerto', 'WiFi'],
  },
  {
    id: 2,
    title: 'Casa rural con vistas al Maestrazgo',
    location: 'Maestrazgo',
    price: 350,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    beds: 2,
    baths: 1,
    area: 120,
    badge: 'popular',
    features: ['Terraza', 'Calefacción', 'WiFi'],
  },
  {
    id: 3,
    title: 'Cortijo reformado en Albarracín',
    location: 'Sierra de Albarracín',
    price: 500,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80',
    beds: 4,
    baths: 2,
    area: 220,
    badge: null,
    features: ['Jardín', 'Garaje', 'WiFi'],
  },
  {
    id: 4,
    title: 'Apartamento en pueblo con encanto',
    location: 'Gúdar-Javalambre',
    price: 280,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    beds: 1,
    baths: 1,
    area: 65,
    badge: 'new',
    features: ['Amueblado', 'Calefacción', 'WiFi'],
  },
  {
    id: 5,
    title: 'Masía panorámica con piscina',
    location: 'Bajo Aragón',
    price: 650,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80',
    beds: 5,
    baths: 3,
    area: 300,
    badge: 'popular',
    features: ['Piscina', 'Bodega', 'WiFi'],
  },
  {
    id: 6,
    title: 'Casa de pastor restaurada',
    location: 'Cuencas Mineras',
    price: 300,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80',
    beds: 2,
    baths: 1,
    area: 95,
    badge: null,
    features: ['Huerto', 'Calefacción', 'Chimenea'],
  },
];

// ─── Render Property Cards ───────────────────────────
function renderProperties(data) {
  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;

  grid.innerHTML = data
    .map(
      (p, i) => `
    <article class="property-card fade-in" style="transition-delay: ${i * 0.1}s">
      <div class="property-card-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        ${p.badge
          ? `<span class="property-card-badge badge-${p.badge}">${p.badge === 'new' ? 'Nuevo' : 'Popular'}</span>`
          : ''
        }
        <div class="property-card-fav" title="Guardar">♡</div>
      </div>
      <div class="property-card-body">
        <div class="property-card-location">📍 ${p.location}</div>
        <h3 class="property-card-title">${p.title}</h3>
        <div class="property-card-features">
          <span class="property-feature">🛏️ ${p.beds} hab.</span>
          <span class="property-feature">🚿 ${p.baths} baño${p.baths > 1 ? 's' : ''}</span>
          <span class="property-feature">📐 ${p.area} m²</span>
        </div>
        <div class="property-card-footer">
          <div class="property-price">${p.price} € <span>/ mes</span></div>
          <button class="property-card-cta">Ver más</button>
        </div>
      </div>
    </article>
  `
    )
    .join('');
}

// ─── Scroll-based Navbar ─────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

// ─── Intersection Observer (Fade-In) ────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// ─── Counter Animation ──────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';

        const target = parseInt(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

// ─── Favorite Toggle ────────────────────────────────
function initFavorites() {
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.property-card-fav');
    if (!fav) return;
    fav.textContent = fav.textContent === '♡' ? '♥' : '♡';
    fav.style.color = fav.textContent === '♥' ? '#ef4444' : '';
  });
}

// ─── Search Tabs ────────────────────────────────────
function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// ─── Advanced Filters Toggle ────────────────────────
function initAdvancedFilters() {
  const toggle = document.getElementById('advancedToggle');
  const panel = document.getElementById('advancedPanel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    panel.classList.toggle('open');
  });

  // Chip selectors
  document.querySelectorAll('.filter-chip-group').forEach((group) => {
    group.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        updateResultsCount();
      });
    });
  });

  // Range slider
  const areaSlider = document.getElementById('filterArea');
  const areaValue = document.getElementById('filterAreaValue');
  if (areaSlider && areaValue) {
    areaSlider.addEventListener('input', () => {
      const val = parseInt(areaSlider.value);
      areaValue.textContent = val === 0 ? 'Cualquiera' : `${val} m² o más`;
      updateResultsCount();
    });
  }

  // Price inputs
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (priceMin) priceMin.addEventListener('input', () => updateResultsCount());
  if (priceMax) priceMax.addEventListener('input', () => updateResultsCount());

  // Checkbox cards
  document.querySelectorAll('.checkbox-card input').forEach((cb) => {
    cb.addEventListener('change', () => updateResultsCount());
  });

  // Clear filters
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      // Reset chips
      document.querySelectorAll('.filter-chip-group').forEach((group) => {
        group.querySelectorAll('.filter-chip').forEach((c, i) => {
          c.classList.toggle('active', i === 0);
        });
      });
      // Reset slider
      if (areaSlider) {
        areaSlider.value = 0;
        areaValue.textContent = 'Cualquiera';
      }
      // Reset price inputs
      if (priceMin) priceMin.value = '';
      if (priceMax) priceMax.value = '';
      // Reset checkboxes
      document.querySelectorAll('.checkbox-card input').forEach((cb) => {
        cb.checked = false;
      });
      // Reset main selects
      document.getElementById('search-zona').value = '';
      document.getElementById('search-tipo').value = '';
      document.getElementById('search-precio').value = '';
      const estancia = document.getElementById('search-estancia');
      if (estancia) estancia.value = '';

      updateResultsCount();
    });
  }

  // Apply filters
  const applyBtn = document.getElementById('applyFilters');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const filtered = getFilteredProperties();
      renderProperties(filtered);
      initScrollAnimations();
      document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
      // Close panel
      toggle.classList.remove('active');
      panel.classList.remove('open');
    });
  }
}

// ─── Get Active Filter Values ───────────────────────
function getActiveChipValue(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return '';
  const active = group.querySelector('.filter-chip.active');
  return active ? active.dataset.value : '';
}

function getCheckedExtras() {
  const checked = [];
  document.querySelectorAll('.checkbox-card input:checked').forEach((cb) => {
    checked.push(cb.value);
  });
  return checked;
}

// ─── Filter Properties ──────────────────────────────
function getFilteredProperties() {
  let filtered = [...properties];

  // Main bar filters
  const zona = document.getElementById('search-zona').value;
  const precio = document.getElementById('search-precio').value;

  if (zona) filtered = filtered.filter((p) => p.location === zona);
  if (precio) filtered = filtered.filter((p) => p.price <= parseInt(precio));

  // Advanced filters
  const beds = getActiveChipValue('filterBeds');
  if (beds) {
    const bedsNum = parseInt(beds);
    filtered = filtered.filter((p) => (bedsNum >= 4 ? p.beds >= 4 : p.beds === bedsNum));
  }

  const baths = getActiveChipValue('filterBaths');
  if (baths) {
    const bathsNum = parseInt(baths);
    filtered = filtered.filter((p) => p.baths >= bathsNum);
  }

  const areaSlider = document.getElementById('filterArea');
  if (areaSlider) {
    const minArea = parseInt(areaSlider.value);
    if (minArea > 0) filtered = filtered.filter((p) => p.area >= minArea);
  }

  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  if (priceMin && priceMin.value) {
    filtered = filtered.filter((p) => p.price >= parseInt(priceMin.value));
  }
  if (priceMax && priceMax.value) {
    filtered = filtered.filter((p) => p.price <= parseInt(priceMax.value));
  }

  const extras = getCheckedExtras();
  if (extras.length > 0) {
    filtered = filtered.filter((p) =>
      extras.every((extra) => p.features.some((f) => f.toLowerCase().includes(extra.toLowerCase())))
    );
  }

  return filtered;
}

// ─── Update Results Count ───────────────────────────
function updateResultsCount() {
  const count = getFilteredProperties().length;
  const el = document.getElementById('resultsCount');
  if (el) el.textContent = count;
}

// ─── Search Button (Main bar) ───────────────────────
function initSearch() {
  const btn = document.getElementById('searchBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const filtered = getFilteredProperties();
    renderProperties(filtered.length ? filtered : properties);
    initScrollAnimations();
    document.getElementById('propiedades').scrollIntoView({ behavior: 'smooth' });
  });
}

// ─── Parallax subtle effect on hero ─────────────────
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(${1.05 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
    }
  });
}

// ─── Init ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProperties(properties);
  initNavbar();
  initScrollAnimations();
  initCounters();
  initFavorites();
  initSearchTabs();
  initAdvancedFilters();
  initSearch();
  initParallax();
});
