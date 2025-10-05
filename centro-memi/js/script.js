// ==================== VARIABLES GLOBALES ====================
let currentSlide = 0;
let slideInterval;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c Centro MEMI - FCyT UMSS ', 
        'background: linear-gradient(135deg, #44C3C2, #36a5a4); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
    );
    console.log('%c Sitio web desarrollado para la Universidad Mayor de San Simón ', 
        'color: #44C3C2; font-size: 12px; font-weight: bold;'
    );
    console.log('%c © 2025 - Todos los derechos reservados ', 
        'color: #666; font-size: 10px;'
    );
    
    initializeWebsite();
});

function initializeWebsite() {
    initCarousel();
    initIcpcCarousel();
    initNavigation();
    initScrollEffects();
    initAnimations();
    preloadImages();
}

// ==================== CARRUSEL PRINCIPAL ====================

function initCarousel() {
    showSlide(currentSlide);
    startAutoSlide();
    
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
}

function showSlide(n) {
    const slides = document.querySelectorAll('#carousel .carousel-slide');
    const dots = document.querySelectorAll('#carousel .dot');
    
    if (!slides.length) return;
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function changeSlide(direction) {
    stopAutoSlide();
    currentSlide += direction;
    showSlide(currentSlide);
    startAutoSlide();
}

function goToSlide(n) {
    stopAutoSlide();
    currentSlide = n;
    showSlide(currentSlide);
    startAutoSlide();
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Pausar cuando la página no está visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
        stopIcpcAuto();
    } else {
        startAutoSlide();
        startIcpcAuto();
    }
});

// ==================== CARRUSEL ICPC ====================

let currentIcpcSlide = 0;
let icpcInterval;

function initIcpcCarousel() {
    const carousel = document.getElementById('carousel-icpc');
    if (!carousel) return;

    showIcpcSlide(currentIcpcSlide);
    startIcpcAuto();

    carousel.addEventListener('mouseenter', stopIcpcAuto);
    carousel.addEventListener('mouseleave', startIcpcAuto);
}

function showIcpcSlide(n) {
    const slides = document.querySelectorAll('#carousel-icpc .carousel-slide');
    const dots = document.querySelectorAll('#carousel-icpc .dot');
    
    if (!slides.length) return;
    
    if (n >= slides.length) currentIcpcSlide = 0;
    if (n < 0) currentIcpcSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentIcpcSlide]) {
        slides[currentIcpcSlide].classList.add('active');
    }
    if (dots[currentIcpcSlide]) {
        dots[currentIcpcSlide].classList.add('active');
    }
}

function changeIcpcSlide(direction) {
    stopIcpcAuto();
    currentIcpcSlide += direction;
    showIcpcSlide(currentIcpcSlide);
    startIcpcAuto();
}

function goToIcpcSlide(n) {
    stopIcpcAuto();
    currentIcpcSlide = n;
    showIcpcSlide(currentIcpcSlide);
    startIcpcAuto();
}

function nextIcpcSlide() {
    currentIcpcSlide++;
    showIcpcSlide(currentIcpcSlide);
}

function startIcpcAuto() {
    stopIcpcAuto();
    icpcInterval = setInterval(nextIcpcSlide, 5000);
}

function stopIcpcAuto() {
    if (icpcInterval) {
        clearInterval(icpcInterval);
        icpcInterval = null;
    }
}

// ==================== NAVEGACIÓN ====================

function toggleMenu() {
    const navList = document.getElementById('navList');
    if (navList) {
        navList.classList.toggle('active');
    }
}

function toggleDropdown(button) {
    if (window.innerWidth <= 768) {
        const dropdown = button.parentElement;
        
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
            }
        });
        
        dropdown.classList.toggle('active');
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                const navList = document.getElementById('navList');
                if (navList?.classList.contains('active')) {
                    navList.classList.remove('active');
                }
                
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    });
    
    window.addEventListener('scroll', throttle(updateActiveNav, 100));
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== SCROLL EFFECTS ====================

function initScrollEffects() {
    window.addEventListener('scroll', throttle(function() {
        handleScrollTopButton();
        revealOnScroll();
    }, 100));
    
    handleScrollTopButton();
    revealOnScroll();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScrollTopButton() {
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
}

function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ==================== ANIMACIONES ====================

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .stat-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalValue = numberElement.textContent;
    const number = parseInt(finalValue.replace(/\D/g, ''));
    const suffix = finalValue.replace(/\d/g, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = Math.ceil(number / 50);
    const duration = 2000;
    const stepTime = duration / (number / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        numberElement.textContent = current + suffix;
    }, stepTime);
}

// ==================== FORMULARIO DE CONTACTO ====================

function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un correo electrónico válido', 'error');
        return;
    }
    
    const mailtoLink = `mailto:memi@fcyt.umss.edu.bo?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Nombre: ${name}\n` +
        `Email: ${email}\n\n` +
        `Mensaje:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    showNotification('Redirigiendo a tu cliente de correo...', 'success');
    
    document.getElementById('contactForm').reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== NOTIFICACIONES ====================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = `fas ${getNotificationIcon(type)}`;
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '-400px',
        padding: '15px 25px',
        borderRadius: '10px',
        background: getNotificationColor(type),
        color: 'white',
        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'right 0.3s ease',
        maxWidth: '350px',
        fontSize: '14px',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.right = '20px', 100);
    
    setTimeout(() => {
        notification.style.right = '-400px';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #4CAF50, #45a049)',
        error: 'linear-gradient(135deg, #f44336, #d32f2f)',
        warning: 'linear-gradient(135deg, #ff9800, #f57c00)',
        info: 'linear-gradient(135deg, #44C3C2, #36a5a4)'
    };
    return colors[type] || colors.info;
}

// ==================== CERRAR MENÚ AL HACER CLICK FUERA ====================

document.addEventListener('click', function(event) {
    const navList = document.getElementById('navList');
    const nav = document.querySelector('.nav');
    
    if (navList && nav && !nav.contains(event.target)) {
        navList.classList.remove('active');
    }
    
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// ==================== MANEJO DE RESIZE ====================

window.addEventListener('resize', throttle(function() {
    if (window.innerWidth > 768) {
        const navList = document.getElementById('navList');
        if (navList?.classList.contains('active')) {
            navList.classList.remove('active');
        }
        
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    }
}, 250));

// ==================== NAVEGACIÓN CON TECLADO ====================

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'Escape') {
        const navList = document.getElementById('navList');
        if (navList?.classList.contains('active')) {
            navList.classList.remove('active');
        }
    }
});

// ==================== PRELOAD DE IMÁGENES ====================

function preloadImages() {
    const imagesToPreload = [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600',
        'https://images.unsplash.com/photo-1605902711622-cfb43c4437b6?w=1600',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==================== UTILIDADES ====================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isMobile() {
    return window.innerWidth <= 768;
}

// ==================== MANEJO DE ERRORES ====================

window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    e.preventDefault();
});