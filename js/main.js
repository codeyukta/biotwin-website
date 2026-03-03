/* ========================================
   BioTwin - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll behavior ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---- Mobile menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  /* ---- Intersection Observer — fade in on scroll ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    }, step);
  }

  /* ---- Heart rate wave animation ---- */
  animateHeartWave();

  function animateHeartWave() {
    const path = document.querySelector('.hr-path');
    if (!path) return;

    const waves = [
      'M0,18 L10,18 L15,18 L18,5 L21,30 L24,5 L27,18 L35,18 L45,18 L48,8 L51,28 L54,8 L57,18 L70,18 L80,18 L83,6 L86,30 L89,6 L92,18 L110,18',
      'M0,18 L10,18 L13,18 L16,4 L19,32 L22,4 L25,18 L38,18 L48,18 L51,7 L54,29 L57,7 L60,18 L75,18 L85,18 L88,5 L91,31 L94,5 L97,18 L110,18',
      'M0,18 L12,18 L17,18 L20,6 L23,28 L26,6 L29,18 L40,18 L50,18 L53,9 L56,27 L59,9 L62,18 L78,18 L88,18 L91,7 L94,29 L97,7 L100,18 L110,18',
    ];

    let i = 0;
    setInterval(() => {
      path.setAttribute('d', waves[i % waves.length]);
      i++;
    }, 700);
  }

  /* ---- Tab active state on nav ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

});
