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

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.borderBottomColor = 'var(--border-color)';
        } else {
            navbar.style.borderBottomColor = 'var(--border-color)';
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 56;
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

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
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
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('.section, .timeline-item, .competency-card, .project-card').forEach(el => {
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

// Download Resume handler
const downloadResume = document.getElementById('download-resume');
if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
        // The download attribute in HTML will handle the download
        // No need to prevent default or show alert
    });
}
