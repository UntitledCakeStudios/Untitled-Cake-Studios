// ============================================
// ADVANCED CAKE STUDIOS JAVASCRIPT
// ============================================

/**
 * Show/hide sections with smooth transitions
 */
function show(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Close mobile menu if open
        closeMobileMenu();
    }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    mobileMenuBtn.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.style.display = 'none';
    mobileMenuBtn.classList.remove('active');
}

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate inputs
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll show a success message
    console.log('Form Data:', { name, email, subject, message });
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    
    // Reset form
    form.reset();
}

/**
 * Show notification/toast message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.3s ease-in-out;
                max-width: 400px;
            }

            .notification-success {
                background: linear-gradient(135deg, #51cf66, #40c057);
            }

            .notification-error {
                background: linear-gradient(135deg, #ff6b6b, #ff5252);
            }

            .notification-info {
                background: linear-gradient(135deg, #4ecdc4, #45b7aa);
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/**
 * Smooth scroll for anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Initialize animations on scroll
 */
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards and game cards
    document.querySelectorAll('.feature-card, .game-card, .team-member, .safety-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        observer.observe(el);
    });
}

/**
 * Add parallax effect to hero section
 */
function setupParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

/**
 * Update active nav link based on current section
 */
function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');

    // Check which section is currently active and highlight nav link
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                // You can add 'active' class styling if needed
            });
        }
    });
}

/**
 * Add hover effects to interactive elements
 */
function setupInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .nav-btn, .play-btn, .submit-btn, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Track page analytics (example implementation)
 */
function trackPageView(sectionId) {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
            page_title: sectionId,
            page_path: '/' + sectionId
        });
    }
}

/**
 * Initialize all features
 */
function init() {
    setupSmoothScroll();
    observeElements();
    setupParallax();
    setupInteractiveElements();
    
    // Add smooth scrolling to navbar links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            updateActiveNav();
        });
    });

    console.log('✨ Untitled Cake Studios website initialized!');
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Prevent body scroll when mobile menu is open
function preventScroll(e) {
    e.preventDefault();
}

const navMenu = document.querySelector('.nav-menu');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navMenu.style.display === 'flex';
        if (isOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    });
}