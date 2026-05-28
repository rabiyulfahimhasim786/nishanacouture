// ===== NISHANA COUTURE — SCRIPT.JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── MOBILE MENU ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[data-required]').forEach(field => {
      const error = field.parentElement.querySelector('.form-error');
      if (!field.value.trim()) {
        if (error) { error.style.display = 'block'; error.textContent = 'This field is required.'; }
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        if (error) { error.style.display = 'block'; error.textContent = 'Please enter a valid email.'; }
        valid = false;
      } else {
        if (error) error.style.display = 'none';
      }
    });

    if (valid) {
      form.style.opacity = '0.5';
      setTimeout(() => {
        form.reset();
        form.style.opacity = '1';
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => successMsg.style.display = 'none', 5000);
        }
      }, 800);
    }
  });

  // ── COMING SOON MODAL ──
  const comingSoonBtns = document.querySelectorAll('[data-coming-soon]');
  comingSoonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('✨ Online shop coming soon! Visit us or WhatsApp to order.');
    });
  });

  // ── TOAST NOTIFICATION ──
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #1a1a1a;
      color: #e8d5b0;
      font-family: 'Jost', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 0.05em;
      padding: 14px 24px;
      z-index: 9999;
      opacity: 0;
      transition: all 0.4s;
      border-left: 2px solid #c9a96e;
      max-width: 90vw;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ── SMOOTH ANCHOR SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── GALLERY LIGHTBOX (simple) ──
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img')?.src;
      if (!imgSrc) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.92);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999; cursor: zoom-out; padding: 2rem;
      `;
      const img = document.createElement('img');
      img.src = imgSrc;
      img.style.cssText = `max-width: 90vw; max-height: 90vh; object-fit: contain; box-shadow: 0 20px 60px rgba(0,0,0,0.5);`;
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.remove(); }, { once: true });
    });
  });

  // ── COUNTER ANIMATION ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(interval);
      }, 40);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

});
