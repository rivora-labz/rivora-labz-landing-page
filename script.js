// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

const setMobileMenuState = (isOpen) => {
    if (!mobileMenuToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
};

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        setMobileMenuState(isOpen);
    });
}

// Scroll reveal animation
const initScrollReveal = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
};

// Navigation scroll effects
const initNavScroll = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }
    }, { passive: true });
};

// Smooth anchor scrolling
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuState(false);
                return;
            }

            let target = null;
            try {
                target = document.querySelector(href);
            } catch {
                return;
            }

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                setMobileMenuState(false);
            }
        });
    });
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavScroll();
    initSmoothScrolling();
});
