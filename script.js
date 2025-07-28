// VPN Landing Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Toggle Functionality
    initializeFAQ();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // CTA button tracking (for analytics)
    initializeCTATracking();
    
    // Performance optimizations
    initializePerformanceOptimizations();
    
    // Accessibility enhancements
    initializeAccessibility();
});

/**
 * Initialize FAQ toggle functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (!question || !answer || !toggle) return;
        
        // Set initial ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${Array.from(faqItems).indexOf(item)}`);
        answer.setAttribute('id', `faq-answer-${Array.from(faqItems).indexOf(item)}`);
        answer.setAttribute('aria-hidden', 'true');
        
        question.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFAQ(item, question, answer, toggle);
        });
        
        // Keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item, question, answer, toggle);
            }
        });
    });
}

/**
 * Toggle FAQ item open/closed state
 */
function toggleFAQ(item, question, answer, toggle) {
    const isOpen = item.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
            activeItem.classList.remove('active');
            const activeAnswer = activeItem.querySelector('.faq-answer');
            const activeToggle = activeItem.querySelector('.faq-toggle');
            const activeQuestion = activeItem.querySelector('.faq-question');
            
            if (activeAnswer) {
                activeAnswer.classList.remove('visible');
                activeAnswer.setAttribute('aria-hidden', 'true');
            }
            if (activeQuestion) {
                activeQuestion.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Toggle current item
    if (isOpen) {
        // Close current item
        item.classList.remove('active');
        answer.classList.remove('visible');
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
    } else {
        // Open current item
        item.classList.add('active');
        answer.classList.add('visible');
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
        
        // Smooth scroll to ensure the answer is visible
        setTimeout(() => {
            const rect = answer.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
                answer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }, 300);
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a placeholder link
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize CTA button tracking
 */
function initializeCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            // Track button clicks for analytics
            const buttonText = this.textContent.trim();
            const vpnName = getVPNNameFromButton(this);
            
            // Console log for development (replace with actual analytics in production)
            console.log('CTA Click:', {
                buttonText,
                vpnName,
                buttonIndex: index,
                timestamp: new Date().toISOString()
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can integrate with Google Analytics, Facebook Pixel, etc. here
            // Example: gtag('event', 'click', { event_category: 'CTA', event_label: vpnName });
        });
    });
}

/**
 * Get VPN name from button context
 */
function getVPNNameFromButton(button) {
    const vpnCard = button.closest('.vpn-card');
    if (vpnCard) {
        const titleElement = vpnCard.querySelector('.vpn-title');
        if (titleElement) {
            const titleText = titleElement.textContent;
            if (titleText.includes('ExpressVPN')) return 'ExpressVPN';
            if (titleText.includes('NordVPN')) return 'NordVPN';
            if (titleText.includes('Surfshark')) return 'Surfshark';
        }
    }
    
    // Check table context
    const tableRow = button.closest('tr');
    if (tableRow) {
        const vpnNameCell = tableRow.querySelector('.vpn-name .vpn-logo');
        if (vpnNameCell) {
            return vpnNameCell.textContent.trim();
        }
    }
    
    return 'Unknown';
}

/**
 * Initialize performance optimizations
 */
function initializePerformanceOptimizations() {
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Optimize animations for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

/**
 * Initialize accessibility enhancements
 */
function initializeAccessibility() {
    // Add skip link functionality
    addSkipLink();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add live region for dynamic content updates
    addLiveRegion();
}

/**
 * Add skip link for keyboard users
 */
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Passer au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('.comparison-section');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

/**
 * Enhance keyboard navigation
 */
function enhanceKeyboardNavigation() {
    // Add focus indicators for better visibility
    const style = document.createElement('style');
    style.textContent = `
        .skip-link:focus,
        .cta-button:focus,
        .faq-question:focus {
            outline: 3px solid var(--accent-blue);
            outline-offset: 2px;
        }
        
        .vpn-card:focus-within {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }
    `;
    document.head.appendChild(style);
    
    // Trap focus in modals if any are added later
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or expanded content
            const openFAQs = document.querySelectorAll('.faq-item.active');
            openFAQs.forEach(faq => {
                const question = faq.querySelector('.faq-question');
                const answer = faq.querySelector('.faq-answer');
                const toggle = faq.querySelector('.faq-toggle');
                if (question && answer && toggle) {
                    toggleFAQ(faq, question, answer, toggle);
                }
            });
        }
    });
}

/**
 * Add live region for screen readers
 */
function addLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(function() {
    // Recalculate any dynamic layouts if needed
    console.log('Window resized, recalculating layouts...');
}, 250));

/**
 * Handle scroll events for potential scroll-based animations
 */
let ticking = false;

function updateScrollAnimations() {
    // Add scroll-based animations here if needed
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});

/**
 * Error handling for any JavaScript errors
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    
    // You could send this to an error tracking service
    // Example: Sentry.captureException(e.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Prevent the default browser behavior
    e.preventDefault();
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleFAQ,
        getVPNNameFromButton,
        debounce
    };
}
