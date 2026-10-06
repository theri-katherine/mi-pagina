/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 05 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || !selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }



  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    if (!mobileNavToggleBtn) return;
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  function quitarPreloader() {
    if (preloader && preloader.parentNode) preloader.remove();
  }
  if (preloader) {
    window.addEventListener('load', quitarPreloader);
    document.addEventListener('DOMContentLoaded', () => setTimeout(quitarPreloader, 1500));
    setTimeout(quitarPreloader, 3000); // respaldo: nunca dejar la pantalla en negro
  }

  /**
   * Botón para subir al inicio / bajar al final de la página
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      const scrollTotal = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const scrollIcon = scrollTop.querySelector('i');

      // Si la página se puede desplazar
      if (scrollTotal > 10) {
        scrollTop.classList.add('active');

        // Si estamos en la mitad superior de la página, la flecha apunta hacia abajo para ir al final
        if (scrollPos < scrollTotal / 2) {
          if (scrollIcon) {
            scrollIcon.classList.remove('bi-arrow-up-short');
            scrollIcon.classList.add('bi-arrow-down-short');
          }
          scrollTop.setAttribute('title', 'Bajar al final');
          scrollTop.setAttribute('aria-label', 'Bajar al final');
        } else {
          // Si estamos en la mitad inferior de la página, la flecha apunta hacia arriba para ir al inicio
          if (scrollIcon) {
            scrollIcon.classList.remove('bi-arrow-down-short');
            scrollIcon.classList.add('bi-arrow-up-short');
          }
          scrollTop.setAttribute('title', 'Subir al inicio');
          scrollTop.setAttribute('aria-label', 'Subir al inicio');
        }
      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      const scrollTotal = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      // Si está en la mitad superior baja al final, de lo contrario sube al inicio
      if (scrollPos < scrollTotal / 2) {
        window.scrollTo({
          top: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
          behavior: 'smooth'
        });
        const scrollIcon = scrollTop.querySelector('i');
        if (scrollIcon) {
          scrollIcon.classList.remove('bi-arrow-down-short');
          scrollIcon.classList.add('bi-arrow-up-short');
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        const scrollIcon = scrollTop.querySelector('i');
        if (scrollIcon) {
          scrollIcon.classList.remove('bi-arrow-up-short');
          scrollIcon.classList.add('bi-arrow-down-short');
        }
      }
    });
  }

  // Inicializar inmediatamente y en eventos
  toggleScrollTop();
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('DOMContentLoaded', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('resize', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint === 'undefined') return;
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const cfg = swiperElement.querySelector(".swiper-config");
      if (!cfg || typeof Swiper === 'undefined') return;
      let config = JSON.parse(cfg.innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab") && typeof initSwiperWithCustomPagination === 'function') {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * PORTFOLIO: Carga manual y segura de fotos por categoría
   */
  const CARPETA_BASE = 'IMG/PORTFOLIO';

  const CATEGORIAS = {
    autorretrato: 'AUTORRETRATO',
    embarazo: 'EMBARAZO',
    newborn: 'NEWBORN',
    infantil: 'INFANTIL',
    retrato: 'RETRATO',
    producto: 'PRODUCTO',
    cosplay: 'COSPLAY',
    naturaleza: 'NATURALEZA'
  };

  const NOMBRES = {
    autorretrato: 'Autorretrato',
    embarazo: 'Embarazo',
    newborn: 'New Born',
    infantil: 'Infantil',
    retrato: 'Retrato',
    producto: 'Producto',
    cosplay: 'Cosplay',
    naturaleza: 'Naturaleza'
  };

  // Lista manual exacta basada en tus archivos reales
  const FOTOS_MANUALES = {
    autorretrato: [
      'AUTORETRATO 1.jpg',
      'AUTORETRATO 2.jpg',
      'AUTORETRATO 3.jpg',
      'AUTORETRATO 4.jpg',
      'AUTORETRATO 5.jpg',
      'AUTORETRATO 6.jpg',
      'BLANCA 1.jpg',
      'BLANCA 2.jpg',
      'BLANCA 3.jpg',
      'BW 1.jpg',
      'BW 2.jpg',
      'CALABAZA 1.jpg',
      'CALABAZA 2.jpg',
      'CALABAZA 3.jpg',
      'CALABAZA 4.jpg',
      'CALABAZA 5.jpg',
      'FANTASMA 1.jpg',
      'FANTASMA 2.jpg',
      'LENTES 1.jpg',
      'MADRE ARAÑ 3.jpg',
      'MADRE ARAÑA 1.jpg',
      'MADRE ARAÑA 2.jpg',
      'NUMERO1.jpg',
      'NUMEROS 2.jpg',
      'PELUCA NEGRA 1.jpg',
      'PELUCA NEGRA 2.jpg',
      'PELUCA NEGRA 3.jpg',
      'PELUCA NEGRA 4.jpg',
      'PELUCA NEGRA 5.jpg',
      'ROSA 1.jpg',
      'ROSA 2.jpg'
    ], // Agrega aquí los nombres de tus archivos si tienes
    embarazo: [
      'EMBARAZO 1.jpg', 
      'EMBARAZO 3.jpg', 
      'EMBARAZO 4.jpg', 
      'EMBARAZO 5.jpg', 
      'EMBARAZO 6.jpg', 
      'EMBARAZO 7.jpg', 
      'EMBARAZO 8.jpg', 
      'EMBARAZO 9.jpg', 
      'EMBARAZO 10.jpg'
    ],
    newborn: [
      'BEBE 1.jpg',
      'BEBE 2.jpg',
      'BEBE 3.jpg',
      'BEBE 4.jpg',
      'BEBE 5.jpg',
      'BEBE 6.jpg',
      'BEBE 7.jpg',
      'BEBE 8.jpg',
      'BEBE 9.jpg',
      'BEBE 10.jpg',
      'BEBE 11.jpg',
      'BEBE 12.jpg',
      'BEBE 13.jpg',
      'BEBE 14.jpg',
      'BEBE 15.jpg',
      'BEBE 16.jpg'
    ],
    infantil: [
      'DANTE.jpg',
      'INFANTIL 1.jpg',
      'INFANTIL 2.jpg',
      'INFANTIL 3.jpg',
      'INFANTIL 4.jpg',
      'INFANTIL 5.jpg',
      'INFANTIL 6.jpg'
    ],
    retrato: [
      'BOUDOIR 1.jpg',
      'BOUDOIR 2.jpg',
      'BOUDOIR 3.jpg',
      'BOUDOIR 4.jpg',
      'BOUDOIR 5.jpg',
      'BOUDOIR 6.jpg',
      'RETRATO 1.jpg',
      'RETRATO 2.jpg',
      'RETRATO 3.jpg',
      'RETRATO 4.jpg',
      'RETRATO 5.jpg',
      'RETRATO 6.jpg',
      'RETRATO 7.jpg',
      'RETRATO 8.jpg',
      'RETRATO 9.jpg',
      'RETRATO 10.jpg',
      'RETRATO 11.jpg',
      'RETRATO 12.jpg',
      'RETRATO 13.jpg'
    ],
    producto: [
      'ANILLO.jpg',
      'AROS 1.jpg',
      'AROS 2.jpg',
      'AROS 3.jpg',
      'COLLAR.jpg',
      'LABIAL.jpg',
      'PERFUME 1.jpg',
      'PERFUME 2.jpg',
      'PERFUME 3.jpg',
      'PERFUME 4.jpg',
      'PERFUME 5.jpg',
      'PERFUME 6.jpg',
      'PERFUME 7.jpg'
    ],
    cosplay: [
      'BOWSER 1.jpg',
      'BOWSER 2.jpg',
      'BOWSER 3.jpg',
      'CASTILLO 1.jpg',
      'CASTILLO 2.jpg',
      'CONDESA 1.jpg',
      'CONDESA 2.jpg',
      'FREDDY 1.jpg',
      'FREDDY 2.jpg',
      'FREDDY 3.jpg',
      'GENSHIN 1.jpg',
      'GENSHIN 2.jpg',
      'GENSHIN 3.jpg',
      'GENSHIN 4.jpg',
      'HISOKA 1.jpg',
      'HISOKA 2.jpg',
      'HISOKA 3.jpg',
      'HISOKA 4.jpg',
      'HISOKA 5.jpg',
      'HISOKA 6.jpg',
      'HISOKA 7.jpg',
      'HISOKA 8.jpg',
      'HISOKA 9.jpg',
      'HISOKA 10.jpg',
      'HISOKA 11.jpg',
      'HISOKA 12.jpg',
      'HISOKA 13.jpg',
      'NO SE 1.jpg',
      'NO SE 2.jpg',
      'PEACH 1.jpg',
      'PEACH 2.jpg',
      'PEACH 3.jpg',
      'PEACH 4.jpg',
      'REAPER 1.jpg',
      'REAPER 2.jpg',
      'REAPER 3.jpg',
      'REAPER 4.jpg',
      'SILEN HILL 4.jpg',
      'SILENT HILL 1.jpg',
      'SILENT HILL 2.jpg',
      'SILENT HILL 3.jpg',
      'SILENT HILL 4.jpg',
      'SPIDERMAN 1.jpg',
      'SPIDERMAN 2.jpg',
      'SPIDERMAN 3.jpg',
      'STAR WARS 1.jpg',
      'STAR WARS 2.jpg',
      'STAR WARS 3.jpg',
      'STAR WARS 4.jpg',
      'STAR WARS 5.jpg',
      'TOAD 1.jpg',
      'WOW 1.jpg',
      'WOW 2.jpg',
      'WOW 3.jpg',
      'WOW 4.jpg',
      'WOW 5.jpg',
      'WOW 6.jpg'
    ],
    naturaleza: [
      'ABEJA.png',
      'ARBOLES.jpg',
      'ASTROFOTO.png',
      'CALA 1.jpg',
      'CALA 2.jpg',
      'CASCADA.png',
      'DIENTE DE LEON.jpg',
      'DRAGON.png',
      'ESTRUCTURA2.jpg',
      'ESTRUCTURA2.png',
      'FLOR AMARILLA.jpg',
      'FLOR AMARILLA.png',
      'FLOR AZUL.jpg',
      'FLOR BLANCA 1.jpg',
      'FLOR BLANCA 3.jpg',
      'FLOR MORADA.jpg',
      'FLOR NARANJA.png',
      'FLOR ROSADA.jpg',
      'GATO 1.jpg',
      'GATO 2.jpg',
      'HOJA1.jpg',
      'HOJA2.png',
      'HOJAS BLANCAS.png',
      'HOJAS VERDES 2.png',
      'HOJAS VERDES 1.png',
      'HONGO.jpg',
      'MANO.jpg',
      'MARGARITA.jpg',
      'PAISAJE1.jpg',
      'PAISAJE2.jpg',
      'PATO AGUA1.jpg',
      'PATO AGUA2.png',
      'PATO SOMBRAS.jpg',
      'PATO1.jpg',
      'PATO2.jpg',
      'PATO3.jpg',
      'PIÑON.jpg',
      'PORTILLO1.png',
      'PORTILLO2.png',
      'RUEDA NOCHE.jpg',
      'TABLA.png',
      'TORTUGA.png',
      'TRES PATOS 1.png',
      'TRES PATOS 2.jpg',
      'VACAS 1.jpg',
      'VACAS 2.jpg',
      'VACAS 3.jpg',
      'VIA LACTEA.png'
    ],
  };

  function cargarPortfolio() {
    const contenedor = document.querySelector('.isotope-container');
    if (!contenedor || contenedor.children.length) return;

    let htmlContenido = '';

    Object.keys(CATEGORIAS).forEach(clave => {
      const fotos = FOTOS_MANUALES[clave] || [];
      
      fotos.forEach(nombre => {
        const carpetaNombre = CATEGORIAS[clave];
        // Codifica correctamente la ruta para evitar errores con espacios en los nombres
        const src = `${CARPETA_BASE}/${carpetaNombre}/${encodeURIComponent(nombre)}`;
        const titulo = nombre.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
        
        htmlContenido += `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-${clave}">
            <div class="portfolio-content h-100">
              <a href="${src}" class="glightbox" data-gallery="galeria-${clave}">
                <img src="${src}" class="img-fluid" alt="${titulo}">
              </a>
            </div>
          </div>`;
      });
    });

    contenedor.innerHTML = htmlContenido;
  }

  /**
   * Inicia glightbox e isotope
   */
  function iniciarGaleria() {
    cargarPortfolio();

    if (typeof GLightbox !== 'undefined') GLightbox({
      selector: '.glightbox'
    });

    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
      const botones = isotopeItem.querySelectorAll('.isotope-filters li');

      // Filtro inicial: el <li> con filter-active, o el primero si no hay ninguno
      let botonInicial = isotopeItem.querySelector('.isotope-filters li.filter-active') || botones[0];
      if (!botonInicial) return;
      botones.forEach(b => b.classList.remove('filter-active'));
      botonInicial.classList.add('filter-active');
      let filter = botonInicial.getAttribute('data-filter');

      let initIsotope;
      if (typeof imagesLoaded === 'undefined' || typeof Isotope === 'undefined') return;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
          botones.forEach(b => b.classList.remove('filter-active'));
          this.classList.add('filter-active');
          if (!initIsotope) return;
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }

  window.addEventListener('load', iniciarGaleria);

  if (typeof GLightbox !== 'undefined') {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true
  });
}

