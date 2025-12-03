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

    // Project data
    const projectsData = {
        1: {
            title: 'IA en el Aula',
            category: 'Educación',
            description: `
                <p>El programa "IA en el Aula" es una iniciativa pionera que busca transformar la educación en la Región de Ñuble a través de la capacitación docente en herramientas de Inteligencia Artificial.</p>
                <p>A lo largo de 6 meses, los docentes participantes aprenden a utilizar diversas herramientas de IA para crear material educativo personalizado, automatizar tareas administrativas, y mejorar la experiencia de aprendizaje de sus estudiantes.</p>
            `,
            features: [
                'Capacitación presencial y virtual',
                'Uso de ChatGPT, Claude y otras IA generativas',
                'Creación de contenido educativo con IA',
                'Evaluación automatizada',
                'Personalización del aprendizaje'
            ],
            stats: [
                { number: '120', label: 'Docentes capacitados' },
                { number: '35', label: 'Establecimientos' },
                { number: '6', label: 'Meses de duración' }
            ]
        },
        2: {
            title: 'Talleres Comunitarios de IA',
            category: 'Comunidad',
            description: `
                <p>Los Talleres Comunitarios de IA llevan el conocimiento sobre Inteligencia Artificial directamente a las comunidades de Ñuble, con especial énfasis en zonas rurales y grupos que tradicionalmente tienen menos acceso a la tecnología.</p>
                <p>Cada taller está diseñado para ser accesible y práctico, permitiendo que personas de todas las edades y niveles de conocimiento tecnológico puedan aprender y aplicar herramientas de IA en su vida cotidiana.</p>
            `,
            features: [
                'Talleres adaptados a adultos mayores',
                'Capacitación en zonas rurales',
                'Uso práctico de asistentes virtuales',
                'Alfabetización digital básica',
                'Seguridad y privacidad en línea'
            ],
            stats: [
                { number: '300+', label: 'Participantes' },
                { number: '15', label: 'Comunas alcanzadas' },
                { number: '45', label: 'Talleres realizados' }
            ]
        },
        3: {
            title: 'Asistente Virtual Ñuble',
            category: 'Innovación',
            description: `
                <p>El Asistente Virtual Ñuble es un chatbot inteligente desarrollado para facilitar el acceso de los ciudadanos a información sobre servicios públicos, trámites y recursos disponibles en la región.</p>
                <p>Utilizando tecnología de procesamiento de lenguaje natural, el asistente puede responder consultas las 24 horas del día, los 7 días de la semana, en un lenguaje claro y accesible.</p>
            `,
            features: [
                'Disponibilidad 24/7',
                'Respuestas en lenguaje natural',
                'Integración con servicios públicos',
                'Múltiples canales (web, WhatsApp)',
                'Escalamiento a atención humana'
            ],
            stats: [
                { number: '5000+', label: 'Consultas atendidas' },
                { number: '92%', label: 'Satisfacción' },
                { number: '24/7', label: 'Disponibilidad' }
            ]
        },
        4: {
            title: 'AgroIA Ñuble',
            category: 'Agricultura',
            description: `
                <p>AgroIA Ñuble es un sistema innovador que utiliza Inteligencia Artificial para ayudar a los agricultores de la región a optimizar sus cultivos y tomar decisiones basadas en datos.</p>
                <p>El sistema recopila información sobre clima, suelo, y patrones de cultivo para generar recomendaciones personalizadas sobre riego, fertilización, y control de plagas.</p>
            `,
            features: [
                'Predicción climática localizada',
                'Recomendaciones de riego inteligente',
                'Detección temprana de enfermedades',
                'Optimización de fertilización',
                'Análisis de rendimiento histórico'
            ],
            stats: [
                { number: '50', label: 'Agricultores activos' },
                { number: '+20%', label: 'Aumento rendimiento' },
                { number: '-15%', label: 'Reducción costos' }
            ]
        },
        5: {
            title: 'Bootcamp IA Jóvenes',
            category: 'Educación',
            description: `
                <p>El Bootcamp IA Jóvenes es un programa intensivo de 3 meses diseñado para introducir a estudiantes de enseñanza media en el mundo de la programación y la Inteligencia Artificial.</p>
                <p>Los participantes aprenden fundamentos de Python, machine learning, y desarrollo de proyectos prácticos que resuelven problemas reales de sus comunidades.</p>
            `,
            features: [
                'Fundamentos de Python',
                'Introducción a Machine Learning',
                'Proyectos prácticos',
                'Mentoría personalizada',
                'Certificación oficial'
            ],
            stats: [
                { number: '80', label: 'Estudiantes' },
                { number: '12', label: 'Semanas' },
                { number: '15', label: 'Proyectos creados' }
            ]
        },
        6: {
            title: 'SaludIA Regional',
            category: 'Innovación',
            description: `
                <p>SaludIA Regional es un proyecto piloto que busca mejorar el acceso a servicios de salud en zonas rurales de Ñuble mediante el uso de telemedicina asistida por Inteligencia Artificial.</p>
                <p>El sistema permite realizar diagnósticos preliminares y triaje automatizado, conectando a pacientes de zonas remotas con especialistas de la región.</p>
            `,
            features: [
                'Triaje asistido por IA',
                'Consultas de telemedicina',
                'Diagnóstico preliminar automatizado',
                'Historial médico digital',
                'Conexión con especialistas'
            ],
            stats: [
                { number: '3', label: 'Postas rurales' },
                { number: '500+', label: 'Consultas realizadas' },
                { number: '85%', label: 'Precisión diagnóstico' }
            ]
        }
    };

    // Open modal
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectsData[projectId];

            if (project) {
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <span class="proyecto-category">${project.category}</span>
                        <h2>${project.title}</h2>
                    </div>
                    <div class="modal-body">
                        ${project.description}
                        <div class="modal-features">
                            <h4>Características principales:</h4>
                            <ul>
                                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-stats">
                            ${project.stats.map(s => `
                                <div class="modal-stat">
                                    <span class="modal-stat-number">${s.number}</span>
                                    <span class="modal-stat-label">${s.label}</span>
                                </div>
                            `).join('')}
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
