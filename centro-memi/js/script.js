// Variables globales
let currentSlide = 0;
const heroTitles = [
    "Bienvenidos al Centro MEMI",
    "Innovación en Tecnología Educativa", 
    "Investigación de Excelencia"
];
const heroSubtitles = [
    "Centro de investigación y desarrollo de tecnologías para la educación",
    "Desarrollamos soluciones tecnológicas innovadoras",
    "Comprometidos con la investigación de calidad internacional"
];

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Función principal de inicialización
function initializeWebsite() {
    console.log('Centro MEMI - Sitio web cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initHeroSlider();
    initNavigation();
    initChatButton();
    initScrollEffects();
    initAnimations();
    
    // Verificar elementos críticos
    verifyElements();
}

// Inicializar slider del hero
function initHeroSlider() {
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-nav.prev');
    const nextBtn = document.querySelector('.hero-nav.next');
    
    if (!dots.length || !prevBtn || !nextBtn) return;
    
    // Navegación con puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlide(index));
    });
    
    // Navegación con flechas
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + heroTitles.length) % heroTitles.length;
        updateSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % heroTitles.length;
        updateSlide(currentSlide);
    });
    
    // Auto-slide cada 5 segundos
    setInterval(() => {
        currentSlide = (currentSlide + 1) % heroTitles.length;
        updateSlide(currentSlide);
    }, 5000);
}

// Función para actualizar slide
function updateSlide(index) {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const dots = document.querySelectorAll('.dot');
    
    if (!heroTitle || !heroSubtitle) return;
    
    currentSlide = index;
    
    // Efecto de transición suave
    heroTitle.style.opacity = '0';
    heroSubtitle.style.opacity = '0';
    
    setTimeout(() => {
        heroTitle.textContent = heroTitles[index];
        heroSubtitle.textContent = heroSubtitles[index];
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '1';
    }, 200);
    
    // Actualizar dots activos
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Inicializar navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase activa al enlace clickeado
            link.classList.add('active');
            
            // Scroll suave si hay enlaces a secciones
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Inicializar botón de chat
function initChatButton() {
    const chatBtn = document.querySelector('.chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            const chatMessages = [
                '¡Hola! ¿En qué puedo ayudarte?',
                'Bienvenido al Centro MEMI. ¿Necesitas información?',
                '¿Tienes alguna pregunta sobre nuestros servicios?',
                '¿Te interesa conocer más sobre nuestras investigaciones?'
            ];
            
            const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
            showNotification(randomMessage, 'info');
        });
    }
}

// Inicializar efectos de scroll
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        revealElements();
    });
    
    // Ejecutar una vez al cargar
    revealElements();
}

// Manejar scroll del header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
}

// Revelar elementos con animación
function revealElements() {
    const elements = document.querySelectorAll('.fade-in, .service-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.8s ease';
        }
    });
}

// Inicializar animaciones adicionales
function initAnimations() {
    // Intersection Observer para animaciones más precisas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
        
        // Efectos hover mejorados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    // Crear elementos de forma segura sin innerHTML
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'display: flex; align-items: center; gap: 10px;';
    
    const iconSpan = document.createElement('span');
    iconSpan.textContent = getNotificationIcon(type);
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    contentDiv.appendChild(iconSpan);
    contentDiv.appendChild(messageSpan);
    notification.appendChild(contentDiv);
    
    // Aplicar estilos de forma segura
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.fontSize = '14px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.background = getNotificationColor(type);
    notification.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Obtener color de notificación
function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

// Obtener ícono de notificación
function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Verificar elementos críticos
function verifyElements() {
    const criticalElements = [
        '.hero',
        '.nav', 
        '.about',
        '.hero h1',
        '.hero p',
        '.dot'
    ];
    
    criticalElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Elemento ${selector} no encontrado`);
        }
    });
}

// Manejar redimensionado de ventana
window.addEventListener('resize', () => {
    handleResize();
});

function handleResize() {
    const navList = document.querySelector('.nav-list');
    if (navList) {
        if (window.innerWidth < 768) {
            navList.style.flexWrap = 'wrap';
        } else {
            navList.style.flexWrap = 'nowrap';
        }
    }
}

// Funciones de utilidad adicionales
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Exportar funciones si es necesario (para módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateSlide,
        showNotification,
        smoothScrollTo
    };
}