(function () {
  "use strict";

  // Solo se ejecuta en la página de detalle de servicios
  if (!document.getElementById('lista-servicios')) return;

  // EDITA AQUÍ los textos, imágenes y puntos de cada servicio.
  // El orden es el mismo que en services.html.
  const SERVICIOS = {
    1: {
      nombre: "Guía práctica de fotografía",
      lateralTitulo: "Aprende a fotografiar con intención",
      lateralTexto: "Una guía clara y práctica para mejorar tus fotos paso a paso.",
      titulo: "Guía práctica de fotografía",
      descripcion: "Domina el uso manual de tu cámara, aprende a leer la luz natural y aplica reglas de composición para que cada captura transmita exactamente lo que buscas..",
      puntos: [
  "Manejo avanzado del triángulo de exposición (ISO, velocidad y apertura).",
  "Técnicas efectivas de composición y encuadre en terreno.",
  "Ejercicios prácticos para dominar la luz natural."
],
      imagen: "IMG/PORTFOLIO/RETRATO/RETRATO 13.jpg"
    },
    2: {
      nombre: "Pre producción",
      lateralTitulo: "Planificar antes de disparar",
      lateralTexto: "Concepto, locación, vestuario y referencias antes de la sesión.",
      titulo: "Pre producción",
      descripcion: "La base de un gran resultado fotográfico se construye antes de presionar el disparador. Analizamos juntos el concepto, la estética y la logística de la sesión.",
      puntos: [
  "Definición de conceptos creativos y moodboards de inspiración.",
  "Selección adecuada de locaciones y dirección de arte.",
  "Planificación logística y organización de equipos de trabajo."
],
      imagen: "IMG/PORTFOLIO/INFANTIL/DANTE.jpg"
    },
    3: {
      nombre: "Post producción",
      lateralTitulo: "El cierre visual de cada proyecto",
      lateralTexto: "Selección, edición y color para un resultado coherente.",
      titulo: "Post producción",
      descripcion: "Dótale a tus imágenes una identidad visual única mediante un revelado profesional, corrección de color precisa y un tratamiento estético impecable.",
      puntos: [
  "Revelado digital y balance de blancos profesional.",
  "Corrección de color y estilización de la atmósfera visual.",
  "Optimización de archivos para impresión y formatos web."
],
      imagen: "IMG/PORTFOLIO/NATURALEZA/HOJAS VERDES 1.png"
    },
    4: {
      nombre: "Análisis de imágenes",
      lateralTitulo: "Mira tus fotos con otros ojos",
      lateralTexto: "Comentarios y mejoras concretas sobre tu trabajo.",
      titulo: "Análisis de imágenes",
      descripcion: "Una mirada crítica y constructiva sobre tu portafolio o proyectos fotográficos para potenciar tus puntos fuertes y corregir detalles técnicos de encuadre y luz..",
      puntos: [
  "Evaluación crítica de la técnica y la narrativa visual.",
  "Sugerencias constructivas para mejorar encuadres y luces.",
  "Optimización y curadoría de galerías fotográficas."
],
      imagen: "./IMG/PORTFOLIO/NATURALEZA/PAISAJE1.jpg"
    },
    5: {
      nombre: "Taller de fotografía",
      lateralTitulo: "Aprende practicando",
      lateralTexto: "Sesiones prácticas para llevar tu fotografía al siguiente nivel.",
      titulo: "Taller de fotografía",
      descripcion: "Clases y experiencias de aprendizaje totalmente prácticas, diseñadas para que pierdas el miedo al modo manual y desarrolles tu propio estilo visual.",
      puntos: [
  "Clases prácticas enfocadas en la experimentación directa.",
  "Asesoría personalizada para potenciar tu propio estilo.",
  "Resolución de dudas en tiempo real durante las sesiones."
],
      imagen: "IMG/PORTFOLIO/RETRATO/RETRATO 3.jpg"
    },
    6: {
      nombre: "Foto montaje digital",
      lateralTitulo: "Detalles que marcan la diferencia",
      lateralTexto: "Retoque cuidadoso que mantiene lo natural de cada imagen.",
      titulo: "Foto montaje digital",
      descripcion: "Edición detallada y pulido de elementos visuales para lograr acabados limpios, profesionales y armónicos en cada fotografía.",
      puntos: [
  "Limpieza minuciosa de imperfecciones y detalles en la piel.",
  "Armonización de texturas y tonos en cada composición.",
  "Acabados limpios y profesionales que mantienen la naturalidad."
],
      imagen: "IMG/PORTFOLIO/NEWBORN/BEBE 10.jpg"
    }
  };

  const $ = (id) => document.getElementById(id);

  function idDesdeUrl() {
    const n = parseInt(new URLSearchParams(window.location.search).get('servicio'), 10);
    return SERVICIOS[n] ? n : 1;
  }

  function mostrarServicio(n, actualizarUrl) {
    const s = SERVICIOS[n];
    if (!s) return;

    document.querySelectorAll('#lista-servicios a').forEach(a => {
      a.classList.toggle('active', a.dataset.servicio === String(n));
    });

    $('detalle-lateral-titulo').textContent = s.lateralTitulo;
    $('detalle-lateral-texto').textContent = s.lateralTexto;
    $('detalle-img').src = s.imagen;
    $('detalle-img').alt = s.nombre;
    $('detalle-titulo').textContent = s.titulo;
    $('detalle-descripcion').textContent = s.descripcion;
    $('detalle-texto').textContent = s.texto;
    $('detalle-breadcrumb').textContent = s.nombre;
    document.title = s.nombre + ' - Theri Katherine';

    const lista = $('detalle-lista');
    lista.innerHTML = '';
    s.puntos.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = '<i class="bi bi-check-circle"></i> <span></span>';
      li.querySelector('span').textContent = p;
      lista.appendChild(li);
    });

    if (actualizarUrl) {
      history.pushState({ servicio: n }, '', 'service-details.html?servicio=' + n);
    }
  }

  document.querySelectorAll('#lista-servicios a').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      mostrarServicio(parseInt(this.dataset.servicio, 10), true);
    });
  });

  window.addEventListener('popstate', () => mostrarServicio(idDesdeUrl(), false));

  mostrarServicio(idDesdeUrl(), false);
})();

  /**
   * Enlace de Instagram (todas las páginas)
   * Todo ícono de Instagram (bi-instagram) queda enlazado a tu perfil.
   */
  (function () {
    const URL_INSTAGRAM = "https://www.instagram.com/theri.katherine.ph?stkn=MW1ub2hmeDdzZjV1eg==";

    function enlazarInstagram() {
      document.querySelectorAll('i.bi-instagram').forEach(function (icono) {
        const enlace = icono.closest('a');
        if (!enlace) return;
        enlace.href = URL_INSTAGRAM;
        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';
        enlace.title = 'Instagram';
        enlace.setAttribute('aria-label', 'Instagram');
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enlazarInstagram);
    } else {
      enlazarInstagram();
    }
  })();

  /**
   * Botón flotante de WhatsApp (todas las páginas)
   */
  (function () {
    // ====== CONFIGURA AQUÍ ======
    const NUMERO = "56986671499"; // Código de país + número, sin "+", espacios ni guiones (Chile = 56)
    const MENSAJE = "Hola Theri, vi tu página y quisiera más información."; // Puede ir vacío
    // ============================

    function crearBotonWhatsapp() {
      if (document.getElementById('btn-whatsapp')) return;

      const estilo = document.createElement('style');
      estilo.textContent = `
        #btn-whatsapp {
          position: fixed;
          right: 15px;
          bottom: 70px; /* deja libre el botón de subir/bajar */
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #000
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          z-index: 9999;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        #btn-whatsapp:hover {backgroung-color: #000; color: #000; transform: scale(1.08); }
        #btn-whatsapp i { line-height: 1; }
      `;
      document.head.appendChild(estilo);

      const url = 'https://wa.me/' + NUMERO + (MENSAJE ? '?text=' + encodeURIComponent(MENSAJE) : '');
      const boton = document.createElement('a');
      boton.id = 'btn-whatsapp';
      boton.href = url;
      boton.target = '_blank';
      boton.rel = 'noopener noreferrer';
      boton.title = 'Escríbeme por WhatsApp';
      boton.setAttribute('aria-label', 'Escríbeme por WhatsApp');
      boton.innerHTML = '<i class="bi bi-whatsapp"></i>';
      document.body.appendChild(boton);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', crearBotonWhatsapp);
    } else {
      crearBotonWhatsapp();
    }
  })();

})();
