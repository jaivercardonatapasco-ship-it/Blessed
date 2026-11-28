/* =========================================
   BLESSD // EL BENDITO — INTERACTIVE SCRIPT
   Catálogo, Filtros, Telemetría, Audio & Modal
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------
  // 1. DATOS DE DISCOGRAFÍA CON FOTOS REALES DE BLESSD
  // ---------------------------------------
  const discographyData = [
    {
      id: 'si-sabe',
      title: 'Si Sabe',
      type: 'album',
      year: '2024',
      streams: '980M+ STREAMS',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaiSQXkMHOopm__-QnS0HW0jbTxDvxj3-xndRgNcShIHzErtxaJNvykLY&s=10?auto=format&fit=crop&w=600&q=80',
      description: 'Álbum conceptual con esencia paisa moderna, colaboraciones estelares y energía de club.',
      tracks: ['Si Sabe Ferxxo', 'Mírame', '1000', 'Te Extraño']
    },
    {
      id: 'siempre-blessd',
      title: 'Siempre Blessd',
      type: 'album',
      year: '2022',
      streams: '1.2B+ STREAMS',
      cover: 'https://images.genius.com/1df6aef145c54fc32a6b03cbd29ae15f.1000x1000x1.png?auto=format&fit=crop&w=600&q=80',
      description: 'Producción debut de largo alcance que consolidó su identidad en Latinoamérica y Europa.',
      tracks: ['Tendencia Global', 'Quien TV', 'Cura', 'Lejanía']
    },
    {
      id: 'mirame',
      title: 'Mírame (feat. Ovy On The Drums)',
      type: 'single',
      year: '2024',
      streams: '340M+ STREAMS',
      cover: 'https://i.scdn.co/image/ab67616d0000b2739d96ae35d725e30b02134b4c?auto=format&fit=crop&w=600&q=80',
      description: 'Sencillo de alto impacto emocional y perreo melódico posicionado en los primeros lugares.',
      tracks: ['Mírame (Original Mix)', 'Mírame (Instrumental)']
    },
    {
      id: 'si-sabe-ferxxo',
      title: 'Si Sabe Ferxxo (feat. Feid)',
      type: 'single',
      year: '2024',
      streams: '410M+ STREAMS',
      cover: 'https://i.ytimg.com/vi/D-_X9O-CxE4/sddefault.jpg?auto=format&fit=crop&w=600&q=80',
      description: 'Himno urbano de Medellín con estética inconfundible y rotación global.',
      tracks: ['Si Sabe Ferxxo', 'Si Sabe Ferxxo (Sped Up)']
    },
    {
      id: 'medallo',
      title: 'Medallo',
      type: 'single',
      year: '2021',
      streams: '520M+ STREAMS',
      cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMShiw6IKUJXbcjGjqqZjwIdLebJypSPa4dKXx-v5iXw3pp9oBQBfJmFOl&s=10?auto=format&fit=crop&w=600&q=80',
      description: 'Junto a Justin Quiles y Lenny Tavárez; pieza clave en la expansión internacional.',
      tracks: ['Medallo', 'Medallo (Remix)']
    },
    {
      id: 'las-morras',
      title: 'Las Morras (feat. Peso Pluma)',
      type: 'single',
      year: '2023',
      streams: '260M+ STREAMS',
      cover: 'https://i.ytimg.com/vi/4jvO-GCO_Tk/maxresdefault.jpg?auto=format&fit=crop&w=600&q=80',
      description: 'Cruce de sonidos urbanos y regional mexicano con gran alcance en plataformas digitales.',
      tracks: ['Las Morras']
    }
  ];

  // ---------------------------------------
  // 2. NAVEGACIÓN MÓVIL & SCROLL HEADER
  // ---------------------------------------
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  const toggleMenu = (forceState) => {
    const isOpen = typeof forceState === 'boolean' ? forceState : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => toggleMenu());

    navItems.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
  }, { passive: true });

  // ---------------------------------------
  // 3. REVEAL ON SCROLL (INTERSECTION OBSERVER)
  // ---------------------------------------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ---------------------------------------
  // 4. TELEMETRÍA SIMULADA EN TIEMPO REAL
  // ---------------------------------------
  const listenersEl = document.getElementById('metric-listeners');
  const streamsEl = document.getElementById('metric-streams');

  const parseNum = (str) => parseInt((str || '0').replace(/\D/g, ''), 10) || 0;
  let currentListeners = parseNum(listenersEl?.textContent) || 24850120;
  let currentStreams = parseNum(streamsEl?.textContent) || 3412908440;

  setInterval(() => {
    const listenerDelta = Math.floor(Math.random() * 14) + 1;
    const streamDelta = Math.floor(Math.random() * 420) + 85;

    currentListeners += listenerDelta;
    currentStreams += streamDelta;

    if (listenersEl) listenersEl.textContent = currentListeners.toLocaleString('en-US');
    if (streamsEl) streamsEl.textContent = currentStreams.toLocaleString('en-US');
  }, 3500);

  // ---------------------------------------
  // 5. MINI REPRODUCTOR (AUDIO REAL HTML5)
  // ---------------------------------------
  const playBtn = document.getElementById('play-preview-btn');
  const equalizer = document.getElementById('equalizer');
  const blessdAudio = document.getElementById('blessd-audio');

  let isPlaying = false;

  const stopPreview = () => {
    isPlaying = false;
    if (blessdAudio) blessdAudio.pause();
    if (playBtn) {
      playBtn.textContent = '▶';
      playBtn.setAttribute('aria-label', 'Reproducir frecuencia');
    }
    if (equalizer) {
      equalizer.classList.remove('playing');
    }
  };

  const startPreview = () => {
    if (blessdAudio) {
      blessdAudio.play().catch(() => {
        // Fallback en caso de bloqueo de autoplay del navegador
      });
    }
    isPlaying = true;
    if (playBtn) {
      playBtn.textContent = '❚❚';
      playBtn.setAttribute('aria-label', 'Pausar frecuencia');
    }
    if (equalizer) {
      equalizer.classList.add('playing');
    }
  };

  if (playBtn && blessdAudio) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopPreview();
      } else {
        startPreview();
      }
    });

    blessdAudio.addEventListener('ended', () => {
      stopPreview();
    });
  }

  // ---------------------------------------
  // 6. MODAL REUTILIZABLE
  // ---------------------------------------
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalExtra = document.getElementById('modal-extra');

  const openModal = ({ tag = 'DETALLE_SISTEMA', title = '', body = '', extraLines = [] }) => {
    if (!modalBackdrop) return;
    modalTag.textContent = tag;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalExtra.innerHTML = extraLines.map((line) => `<span>▸ ${line}</span>`).join('');

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  // ---------------------------------------
  // 7. DISCOGRAFÍA DINÁMICA + FILTROS
  // ---------------------------------------
  const discoGrid = document.getElementById('disco-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const renderDiscography = (filter = 'all') => {
    if (!discoGrid) return;

    const filtered = filter === 'all'
      ? discographyData
      : discographyData.filter((item) => item.type === filter);

    discoGrid.innerHTML = filtered.map((item) => {
      const typeLabel = item.type === 'album' ? 'ÁLBUM' : 'SENCILLO';
      return `
        <article class="disco-card glass-panel" data-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalles de ${item.title}">
          <div>
            <div class="disco-cover" style="background-image: url('${item.cover}')">
              <span class="disco-type-pill">${typeLabel}</span>
            </div>
            <div class="disco-meta mono" style="margin-top: 0.9rem;">
              <span>${item.year}</span>
              <span>${item.streams}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          <div class="disco-footer mono">
            <span>VER TRACKLIST</span>
            <span>↗</span>
          </div>
        </article>
      `;
    }).join('');

    discoGrid.querySelectorAll('.disco-card').forEach((card) => {
      const handleOpen = () => {
        const item = discographyData.find((d) => d.id === card.dataset.id);
        if (!item) return;
        openModal({
          tag: `CATALOG // ${item.type.toUpperCase()} (${item.year})`,
          title: item.title,
          body: item.description,
          extraLines: [
            `RENDIMIENTO: ${item.streams}`,
            `TRACKS CLAVE: ${item.tracks.join(' • ')}`
          ]
        });
      };

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      });
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderDiscography(btn.dataset.filter);
    });
  });

  renderDiscography('all');

  // ---------------------------------------
  // 8. GALERÍA INTERACTIVA
  // ---------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((figure) => {
    figure.addEventListener('click', () => {
      const code = figure.querySelector('figcaption')?.textContent?.trim() || 'ARCHIVO_057';
      const caption = figure.dataset.caption || 'Registro oficial en vivo';
      openModal({
        tag: `VISUAL_ARCHIVE // ${code}`,
        title: caption,
        body: 'Captura de archivo correspondiente a presentaciones en vivo, giras mundiales y sesiones de estudio de Blessd "El Bendito".',
        extraLines: [
          'FORMATO: ARCHIVO DIGITAL DE ALTA RESOLUCIÓN',
          'UBICACIÓN / CONTEXTO: CIRCUITO URBANO 057'
        ]
      });
    });
  });

  // ---------------------------------------
  // 9. TIENDA (RESERVA DE PIEZAS)
  // ---------------------------------------
  const addCartBtns = document.querySelectorAll('.add-cart-btn');
  const reservedItems = [];

  addCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.product || 'Pieza Oficial';
      const priceText = btn.closest('.product-card')?.querySelector('.price')?.textContent || '';
      reservedItems.push(productName);

      openModal({
        tag: 'MERCH_DROP // RESERVA TEMPORAL',
        title: 'Pieza añadida a tu pre-orden',
        body: `Has reservado "${productName}" ${priceText ? `(${priceText})` : ''} en la sesión actual.`,
        extraLines: [
          `PIEZAS EN PRE-ORDEN ACTUAL: ${reservedItems.length}`,
          'ENVÍOS INTERNACIONALES Y COBERTURA EN COLOMBIA'
        ]
      });
    });
  });

  // ---------------------------------------
  // 10. FORMULARIO DE BOOKING & MANAGEMENT
  // ---------------------------------------
  const bookingForm = document.getElementById('booking-form');
  const formFeedback = document.getElementById('form-feedback');

  if (bookingForm && formFeedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name')?.value.trim();
      const email = document.getElementById('client-email')?.value.trim();
      const date = document.getElementById('event-date')?.value;
      const eventType = document.getElementById('event-type')?.value;
      const details = document.getElementById('event-details')?.value.trim();

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');

      if (!name || !emailValid || !date || !details) {
        formFeedback.textContent = '[ERROR] Completa todos los campos obligatorios con un correo válido.';
        formFeedback.className = 'form-feedback error mono';
        return;
      }

      const ticketCode = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

      formFeedback.textContent = `[TRANSMITIDO] Solicitud registrada bajo código ${ticketCode} para ${eventType} (${date}).`;
      formFeedback.className = 'form-feedback success mono';

      openModal({
        tag: `BOOKING_SYS // ${ticketCode}`,
        title: 'Solicitud Enviada al Management',
        body: `Gracias, ${name}. Nuestro equipo ha registrado tu propuesta para "${eventType}" programada tentativamente para el ${date}.`,
        extraLines: [
          `CORREO DE CONTACTO: ${email}`,
          `DETALLES: ${details}`
        ]
      });

      bookingForm.reset();
    });
  }
});
