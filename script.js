// script.js - lógica interactiva para la landing de IA Ñuble

// Esperar al DOM
document.addEventListener('DOMContentLoaded', function(){

  // --- RED NEURONAL ANIMADA ---
  const canvas = document.getElementById('neural-network');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let nodes = [];
    const numNodes = 60;
    const connectionDistance = 150;
    
    function resizeCanvas(){
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    function createNodes(){
      nodes = [];
      for(let i = 0; i < numNodes; i++){
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 2
        });
      }
    }
    
    function drawNetwork(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar conexiones
      ctx.lineWidth = 1.5;
      
      for(let i = 0; i < nodes.length; i++){
        for(let j = i + 1; j < nodes.length; j++){
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if(dist < connectionDistance){
            const opacity = (1 - dist / connectionDistance) * 0.5;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Dibujar nodos
      for(const node of nodes){
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
    }
    
    function updateNodes(){
      for(const node of nodes){
        node.x += node.vx;
        node.y += node.vy;
        
        // Rebotar en los bordes
        if(node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if(node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Mantener dentro del canvas
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      }
    }
    
    function animate(){
      updateNodes();
      drawNetwork();
      requestAnimationFrame(animate);
    }
    
    // Inicializar
    resizeCanvas();
    createNodes();
    animate();
    
    // Recalcular en resize
    window.addEventListener('resize', ()=>{
      resizeCanvas();
      createNodes();
    });
  }

  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.site-header');
  function updateHeader(){
    if(window.scrollY > 50){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, {passive:true});
  updateHeader();

  // --- MENU HAMBURGUESA ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  // crear overlay para menú móvil (se añade/elimina dinámicamente)
  let navOverlay = null;
  function showNavOverlay(){
    if(!navOverlay){
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      document.body.appendChild(navOverlay);
      navOverlay.addEventListener('click', ()=>{ closeNav(); });
    }
    navOverlay.classList.add('show');
    document.body.classList.add('nav-open');
  }
  function hideNavOverlay(){ if(navOverlay){ navOverlay.classList.remove('show'); document.body.classList.remove('nav-open'); } }
  function openNav(){ navMenu.classList.add('show'); navToggle.setAttribute('aria-expanded','true'); showNavOverlay(); }
  function closeNav(){ navMenu.classList.remove('show'); navToggle.setAttribute('aria-expanded','false'); hideNavOverlay(); }
  navToggle.addEventListener('click', ()=>{ if(navMenu.classList.contains('show')) closeNav(); else openNav(); });

  // Cerrar menu al hacer click en enlace (modo móvil)
  document.querySelectorAll('.nav-menu a').forEach(a=>{
    a.addEventListener('click', ()=>{ closeNav(); });
  });

  // --- SCROLL SUAVE ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // --- IntersectionObserver para revelar elementos al hacer scroll ---
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    })
  },{threshold:0.12});

  document.querySelectorAll('.reveal, .card, .leader-card, .team-card, .slide, .gallery-item, .testimonial').forEach(el=>observer.observe(el));

  // --- MODAL DINÁMICO ---
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalClose = modal.querySelector('.modal-close');
  let lastFocusedElement = null;

  // abrir modal y gestionar foco (focus trap básico)
  function openModal(html){
    lastFocusedElement = document.activeElement;
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // esperar al render y enfocar el botón cerrar
    setTimeout(()=>{
      modalClose.focus();
    },50);
    document.addEventListener('keydown', handleModalKeydown);
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
    if(lastFocusedElement) lastFocusedElement.focus();
    document.removeEventListener('keydown', handleModalKeydown);
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

  // manejar ESC y Tab dentro del modal para accesibilidad
  function handleModalKeydown(e){
    if(e.key === 'Escape'){
      closeModal();
    }
    if(e.key === 'Tab'){
      // focus trap: mantener dentro del modal
      const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])');
      if(focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length -1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  // Abrir modal de la líder
  document.getElementById('open-leader-modal').addEventListener('click', ()=>{
    const html = `
      <h2>María Pérez — Directora</h2>
      <p><strong>Formación:</strong> PhD en Ciencias de la Computación, MSc en Salud Digital.</p>
      <p><strong>Experiencia:</strong> +10 años en investigación aplicada, múltiples proyectos con hospitales y municipios.</p>
      <p><a href="#">LinkedIn — perfil</a></p>
    `;
    openModal(html);
  });

  // Abrir modal para miembros del equipo (usar atributos data-*)
  document.querySelectorAll('.team-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const name = card.dataset.name || 'Integrante';
      const role = card.dataset.role || '';
      const bio = card.dataset.bio || '';
      const html = `<h3>${name}</h3><p><strong>${role}</strong></p><p>${bio}</p>`;
      openModal(html);
    });
    card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') card.click(); });
  });

  // Detalles de proyecto desde slides
  document.querySelectorAll('.slide .slide-more').forEach((btn, idx)=>{
    btn.addEventListener('click', (e)=>{
      const slide = btn.closest('.slide');
      const title = slide.dataset.title || 'Proyecto';
      const tags = slide.dataset.tags || '';
      const state = slide.dataset.state || '';
      // Contenido extendido ejemplo
      const html = `<h3>${title}</h3><p><strong>Etiquetas:</strong> ${tags}</p><p><strong>Estado:</strong> ${state}</p><p>Descripción extendida: Aquí se incluye más información sobre el proyecto, objetivos, resultados y enlaces relevantes.</p><p><strong>Tecnologías:</strong> IA, XGBoost, IoT, Python</p>`;
      openModal(html);
    });
  });

  // --- CARRUSEL CON TRANSFORM ---
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  
  // Calcular ancho de slide + gap
  function getSlideWidth(){
    const slide = slides[0];
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 24;
    return slide.offsetWidth + gap;
  }

  // Crear dots
  slides.forEach((s, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  // Actualizar carrusel
  function updateCarousel(){
    const offset = -currentIndex * getSlideWidth();
    track.style.transform = `translateX(${offset}px)`;
    // Actualizar dots
    Array.from(dotsContainer.children).forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  // Ir a slide específico
  function goToSlide(i){
    const maxIndex = slides.length - 1;
    currentIndex = Math.max(0, Math.min(i, maxIndex));
    updateCarousel();
  }

  // Botones prev/next
  nextBtn.addEventListener('click', () => {
    if(currentIndex < slides.length - 1){
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0); // Volver al inicio
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if(currentIndex > 0){
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slides.length - 1); // Ir al final
    }
  });

  // Ajustar al redimensionar
  window.addEventListener('resize', () => updateCarousel());

  // Autoplay opcional (pausa al hover)
  let autoplay = setInterval(() => {
    if(currentIndex >= slides.length - 1){
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }, 6000);
  
  const carouselEl = document.querySelector('.carousel');
  carouselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
  carouselEl.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      if(currentIndex >= slides.length - 1){
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    }, 6000);
  });

  // Navegación por teclado para carrusel
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName.toLowerCase();
    if(tag === 'input' || tag === 'textarea') return;
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'ArrowRight') nextBtn.click();
  });

  // --- FILTROS GALERÍA ---
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item=>{
        if(filter==='all' || item.dataset.category === filter) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  });

  // Lightbox simple para galería
  document.querySelectorAll('.gallery-item img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.getAttribute('src');
      const title = img.nextElementSibling ? img.nextElementSibling.textContent : '';
      openModal(`<img src="${src}" alt="${title}" style="width:100%;border-radius:8px"><h4>${title}</h4>`);
    });
  });

  // --- VALIDACIÓN FORMULARIO CONTACTO (simulada) ---
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre').trim();
    const email = data.get('email').trim();
    const mensaje = data.get('mensaje').trim();
    // validaciones básicas
    if(!nombre || !email || !mensaje){
      feedback.className = 'error';
      feedback.textContent = 'Por favor complete los campos requeridos.';
      return;
    }
    // validar formato correo simple
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if(!re.test(email)){
      feedback.className = 'error';
      feedback.textContent = 'Ingrese un correo válido.';
      return;
    }

    // simular envío con feedback mejorado
    feedback.className = '';
    feedback.textContent = 'Enviando...';
    
    setTimeout(()=>{
      feedback.className = 'success';
      feedback.textContent = '✓ Mensaje enviado correctamente. Nos contactaremos a la brevedad.';
      form.reset();
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(()=>{ feedback.textContent = ''; feedback.className = ''; }, 5000);
    }, 1200);
  });

});
