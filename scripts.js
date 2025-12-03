/* ============================================
   IA ÑUBLE - JavaScript Principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initNavigation();
    initScrollEffects();
    initCounters();
    initProjectFilter();
    initModals();
    initTestimoniosSlider();
    initFormHandlers();
    initRevealAnimations();
});

/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect & logo swap
    const navLogo = document.getElementById('nav-logo');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            // Cambiar a banner.png cuando hay scroll
            if (navLogo) {
                navLogo.src = 'banner.png';
                navLogo.classList.add('logo-banner');
            }
        } else {
            header.classList.remove('scrolled');
            // Volver a logo.png cuando está en el inicio
            if (navLogo) {
                navLogo.src = 'logo.png';
                navLogo.classList.remove('logo-banner');
            }
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

/* ============================================
   Scroll Effects
   ============================================ */
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scroll-top');

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
}

/* ============================================
   Project Filter
   ============================================ */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter cards
            proyectoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================
   Modal System
   ============================================ */
function initModals() {
    const modal = document.getElementById('proyecto-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const projectBtns = document.querySelectorAll('.btn-proyecto');

    // Project data - Actualizado con información completa
    const projectsData = {
        1: {
            title: 'IA en el Aula: Docentes 4.0',
            category: 'Educación',
            status: 'Completado',
            description: `
                <p><strong>IA en el Aula: Docentes 4.0</strong> es el programa insignia de capacitación docente de IA Ñuble. Durante 8 meses (marzo-octubre 2024), formamos a 280 docentes de 45 establecimientos educacionales de la región en el uso pedagógico de herramientas de Inteligencia Artificial.</p>
                <p>El programa combinó sesiones presenciales intensivas con acompañamiento virtual continuo, permitiendo a los docentes integrar herramientas como ChatGPT, Claude, Canva IA, y Gamma en su práctica pedagógica diaria. Los participantes desarrollaron más de 150 recursos educativos originales utilizando IA generativa.</p>
                <p><strong>Impacto medido:</strong> El 94% de los docentes participantes reportó mejoras significativas en la preparación de clases, reduciendo el tiempo de planificación en un promedio de 35%. Los estudiantes de estos docentes mostraron un aumento del 18% en indicadores de engagement y participación.</p>
            `,
            features: [
                '40 horas de capacitación presencial certificada',
                'Uso avanzado de ChatGPT, Claude y Gemini',
                'Creación de contenido educativo con Canva IA y Gamma',
                'Evaluación y retroalimentación automatizada',
                'Personalización del aprendizaje con IA',
                'Comunidad de práctica docente permanente',
                'Certificación respaldada por Universidad del Bío-Bío'
            ],
            stats: [
                { number: '280', label: 'Docentes certificados' },
                { number: '45', label: 'Establecimientos' },
                { number: '94%', label: 'Satisfacción' },
                { number: '150+', label: 'Recursos creados' }
            ]
        },
        2: {
            title: 'IA Sin Fronteras: Alfabetización Digital Rural',
            category: 'Comunidad',
            status: 'En Ejecución',
            description: `
                <p><strong>IA Sin Fronteras</strong> es nuestro programa insignia de inclusión digital, diseñado para llevar la educación en Inteligencia Artificial a las comunidades más alejadas de la Región de Ñuble. Desde 2023, hemos llegado a las 21 comunas de la región con talleres presenciales adaptados.</p>
                <p>El programa está especialmente diseñado para adultos mayores (60+), mujeres rurales, y comunidades con acceso limitado a tecnología. Utilizamos una metodología de "aprender haciendo" con casos prácticos de la vida cotidiana: uso de asistentes de voz, herramientas de comunicación, acceso a servicios públicos digitales, y prevención de estafas en línea.</p>
                <p><strong>Modelo itinerante:</strong> Nuestro equipo se desplaza a juntas de vecinos, centros comunitarios, bibliotecas públicas y escuelas rurales, llevando equipamiento y conectividad para garantizar que nadie quede excluido.</p>
            `,
            features: [
                'Talleres itinerantes en las 21 comunas',
                'Metodología adaptada para adultos mayores',
                'Uso de asistentes de voz (Google, Alexa)',
                'Alfabetización digital básica y avanzada',
                'Seguridad digital y prevención de estafas',
                'Acceso a servicios públicos en línea',
                'Material didáctico en español simplificado',
                'Acompañamiento posterior gratuito'
            ],
            stats: [
                { number: '520+', label: 'Participantes' },
                { number: '21', label: 'Comunas alcanzadas' },
                { number: '68', label: 'Talleres realizados' },
                { number: '85+', label: 'Años del mayor participante' }
            ]
        },
        3: {
            title: 'Asistente Virtual Municipal Ñuble',
            category: 'Innovación',
            status: 'Operativo',
            description: `
                <p><strong>El Asistente Virtual Municipal</strong> es una solución de gobierno digital desarrollada en colaboración con municipalidades de la región. Este chatbot inteligente atiende consultas ciudadanas 24/7, reduciendo la carga de los funcionarios municipales y mejorando la experiencia de atención al público.</p>
                <p>El sistema utiliza procesamiento de lenguaje natural (NLP) avanzado para comprender consultas en lenguaje coloquial, incluyendo modismos regionales. Puede responder preguntas sobre trámites, requisitos, horarios, ubicaciones, y deriva automáticamente casos complejos a funcionarios especializados.</p>
                <p><strong>Resultados operacionales:</strong> En 8 meses de operación, el asistente ha procesado más de 12.000 consultas, resolviendo el 78% de manera autónoma. El tiempo promedio de respuesta bajó de 48 horas (correo tradicional) a 30 segundos, y la satisfacción ciudadana aumentó un 34%.</p>
            `,
            features: [
                'Disponibilidad 24/7, 365 días del año',
                'Procesamiento de lenguaje natural en español chileno',
                'Integración con sistemas municipales existentes',
                'Múltiples canales: web, WhatsApp, Facebook Messenger',
                'Escalamiento inteligente a atención humana',
                'Dashboard de analytics en tiempo real',
                'Actualización automática de información'
            ],
            stats: [
                { number: '12.000+', label: 'Consultas procesadas' },
                { number: '78%', label: 'Resolución autónoma' },
                { number: '30 seg', label: 'Tiempo respuesta' },
                { number: '34%', label: 'Aumento satisfacción' }
            ]
        },
        4: {
            title: 'AgroIA Ñuble: Agricultura Inteligente',
            category: 'Agricultura',
            status: 'Fase 2 Completa',
            description: `
                <p><strong>AgroIA Ñuble</strong> es un sistema integral de agricultura de precisión que utiliza machine learning para ayudar a pequeños y medianos agricultores de la región a optimizar sus cultivos y aumentar su productividad de manera sostenible.</p>
                <p>El sistema integra datos de sensores IoT en terreno, información meteorológica, imágenes satelitales y datos históricos de producción para generar recomendaciones personalizadas de riego, fertilización, y manejo de plagas. Los agricultores acceden a las recomendaciones a través de una app móvil simple y notificaciones SMS.</p>
                <p><strong>Impacto productivo:</strong> Los 85 agricultores participantes reportaron un aumento promedio del 28% en rendimiento por hectárea y una reducción del 22% en uso de agua. El proyecto fue seleccionado como caso de éxito por CORFO y replicado en la Región del Maule.</p>
            `,
            features: [
                'Predicción climática hiperlocal (precisión 92%)',
                'Recomendaciones de riego inteligente',
                'Detección temprana de plagas y enfermedades',
                'Optimización de uso de fertilizantes',
                'Análisis de rendimiento histórico y proyecciones',
                'App móvil y alertas SMS',
                'Integración con sensores IoT de bajo costo',
                'Capacitación continua para agricultores'
            ],
            stats: [
                { number: '85', label: 'Agricultores activos' },
                { number: '+28%', label: 'Aumento rendimiento' },
                { number: '-22%', label: 'Reducción uso agua' },
                { number: '350 ha', label: 'Hectáreas monitoreadas' }
            ]
        },
        5: {
            title: 'Bootcamp IA Joven: Programadores del Futuro',
            category: 'Educación',
            status: '3ª Generación',
            description: `
                <p><strong>Bootcamp IA Joven</strong> es nuestro programa estrella de formación tecnológica para jóvenes de enseñanza media. Durante 12 semanas intensivas, los participantes aprenden programación en Python, fundamentos de machine learning, y desarrollan proyectos reales con impacto en sus comunidades.</p>
                <p>El programa combina clases teóricas, talleres prácticos, mentoría personalizada con profesionales de la industria tech, y un proyecto final que los estudiantes presentan ante un jurado de expertos. Los mejores proyectos reciben financiamiento para su implementación.</p>
                <p><strong>Trayectoria de egresados:</strong> De los 180 graduados de las tres generaciones, el 92% continuó estudios superiores en carreras STEM, y 15 ex participantes ya trabajan en empresas de tecnología de la región. El programa ha sido reconocido por el Ministerio de Educación como buena práctica en formación técnica temprana.</p>
            `,
            features: [
                '12 semanas de formación intensiva (180 horas)',
                'Fundamentos de Python y lógica de programación',
                'Introducción a Machine Learning supervisado',
                'Desarrollo de proyectos con impacto real',
                'Mentoría 1:1 con profesionales tech',
                'Visitas a empresas tecnológicas',
                'Certificación con validez nacional',
                'Red de alumni activa'
            ],
            stats: [
                { number: '180', label: 'Graduados totales' },
                { number: '92%', label: 'Continúan estudios STEM' },
                { number: '45', label: 'Proyectos desarrollados' },
                { number: '15', label: 'Trabajando en tech' }
            ]
        },
        6: {
            title: 'SaludIA: Telemedicina Inteligente Rural',
            category: 'Innovación',
            status: 'Piloto Activo',
            description: `
                <p><strong>SaludIA</strong> es un proyecto piloto de telemedicina asistida por IA que busca mejorar el acceso a servicios de salud en zonas rurales de Ñuble, donde las postas más cercanas pueden estar a horas de distancia de centros hospitalarios.</p>
                <p>El sistema permite realizar triaje automatizado, diagnóstico preliminar de condiciones comunes, y conexión directa con médicos especialistas vía videollamada. Un algoritmo de IA analiza síntomas reportados y signos vitales para priorizar la atención y derivar casos urgentes.</p>
                <p><strong>Resultados del piloto:</strong> En 8 postas rurales de las comunas de Ñiquén, San Fabián y Coihueco, el sistema ha procesado más de 2.400 atenciones. El 85% de los casos fueron resueltos remotamente sin necesidad de traslado, generando un ahorro estimado de $45 millones en costos de transporte y tiempo para los pacientes.</p>
            `,
            features: [
                'Triaje automatizado con IA (precisión 89%)',
                'Diagnóstico preliminar de 50+ condiciones',
                'Videoconsulta con especialistas',
                'Historial médico digital integrado',
                'Alertas tempranas de condiciones críticas',
                'Funcionamiento offline con sincronización',
                'Capacitación para paramédicos rurales',
                'Integración con red de salud pública'
            ],
            stats: [
                { number: '8', label: 'Postas rurales' },
                { number: '2.400+', label: 'Atenciones realizadas' },
                { number: '85%', label: 'Resolución remota' },
                { number: '$45M', label: 'Ahorro estimado' }
            ]
        },
        7: {
            title: 'Mujeres en IA: Liderazgo Tech Femenino',
            category: 'Comunidad',
            status: 'Completado',
            description: `
                <p><strong>Mujeres en IA</strong> es un programa de empoderamiento tecnológico diseñado exclusivamente para mujeres de la Región de Ñuble. El objetivo es cerrar la brecha de género en tecnología, capacitando a mujeres emprendedoras, profesionales y estudiantes en herramientas de IA aplicadas a sus ámbitos de trabajo.</p>
                <p>El programa de 8 semanas combina formación técnica en herramientas de IA con desarrollo de habilidades blandas, networking, y mentoría con mujeres líderes del sector tecnológico. Las participantes aprenden a automatizar procesos de sus negocios, crear contenido con IA, y usar datos para tomar mejores decisiones.</p>
                <p><strong>Impacto en emprendimientos:</strong> De las 150 graduadas, 45 aplicaron lo aprendido directamente en sus emprendimientos, reportando un aumento promedio del 40% en productividad. El programa fue destacado por ONU Mujeres Chile como iniciativa modelo de reducción de brecha digital de género.</p>
            `,
            features: [
                '8 semanas de formación intensiva',
                'Herramientas de IA para emprendimiento',
                'Automatización de negocios pequeños',
                'Marketing digital con IA',
                'Análisis de datos para decisiones',
                'Mentoría con mujeres líderes tech',
                'Red de contactos profesionales',
                'Certificación con perspectiva de género'
            ],
            stats: [
                { number: '150', label: 'Mujeres graduadas' },
                { number: '45', label: 'Emprendimientos impactados' },
                { number: '+40%', label: 'Aumento productividad' },
                { number: '8', label: 'Mentoras activas' }
            ]
        },
        8: {
            title: 'IA Kids: Pequeños Innovadores',
            category: 'Educación',
            status: 'En Curso',
            description: `
                <p><strong>IA Kids: Pequeños Innovadores</strong> es nuestro programa de introducción a la Inteligencia Artificial para niños y niñas de 8 a 14 años. A través de una metodología lúdica y proyectos creativos, los participantes descubren los fundamentos de la IA mientras desarrollan pensamiento computacional y habilidades del siglo XXI.</p>
                <p>El programa utiliza plataformas como Scratch, Machine Learning for Kids, y robótica educativa para hacer tangibles conceptos abstractos. Los niños aprenden cómo funcionan los asistentes de voz, cómo las máquinas reconocen imágenes, y cómo se entrenan modelos de IA.</p>
                <p><strong>Enfoque STEAM:</strong> Integramos ciencia, tecnología, ingeniería, arte y matemáticas en proyectos multidisciplinarios. Los participantes han creado desde juegos interactivos hasta robots que reconocen emociones, pasando por sistemas de clasificación de residuos.</p>
            `,
            features: [
                'Metodología lúdica y hands-on',
                'Programación visual con Scratch',
                'Machine Learning for Kids',
                'Robótica educativa básica',
                'Proyectos creativos STEAM',
                'Desarrollo de pensamiento computacional',
                'Certificado de Pequeño Innovador IA',
                'Eventos de exhibición para familias'
            ],
            stats: [
                { number: '320', label: 'Niños participantes' },
                { number: '25', label: 'Escuelas' },
                { number: '85', label: 'Proyectos creados' },
                { number: '8-14', label: 'Rango edad (años)' }
            ]
        },
        9: {
            title: 'VinoIA: Inteligencia en Viñedos del Itata',
            category: 'Agricultura',
            status: 'Piloto',
            description: `
                <p><strong>VinoIA</strong> es un proyecto de vanguardia que aplica visión artificial y análisis predictivo al sector vitivinícola del Valle del Itata, una de las zonas de producción de vino patrimonial más importantes de Chile. El objetivo es preservar y potenciar la tradición vinícola local mediante tecnología de punta.</p>
                <p>El sistema utiliza drones equipados con cámaras multiespectrales y algoritmos de deep learning para detectar enfermedades en hojas (como oídio y botrytis) con hasta 95% de precisión, semanas antes de que sean visibles al ojo humano. Esto permite intervenciones tempranas y reducción drástica de pérdidas.</p>
                <p><strong>Preservación del patrimonio:</strong> Trabajamos con pequeños viñateros que mantienen cepas centenarias de uva País y Moscatel, ayudándoles a optimizar su producción sin perder las técnicas tradicionales que dan identidad a los vinos del Itata.</p>
            `,
            features: [
                'Vuelos de drones con cámaras multiespectrales',
                'Detección de enfermedades con 95% precisión',
                'Predicción de fecha óptima de vendimia',
                'Mapeo de vigor vegetativo',
                'Estimación de rendimiento por parcela',
                'Alertas tempranas de estrés hídrico',
                'Dashboard de gestión de viñedo',
                'Capacitación para viñateros tradicionales'
            ],
            stats: [
                { number: '12', label: 'Viñas participantes' },
                { number: '95%', label: 'Precisión detección' },
                { number: '180 ha', label: 'Hectáreas monitoreadas' },
                { number: '-35%', label: 'Reducción pérdidas' }
            ]
        }
    };

    // Open modal
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectsData[projectId];

            if (project) {
                const statusClass = project.status.includes('Complet') || project.status.includes('Generación') ? 'completado' : 'activo';
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <div class="modal-header-badges">
                            <span class="proyecto-category">${project.category}</span>
                            <span class="proyecto-status ${statusClass}">${project.status}</span>
                        </div>
                        <h2>${project.title}</h2>
                    </div>
                    <div class="modal-body">
                        ${project.description}
                        <div class="modal-features">
                            <h4><i class="fas fa-list-check"></i> Características y Alcance:</h4>
                            <ul>
                                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-stats">
                            <h4><i class="fas fa-chart-bar"></i> Métricas de Impacto:</h4>
                            <div class="modal-stats-grid">
                                ${project.stats.map(s => `
                                    <div class="modal-stat">
                                        <span class="modal-stat-number">${s.number}</span>
                                        <span class="modal-stat-label">${s.label}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ============================================
   Testimonios Slider
   ============================================ */
function initTestimoniosSlider() {
    const track = document.getElementById('testimonios-track');
    const prevBtn = document.getElementById('testimonios-prev');
    const nextBtn = document.getElementById('testimonios-next');
    const dotsContainer = document.getElementById('testimonios-dots');
    const cards = track.querySelectorAll('.testimonio-card');

    let currentIndex = 0;
    const totalSlides = cards.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoPlay = setInterval(nextSlide, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });
}

/* ============================================
   Form Handlers
   ============================================ */
function initFormHandlers() {
    const contactForm = document.getElementById('contacto-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        contactForm.reset();
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        showNotification('¡Gracias por suscribirte! Revisa tu correo para confirmar.', 'success');
        newsletterForm.reset();
    });
}

/* ============================================
   Notification System
   ============================================ */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
    `;

    document.body.appendChild(notification);

    // Close button handler
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

/* ============================================
   Reveal Animations on Scroll
   ============================================ */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   Particles Effect (Simple)
   ============================================ */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
createParticles();
