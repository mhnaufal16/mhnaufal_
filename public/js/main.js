// Smooth scroll and active nav
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Smooth scroll on click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.experience-item, .project-card, .contact-section').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Parallax effect on scroll
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for experience items
    document.querySelectorAll('.experience-item').forEach((el, index) => {
        const speed = 0.05;
        const yPos = -(scrolled * speed * (index + 1) * 0.1);
        el.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Typing animation for title
const titleElement = document.querySelector('.title');
if (titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let charIndex = 0;
    function typeChar() {
        if (charIndex < text.length) {
            titleElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50);
        }
    }
    
    setTimeout(typeChar, 500);
}

// Stagger animation for tech tags
document.querySelectorAll('.tech-tags').forEach(container => {
    const tags = container.querySelectorAll('.tech-tag');
    tags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
    });
});

// Hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Logo pulse animation
const logo = document.querySelector('.logo-image');
if (logo) {
    setInterval(() => {
        logo.style.transform = 'scale(1.05)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Social links hover animation
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Name glitch effect on hover
const nameElement = document.querySelector('.name');
if (nameElement) {
    nameElement.addEventListener('mouseenter', function() {
        this.classList.add('glitch-active');
        setTimeout(() => {
            this.classList.remove('glitch-active');
        }, 500);
    });
}
