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
    const navbar = document.querySelector('.navbar');
    
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
    
    // Cambiar clase activa en navegación al hacer scroll + navbar scrolled
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        // Navbar con fondo al hacer scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
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
    // TIMELINE HORIZONTAL - NAVEGACIÓN
    // ===========================================
    
    const timelineHorizontal = document.querySelector('.timeline-horizontal');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    
    if (timelineHorizontal && timelinePrev && timelineNext) {
        const scrollAmount = 240; // Ancho aproximado de cada item
        
        timelinePrev.addEventListener('click', function() {
            timelineHorizontal.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        timelineNext.addEventListener('click', function() {
            timelineHorizontal.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Efecto hover en items del timeline
        const timelineItems = document.querySelectorAll('.timeline-item-h');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.marker-pulse').style.animationPlayState = 'paused';
            });
            item.addEventListener('mouseleave', function() {
                this.querySelector('.marker-pulse').style.animationPlayState = 'running';
            });
        });
    }
    
    // ===========================================
    // CONTADOR ANIMADO PARA STATS DEL HERO
    // ===========================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Observer para activar contadores cuando son visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.hero-stat-number');
                statNumbers.forEach(stat => {
                    const value = parseInt(stat.textContent);
                    if (!isNaN(value) && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, value, 1500);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
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
            name: "Nicolás Araya",
            role: "Investigador en IA",
            specialty: "Machine Learning, Análisis de Datos",
            education: "Ingeniería en Informática",
            projects: "Modelos predictivos, Sistemas de análisis inteligente",
            contact: "naraya@ianuble.cl",
            img: "assets/team/member1.jpg"
        },
        {
            id: 2,
            name: "Rodrigo Sandoval",
            role: "ML Engineer",
            specialty: "Deep Learning, Redes Neuronales",
            education: "Ingeniería Civil en Computación",
            projects: "Sistemas de predicción, Automatización inteligente",
            contact: "rsandoval@ianuble.cl",
            img: "assets/team/member2.jpg"
        },
        {
            id: 3,
            name: "Ismael Miranda",
            role: "Data Scientist",
            specialty: "Análisis de Datos, Business Intelligence",
            education: "Ingeniería en Informática",
            projects: "Dashboards analíticos, Modelos de pronóstico",
            contact: "imiranda@ianuble.cl",
            img: "assets/team/member3.jpg"
        },
        {
            id: 4,
            name: "Tomás Yévenes",
            role: "Desarrollador Full Stack & IA",
            specialty: "Desarrollo Web, Machine Learning, Computer Vision",
            education: "Ingeniería Civil en Informática, Universidad del Bío-Bío",
            projects: "MedPredictPro (predicción médica), Análisis bursátil con IA, Clasificación de imágenes",
            contact: "tyevenes@ianuble.cl",
            img: "assets/team/member4.jpg"
        },
        {
            id: 5,
            name: "Alexandra Pérez",
            role: "UX/UI Designer & Project Manager",
            specialty: "Diseño de experiencia de usuario, Gestión de proyectos",
            education: "Diseño Digital",
            projects: "Interfaces de plataformas de IA, Coordinación de equipos multidisciplinarios",
            contact: "aperez@ianuble.cl",
            img: "assets/team/member5.jpg"
        },
        {
            id: 6,
            name: "Juan Carlos Figueroa",
            role: "DevOps & Data Engineer",
            specialty: "Infraestructura cloud, Pipelines de datos, MLOps",
            education: "Ingeniería en Informática",
            projects: "Arquitectura de sistemas IA, Despliegue de modelos en producción",
            contact: "jcfigueroa@ianuble.cl",
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
        // crear contenedor de miniaturas (thumbnails)
        let thumbsContainer = document.getElementById('carouselThumbs');
        if (!thumbsContainer) {
            thumbsContainer = document.createElement('div');
            thumbsContainer.id = 'carouselThumbs';
            thumbsContainer.className = 'carousel-thumbs';
            carouselIndicators.parentNode.appendChild(thumbsContainer);
        }

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
            
            // Clase de estado
            const statusClass = project.status.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '-');
            
            slide.innerHTML = `
                <div class="project-card">
                    <div class="project-img">
                        <img loading="lazy" src="${project.img}" alt="${project.name}">
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.name}</h3>
                        <div class="project-tags">
                            ${tagsHTML}
                        </div>
                        <p class="project-desc">${project.description}</p>
                        <div class="project-meta">
                            <div class="project-status ${statusClass}">
                                <span class="dot"></span>
                                <span>${project.status}</span>
                            </div>
                        </div>
                        <div class="project-buttons">
                            <button class="btn btn-primary project-details-btn" data-id="${project.id}">
                                <i class="fas fa-info-circle"></i> Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            projectsCarousel.appendChild(slide);

            // Crear indicador (punto)
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-index', index);
            carouselIndicators.appendChild(indicator);

            // Crear miniatura
            const thumb = document.createElement('button');
            thumb.className = 'carousel-thumb';
            thumb.setAttribute('aria-label', `Ir al slide ${index + 1}: ${project.name}`);
            thumb.setAttribute('data-index', index);
            thumb.style.backgroundImage = `url('${project.img}')`;
            if (index === 0) thumb.classList.add('active');
            thumbsContainer.appendChild(thumb);
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
        const thumbs = document.querySelectorAll('.carousel-thumb');
        
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
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Actualizar thumbnails
        thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentSlide);
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
    function bindCarouselIndicatorEvents() {
        document.querySelectorAll('.carousel-indicator').forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                moveCarousel(slideIndex);
            });
        });

        // Miniaturas
        document.querySelectorAll('.carousel-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                moveCarousel(slideIndex);
            });
        });
    }
    bindCarouselIndicatorEvents();

    // Teclado: navegar con flechas cuando el foco no esté en un input
    document.addEventListener('keydown', function(e) {
        if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.key === 'ArrowLeft') moveCarousel(currentSlide - 1);
        if (e.key === 'ArrowRight') moveCarousel(currentSlide + 1);
    });

    // Swipe / drag soport
    (function addSwipeSupport() {
        let startX = 0;
        let dx = 0;
        let isDown = false;

        projectsCarousel.addEventListener('pointerdown', (e) => {
            isDown = true;
            startX = e.clientX;
            projectsCarousel.style.transition = 'none';
        });

        window.addEventListener('pointermove', (e) => {
            if (!isDown) return;
            dx = e.clientX - startX;
            projectsCarousel.style.transform = `translateX(${ -currentSlide * 100 + (dx / projectsCarousel.clientWidth) * 100 }%)`;
        });

        window.addEventListener('pointerup', (e) => {
            if (!isDown) return;
            isDown = false;
            projectsCarousel.style.transition = '';
            if (Math.abs(dx) > 30) {
                if (dx > 0) moveCarousel(currentSlide - 1);
                else moveCarousel(currentSlide + 1);
            } else {
                moveCarousel(currentSlide);
            }
            dx = 0;
        });
    })();
    
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
    
    // Inicializar animación de red en el header
    (function initNetworkCanvas() {
        const canvas = document.getElementById('netCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        const PARTICLE_COUNT = Math.min(90, Math.floor(window.innerWidth / 12));
        const MAX_DIST = 120;
        const MOUSE_INFLUENCE = 150;
        const mouse = { x: null, y: null, active: false };

        function resize() {
            width = canvas.width = canvas.clientWidth * devicePixelRatio;
            height = canvas.height = canvas.clientHeight * devicePixelRatio;
            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        }

        function rand(min, max) { return Math.random() * (max - min) + min; }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: rand(0, canvas.clientWidth),
                    y: rand(0, canvas.clientHeight),
                    vx: rand(-0.3, 0.3),
                    vy: rand(-0.3, 0.3),
                    r: rand(1, 2.5),
                    opacity: rand(0.4, 0.95)
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

            // dibujar partículas
            for (let p of particles) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.95})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // dibujar líneas entre partículas cercanas
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const lineAlpha = 0.9 * (1 - dist / MAX_DIST) * Math.min(a.opacity, b.opacity);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,255,255,${lineAlpha * 0.6})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function update() {
            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // rebotar en bordes
                if (p.x <= 0 || p.x >= canvas.clientWidth) p.vx *= -1;
                if (p.y <= 0 || p.y >= canvas.clientHeight) p.vy *= -1;

                // interacción con mouse
                if (mouse.active && mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_INFLUENCE) {
                        const effect = (1 - dist / MOUSE_INFLUENCE) * 0.6;
                        p.vx += (dx / dist) * effect;
                        p.vy += (dy / dist) * effect;
                    }
                }

                // suavizar velocidades
                p.vx *= 0.995;
                p.vy *= 0.995;
            }
        }

        let rafId;
        function loop() {
            update();
            draw();
            rafId = requestAnimationFrame(loop);
        }

        // eventos
        window.addEventListener('resize', () => {
            // pequeño debounce
            clearTimeout(window._netResizeTimeout);
            window._netResizeTimeout = setTimeout(() => {
                resize();
                createParticles();
            }, 150);
        });

        canvas.addEventListener('mousemove', function (e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        canvas.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
            mouse.active = false;
        });

        // Inicializar
        resize();
        createParticles();
        loop();

        // limpiar si se necesita
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(rafId);
        });
    })();

    console.log('IA Ñuble - Landing Page cargada correctamente');
});