const revealLayer = document.querySelector('.reveal-layer');
const heroSection = document.querySelector('.hero');
const navbar = document.querySelector('.navbar');

// Combined mousemove event logic
heroSection.addEventListener('mousemove', e => {
    const navbarRect = navbar.getBoundingClientRect();
    
    if (e.clientY <= navbarRect.bottom) {
        // Hide reveal area when over navbar
        revealLayer.style.setProperty('--x', `-9999px`);
        revealLayer.style.setProperty('--y', `-9999px`);
    } else {
        // Normal reveal area follows cursor
        revealLayer.style.setProperty('--x', `${e.clientX}px`);
        revealLayer.style.setProperty('--y', `${e.clientY}px`);
    }
});

// Nav link hover animation
document.querySelectorAll('.hover-anim').forEach(link => {
    const originalText = link.textContent;
    
    link.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            const chars = originalText.split('').map(c => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
            link.textContent = chars.join('');
            iterations++;

            if (iterations >= 10) {
                clearInterval(interval);
                link.textContent = originalText;
            }
        }, 100);
    });
});

// Custom cursor style
document.body.style.cursor = 'url(view-icon.png), auto';
