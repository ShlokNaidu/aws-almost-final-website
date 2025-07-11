// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoader();
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeTeamSection();
    initializeCounters();
    initializeScrollEffects();
    initializeMobileMenu();
    
    console.log('AWS Cloud Club website loaded successfully!');
});

// Loading Animation
function initializeLoader() {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main');
    
    // Simulate loading time
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            loader.style.display = 'none';
            main.classList.remove('hidden');
            
            // Trigger initial animations
            triggerInitialAnimations();
        }, 500);
    }, 2500);
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation to toggle button
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navbar background on scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateNavbarBackground();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateActiveNavLink();
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const spans = mobileMenuBtn.querySelectorAll('span');
    
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('show');
    
    // Animate hamburger to X
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const spans = mobileMenuBtn.querySelectorAll('span');
    
    mobileMenu.classList.remove('show');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
    
    // Reset hamburger
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
}

// Scroll Animations
function initializeAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };
    
    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop > (window.innerHeight || document.documentElement.clientHeight);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check
}

function triggerInitialAnimations() {
    // Typing animation for hero title
    const typingText = document.querySelector('.typing-text');
    if (typingText && window.innerWidth > 768) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Trigger scroll animations for elements in view
    const scrollElements = document.querySelectorAll('.scroll-animate');
    scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('animate');
        }
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Team Section
function initializeTeamSection() {
    const teamTabButtons = document.querySelectorAll('.team-tab-btn');
    const teamSections = document.querySelectorAll('.team-section');
    const yearButtons = document.querySelectorAll('.year-btn');
    const teamYearContents = document.querySelectorAll('.team-year-content');
    const teamToggleBtn = document.getElementById('teamToggleBtn');
    const teamsSection = document.getElementById('teams');
    
    let currentYear = 'current';
    let currentTeam = 'technical';
    
    // Show floating button when in teams section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                teamToggleBtn.classList.add('show');
            } else {
                teamToggleBtn.classList.remove('show');
            }
        });
    }, { threshold: 0.3 });
    
    if (teamsSection) {
        observer.observe(teamsSection);
    }
    
    // Floating button click handler
    teamToggleBtn.addEventListener('click', () => {
        const newYear = currentYear === 'current' ? 'previous' : 'current';
        switchYear(newYear);
    });
    
    // Year button functionality
    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.getAttribute('data-year');
            switchYear(year);
        });
    });
    
    function switchYear(year) {
        currentYear = year;
        
        // Update year buttons
        yearButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-year') === year) {
                btn.classList.add('active');
            }
        });
        
        // Update year content with smooth transition
        teamYearContents.forEach(content => {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.classList.add('hidden');
            }, 300);
        });
        
        setTimeout(() => {
            const targetContent = document.getElementById(`${year}-team`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
            }
            
            // Update team sections for the new year
            updateTeamSections();
        }, 300);
        
        // Update floating button text
        const buttonText = year === 'current' ? 'View Previous Team' : 'View Current Team';
        teamToggleBtn.innerHTML = `<i class="fas fa-users"></i>${buttonText}`;
    }
    
    function updateTeamSections() {
        const prefix = currentYear === 'current' ? '' : 'previous-';
        const allSections = document.querySelectorAll('.team-section');
        
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${prefix}${currentTeam}-team`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Team tab functionality
    teamTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentTeam = button.getAttribute('data-team');
            
            // Remove active class from all buttons
            teamTabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update team sections with animation
            updateTeamSections();
        });
    });
    
    // Initialize with current team
    switchYear('current');
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Enhanced button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.feature-card, .event-card, .success-card, .alumni-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Image lazy loading enhancement
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                
                img.onload = () => {
                    img.style.transition = 'all 0.5s ease-out';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Utility Functions
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Resize handler for responsive animations
window.addEventListener('resize', () => {
    // Re-initialize typing animation on mobile/desktop switch
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        if (window.innerWidth <= 768) {
            typingText.style.animation = 'none';
            typingText.style.borderRight = 'none';
        } else {
            typingText.style.animation = '';
            typingText.style.borderRight = '';
        }
    }
    
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Error handling for missing images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.opacity = '0.5';
        e.target.style.filter = 'grayscale(100%)';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical images
        const criticalImages = [
            'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('AWS Cloud Club website optimized and ready!');
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on escape
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Navigate sections with arrow keys (when not in input)
    if (!e.target.matches('input, textarea, select')) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                smoothScrollTo(sections[currentIndex + 1].id);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                smoothScrollTo(sections[currentIndex - 1].id);
            }
        }
    }
});

// Add loading states for dynamic content
function showLoading(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Enhanced accessibility
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-600);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Announce section changes
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    const sectionTitle = targetElement.querySelector('h1, h2, h3');
                    if (sectionTitle) {
                        announcer.textContent = `Navigated to ${sectionTitle.textContent}`;
                    }
                }, 1000);
            }
        });
    });
}

// Initialize accessibility features
initializeAccessibility();