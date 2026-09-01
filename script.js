// Mobile Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 96;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-link');
const isServicesPage = /\/services\/?$/.test(window.location.pathname.replace(/index\.html$/, ''));

if (isServicesPage) {
    navItems.forEach(item => {
        const href = item.getAttribute('href') || '';
        const isServicesLink = href === './' || href.endsWith('/services/') || href.endsWith('/services') || href === 'services/';
        item.classList.toggle('active', isServicesLink);
        if (isServicesLink) {
            item.setAttribute('aria-current', 'page');
        } else {
            item.removeAttribute('aria-current');
        }
    });
} else {
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#home')) {
                item.classList.add('active');
            }
        });
    });
}

// Tab functionality for About section
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const targetPane = document.getElementById(`tab-${targetTab}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });

    // Keyboard navigation for tabs
    button.addEventListener('keydown', (e) => {
        const buttons = Array.from(tabButtons);
        const currentIndex = buttons.indexOf(button);
        
        let targetIndex = -1;
        if (e.key === 'ArrowLeft') {
            targetIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        } else if (e.key === 'ArrowRight') {
            targetIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'Home') {
            targetIndex = 0;
        } else if (e.key === 'End') {
            targetIndex = buttons.length - 1;
        }
        
        if (targetIndex !== -1) {
            e.preventDefault();
            buttons[targetIndex].focus();
            buttons[targetIndex].click();
        }
    });
});

// Tab functionality for Projects section
const projectTabButtons = document.querySelectorAll('.project-tab-button');
const projectTabPanes = document.querySelectorAll('.project-tab-pane');

projectTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-project-tab');
        
        // Remove active class from all buttons and panes
        projectTabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        projectTabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const targetPane = document.getElementById(`project-tab-${targetTab}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });

    // Keyboard navigation for project tabs
    button.addEventListener('keydown', (e) => {
        const buttons = Array.from(projectTabButtons);
        const currentIndex = buttons.indexOf(button);
        
        let targetIndex = -1;
        if (e.key === 'ArrowLeft') {
            targetIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        } else if (e.key === 'ArrowRight') {
            targetIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'Home') {
            targetIndex = 0;
        } else if (e.key === 'End') {
            targetIndex = buttons.length - 1;
        }
        
        if (targetIndex !== -1) {
            e.preventDefault();
            buttons[targetIndex].focus();
            buttons[targetIndex].click();
        }
    });
});

