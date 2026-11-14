/**
 * BLESSD // EL BENDITO — Lógica de Interfaz & Telemetría
 * Arquitectura modular en JavaScript Vainilla
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initTelemetrySimulation();
  initDiscography();
  initGalleryAndStoreModals();
  initBookingForm();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL & STICKY NAVBAR
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const items = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   2. EFECTOS AL HACER SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollEffects() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. SIMULACIÓN DE DATOS EN TIEMPO REAL & MINI REPRODUCTOR
   ========================================================================== */
function initTelemetrySimulation() {
  const streamsEl = document.getElementById('metric-streams');
  const listenersEl = document.getElementById('metric-listeners');
  let totalStreams = 3412908440;
  let monthlyListeners = 24850120;

  // Incremento orgánico simulado cada 2.5 segundos
  setInterval(() => {
    totalStreams += Math.floor(Math.random() * 48) + 12;
    if (Math.random() > 0.65) {
      monthlyListeners += Math.floor(Math.random() * 5) + 1;
    }
    streamsEl.textContent = totalStreams.toLocaleString('es-CO');
    listenersEl.textContent = monthlyListeners.toLocaleString('es-CO');
  }, 2500);

  // Simulador visual de audio en el HUD
  const playBtn = document.getElementById('play-preview-btn');
  const equalizer = document.getElementById('equalizer');
  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '❚❚' : '▶';
    equalizer.classList.toggle('playing', isPlaying);
  });
}

/* ==========================================================================
   4. CATÁLOGO DISCOGRÁFICO CON FILTRADO DINÁMICO
   ========================================================================== */
const DISCOGRAPHY_DATA = [
  {
    id: 1,
    title: 'SI SABE',
    type: 'album',
    year: '2024',
    tracks: '14 Tracks • Warner Music Latina',
    summary: 'Álbum conceptual que consolidó la identidad sonora de Blessd, incluyendo éxitos como "Si Sabe Ferxxo" y "Condenado al Éxito II".',
    code: 'ALBUM_ID // 003-SS'
  },
  {
    id: 2,
    title: 'SIEMPRE BLESSD',
    type: 'album',
    year: '2022',
    tracks: '13 Tracks • Cigol / Warner',
    summary: 'Su segundo trabajo de estudio, explorando sonidos experimentales del reggaetón paisa y colaboraciones internacionales.',
    code: 'ALBUM_ID // 002-SB'
  },
  {
    id: 3,
    title: 'HECHO EN MEDELLÍN',
    type: 'album',
    year: '2021',
    tracks: '10 Tracks • Debut Oficial',
    summary: 'El álbum debut que narró su ascenso desde Barrio Antioquia hacia la escena global.',
    code: 'ALBUM_ID // 001-HM'
  },
  {
    id: 4,
    title: 'MÍRAME',
    type: 'single',
    year: '2024',
    tracks: 'Sencillo • Prod. Ovy On The Drums',
    summary: 'Uno de los temas más reproducidos del año en Latinoamérica, certificado multi-platino.',
    code: 'SINGLE_ID // 089-MR'
  },
  {
    id: 5,
    title: 'TENDENCIA GLOBAL',
    type: 'single',
    year: '2022',
    tracks: 'Sencillo • ft. Myke Towers, Ovy',
    summary: 'Sencillo de alto voltaje rítmico diseñado para clubes y festivales internacionales.',
    code: 'SINGLE_ID // 054-TG'
  },
  {
    id: 6,
    title: 'QUIÉN TV (REMIX)',
    type: 'single',
    year: '2021',
    tracks: 'Sencillo • ft. Ryan Castro',
    summary: 'Clásico moderno de la nueva escuela de Medellín que marcó un hito en plataformas digitales.',
    code: 'SINGLE_ID // 031-QTV'
  }
];

function initDiscography() {
  const grid = document.getElementById('disco-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderCards(filter = 'all') {
    const filtered = filter === 'all'
      ? DISCOGRAPHY_DATA
      : DISCOGRAPHY_DATA.filter(item => item.type === filter);

    grid.innerHTML = filtered.map(item => `
      <article class="disco-card glass-panel" data-id="${item.id}">
        <div>
          <div class="disco-cover"></div>
          <span class="disco-type mono">${item.type === 'album' ? 'ÁLBUM DE ESTUDIO' : 'SENCILLO'} // ${item.year}</span>
          <h3>${item.title}</h3>
        </div>
        <p class="disco-meta">${item.tracks}</p>
      </article>
    `).join('');

    // Conectar apertura de modal en cada tarjeta
    grid.querySelectorAll('.disco-card').forEach(card => {
      card.addEventListener('click', () => {
        const item = DISCOGRAPHY_DATA.find(d => d.id === Number(card.dataset.id));
        openModal(item.code, `${item.title} (${item.year})`, item.summary, item.tracks);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  renderCards();
}

/* ==========================================================================
   5. SISTEMA DE MODALES (GALERÍA & TIENDA)
   ========================================================================== */
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');

function openModal(tag, title, body, extra) {
  document.getElementById('modal-tag').textContent = tag;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = body;
  document.getElementById('modal-extra').textContent = extra;
  modalBackdrop.classList.add('open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

function initGalleryAndStoreModals() {
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Galería
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.dataset.caption;
      openModal(
        'ARCHIVO_VISUAL // HD_CAPTURE',
        caption,
        'Registro oficial del equipo audiovisual durante la gira internacional. Todos los derechos de imagen pertenecen a Cigol / Blessd Management.',
        'RESOLUCIÓN: 4K RAW // ARCHIVO VERIFICADO'
      );
    });
  });

  // Tienda Oficial
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.dataset.product;
      openModal(
        'STORE_SYSTEM // RESERVA_DROP',
        product,
        'Esta pieza pertenece a la colección cápsula oficial. Tu solicitud de reserva ha sido registrada en la cola de prioridad.',
        'ENVÍOS INTERNACIONALES DISPONIBLES // PAGO SEGURO'
      );
    });
  });
}

/* ==========================================================================
   6. FORMULARIO INTERACTIVO DE BOOKING / EVENTOS PRIVADOS
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const date = document.getElementById('event-date').value;
    const type = document.getElementById('event-type').value;
    const details = document.getElementById('event-details').value.trim();

    if (!name || !email || !date || !details) {
      feedback.textContent = '⚠ ERROR: Completa todos los campos requeridos para transmitir.';
      feedback.style.color = '#f87171';
      return;
    }

    const ticketCode = `BLSD-${Math.floor(100000 + Math.random() * 900000)}`;
    feedback.style.color = '#4db8f0';
    feedback.textContent = `✓ TRANSMISIÓN EXITOSA [${ticketCode}]. El equipo de booking responderá pronto.`;

    openModal(
      `BOOKING_TICKET // ${ticketCode}`,
      'Solicitud de Evento Recibida',
      `Hemos registrado la solicitud de "${name}" para un evento tipo "${type}" programado para el ${date}.`,
      `CONTACTO REGISTRADO: ${email}`
    );

    form.reset();
  });
}