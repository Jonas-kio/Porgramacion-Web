// ==================== VARIABLES GLOBALES ====================
let currentSlide = 0;
let slideInterval;
let currentIcpcSlide = 0;
let icpcInterval;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
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

    currentSlide = (n + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function changeSlide(dir) {
    stopAutoSlide();
    showSlide(currentSlide + dir);
    startAutoSlide();
}

function goToSlide(n) {
    stopAutoSlide();
    showSlide(n);
    startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = null;
}

// ==================== CARRUSEL ICPC ====================
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

    currentIcpcSlide = (n + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentIcpcSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIcpcSlide));
}

function changeIcpcSlide(dir) {
    stopIcpcAuto();
    showIcpcSlide(currentIcpcSlide + dir);
    startIcpcAuto();
}

function goToIcpcSlide(n) {
    stopIcpcAuto();
    showIcpcSlide(n);
    startIcpcAuto();
}

function startIcpcAuto() {
    stopIcpcAuto();
    icpcInterval = setInterval(() => showIcpcSlide(currentIcpcSlide + 1), 5000);
}

function stopIcpcAuto() {
    clearInterval(icpcInterval);
    icpcInterval = null;
}

// ==================== NAVEGACIÓN ====================
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

function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            const offset = (document.querySelector('.header')?.offsetHeight || 0) +
                           (document.querySelector('.nav')?.offsetHeight || 0) + 20;

            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            document.getElementById('navList')?.classList.remove('active');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        });
    });

    window.addEventListener('scroll', throttle(updateActiveNav, 100));
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });

    navLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    );
}

// ==================== SCROLL & EFECTOS ====================
function initScrollEffects() {
    window.addEventListener('scroll', throttle(() => {
        handleScrollTopButton();
        revealOnScroll();
    }, 100));
    handleScrollTopButton();
    revealOnScroll();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScrollTopButton() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;
    btn.classList.toggle('visible', window.scrollY > 300);
}

function revealOnScroll() {
    document.querySelectorAll('.card, .timeline-item').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// ==================== ANIMACIONES ====================
function initAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('stat-item')) animateCounter(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card, .timeline-item, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function animateCounter(el) {
    const numberEl = el.querySelector('.stat-number');
    if (!numberEl) return;

    const finalValue = numberEl.textContent;
    const number = parseInt(finalValue.replace(/\D/g, ''));
    const suffix = finalValue.replace(/\d/g, '');
    if (isNaN(number)) return;

    let current = 0;
    const increment = Math.ceil(number / 50);
    const stepTime = 2000 / (number / increment);

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            clearInterval(timer);
            current = number;
        }
        numberEl.textContent = current + suffix;
    }, stepTime);
}

// ==================== FORMULARIO DE CONTACTO ====================
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message)
        return showNotification('Por favor, completa todos los campos', 'error');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return showNotification('Por favor, ingresa un correo electrónico válido', 'error');

    const mailtoLink = `mailto:memi@fcyt.umss.edu.bo?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    )}`;
    window.location.href = mailtoLink;
    showNotification('Redirigiendo a tu cliente de correo...', 'success');
    document.getElementById('contactForm').reset();
}
