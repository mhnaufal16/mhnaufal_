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
