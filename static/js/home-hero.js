(function () {
  const header = document.getElementById('site-header');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const toggleHeaderShadow = () => {
    if (!header) return;
    const threshold = 12;
    if (window.scrollY > threshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const animateCount = (element) => {
    const target = Number(element.dataset.target || element.textContent || 0);
    if (!Number.isFinite(target)) {
      return;
    }
    const duration = 1200;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      element.textContent = Math.round(target * eased).toString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toString();
      }
    };

    requestAnimationFrame(update);
  };

  const counters = document.querySelectorAll('[data-animate-count]');
  if (!counters.length) {
    return;
  }

  const startAnimation = (element) => {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    element.textContent = '0';
    animateCount(element);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(startAnimation);
  }
})();
