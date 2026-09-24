/**
 * STEDI CREATIVE — Portfolio Interactions  v2.0
 * Award-quality interactions: loader, cursor, magnetic, scroll-reveal,
 * marquee, modal, ambient canvas, mobile menu, parallax
 */

(() => {
  'use strict';

  // ─────────────────────────────────────────
  // Project Data
  // ─────────────────────────────────────────
  const PROJECTS = [
    {
      id: 0,
      number: 'Project 01',
      title: 'The Flame Stack',
      angle: 'Engineered high-velocity sizzle cuts and dripping melted cheddar macro shots to trigger instant appetite cravings within the first second.',
      image: 'assets/images/product-burger.jpg',
      thumbnail: 'assets/images/video1-thumbnail.jpg',
      video: 'portfolio-videos/Generate_UGC-style_video_1080p_20260922164453.mp4',
    },
    {
      id: 1,
      number: 'Project 02',
      title: 'Signature Swirl',
      angle: 'Crafted a hypnotic chocolate drizzle and layered caramel pour sequence, spotlighting artisan café indulgence for maximum viral TikTok shareability.',
      image: 'assets/images/product-pizza.jpg',
      thumbnail: 'assets/images/video2-thumbnail.jpg',
      video: 'portfolio-videos/Generate_UGC_style_video_1080p_20260922165110.mp4',
    },
    {
      id: 2,
      number: 'Project 03',
      title: 'Omakase & Skewers',
      angle: 'Juxtaposed flame-grilled skewers with rooftop sunset ambience and fine wine to evoke premium culinary lifestyle and dining desire.',
      image: 'assets/images/product-sushi.jpg',
      thumbnail: 'assets/images/video3-thumbnail.jpg',
      video: 'portfolio-videos/Generate_UGC_style_video_1080p_20260922165702.mp4',
    }
  ];

  // ─────────────────────────────────────────
  // Capability Detection
  // ─────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isTouchDevice = !hasHover || 'ontouchstart' in window;

  // Low-power detection via navigator.hardwareConcurrency
  const isLowPower = navigator.hardwareConcurrency <= 4 || navigator.connection?.saveData === true;

  // ─────────────────────────────────────────
  // Footer Year
  // ─────────────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────
  // 1. LOADER
  // ─────────────────────────────────────────
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loader-fill');

  if (loader && !prefersReducedMotion) {
    let progress = 0;
    const fillInterval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 18 + 4, 90);
      if (loaderFill) loaderFill.style.width = `${progress}%`;
    }, 80);

    const completeLoader = () => {
      clearInterval(fillInterval);
      if (loaderFill) loaderFill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('loaded');
        // Trigger hero reveals after loader
        document.querySelectorAll('.hero-section .reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('is-visible'), i * 80);
        });
      }, 200);
    };

    if (document.readyState === 'complete') {
      completeLoader();
    } else {
      window.addEventListener('load', completeLoader);
      // Safety timeout
      setTimeout(completeLoader, 2500);
    }
  } else if (loader) {
    loader.classList.add('loaded');
  }

  // ─────────────────────────────────────────
  // 2. CUSTOM CURSOR
  // ─────────────────────────────────────────
  if (hasHover && !prefersReducedMotion) {
    const cursorEl = document.getElementById('cursor');
    if (cursorEl) {
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;
      let raf;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Move dot immediately
        cursorEl.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }, { passive: true });

      // Smooth ring follow
      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        const ring = cursorEl.querySelector('.cursor-ring');
        if (ring) {
          ring.style.transform = `translate(${ringX - mouseX}px, ${ringY - mouseY}px)`;
        }
        raf = requestAnimationFrame(animateRing);
      };
      raf = requestAnimationFrame(animateRing);

      // Hover state
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, [data-magnetic], [data-open-project]')) {
          cursorEl.classList.add('hovering');
        }
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, [data-magnetic], [data-open-project]')) {
          cursorEl.classList.remove('hovering');
        }
      });

      document.addEventListener('mousedown', () => cursorEl.classList.add('clicking'));
      document.addEventListener('mouseup', () => cursorEl.classList.remove('clicking'));

      // Tab away
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
        } else {
          raf = requestAnimationFrame(animateRing);
        }
      });
    }
  }

  // ─────────────────────────────────────────
  // 3. MAGNETIC BUTTONS
  // ─────────────────────────────────────────
  if (hasHover && !prefersReducedMotion) {
    const magneticEls = document.querySelectorAll('[data-magnetic]');
    magneticEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.22;
        const dy = (e.clientY - cy) * 0.22;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ─────────────────────────────────────────
  // 4. HEADER SCROLL EFFECT
  // ─────────────────────────────────────────
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─────────────────────────────────────────
  // 5. MOBILE MENU
  // ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const openMobileMenu = () => {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.hidden = false;
    requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first link
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    firstLink?.focus();
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Hide after transition
    setTimeout(() => {
      if (!mobileMenu.classList.contains('is-open')) {
        mobileMenu.hidden = true;
      }
    }, 400);
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close menu on link click
  document.querySelectorAll('[data-close-menu]').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileMenu && !mobileMenu.hidden) closeMobileMenu();
      if (modal && !modal.hidden) closeModal();
    }
  });

  // ─────────────────────────────────────────
  // 6. SCROLL REVEAL
  // ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up');

  const applyDelay = (el) => {
    const delay = el.dataset.delay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyDelay(entry.target);
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach((el) => {
      // Don't re-observe hero items — loader handles those
      if (!el.closest('.hero-section')) {
        observer.observe(el);
      }
    });

    // Immediately reveal hero items if no loader (reduced motion)
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ─────────────────────────────────────────
  // 7. SMOOTH ANCHOR SCROLLING
  // ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────
  // 8. PROJECT CARD → OPEN MODAL
  // ─────────────────────────────────────────
  document.querySelectorAll('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.openProject, 10);
      openModal(id);
    });
  });

  // ─────────────────────────────────────────
  // 9. MODAL LOGIC
  // ─────────────────────────────────────────
  const modal           = document.getElementById('cinematic-modal');
  const modalOverlay    = document.getElementById('modal-overlay');
  const modalCloseBtn   = document.getElementById('modal-close-btn');
  const modalProjectNum = document.getElementById('modal-project-num');
  const modalTitle      = document.getElementById('modal-project-title');
  const modalAngle      = document.getElementById('modal-creative-angle');
  const modalVideo      = document.getElementById('modal-video-element');
  const videoPlayBtn    = document.getElementById('video-play-btn');
  const videoPlayIcon   = videoPlayBtn?.querySelector('.icon-play');
  const videoPauseIcon  = videoPlayBtn?.querySelector('.icon-pause');
  const videoTimeline   = document.getElementById('video-timeline');
  const videoProgress   = document.getElementById('video-progress');
  const videoSoundToggle= document.getElementById('video-sound-toggle');
  const iconMuted       = videoSoundToggle?.querySelector('.icon-muted');
  const iconUnmuted     = videoSoundToggle?.querySelector('.icon-unmuted');
  const videoTime       = document.getElementById('video-time');
  const videoReplayBtn  = document.getElementById('video-replay-btn');

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const setPlayState = (playing) => {
    if (!videoPlayIcon || !videoPauseIcon) return;
    videoPlayIcon.style.display  = playing ? 'none' : '';
    videoPauseIcon.style.display = playing ? '' : 'none';
  };

  const setSoundState = (muted) => {
    if (!iconMuted || !iconUnmuted) return;
    iconMuted.style.display   = muted ? '' : 'none';
    iconUnmuted.style.display = muted ? 'none' : '';
  };

  // Track last focused element before modal opens
  let preModalFocus = null;

  const openModal = (projectId) => {
    const project = PROJECTS[projectId] ?? PROJECTS[0];
    preModalFocus = document.activeElement;

    if (modalProjectNum) modalProjectNum.textContent = project.number;
    if (modalTitle)       modalTitle.textContent      = project.title;
    if (modalAngle)       modalAngle.textContent      = project.angle;
    if (modalVideo) {
      modalVideo.poster = project.thumbnail;
      modalVideo.src    = project.video;
      modalVideo.muted  = true;
      setSoundState(true);
    }

    if (modal) modal.hidden = false;
    document.body.style.overflow = 'hidden';

    modalVideo?.play()
      .then(() => setPlayState(true))
      .catch(() => setPlayState(false));

    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
    // Restore focus
    preModalFocus?.focus();
  };

  modalOverlay?.addEventListener('click', closeModal);
  modalCloseBtn?.addEventListener('click', closeModal);

  videoPlayBtn?.addEventListener('click', () => {
    if (!modalVideo) return;
    if (modalVideo.paused) {
      modalVideo.play();
      setPlayState(true);
    } else {
      modalVideo.pause();
      setPlayState(false);
    }
  });

  if (modalVideo) {
    modalVideo.addEventListener('play',  () => setPlayState(true));
    modalVideo.addEventListener('pause', () => setPlayState(false));

    modalVideo.addEventListener('timeupdate', () => {
      if (!modalVideo.duration) return;
      const pct = (modalVideo.currentTime / modalVideo.duration) * 100;
      if (videoProgress) videoProgress.style.width = `${pct}%`;
      if (videoTime) {
        videoTime.textContent = `${formatTime(modalVideo.currentTime)} / ${formatTime(modalVideo.duration)}`;
      }
    });
  }

  videoSoundToggle?.addEventListener('click', () => {
    if (!modalVideo) return;
    modalVideo.muted = !modalVideo.muted;
    setSoundState(modalVideo.muted);
  });

  videoReplayBtn?.addEventListener('click', () => {
    if (!modalVideo) return;
    modalVideo.currentTime = 0;
    modalVideo.play();
    setPlayState(true);
  });

  videoTimeline?.addEventListener('click', (e) => {
    if (!modalVideo?.duration) return;
    const rect = videoTimeline.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    modalVideo.currentTime = pct * modalVideo.duration;
  });

  // Keyboard trap in modal
  modal?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ─────────────────────────────────────────
  // 10. AMBIENT CANVAS BACKGROUND
  // ─────────────────────────────────────────
  const canvas = document.getElementById('ambient-canvas');
  if (canvas && !isLowPower) {
    const ctx = canvas.getContext('2d');
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const orbs = [
      { x: W * 0.15, y: H * 0.20, r: 420, vx:  0.25, vy:  0.15, hue: 260, sat: 70 }, // violet
      { x: W * 0.80, y: H * 0.35, r: 380, vx: -0.18, vy:  0.22, hue: 195, sat: 80 }, // cyan
      { x: W * 0.50, y: H * 0.80, r: 350, vx:  0.15, vy: -0.18, hue: 280, sat: 60 }, // purple
      { x: W * 0.85, y: H * 0.85, r: 280, vx: -0.20, vy: -0.15, hue: 220, sat: 50 }, // blue
    ];

    let mouseX = W / 2, mouseY = H / 2;

    if (hasHover) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });
    }

    const resizeCanvas = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas, { passive: true });

    let raf;
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      orbs.forEach((orb, i) => {
        // Gentle mouse parallax for first 2 orbs (desktop only)
        let px = 0, py = 0;
        if (hasHover && i < 2) {
          px = (mouseX / W - 0.5) * 30 * (i === 0 ? 1 : -0.7);
          py = (mouseY / H - 0.5) * 20 * (i === 0 ? 1 : -0.7);
        }

        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r)   orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r)   orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        const rx = orb.x + px;
        const ry = orb.y + py;

        const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, orb.r);
        grad.addColorStop(0, `hsla(${orb.hue}, ${orb.sat}%, 55%, 0.08)`);
        grad.addColorStop(0.5, `hsla(${orb.hue}, ${orb.sat}%, 45%, 0.04)`);
        grad.addColorStop(1, 'rgba(5,5,10,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(rx, ry, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(render);
      }
    });

    render();
  } else if (canvas && isLowPower) {
    // Low-power: just a static gradient fallback
    canvas.style.display = 'none';
    document.body.style.background =
      'radial-gradient(ellipse at 20% 30%, rgba(124,92,252,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(0,229,255,0.05) 0%, transparent 60%)';
  }

  // ─────────────────────────────────────────
  // 11. SUBTLE SCROLL PARALLAX (desktop, no reduced-motion)
  // ─────────────────────────────────────────
  if (hasHover && !prefersReducedMotion && !isLowPower) {
    const heroTitle = document.querySelector('.hero-title');
    let lastScroll = 0;
    let ticking = false;

    const onScroll = () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroTitle) {
            heroTitle.style.transform = `translateY(${lastScroll * 0.18}px)`;
            heroTitle.style.opacity = String(1 - lastScroll / 600);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ─────────────────────────────────────────
  // 12. PROJECT CARD HOVER TILT (desktop)
  // ─────────────────────────────────────────
  if (hasHover && !prefersReducedMotion) {
    document.querySelectorAll('.project-card-inner').forEach((card) => {
      const wrap = card.querySelector('.project-thumb-wrap');
      if (!wrap) return;

      card.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        wrap.style.transform = `translateY(-6px) scale(1.01) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        wrap.style.transform = '';
        wrap.style.transition = 'transform 0.5s var(--ease-out), box-shadow 0.4s var(--ease-out), border-color 0.4s ease';
      });

      card.addEventListener('mouseenter', () => {
        wrap.style.transition = 'transform 0.15s ease, box-shadow 0.4s var(--ease-out), border-color 0.4s ease';
      });
    });
  }

})();
