document.addEventListener('DOMContentLoaded', () => {
  // ─── NAVBAR SCROLL EFFECT ───────────────────────────────────────────
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    // Background blur active state
    if (window.scrollY > 30) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Auto-hide navbar on scroll down, show on scroll up
    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
  });

  // ─── MOBILE MENU TOGGLE ────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ─── SMOOTH SCROLLING ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"], button[data-scroll-target]').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSelector = this.getAttribute('href') || this.getAttribute('data-scroll-target');
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        const offset = window.innerWidth <= 767 ? 64 : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── HERO ENTRANCE ANIMATIONS (PAGE 1) ─────────────────────────────
  // A brief delay ensures the browser paints the initial un-animated state 
  // before adding the class, allowing the CSS transition to be visible.
  setTimeout(() => {
    document.querySelectorAll('.hero-welcome-animated, .hero-subtitle-animated, .hero-about-link-animated, .hero-title-anim').forEach(el => {
      el.classList.add('in-view');
    });
  }, 150);

  // ─── GENERAL ENTRANCE ANIMATIONS ───────────────────────────────────
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -5% 0px'
  });

  // Observe general animated elements (excluding the hero elements above)
  document.querySelectorAll(
    '.about-heading-anim, .about-body-anim, .quote-heading-anim, .quote-subheading-anim'
  ).forEach(el => {
    animateOnScroll.observe(el);
  });

  // ─── SPLIT-TEXT ANIMATION (SERVICE TITLE & INTRO) ───────────────────
  
  // Split characters for Service Title
  const serviceTitle = document.querySelector('.service-title-animated');
  if (serviceTitle) {
    const text = serviceTitle.textContent.trim();
    serviceTitle.textContent = '';
    [...text].forEach(char => {
      const wrapper = document.createElement('span');
      wrapper.className = 'char-reveal';
      const inner = document.createElement('span');
      inner.className = 'char-reveal-inner';
      inner.textContent = char === ' ' ? '\u00A0' : char;
      wrapper.appendChild(inner);
      serviceTitle.appendChild(wrapper);
    });
    animateOnScroll.observe(serviceTitle);
  }

  // Split words for Service Intro (preserving the <br> tag)
  const serviceIntro = document.querySelector('.service-intro-animated');
  if (serviceIntro) {
    const lines = serviceIntro.innerHTML.split('<br>');
    serviceIntro.innerHTML = '';
    
    lines.forEach((line, lineIndex) => {
      const words = line.trim().split(/\s+/);
      words.forEach(word => {
        if (!word) return;
        const wrapper = document.createElement('span');
        wrapper.className = 'word-anim';
        wrapper.textContent = word; // Set the word
        serviceIntro.appendChild(wrapper);
        serviceIntro.appendChild(document.createTextNode(' ')); // Append explicit space outside the inline-block
      });
      if (lineIndex < lines.length - 1) {
        serviceIntro.appendChild(document.createElement('br'));
      }
    });
    animateOnScroll.observe(serviceIntro);
  }

  // ─── PREMIUM SERVICE CARDS REVEAL ────────────────────────
  const serviceCards = document.querySelectorAll('.service-item');
  if (serviceCards.length > 0) {
    const cardsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-card');
        } else {
          // Remove class when scrolling back up past the card
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('active-card');
          }
        }
      });
    }, {
      rootMargin: '0px 0px -70% 0px',
      threshold: 0
    });
    
    serviceCards.forEach(card => {
      cardsObserver.observe(card);
    });
  }
});