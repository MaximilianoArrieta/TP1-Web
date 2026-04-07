document.addEventListener('DOMContentLoaded', function () {

  // ---- Año dinámico en footer ----
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });

  // ---- Active nav link según página actual ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Intersection Observer para fade-in on scroll ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ---- Navbar scroll shadow ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,0.4)'
        : 'none';
    });
  }

  // ---- Formulario de contacto (simulación) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ ¡Mensaje enviado!';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #00e5c0, #00b89a)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ---- Typed effect en hero ----
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = ['Desarrollador .NET', 'Programador C#', 'Backend Developer', 'Estudiante de Software'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
      const current = roles[roleIndex];
      typedEl.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);
      isDeleting ? charIndex-- : charIndex++;
      let speed = isDeleting ? 60 : 100;
      if (!isDeleting && charIndex === current.length) { speed = 1800; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 300; }
      setTimeout(type, speed);
    }
    type();
  }

});