// Minimal scroll animations using Intersection Observer
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.section, .timeline-item, .competency-card, .project-card, .service-card').forEach(el => {
    if (prefersReducedMotion) {
        el.classList.add('visible');
        return;
    }
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitButton = contactForm.querySelector('.form-submit');

    // Real-time validation
    const validateField = (field, errorElement) => {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (isValid) {
            field.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            field.classList.remove('error');
        } else {
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
            field.classList.add('error');
        }

        return isValid;
    };

    // Add validation listeners
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            const errorElement = document.getElementById(`${input.id}-error`);
            
            input.addEventListener('blur', () => {
                validateField(input, errorElement);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input, errorElement);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        
        const isNameValid = validateField(nameInput, nameError);
        const isEmailValid = validateField(emailInput, emailError);
        const isSubjectValid = validateField(subjectInput, subjectError);
        const isMessageValid = validateField(messageInput, messageError);
        
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            // Focus first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isSubjectValid) subjectInput.focus();
            else if (!isMessageValid) messageInput.focus();
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Create mailto link
        const mailtoLink = `mailto:chaluska@muhlenberg.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Small delay for visual feedback, then open email client
        setTimeout(() => {
            window.location.href = mailtoLink;
            
            // Reset form and button state after a moment
            setTimeout(() => {
                contactForm.reset();
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Clear all error messages
                [nameError, emailError, subjectError, messageError].forEach(error => {
                    if (error) error.textContent = '';
                });
                
                // Remove error classes
                [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                    if (input) {
                        input.classList.remove('error');
                        input.setAttribute('aria-invalid', 'false');
                    }
                });
            }, 1000);
        }, 300);
    });
}

// Highlight hero index rail on scroll
(function initHeroRail() {
    const items = document.querySelectorAll('.hero-rail-item');
    if (!items.length) return;

    const map = [
        { id: 'home', el: items[0] },
        { id: 'about', el: items[1] },
        { id: 'services', el: items[2] },
        { id: 'projects', el: items[3] },
        { id: 'contact', el: items[4] }
    ];

    const sync = () => {
        let current = 'home';
        map.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section && window.pageYOffset >= section.offsetTop - 140) {
                current = id;
            }
        });
        map.forEach(({ id, el }) => {
            el.classList.toggle('active', id === current);
        });
    };

    window.addEventListener('scroll', sync, { passive: true });
    sync();
})();

// Live UTC clock in status bar
(function initStatusClock() {
    const clock = document.getElementById('status-clock');
    if (!clock) return;

    const tick = () => {
        const now = new Date();
        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        const ss = String(now.getUTCSeconds()).padStart(2, '0');
        clock.textContent = `UTC ${hh}:${mm}:${ss}`;
    };

    tick();
    setInterval(tick, 1000);
})();

// Download Resume handler
const downloadResume = document.getElementById('download-resume');
if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        // The download attribute in HTML will handle the download
        // No need to prevent default or show alert
    });
}

// Ambient terminal canvas — visible drifting ticks, dots, and faint trails
(function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    const ambientRoot = document.getElementById('ambient-bg');
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let particles = [];
    let sparks = [];
    let running = true;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const setPaused = (paused) => {
        if (ambientRoot) ambientRoot.classList.toggle('is-paused', paused);
        if (paused) {
            running = false;
            cancelAnimationFrame(animationId);
            return;
        }
        if (!running) {
            running = true;
            draw();
        }
    };

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const density = isMobile ? 52000 : 42000;
        const count = Math.max(isMobile ? 14 : 18, Math.min(isMobile ? 24 : 32, Math.floor((width * height) / density)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.4) * 0.28,
            size: Math.random() > 0.65 ? 2 : 1.2,
            alpha: 0.28 + Math.random() * 0.35,
            tick: Math.random() > 0.7
        }));

        sparks = Array.from({ length: isMobile ? 3 : 5 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            len: 40 + Math.random() * 70,
            speed: 0.7 + Math.random() * 1.1,
            alpha: 0.16 + Math.random() * 0.25
        }));
    };

    const draw = () => {
        if (!running) return;
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -30) p.x = width + 30;
            if (p.x > width + 30) p.x = -30;
            if (p.y < -30) p.y = height + 30;
            if (p.y > height + 30) p.y = -30;

            ctx.beginPath();
            ctx.fillStyle = `rgba(184, 196, 214, ${p.alpha})`;
            if (p.tick) {
                ctx.fillRect(p.x, p.y, 10 + p.size * 5, 1.5);
                ctx.fillStyle = `rgba(90, 134, 176, ${p.alpha * 0.7})`;
                ctx.fillRect(p.x + 12 + p.size * 5, p.y, 3, 1.5);
            } else {
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (const s of sparks) {
            s.x += s.speed;
            if (s.x > width + 120) {
                s.x = -120;
                s.y = Math.random() * height;
            }
            const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
            grad.addColorStop(0, 'rgba(90, 134, 176, 0)');
            grad.addColorStop(0.5, `rgba(232, 238, 247, ${s.alpha})`);
            grad.addColorStop(1, 'rgba(90, 134, 176, 0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x + s.len, s.y);
            ctx.stroke();
        }

        animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    let resizeTimer = null;
    window.addEventListener(
        'resize',
        () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 120);
        },
        { passive: true }
    );

    document.addEventListener('visibilitychange', () => {
        setPaused(document.hidden);
    });
})();
