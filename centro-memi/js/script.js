// ==================== CONFIGURACIÓN GLOBAL ====================
const CONFIG = {
    SLIDE_INTERVAL: 5000,
    SCROLL_THRESHOLD: 300,
    ANIMATION_THRESHOLD: 0.1,
    COUNTER_DURATION: 2000
};

// ==================== CLASE CARRUSEL ====================
class Carousel {
    constructor(elementId, prefix = '') {
        this.carousel = document.getElementById(elementId);
        if (!this.carousel) return;
        
        this.prefix = prefix;
        this.currentSlide = 0;
        this.interval = null;
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.dots = this.carousel.querySelectorAll('.dot');
        
        this.init();
    }

    init() {
        this.showSlide(0);
        this.startAutoSlide();
        this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    showSlide(n) {
        if (!this.slides.length) return;
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === this.currentSlide);
        });
        
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }

    changeSlide(direction) {
        this.stopAutoSlide();
        this.showSlide(this.currentSlide + direction);
        this.startAutoSlide();
    }

    goToSlide(n) {
        this.stopAutoSlide();
        this.showSlide(n);
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.interval = setInterval(() => {
            this.showSlide(this.currentSlide + 1);
        }, CONFIG.SLIDE_INTERVAL);
    }

    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// ==================== INSTANCIAS DE CARRUSEL ====================
let mainCarousel;
let icpcCarousel;
let talleresCarousel;

// ==================== FUNCIONES GLOBALES DE CARRUSEL ====================
function changeSlide(dir) {
    mainCarousel?.changeSlide(dir);
}

function goToSlide(n) {
    mainCarousel?.goToSlide(n);
}

function changeIcpcSlide(dir) {
    icpcCarousel?.changeSlide(dir);
}

function goToIcpcSlide(n) {
    icpcCarousel?.goToSlide(n);
}

function changeTalleresSlide(dir) {
    talleresCarousel?.changeSlide(dir);
}

function goToTalleresSlide(n) {
    talleresCarousel?.goToSlide(n);
}

// ==================== NAVEGACIÓN ====================
class Navigation {
    constructor() {
        this.navList = document.getElementById('navList');
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        window.addEventListener('scroll', throttle(() => this.updateActiveNav(), 100));
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const offset = headerHeight + navHeight + 20;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });

                this.closeMenus();
            });
        });
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', 
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    closeMenus() {
        this.navList?.classList.remove('active');
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
}

function toggleMenu() {
    document.getElementById('navList')?.classList.toggle('active');
}

function toggleDropdown(button) {
    if (window.innerWidth > 768) return;
    
    const dropdown = button.parentElement;
    document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
    });
    dropdown.classList.toggle('active');
}

// ==================== SCROLL EFFECTS ====================
class ScrollEffects {
    constructor() {
        this.scrollBtn = document.getElementById('scrollTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => {
            this.handleScrollTopButton();
        }, 100));
        this.handleScrollTopButton();
    }

    handleScrollTopButton() {
        if (!this.scrollBtn) return;
        this.scrollBtn.classList.toggle('visible', window.scrollY > CONFIG.SCROLL_THRESHOLD);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== ANIMACIONES ====================
class AnimationController {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            entries => this.handleIntersection(entries),
            { 
                threshold: CONFIG.ANIMATION_THRESHOLD,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.setupElements();
    }

    setupElements() {
        document.querySelectorAll('.card, .timeline-item, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stat-item')) {
                this.animateCounter(entry.target);
            }
        });
    }

    animateCounter(element) {
        const numberEl = element.querySelector('.stat-number');
        if (!numberEl || numberEl.dataset.animated) return;

        const finalValue = numberEl.textContent;
        const number = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');
        
        if (isNaN(number)) return;

        numberEl.dataset.animated = 'true';
        let current = 0;
        const increment = Math.ceil(number / 50);
        const stepTime = CONFIG.COUNTER_DURATION / (number / increment);

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                clearInterval(timer);
                current = number;
            }
            numberEl.textContent = current + suffix;
        }, stepTime);
    }
}

// ==================== FORMULARIO ====================
function handleSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        subject: document.getElementById('subject')?.value.trim(),
        message: document.getElementById('message')?.value.trim()
    };

    // Validación
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Por favor, completa todos los campos');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Crear mailto
    const mailtoLink = `mailto:memi@fcyt.umss.edu.bo?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    document.getElementById('contactForm')?.reset();
}

// ==================== UTILIDADES ====================
function throttle(func, delay) {
    let timeoutId;
    let lastRan;
    
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if ((Date.now() - lastRan) >= delay) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, delay - (Date.now() - lastRan));
        }
    };
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carruseles
    mainCarousel = new Carousel('carousel');
    icpcCarousel = new Carousel('carousel-icpc', 'icpc');
    talleresCarousel = new Carousel('carousel-talleres', 'talleres');
    
    // Inicializar otros componentes
    new Navigation();
    new ScrollEffects();
    new AnimationController();
    
    console.log('✅ Centro MEMI - Website inicializado correctamente');
});