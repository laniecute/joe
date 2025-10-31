// script.js — small helpers: smooth in-page scroll, modal + contact form handling, simple reveal on scroll

// Add shadow to nav on scroll
(function(){
  const navWrap = document.querySelector('.nav-wrap');
  if(!navWrap) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navWrap.style.boxShadow = y > 10 ? '0 6px 18px rgba(16,24,40,0.06)' : 'none';
  });
})();

// Intersection reveal for elements with .card or sections
(function(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.card, .hero-card, .page-header, .cta-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    io.observe(el);
  });
})();

// Contact form handling (on contact.html)
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const modal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');
  const mailtoBtn = document.getElementById('mailtoBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
      alert('Please fill out all fields before sending.');
      return;
    }

    // Basic email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      alert('Please enter a valid email address.');
      return;
    }

    // Create mailto fallback (users can open mail client)
    const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailto = `mailto:inejoe@example.com?subject=${subject}&body=${body}`;

    // Show success modal and offer to open mail app
    if(modal) modal.classList.remove('hidden');
    // attach mailto to button
    if(mailtoBtn) {
      mailtoBtn.onclick = () => { window.location.href = mailto; };
    }
  });

  if(closeModal){
    closeModal.addEventListener('click', () => {
      const modal = document.getElementById('successModal');
      if(modal) modal.classList.add('hidden');
      form.reset();
    });
  }
})();
