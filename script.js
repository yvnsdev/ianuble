// ===========================================
// SCRIPTS PRINCIPALES - IA ÑUBLE EBCT
// ===========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // VARIABLES GLOBALES Y CONFIGURACIÓN
    // ===========================================
    
    // Obtener el año actual para el footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // ===========================================
    // NAVBAR Y MENÚ HAMBURGUESA
    // ===========================================
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Alternar menú hamburguesa
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animación de las barras del menú hamburguesa
        const bars = document.querySelectorAll('.menu-toggle .bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Restaurar animación de las barras
            const bars = document.querySelectorAll('.menu-toggle .bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Cambiar clase activa en navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ===========================================
    // MODALES
    // ===========================================
    
    // Funciones generales para manejar modales
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evitar scroll en fondo
        }
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    }
    
    // Cerrar modales al hacer clic en la X
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Cerrar modales al hacer clic fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Modal de la líder
    const openLiderModalBtn = document.getElementById('openLiderModal');
    if (openLiderModalBtn) {
        openLiderModalBtn.addEventListener('click', function() {
            openModal('liderModal');
        });
    }
    
    // ===========================================
    // EQUIPO - Generar tarjetas dinámicamente
    // ===========================================
    
    const teamGrid = document.getElementById('teamGrid');
    const teamModal = document.getElementById('teamModal');
    
    // Datos del equipo (en un proyecto real vendrían de una API o base de datos)
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Alejandro Torres",
            role: "Investigador Principal en IA",
            specialty: "Machine Learning, Visión Computacional",
            education: "Doctorado en Ciencias de la Computación, Universidad de Chile",
            projects: "Sistemas de diagnóstico médico por IA, Análisis predictivo de cultivos",
            contact: "atorres@ianuble.cl",
            img: "assets/team/member1.jpg"
        },
        {
            id: 2,
            name: "Ing. Valeria Soto",
            role: "ML Engineer",
            specialty: "Procesamiento de Lenguaje Natural",
            education: "Magíster en Inteligencia Artificial, Universidad de Concepción",
            projects: "Chatbots para atención ciudadana, Análisis de sentimiento en redes sociales",
            contact: "vsoto@ianuble.cl",
            img: "assets/team/member2.jpg"
        },
        {
            id: 3,
            name: "Ing. Carlos Fernández",
            role: "DevOps & Data Engineer",
            specialty: "Infraestructura en la nube, Pipelines de datos",
            education: "Ingeniería Civil en Computación, Universidad del Bío-Bío",
            projects: "Plataforma de datos territoriales, Sistemas de monitoreo en tiempo real",
            contact: "cfernandez@ianuble.cl",
            img: "assets/team/member3.jpg"
        },
        {
            id: 4,
            name: "Diseñadora Paula Rojas",
            role: "UX/UI Designer",
            specialty: "Diseño centrado en el usuario, Experiencias digitales",
            education: "Diseño Gráfico, Universidad de Concepción",
            projects: "Interfaces para plataformas educativas, Diseño de dashboards analíticos",
            contact: "projas@ianuble.cl",
            img: "assets/team/member4.jpg"
        },
        {
            id: 5,
            name: "Lic. Matías Silva",
            role: "Especialista en Proyectos",
            specialty: "Gestión de proyectos de IA, Vinculación con el medio",
            education: "Licenciatura en Administración Pública, Universidad de Chile",
            projects: "Coordinación de proyectos con municipios, Evaluación de impacto",
            contact: "msilva@ianuble.cl",
            img: "assets/team/member5.jpg"
        },
        {
            id: 6,
            name: "Ing. Javiera Méndez",
            role: "Desarrolladora Full Stack",
            specialty: "Aplicaciones web, APIs, Integración de sistemas",
            education: "Ingeniería en Informática, Instituto Profesional Duoc UC",
            projects: "Plataforma educativa en IA, Sistema de gestión de proyectos",
            contact: "jmendez@ianuble.cl",
            img: "assets/team/member6.jpg"
        }
    ];
    
    // Generar tarjetas del equipo
    if (teamGrid) {
        teamMembers.forEach(member => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            teamCard.setAttribute('data-id', member.id);
            
            teamCard.innerHTML = `
                <div class="team-img">
                    <img src="${member.img}" alt="${member.name}">
                </div>
                <div class="team-info">
                    <h3 class="team-name">${member.name}</h3>
                    <p class="team-role">${member.role}</p>
                    <p class="team-specialty">${member.specialty}</p>
                </div>
            `;
            
            // Agregar evento para abrir modal con detalles
            teamCard.addEventListener('click', function() {
                const memberId = parseInt(this.getAttribute('data-id'));
                const member = teamMembers.find(m => m.id === memberId);
                
                if (member) {
                    document.getElementById('teamModalName').textContent = member.name;
                    document.getElementById('teamModalRole').textContent = member.role;
                    document.getElementById('teamModalImg').src = member.img;
                    document.getElementById('teamModalImg').alt = member.name;
                    document.getElementById('teamModalSpecialty').textContent = member.specialty;
                    document.getElementById('teamModalEducation').textContent = member.education;
                    document.getElementById('teamModalProjects').textContent = member.projects;
                    document.getElementById('teamModalContact').textContent = member.contact;
                    
                    openModal('teamModal');
                }
            });
            
            teamGrid.appendChild(teamCard);
        });
    }
    
    // ===========================================
    // CARRUSEL DE PROYECTOS
    // ===========================================
    
    const projectsCarousel = document.getElementById('projectsCarousel');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const projectModal = document.getElementById('projectModal');
    
    // Datos de proyectos (en un proyecto real vendrían de una API o base de datos)
    const projects = [
        {
            id: 1,
            name: "Sistema de Diagnóstico Temprano de Enfermedades Respiratorias",
            tags: ["salud", "ia", "diagnóstico"],
            description: "Plataforma de IA que analiza imágenes de rayos X para detectar signos tempranos de enfermedades respiratorias en poblaciones de zonas rurales.",
            extendedDescription: "Este sistema utiliza algoritmos de visión computacional entrenados con más de 10,000 imágenes médicas para identificar patrones asociados a enfermedades respiratorias como neumonía, tuberculosis y COVID-19. La plataforma está diseñada para funcionar en entornos con conectividad limitada, permitiendo a profesionales de la salud en zonas remotas realizar diagnósticos más precisos y oportunos.",
            technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "Docker"],
            status: "En producción",
            impact: "Implementado en 5 centros de salud rural de la región de Ñuble, ha reducido los tiempos de diagnóstico en un 40% y mejorado la precisión diagnóstica en un 25%.",
            img: "assets/projects/project1.jpg"
        },
        {
            id: 2,
            name: "Plataforma Educativa en IA para Escuelas Técnicas",
            tags: ["educación", "plataforma", "capacitación"],
            description: "Sistema interactivo para enseñar conceptos fundamentales de inteligencia artificial a estudiantes de educación media técnico-profesional.",
            extendedDescription: "Esta plataforma incluye módulos interactivos, ejercicios prácticos y proyectos guiados que permiten a los estudiantes experimentar con algoritmos de IA de manera accesible. Contiene herramientas de visualización de datos, entornos de programación simplificados y casos de estudio basados en problemas reales de la región.",
            technologies: ["JavaScript", "React", "Node.js", "Jupyter", "Scikit-learn"],
            status: "En piloto",
            impact: "Actualmente en prueba en 3 liceos técnicos de la región, con participación de más de 200 estudiantes. Los primeros resultados muestran un aumento del 35% en la comprensión de conceptos básicos de IA.",
            img: "assets/projects/project2.jpg"
        },
        {
            id: 3,
            name: "Sistema de Predicción de Rendimiento de Cultivos",
            tags: ["territorio", "agricultura", "predicción"],
            description: "Modelo predictivo que utiliza datos climáticos, de suelo y satelitales para estimar rendimientos agrícolas y optimizar recursos.",
            extendedDescription: "El sistema integra datos de estaciones meteorológicas, imágenes satelitales y registros históricos de producción para generar predicciones estacionales de rendimiento para diferentes cultivos de la región. Incluye recomendaciones personalizadas sobre riego, fertilización y momentos óptimos de cosecha.",
            technologies: ["Python", "XGBoost", "Pandas", "GeoPandas", "PostGIS"],
            status: "En producción",
            impact: "Utilizado por más de 50 agricultores de la región, ha permitido optimizar el uso de agua en un 20% y aumentar los rendimientos promedio en un 15%.",
            img: "assets/projects/project3.jpg"
        },
        {
            id: 4,
            name: "Análisis de Movilidad Urbana con Sensores IoT",
            tags: ["territorio", "iot", "movilidad"],
            description: "Red de sensores IoT para monitorear y analizar patrones de movilidad en zonas urbanas, optimizando la planificación del transporte.",
            extendedDescription: "La red consta de sensores desplegados en puntos estratégicos de la ciudad que capturan datos anonimizados de movilidad vehicular y peatonal. Los datos se procesan con algoritmos de aprendizaje automático para identificar patrones, cuellos de botella y oportunidades de mejora en la infraestructura vial y de transporte público.",
            technologies: ["C++", "SYCL", "IoT", "MQTT", "PostgreSQL"],
            status: "En diseño",
            impact: "En fase de planificación para implementación en el centro de Chillán. Se espera reducir los tiempos de viaje promedio en un 10-15% mediante optimización de semáforos y rutas de transporte público.",
            img: "assets/projects/project4.jpg"
        }
    ];
    
    let currentSlide = 0;
    
    // Generar slides del carrusel
    if (projectsCarousel) {
        projects.forEach((project, index) => {
            // Crear slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.setAttribute('data-index', index);
            
            // Crear etiquetas HTML
            const tagsHTML = project.tags.map(tag => {
                const tagClass = tag === 'salud' ? 'salud' : tag === 'educacion' ? 'educacion' : tag === 'territorio' ? 'territorio' : '';
                return `<span class="tag ${tagClass}">${tag}</span>`;
            }).join('');
            
            slide.innerHTML = `
                <div class="project-card">
                    <div class="project-img">
                        <img src="${project.img}" alt="${project.name}">
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.name}</h3>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <p class="project-desc">${project.description}</p>
                        <button class="btn btn-primary project-details-btn" data-id="${project.id}">Más detalles</button>
                    </div>
                </div>
            `;
            
            projectsCarousel.appendChild(slide);
            
            // Crear indicador
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-index', index);
            carouselIndicators.appendChild(indicator);
        });
        
        // Configurar eventos para botones de detalles
        document.querySelectorAll('.project-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = parseInt(this.getAttribute('data-id'));
                const project = projects.find(p => p.id === projectId);
                
                if (project) {
                    document.getElementById('projectModalName').textContent = project.name;
                    
                    // Generar etiquetas
                    const tagsContainer = document.getElementById('projectModalTags');
                    tagsContainer.innerHTML = '';
                    project.tags.forEach(tag => {
                        const tagClass = tag === 'salud' ? 'salud' : tag === 'educacion' ? 'educacion' : tag === 'territorio' ? 'territorio' : '';
                        const tagElement = document.createElement('span');
                        tagElement.className = `tag ${tagClass}`;
                        tagElement.textContent = tag;
                        tagsContainer.appendChild(tagElement);
                    });
                    
                    document.getElementById('projectModalDescription').textContent = project.extendedDescription;
                    
                    // Generar tecnologías
                    const techContainer = document.getElementById('projectModalTech');
                    techContainer.innerHTML = '';
                    project.technologies.forEach(tech => {
                        const techElement = document.createElement('span');
                        techElement.className = 'tech-item';
                        techElement.textContent = tech;
                        techContainer.appendChild(techElement);
                    });
                    
                    document.getElementById('projectModalStatus').textContent = project.status;
                    document.getElementById('projectModalImpact').textContent = project.impact;
                    
                    openModal('projectModal');
                }
            });
        });
    }
    
    // Función para mover carrusel
    function moveCarousel(slideIndex) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (slideIndex >= slides.length) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = slideIndex;
        }
        
        // Mover carrusel
        projectsCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Eventos para controles del carrusel
    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            moveCarousel(currentSlide - 1);
        });
    }
    
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            moveCarousel(currentSlide + 1);
        });
    }
    
    // Eventos para indicadores del carrusel
    document.querySelectorAll('.carousel-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            moveCarousel(slideIndex);
        });
    });
    
    // Auto-avance del carrusel cada 5 segundos
    let carouselInterval = setInterval(() => {
        moveCarousel(currentSlide + 1);
    }, 5000);
    
    // Pausar auto-avance al interactuar con el carrusel
    projectsCarousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    projectsCarousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            moveCarousel(currentSlide + 1);
        }, 5000);
    });
    
    // ===========================================
    // CARRUSEL DE ALIANZAS
    // ===========================================
    
    const alliancesTrack = document.getElementById('alliancesTrack');
    const alliancePrev = document.getElementById('alliancePrev');
    const allianceNext = document.getElementById('allianceNext');
    
    // Datos de alianzas (en un proyecto real vendrían de una API)
    const alliances = [
        { name: "Universidad de Concepción", logo: "assets/logos/udec.png" },
        { name: "Gobierno Regional de Ñuble", logo: "assets/logos/gore-nuble.png" },
        { name: "Hospital Clínico Herminda Martín", logo: "assets/logos/hospital.png" },
        { name: "Municipalidad de Chillán", logo: "assets/logos/muni-chillan.png" },
        { name: "INIA Quilamapu", logo: "assets/logos/inia.png" },
        { name: "Corporación de Desarrollo de Ñuble", logo: "assets/logos/corponuble.png" },
        { name: "SENCE Ñuble", logo: "assets/logos/sence.png" },
        { name: "Centro de Formación Técnica San Agustín", logo: "assets/logos/cft.png" }
    ];
    
    let alliancePosition = 0;
    
    // Generar logos de alianzas
    if (alliancesTrack) {
        alliances.forEach(alliance => {
            const allianceItem = document.createElement('div');
            allianceItem.className = 'alliance-item';
            
            allianceItem.innerHTML = `
                <img src="${alliance.logo}" alt="${alliance.name}">
                <div class="alliance-tooltip">${alliance.name}</div>
            `;
            
            alliancesTrack.appendChild(allianceItem);
        });
    }
    
    // Mover carrusel de alianzas
    function moveAlliances(direction) {
        const itemWidth = 200; // Ancho de cada item
        const gap = 32; // Espacio entre items (2rem = 32px)
        const visibleItems = Math.floor(alliancesTrack.parentElement.offsetWidth / (itemWidth + gap));
        const maxPosition = Math.max(0, alliances.length - visibleItems);
        
        alliancePosition += direction;
        
        if (alliancePosition < 0) {
            alliancePosition = 0;
        } else if (alliancePosition > maxPosition) {
            alliancePosition = maxPosition;
        }
        
        const translateX = alliancePosition * (itemWidth + gap);
        alliancesTrack.style.transform = `translateX(-${translateX}px)`;
    }
    
    // Eventos para controles de alianzas
    if (alliancePrev) {
        alliancePrev.addEventListener('click', function() {
            moveAlliances(-1);
        });
    }
    
    if (allianceNext) {
        allianceNext.addEventListener('click', function() {
            moveAlliances(1);
        });
    }
    
    // ===========================================
    // GALERÍA CON FILTROS
    // ===========================================
    
    const galleryGrid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryModal = document.getElementById('galleryModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    // Datos de la galería (en un proyecto real vendrían de una API)
    const galleryItems = [
        { id: 1, title: "Taller de IA en escuela rural", desc: "Capacitación a docentes sobre introducción a la inteligencia artificial", category: "educacion", img: "assets/gallery/taller1.jpg" },
        { id: 2, title: "Instalación de sensores IoT", desc: "Despliegue de red de sensores para monitoreo ambiental", category: "territorio", img: "assets/gallery/sensores.jpg" },
        { id: 3, title: "Reunión con comunidad agrícola", desc: "Socialización de resultados del sistema de predicción de cultivos", category: "territorio", img: "assets/gallery/reunion.jpg" },
        { id: 4, title: "Demostración en hospital", desc: "Presentación del sistema de diagnóstico médico a profesionales de la salud", category: "salud", img: "assets/gallery/hospital.jpg" },
        { id: 5, title: "Hackathon de innovación territorial", desc: "Competencia de desarrollo de soluciones tecnológicas para problemas locales", category: "eventos", img: "assets/gallery/hackathon.jpg" },
        { id: 6, title: "Prototipo de plataforma educativa", desc: "Primera versión de la interfaz de la plataforma de enseñanza de IA", category: "educacion", img: "assets/gallery/prototipo.jpg" },
        { id: 7, title: "Entrega de equipamiento tecnológico", desc: "Donación de computadores a escuela rural para proyecto de IA", category: "eventos", img: "assets/gallery/equipamiento.jpg" },
        { id: 8, title: "Análisis de datos territoriales", desc: "Sesión de trabajo con datos geoespaciales para modelamiento", category: "territorio", img: "assets/gallery/datos.jpg" }
    ];
    
    let currentGalleryIndex = 0;
    let filteredGalleryItems = [...galleryItems];
    
    // Generar galería
    function renderGallery(items) {
        if (galleryGrid) {
            galleryGrid.innerHTML = '';
            
            items.forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = `gallery-item ${item.category}`;
                galleryItem.setAttribute('data-index', index);
                
                galleryItem.innerHTML = `
                    <img src="${item.img}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <span class="gallery-category">${item.category}</span>
                        <h4 class="gallery-title">${item.title}</h4>
                    </div>
                `;
                
                // Evento para abrir lightbox
                galleryItem.addEventListener('click', function() {
                    openLightbox(index, items);
                });
                
                galleryGrid.appendChild(galleryItem);
            });
        }
    }
    
    // Inicializar galería
    renderGallery(galleryItems);
    
    // Filtros de galería
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                filteredGalleryItems = [...galleryItems];
            } else {
                filteredGalleryItems = galleryItems.filter(item => item.category === filter);
            }
            
            renderGallery(filteredGalleryItems);
        });
    });
    
    // Lightbox de galería
    function openLightbox(index, items) {
        currentGalleryIndex = index;
        updateLightboxContent();
        openModal('galleryModal');
    }
    
    function updateLightboxContent() {
        const item = filteredGalleryItems[currentGalleryIndex];
        
        if (item) {
            lightboxImg.src = item.img;
            lightboxImg.alt = item.title;
            lightboxTitle.textContent = item.title;
            lightboxDesc.textContent = item.desc;
            lightboxCategory.textContent = item.category;
        }
    }
    
    // Navegación en lightbox
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length;
            updateLightboxContent();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function() {
            currentGalleryIndex = (currentGalleryIndex + 1) % filteredGalleryItems.length;
            updateLightboxContent();
        });
    }
    
    // ===========================================
    // TESTIMONIOS (CARRUSEL SIMPLE)
    // ===========================================
    
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialIndicators = document.querySelectorAll('.indicator');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Ocultar todos los testimonios
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remover active de todos los indicadores
        testimonialIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar testimonio actual
        testimonials[index].classList.add('active');
        testimonialIndicators[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Eventos para controles de testimonios
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', function() {
            let newIndex = currentTestimonial - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            showTestimonial(newIndex);
        });
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', function() {
            let newIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(newIndex);
        });
    }
    
    // Eventos para indicadores de testimonios
    testimonialIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto-avance de testimonios cada 7 segundos
    setInterval(() => {
        let newIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(newIndex);
    }, 7000);
    
    // ===========================================
    // FORMULARIO DE CONTACTO
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const toast = document.getElementById('messageToast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Validación del formulario
    function validateForm() {
        let isValid = true;
        
        // Validar nombre
        if (!nameInput.value.trim()) {
            nameError.textContent = 'El nombre es requerido';
            nameInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = 'var(--color-gris-claro)';
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'El correo electrónico es requerido';
            emailInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Ingresa un correo electrónico válido';
            emailInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = 'var(--color-gris-claro)';
        }
        
        // Validar mensaje
        if (!messageInput.value.trim()) {
            messageError.textContent = 'El mensaje es requerido';
            messageInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = 'var(--color-gris-claro)';
        }
        
        return isValid;
    }
    
    // Mostrar mensaje toast
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        toast.className = 'message-toast show ' + type;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
    
    // Evento de envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simular envío (en un proyecto real aquí se haría una petición AJAX)
                showToast('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
                
                // Limpiar formulario
                contactForm.reset();
                
                // Limpiar mensajes de error
                nameError.textContent = '';
                emailError.textContent = '';
                messageError.textContent = '';
                
                // Restaurar bordes
                nameInput.style.borderColor = 'var(--color-gris-claro)';
                emailInput.style.borderColor = 'var(--color-gris-claro)';
                messageInput.style.borderColor = 'var(--color-gris-claro)';
            } else {
                showToast('Por favor, corrige los errores en el formulario.', 'error');
            }
        });
    }
    
    // Validación en tiempo real
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.trim()) {
                nameError.textContent = '';
                this.style.borderColor = 'var(--color-gris-claro)';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() && emailRegex.test(this.value)) {
                emailError.textContent = '';
                this.style.borderColor = 'var(--color-gris-claro)';
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            if (this.value.trim()) {
                messageError.textContent = '';
                this.style.borderColor = 'var(--color-gris-claro)';
            }
        });
    }
    
    // ===========================================
    // BOTÓN PARA VOLVER ARRIBA
    // ===========================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===========================================
    // ANIMACIONES AL HACER SCROLL
    // ===========================================
    
    // Observador de intersección para animar elementos al entrar en vista
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in-view');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.card, .timeline-item, .team-card, .project-card').forEach(element => {
        observer.observe(element);
    });
    
    // ===========================================
    // INICIALIZACIÓN COMPLETA
    // ===========================================
    
    console.log('IA Ñuble - Landing Page cargada correctamente');
});