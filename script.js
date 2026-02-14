/* ===================================================
   VALENTINE'S DAY, SCRIPT.JS
   Animations, interactions, and magic
   Full 27-image + video build
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. SCROLL REVEAL, IntersectionObserver
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
     2. PARALLAX, Subtle scroll-based movement
     -------------------------------------------------- */
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    // Hero background
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundPositionY = `${scrollY * 0.15}px`;
    }

    // Cinematic parallax section
    const cinematic = document.querySelector('.parallax-section');
    if (cinematic) {
      const rect = cinematic.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = rect.top * 0.3;
        cinematic.style.backgroundPositionY = `${offset}px`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  /* --------------------------------------------------
     3. TYPING EFFECT, Special message section
     -------------------------------------------------- */
  const typedTextEl = document.getElementById('typed-text');
  const typingMessage = "You are the reason I believe in love. Every moment with you feels like quiet magic, the kind that makes my heart forget the world and remember only you.";
  let charIndex = 0;
  let typingStarted = false;

  function typeText() {
    if (charIndex < typingMessage.length) {
      typedTextEl.textContent += typingMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 40);
    }
  }

  const messageSection = document.getElementById('message');
  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typingStarted) {
        typingStarted = true;
        setTimeout(typeText, 500);
      }
    });
  }, { threshold: 0.3 });

  if (messageSection) {
    typingObserver.observe(messageSection);
  }

  /* --------------------------------------------------
     4. FLOATING HEARTS, Global ambient
     -------------------------------------------------- */
  const heartsContainer = document.getElementById('floating-hearts');
  const heartSymbols = ['♥', '♡', '❤', '💕'];

  function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 16 + 10) + 'px';
    heart.style.color = Math.random() > 0.5 ? '#E63946' : '#FADADD';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = (Math.random() * 4) + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 18000);
  }

  setInterval(createFloatingHeart, 2500);
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 600);
  }

  /* --------------------------------------------------
     5. MESSAGE SECTION, Mini floating hearts
     -------------------------------------------------- */
  const messageHeartsContainer = document.querySelector('.message-hearts');

  function createMiniHeart() {
    const heart = document.createElement('span');
    heart.classList.add('mini-heart');
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    heart.style.fontSize = (Math.random() * 12 + 8) + 'px';
    heart.style.color = Math.random() > 0.5 ? 'rgba(230,57,70,0.3)' : 'rgba(250,218,221,0.5)';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
    messageHeartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }

  setInterval(createMiniHeart, 1500);
  for (let i = 0; i < 8; i++) {
    setTimeout(createMiniHeart, i * 400);
  }

  /* --------------------------------------------------
     6. MODAL, Valentine question
     -------------------------------------------------- */
  const heartBtn = document.getElementById('heart-btn');
  const modal = document.getElementById('valentine-modal');
  const modalBtns = document.querySelectorAll('.modal-btn');

  heartBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      launchConfetti();
    });
  });

  /* --------------------------------------------------
     7. CONFETTI, Canvas-based celebration
     -------------------------------------------------- */
  const confettiCanvas = document.getElementById('confetti-canvas');
  const ctx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  let confettiAnimating = false;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const confettiColors = [
    '#E63946', '#FADADD', '#FFF5E4', '#f0b8c0',
    '#FF6B81', '#FFD700', '#FF85A1', '#d6626e',
    '#FF4D6D', '#C9184A'
  ];

  function createConfettiPiece() {
    return {
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      velocityY: Math.random() * 3 + 2,
      velocityX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    };
  }

  function launchConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 250; i++) {
      confettiPieces.push(createConfettiPiece());
    }
    if (!confettiAnimating) {
      confettiAnimating = true;
      animateConfetti();
    }

    setTimeout(() => {
      confettiAnimating = false;
      confettiPieces = [];
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 6000);
  }

  function animateConfetti() {
    if (!confettiAnimating) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(p => {
      p.y += p.velocityY;
      p.x += p.velocityX;
      p.rotation += p.rotationSpeed;
      p.velocityY += 0.05;
      p.opacity -= 0.002;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(p.opacity, 0);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    confettiPieces = confettiPieces.filter(
      p => p.y < confettiCanvas.height + 50 && p.opacity > 0
    );

    requestAnimationFrame(animateConfetti);
  }

  /* --------------------------------------------------
     8. MUSIC TOGGLE
     -------------------------------------------------- */
  const musicBtn = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  let musicPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
    } else {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {});
      musicBtn.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
  });

  /* --------------------------------------------------
     9. GALLERY ZOOM ON SCROLL
     -------------------------------------------------- */
  const galleryImages = document.querySelectorAll('.gallery-item img, .you-card img');

  const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'scale(1)';
      } else {
        entry.target.style.transform = 'scale(1.06)';
      }
    });
  }, { threshold: 0.5 });

  galleryImages.forEach(img => {
    img.style.transition = 'transform 1.2s ease';
    img.style.transform = 'scale(1.06)';
    zoomObserver.observe(img);
  });

  /* --------------------------------------------------
     10. SCROLL INDICATOR CLICK
     -------------------------------------------------- */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const storySection = document.getElementById('our-story');
      if (storySection) {
        storySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

});
