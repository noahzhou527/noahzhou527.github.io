
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupScrollIndicator() {
  const hero = document.querySelector('.hero');

  if (!hero || hero.querySelector('.scroll-indicator')) {
    return;
  }

  const nextSection = hero.parentElement?.querySelector('.section');

  if (!nextSection) {
    return;
  }

  const indicator = document.createElement('button');
  indicator.type = 'button';
  indicator.className = 'scroll-indicator';
  indicator.setAttribute('aria-label', 'Scroll to the next section');
  indicator.innerHTML = '<span class="mouse" aria-hidden="true"></span><span>Scroll</span>';
  indicator.addEventListener('click', () => {
    nextSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  });

  hero.appendChild(indicator);

  requestAnimationFrame(() => {
    indicator.classList.add('is-visible');
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');

    if (!href || href === '#') {
      return;
    }

    let url;

    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }

    if (url.pathname !== window.location.pathname || !url.hash) {
      return;
    }

    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(url.hash);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      history.replaceState(null, '', url.hash);
    });
  });
}

function applyRevealStagger() {
  const staggerGroups = [
    '.stat-grid',
    '.grid-2',
    '.grid-3',
    '.quick-grid',
    '.team-grid',
    '.persona-grid',
    '.mock-list',
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      [...group.children].forEach((child, index) => {
        if (child.classList.contains('reveal') && !child.style.getPropertyValue('--reveal-delay')) {
          child.style.setProperty('--reveal-delay', `${Math.min(index * 100, 400)}ms`);
        }
      });
    });
  });
}

function setupReveal() {
  const revealElements = [...document.querySelectorAll('.reveal')];

  if (!revealElements.length) {
    return;
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((element) => {
    if (element.closest('.hero') || element.classList.contains('page-hero')) {
      element.classList.add('visible');
      return;
    }

    observer.observe(element);
  });
}

function setupParticles() {
  if (prefersReducedMotion) {
    return;
  }

  let canvas = document.getElementById('particles');

  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particles';
    document.body.prepend(canvas);
  }

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const particles = [];
  const mouse = { x: null, y: null };
  const particleCount = 80;
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * viewportWidth;
      this.y = Math.random() * viewportHeight;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && distance > 0) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }

      if (
        this.x < -20 ||
        this.x > viewportWidth + 20 ||
        this.y < -20 ||
        this.y > viewportHeight + 20
      ) {
        this.reset();
      }
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(230, 126, 34, ${this.opacity})`;
      context.fill();
    }
  }

  function resizeCanvas() {
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    canvas.width = viewportWidth * devicePixelRatio;
    canvas.height = viewportHeight * devicePixelRatio;
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= 120) {
          continue;
        }

        context.beginPath();
        context.strokeStyle = `rgba(230, 126, 34, ${0.06 * (1 - distance / 120)})`;
        context.lineWidth = 0.5;
        context.moveTo(particles[i].x, particles[i].y);
        context.lineTo(particles[j].x, particles[j].y);
        context.stroke();
      }
    }
  }

  function animate() {
    context.clearRect(0, 0, viewportWidth, viewportHeight);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    window.requestAnimationFrame(animate);
  }

  resizeCanvas();

  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle());
  }

  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeCanvas, 80);
  });
  window.addEventListener('pointermove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  animate();
}

function setupGlowParallax() {
  if (prefersReducedMotion) {
    return;
  }

  const glows = [...document.querySelectorAll('.glow')];

  if (!glows.length) {
    return;
  }

  window.addEventListener('pointermove', (event) => {
    const xRatio = (event.clientX / window.innerWidth - 0.5) * 18;
    const yRatio = (event.clientY / window.innerHeight - 0.5) * 18;

    glows.forEach((glow, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      glow.style.transform = `translate(${xRatio * direction}px, ${yRatio * direction}px)`;
    });
  });
}

setupScrollIndicator();
setupSmoothScroll();
applyRevealStagger();
setupReveal();
setupParticles();
setupGlowParallax();
