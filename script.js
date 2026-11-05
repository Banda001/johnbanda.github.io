// ============================================
// John Banda — Portfolio JavaScript
// BSc IT Graduate, Class of 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Typing Effect ---
  const typedEl = document.getElementById('typed-text');
  const roles = [
    'BSc IT Graduate',
    'Full-Stack Developer',
    'Problem Solver',
    'Open to Opportunities',
    'Tech Enthusiast',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 320;
    }

    setTimeout(type, speed);
  }

  type();

  // --- Navbar Scroll Effect ---
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('.section, .hero');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 130;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .contact-card, ' +
    '.contact-availability, .about-grid, .contact-grid, ' +
    '.graduation-layout, .grad-highlight-item'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  fadeElements.forEach(el => observer.observe(el));

  // --- Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el       = entry.target;
        const target   = parseInt(el.getAttribute('data-count'));
        const duration = 1600;
        const start    = performance.now();

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // --- Graduation Photo Gallery ---
  const mainImg   = document.getElementById('grad-main-img');
  const thumbBtns = document.querySelectorAll('.grad-thumb');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Swap main image
      mainImg.src = btn.getAttribute('data-src');
      mainImg.alt = btn.querySelector('img').alt;

      // Update active state
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // --- Contact Form ---
  // To enable real email delivery, replace the action URL in index.html
  // with your Formspree endpoint: https://formspree.io/f/YOUR_FORM_ID
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      const action = contactForm.getAttribute('action');

      // If Formspree is not yet configured, show a friendly fallback
      if (!action || action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        const btn          = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML      = '✓ Thanks! Email me directly at jb938047@gmail.com';
        btn.style.background = '#22c55e';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML        = originalHTML;
          btn.style.background = '';
          btn.disabled         = false;
        }, 4000);
        return;
      }

      // Formspree is configured — let native form submit handle it,
      // but show feedback while the request is in flight
      e.preventDefault();
      const btn          = contactForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML      = 'Sending…';
      btn.disabled       = true;

      try {
        const data     = new FormData(contactForm);
        const response = await fetch(action, {
          method:  'POST',
          headers: { Accept: 'application/json' },
          body:    data,
        });

        if (response.ok) {
          btn.innerHTML        = '✓ Message Sent!';
          btn.style.background = '#22c55e';
          contactForm.reset();
          setTimeout(() => {
            btn.innerHTML        = originalHTML;
            btn.style.background = '';
            btn.disabled         = false;
          }, 3500);
        } else {
          throw new Error('Server error');
        }
      } catch {
        btn.innerHTML        = 'Failed — try emailing directly';
        btn.style.background = '#ef4444';
        setTimeout(() => {
          btn.innerHTML        = originalHTML;
          btn.style.background = '';
          btn.disabled         = false;
        }, 4000);
      }
    });
  }

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
