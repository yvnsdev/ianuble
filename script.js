// script.js - lógica interactiva para la landing de IA Ñuble

// Esperar al DOM
document.addEventListener('DOMContentLoaded', function(){

  // --- PAGE LOADER ---
  const pageLoader = document.getElementById('page-loader');
  if(pageLoader){
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
      }, 500);
    });
    // Fallback: ocultar después de 3 segundos si algo falla
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 3000);
  }

  // --- BACK TO TOP BUTTON ---
  const backToTop = document.querySelector('.back-to-top');
  if(backToTop){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 500){
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, {passive: true});
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

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
      <div class="modal-header">
        <img src="carola.jpeg" alt="Dra. Carola Figueroa" class="modal-avatar">
        <div class="modal-header-info">
          <h2>Dra. Carola Figueroa Flores</h2>
          <span class="modal-role">Directora IA Ñuble • Investigadora UBB</span>
        </div>
      </div>
      
      <p>Investigadora y académica de la Universidad del Bío-Bío con amplia trayectoria en ciencias de la computación e inteligencia artificial aplicada. Lidera el desarrollo de soluciones tecnológicas innovadoras para la región de Ñuble.</p>
      
      <div class="modal-stats">
        <div class="modal-stat">
          <span class="modal-stat-number">15+</span>
          <span class="modal-stat-label">Años experiencia</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-number">30+</span>
          <span class="modal-stat-label">Publicaciones</span>
        </div>
        <div class="modal-stat">
          <span class="modal-stat-number">12</span>
          <span class="modal-stat-label">Proyectos I+D</span>
        </div>
      </div>
      
      <h3>Formación Académica</h3>
      <ul>
        <li><strong>Doctorado en Ciencias de la Computación</strong> - Especialización en Inteligencia Artificial</li>
        <li><strong>Magíster en Informática</strong> - Universidad del Bío-Bío</li>
        <li><strong>Ingeniería Civil Informática</strong> - Universidad del Bío-Bío</li>
      </ul>
      
      <h3>Líneas de Investigación</h3>
      <div class="modal-tags">
        <span class="modal-tag">Machine Learning</span>
        <span class="modal-tag">Deep Learning</span>
        <span class="modal-tag">Procesamiento de Imágenes</span>
        <span class="modal-tag">IA en Salud</span>
        <span class="modal-tag">Visión por Computadora</span>
      </div>
      
      <h3>Proyectos Destacados</h3>
      <ul>
        <li><strong>Aula Segura:</strong> Sistema de detección de violencia escolar mediante IA</li>
        <li><strong>Core Drone:</strong> Monitoreo ambiental con drones autónomos e IA</li>
        <li><strong>SITME:</strong> Tamizaje multimodal de endometriosis</li>
      </ul>
      
      <div class="modal-links">
        <a href="https://www.researchgate.net/profile/Carola-Figueroa-Flores" target="_blank" class="modal-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          ResearchGate
        </a>
        <a href="mailto:cfigueroa@ubiobio.cl" class="modal-link outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
          Contactar
        </a>
      </div>
    `;
    openModal(html);
  });

  // Abrir modal para miembros del equipo (usar atributos data-*)
  document.querySelectorAll('.team-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const name = card.dataset.name || 'Integrante';
      const role = card.dataset.role || '';
      const bio = card.dataset.bio || '';
      const expertise = card.dataset.expertise || '';
      const photo = card.querySelector('.team-photo img')?.src || '';
      
      const expertiseTags = expertise ? expertise.split(',').map(t => `<span class="modal-tag">${t.trim()}</span>`).join('') : '';
      
      const html = `
        <div class="modal-header">
          <img src="${photo}" alt="${name}" class="modal-avatar">
          <div class="modal-header-info">
            <h2>${name}</h2>
            <span class="modal-role">${role}</span>
          </div>
        </div>
        
        <p>${bio || 'Miembro del equipo IA Ñuble, contribuyendo al desarrollo de soluciones innovadoras de inteligencia artificial para la región.'}</p>
        
        ${expertiseTags ? `
        <h3>Áreas de Expertise</h3>
        <div class="modal-tags">${expertiseTags}</div>
        ` : ''}
        
        <h3>Contribuciones en IA Ñuble</h3>
        <ul>
          <li>Desarrollo e implementación de modelos de IA</li>
          <li>Investigación aplicada en proyectos regionales</li>
          <li>Colaboración interdisciplinaria con entidades públicas y privadas</li>
        </ul>
      `;
      openModal(html);
    });
    card.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') card.click(); });
  });

  // Detalles de proyecto desde slides
  document.querySelectorAll('.slide-link').forEach((link)=>{
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      const slide = link.closest('.slide');
      const title = slide.querySelector('h3')?.textContent || 'Proyecto';
      const tags = Array.from(slide.querySelectorAll('.tags span')).map(t => t.textContent);
      const badge = slide.querySelector('.slide-badge');
      const state = badge?.textContent || '';
      const stateClass = badge?.classList.contains('completed') ? 'completed' : 
                         badge?.classList.contains('execution') ? 'execution' : 'pending';
      const excerpt = slide.querySelector('.excerpt')?.textContent || '';
      const image = slide.querySelector('.slide-image img')?.src || '';
      
      // Contenido extendido por proyecto
      const projectDetails = {
        'Aula Segura': {
          description: 'Sistema integral de detección de violencia en tiempo real para establecimientos educacionales, utilizando cámaras de seguridad y algoritmos de visión por computadora.',
          objectives: [
            'Detectar situaciones de violencia física en tiempo real',
            'Alertar automáticamente al personal de seguridad',
            'Generar reportes estadísticos de incidentes',
            'Contribuir a la prevención del bullying escolar'
          ],
          technologies: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'React'],
          results: 'Piloto exitoso en 3 establecimientos de Ñuble con 95% de precisión en detección.',
          partners: ['DAEM Chillán', 'Carabineros de Chile', 'UBB']
        },
        'Core Drone': {
          description: 'Proyecto de monitoreo ambiental utilizando drones autónomos equipados con sensores e inteligencia artificial para detectar fuentes de contaminación.',
          funding: 'FONDEF - Fondo de Fomento al Desarrollo Científico y Tecnológico',
          objectives: [
            'Mapear zonas de contaminación en la región',
            'Identificar fuentes de emisión de contaminantes',
            'Monitorear calidad del aire en tiempo real',
            'Apoyar la toma de decisiones ambientales'
          ],
          technologies: ['Python', 'PyTorch', 'ROS', 'Drones DJI', 'Sensores IoT'],
          results: 'En ejecución - Fase de vuelos de prueba y calibración de sensores.',
          partners: ['GORE Ñuble', 'SEREMI Medio Ambiente', 'UBB', 'ANID-FONDEF']
        },
        'AgroForence IA': {
          description: 'Sistema de detección temprana de enfermedades en hojas de vid mediante análisis de imágenes con deep learning, apoyando la viticultura de precisión.',
          objectives: [
            'Detectar enfermedades fúngicas en etapas tempranas',
            'Reducir pérdidas en producción vitivinícola',
            'Optimizar aplicación de tratamientos fitosanitarios',
            'Capacitar a agricultores en uso de tecnología'
          ],
          technologies: ['Python', 'CNN', 'Transfer Learning', 'App Móvil', 'Cloud'],
          results: 'En postulación a fondos ANID para desarrollo de prototipo.',
          partners: ['Viñas de Ñuble', 'INIA', 'UBB']
        },
        'IA para todos y todas': {
          description: 'Programa de talleres inclusivos de inteligencia artificial para la comunidad, enfocado en democratizar el conocimiento y uso responsable de estas tecnologías.',
          objectives: [
            'Capacitar a 500+ personas de la región',
            'Reducir la brecha digital en IA',
            'Formar ciudadanos críticos ante la tecnología',
            'Fomentar vocaciones científicas en jóvenes'
          ],
          technologies: ['ChatGPT', 'Python básico', 'Herramientas No-Code', 'IA Generativa'],
          results: 'En ejecución - 300+ personas capacitadas en 2024.',
          partners: ['Sercotec', 'Municipalidades', 'UBB', 'GORE Ñuble']
        }
      };
      
      const details = projectDetails[title] || {
        description: excerpt,
        objectives: ['Desarrollo de soluciones innovadoras con IA', 'Transferencia tecnológica a la comunidad'],
        technologies: ['Python', 'Machine Learning', 'Data Science'],
        results: 'Proyecto en desarrollo.',
        partners: ['UBB', 'IA Ñuble']
      };
      
      const tagsHtml = tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
      const objectivesHtml = details.objectives.map(o => `<li>${o}</li>`).join('');
      const techHtml = details.technologies.map(t => `<span class="modal-tag">${t}</span>`).join('');
      const partnersHtml = details.partners.map(p => `<li>${p}</li>`).join('');
      const fundingHtml = details.funding ? `
        <div class="funding-badge">
          <img src="anid.png" alt="FONDEF" class="funding-logo">
          <span><strong>Financiado por:</strong> ${details.funding}</span>
        </div>
      ` : '';
      
      const html = `
        ${image ? `<img src="${image}" alt="${title}" style="width:100%;height:200px;object-fit:cover;border-radius:var(--radius-lg);margin-bottom:20px;">` : ''}
        
        <div class="modal-badges">
          <span class="modal-badge ${stateClass}">${state}</span>
        </div>
        <h2>${title}</h2>
        
        ${fundingHtml}
        
        <div class="modal-tags">${tagsHtml}</div>
        
        <p>${details.description}</p>
        
        <h3>Objetivos</h3>
        <ul>${objectivesHtml}</ul>
        
        <h3>Tecnologías Utilizadas</h3>
        <div class="modal-tags">${techHtml}</div>
        
        <h3>Resultados</h3>
        <p>${details.results}</p>
        
        <h3>Colaboradores</h3>
        <ul>${partnersHtml}</ul>
        
        <div class="modal-links">
          <a href="#contacto" class="modal-link" onclick="document.getElementById('modal').setAttribute('aria-hidden','true');document.body.style.overflow='';">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
            Colaborar en este proyecto
          </a>
        </div>
      `;
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

  // --- CARRUSEL DE NOTICIAS ---
  const newsTrack = document.querySelector('.news-track');
  const newsSlides = Array.from(newsTrack.children);
  const newsNextBtn = document.querySelector('.news-carousel .carousel-btn.next');
  const newsPrevBtn = document.querySelector('.news-carousel .carousel-btn.prev');
  const newsDotsContainer = document.querySelector('.news-dots');

  let newsCurrentIndex = 0;
  let newsVisibleSlides = 3; // Por defecto muestra 3

  // Calcular cuántos slides visibles según el ancho
  function getNewsVisibleSlides(){
    if(window.innerWidth <= 600) return 1;
    if(window.innerWidth <= 900) return 2;
    return 3;
  }

  // Calcular ancho de slide + gap
  function getNewsSlideWidth(){
    const slide = newsSlides[0];
    const style = window.getComputedStyle(newsTrack);
    const gap = parseInt(style.gap) || 24;
    return slide.offsetWidth + gap;
  }

  // Crear dots para noticias
  function createNewsDots(){
    newsDotsContainer.innerHTML = '';
    newsVisibleSlides = getNewsVisibleSlides();
    const totalPages = Math.ceil(newsSlides.length / newsVisibleSlides);
    for(let i = 0; i < totalPages; i++){
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir a página ${i + 1}`);
      if(i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToNewsSlide(i * newsVisibleSlides));
      newsDotsContainer.appendChild(dot);
    }
  }

  // Actualizar carrusel de noticias
  function updateNewsCarousel(){
    const offset = -newsCurrentIndex * getNewsSlideWidth();
    newsTrack.style.transform = `translateX(${offset}px)`;
    // Actualizar dots
    const pageIndex = Math.floor(newsCurrentIndex / newsVisibleSlides);
    Array.from(newsDotsContainer.children).forEach((d, i) => {
      d.classList.toggle('active', i === pageIndex);
    });
  }

  // Ir a slide específico
  function goToNewsSlide(i){
    const maxIndex = newsSlides.length - newsVisibleSlides;
    newsCurrentIndex = Math.max(0, Math.min(i, maxIndex));
    updateNewsCarousel();
  }

  // Botones prev/next para noticias
  newsNextBtn.addEventListener('click', () => {
    const maxIndex = newsSlides.length - newsVisibleSlides;
    if(newsCurrentIndex < maxIndex){
      goToNewsSlide(newsCurrentIndex + 1);
    } else {
      goToNewsSlide(0);
    }
  });

  newsPrevBtn.addEventListener('click', () => {
    if(newsCurrentIndex > 0){
      goToNewsSlide(newsCurrentIndex - 1);
    } else {
      goToNewsSlide(newsSlides.length - newsVisibleSlides);
    }
  });

  // Inicializar dots y ajustar al redimensionar
  createNewsDots();
  window.addEventListener('resize', () => {
    createNewsDots();
    goToNewsSlide(0);
  });

  // Autoplay para noticias
  let newsAutoplay = setInterval(() => {
    const maxIndex = newsSlides.length - getNewsVisibleSlides();
    if(newsCurrentIndex >= maxIndex){
      goToNewsSlide(0);
    } else {
      goToNewsSlide(newsCurrentIndex + 1);
    }
  }, 7000);

  const newsCarouselEl = document.querySelector('.news-carousel');
  newsCarouselEl.addEventListener('mouseenter', () => clearInterval(newsAutoplay));
  newsCarouselEl.addEventListener('mouseleave', () => {
    newsAutoplay = setInterval(() => {
      const maxIndex = newsSlides.length - getNewsVisibleSlides();
      if(newsCurrentIndex >= maxIndex){
        goToNewsSlide(0);
      } else {
        goToNewsSlide(newsCurrentIndex + 1);
      }
    }, 7000);
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

  // --- GALERÍA MASONRY CON FILTROS Y LIGHTBOX ---
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const masonryItems = document.querySelectorAll('.masonry-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxTitle = lightbox?.querySelector('.lightbox-title');
  const lightboxDesc = lightbox?.querySelector('.lightbox-desc');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let visibleItems = [];

  // Filtros de galería
  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.dataset.galleryFilter;
      
      // Actualizar botón activo
      galleryFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      // Filtrar items
      masonryItems.forEach(item => {
        const category = item.dataset.galleryCategory;
        if(filterValue === 'all' || category === filterValue){
          item.classList.remove('hidden');
          item.style.position = 'relative';
        } else {
          item.classList.add('hidden');
          setTimeout(() => {
            if(item.classList.contains('hidden')){
              item.style.position = 'absolute';
            }
          }, 400);
        }
      });
      
      updateVisibleItems();
    });
  });

  function updateVisibleItems(){
    visibleItems = Array.from(masonryItems).filter(item => !item.classList.contains('hidden'));
  }
  updateVisibleItems();

  // Abrir lightbox al hacer clic en imagen
  masonryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if(item.classList.contains('hidden')) return;
      
      updateVisibleItems();
      currentImageIndex = visibleItems.indexOf(item);
      openLightbox(item);
    });
  });

  function openLightbox(item){
    const img = item.querySelector('img');
    const title = item.querySelector('.masonry-title');
    const desc = item.querySelector('.masonry-desc');
    
    if(lightboxImage) lightboxImage.src = img.src;
    if(lightboxImage) lightboxImage.alt = img.alt;
    if(lightboxTitle) lightboxTitle.textContent = title?.textContent || '';
    if(lightboxDesc) lightboxDesc.textContent = desc?.textContent || '';
    
    lightbox?.classList.add('active');
    lightbox?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox?.classList.remove('active');
    lightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showPrevImage(){
    currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(visibleItems[currentImageIndex]);
  }

  function showNextImage(){
    currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
    openLightbox(visibleItems[currentImageIndex]);
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', showPrevImage);
  lightboxNext?.addEventListener('click', showNextImage);

  // Cerrar con Escape y navegar con flechas
  document.addEventListener('keydown', (e) => {
    if(!lightbox?.classList.contains('active')) return;
    
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrevImage();
    if(e.key === 'ArrowRight') showNextImage();
  });

  // Cerrar al hacer clic fuera de la imagen
  lightbox?.addEventListener('click', (e) => {
    if(e.target === lightbox){
      closeLightbox();
    }
  });

});
