/**
 * ===================================================================
 * STACKLY KIDS ACADEMY - MASTER JAVASCRIPT
 * File: assets/js/script.js
 * Theme: Online Learning Courses For Kids (Ages 4 - 15)
 * Features:
 *   1. Dynamic Component Loader (header.html & footer.html directly loaded)
 *   2. Fixed Header on Scroll & Navbar transitions
 *   3. Fullscreen Mobile Navigation Menu Overlay
 *   4. Scroll to Top Floating Button with Circular Progress
 *   5. AOS (Animate On Scroll) Initialization
 *   6. Three.js 3D Playful Floating Shapes Interactive Canvas
 *   7. GSAP Smooth Animations & Numerical Counter Triggers
 *   8. Interactive Course Quiz / Style Finder
 *   9. Preloader Handler & Active Nav Highlighter
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // -------------------------------------------------------------------
  // 1. COMPONENT LOADER: LOADS header.html & footer.html DIRECTLY
  // -------------------------------------------------------------------
  const headerContainer = document.getElementById('header-placeholder');
  const footerContainer = document.getElementById('footer-placeholder');

  async function loadComponent(element, file) {
    if (!element) return;
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: status ${response.status}`);
      }
      const html = await response.text();
      element.innerHTML = html;
    } catch (err) {
      console.warn(`Notice: Failed loading ${file} directly.`, err);
    }
  }

  // Pre-bind if elements already exist in DOM
  initNavigation();
  initScrollToTop();
  highlightActiveNav();
  updateCopyrightYear();

  // Load header.html and footer.html components and initialize handlers
  Promise.all([
    headerContainer ? loadComponent(headerContainer, 'header.html') : Promise.resolve(),
    footerContainer ? loadComponent(footerContainer, 'footer.html') : Promise.resolve()
  ]).then(() => {
    initNavigation();
    initScrollToTop();
    highlightActiveNav();
    updateCopyrightYear();
  });

  // -------------------------------------------------------------------
  // 2. FIXED HEADER ON SCROLL
  // -------------------------------------------------------------------
  window.addEventListener('scroll', function () {
    const siteHeader = document.getElementById('siteHeader');
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // -------------------------------------------------------------------
  // 3. FULLSCREEN MOBILE NAVIGATION MENU
  // -------------------------------------------------------------------
  function initNavigation() {
    const toggleBtn = document.getElementById('mobileMenuToggleBtn');
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    const overlay = document.getElementById('fullscreenMobileMenu');

    if (!toggleBtn || !overlay) return;

    function openMenu() {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
      });
    }

    const mobileLinks = overlay.querySelectorAll('.mobile-nav-link, .btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------
  // 4. FLOATING SCROLL TO TOP WITH PROGRESS RING
  // -------------------------------------------------------------------
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;

    const progressCircle = scrollBtn.querySelector('.progress-ring-circle');
    const radius = 21;
    const circumference = 2 * Math.PI * radius;

    if (progressCircle) {
      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = `${circumference}`;
    }

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      if (scrollTop > 300) {
        scrollBtn.classList.add('visible');
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('visible');
        scrollBtn.classList.remove('show');
      }

      if (progressCircle) {
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }
    });

    scrollBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------
  // 5. ACTIVE NAV LINK HIGHLIGHTER
  // -------------------------------------------------------------------
  function highlightActiveNav() {
    const currentPath = window.location.pathname.toLowerCase();
    const navMap = {
      'index.html': 'nav-home',
      'about.html': 'nav-about',
      'courses.html': 'nav-courses',
      'teachers.html': 'nav-teachers',
      'activities.html': 'nav-activities',
      'pricing.html': 'nav-pricing',
      'contact.html': 'nav-contact'
    };

    let activeId = 'nav-home';
    for (const [page, id] of Object.entries(navMap)) {
      if (currentPath.endsWith(page)) {
        activeId = id;
        break;
      }
    }

    const currentLink = document.getElementById(activeId);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }

  // -------------------------------------------------------------------
  // 6. UPDATE COPYRIGHT YEAR
  // -------------------------------------------------------------------
  function updateCopyrightYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // -------------------------------------------------------------------
  // 7. PRELOADER HANDLER
  // -------------------------------------------------------------------
  window.addEventListener('load', function () {
    const preloader = document.getElementById('global-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 600);
      }, 400);
    }
  });

  // -------------------------------------------------------------------
  // 8. AOS ANIMATION INIT
  // -------------------------------------------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // -------------------------------------------------------------------
  // 9. THREE.JS 3D PLAYFUL FLOATING SHAPES CANVAS
  // -------------------------------------------------------------------
  const heroCanvas = document.getElementById('threejs-hero-canvas');
  if (heroCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const colors = [0x4F46E5, 0xFBBF24, 0xFF4D6D, 0x06B6D4, 0x10B981, 0x8B5CF6];
    const shapes = [];

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(15, 20, 15);
    scene.add(dirLight);

    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.TorusGeometry(1.1, 0.4, 12, 24),
      new THREE.DodecahedronGeometry(1.1, 0),
      new THREE.OctahedronGeometry(1.3, 0),
      new THREE.SphereGeometry(1, 16, 16)
    ];

    for (let i = 0; i < 24; i++) {
      const geom = geometries[Math.floor(Math.random() * geometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.1,
        wireframe: Math.random() > 0.75
      });

      const mesh = new THREE.Mesh(geom, material);
      mesh.position.x = (Math.random() - 0.5) * 45;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = (Math.random() - 0.5) * 20;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        speedRot: (Math.random() - 0.5) * 0.02
      };

      shapes.push(mesh);
      scene.add(mesh);
    }

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
      requestAnimationFrame(animate);

      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.speedRot;
        shape.rotation.y += shape.userData.speedRot;
        shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.015;
      });

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function () {
      if (!heroCanvas) return;
      const width = heroCanvas.clientWidth;
      const height = heroCanvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  // -------------------------------------------------------------------
  // 10. GSAP ANIMATIONS & COUNTER TRIGGERS
  // -------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count')) || 0;
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';

        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            once: true
          },
          onUpdate: function () {
            counter.innerHTML = prefix + Math.floor(counter.innerText).toLocaleString() + suffix;
          }
        });
      });
    }

    gsap.to('.hero-badge-float', {
      y: '-=10',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });
  }

  // -------------------------------------------------------------------
  // 11. INTERACTIVE LEARNING STYLE FINDER WIDGET
  // -------------------------------------------------------------------
  const quizForm = document.getElementById('learningStyleQuizForm');
  const quizResultBox = document.getElementById('quizResultBox');

  if (quizForm && quizResultBox) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const age = document.getElementById('quizKidAge').value;
      const interest = document.getElementById('quizKidInterest').value;

      let track = 'Scratch Coding & Animation';
      let desc = 'Your child has a creative builder mindset! They will love crafting interactive games and animated stories.';
      let badge = '🚀 Future Game Creator';

      if (interest === 'science') {
        track = 'STEM Science & Robotics';
        desc = 'Curious explorer alert! Hands-on physical tinkering, experiments, and simple circuits fit best.';
        badge = '🔬 Young Scientist';
      } else if (interest === 'art') {
        track = 'Creative Digital Art & 3D Design';
        desc = 'Imaginative visionary! They will thrive learning digital illustration, character design, and colors.';
        badge = '🎨 Master Illustrator';
      } else if (interest === 'math') {
        track = 'Math Wizards & Logic Puzzles';
        desc = 'Puzzle solver! Visual math games, pattern challenges, and chess-level logic will supercharge their mind.';
        badge = '⚡ Logic Prodigy';
      }

      quizResultBox.innerHTML = `
        <div class="p-4 rounded-4 bg-soft-indigo border border-primary border-opacity-25" data-aos="zoom-in">
          <span class="badge bg-sun-yellow text-dark fw-bold mb-2">${badge}</span>
          <h4 class="text-primary-indigo fw-bold mb-1">Recommended Pathway: ${track}</h4>
          <p class="text-body small mb-3">${desc} (Tailored for age ${age || '7-10'})</p>
          <a href="register.html" class="btn btn-hero-primary py-2 px-4 small">
            Claim Free Demo in ${track} <i class="fa-solid fa-arrow-right ms-1"></i>
          </a>
        </div>
      `;
      quizResultBox.classList.remove('d-none');
    });
  }

});
