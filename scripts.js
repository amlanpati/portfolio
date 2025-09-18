document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader Logic (with minimum display time) ---
    let assetsLoaded = false;
    let minTimePassed = false;

    // This event fires when all assets are fully loaded
    window.addEventListener('load', () => {
        assetsLoaded = true;
        if (minTimePassed) {
            document.body.classList.add('loaded');
            removePreloader();
        }
    });

    // Set a minimum timer
    setTimeout(() => {
        minTimePassed = true;
        if (assetsLoaded) {
            document.body.classList.add('loaded');
            removePreloader();
        }
    }, 2000); // Minimum load time: 2 seconds. Adjust as needed.

    function removePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Set a timer to remove the preloader from the DOM after all animations are done
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 4500); // This time should be the total duration of your animations
        }
    }

    // --- 2. Cursor and Reveal Effect Logic ---
    const revealLayer = document.querySelector('.reveal-layer');
    const customCursor = document.querySelector('.custom-cursor');
    const heroSection = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');

    if (revealLayer && customCursor && heroSection && navbar) {
        document.addEventListener('mousemove', e => {
            const navbarRect = navbar.getBoundingClientRect();
            const heroRect = heroSection.getBoundingClientRect();

            if (e.clientY <= navbarRect.bottom) {
                revealLayer.style.opacity = '0';
                customCursor.style.opacity = '0';
            } else if (
                e.clientX >= heroRect.left && e.clientX <= heroRect.right &&
                e.clientY >= heroRect.top && e.clientY <= heroRect.bottom
            ) {
                revealLayer.style.opacity = '1';
                customCursor.style.opacity = '1';
                const x = e.clientX - heroRect.left;
                const y = e.clientY - heroRect.top;
                heroSection.style.setProperty('--x', `${x}px`);
                heroSection.style.setProperty('--y', `${y}px`);
            } else {
                revealLayer.style.opacity = '0';
                customCursor.style.opacity = '0';
            }
        });

        document.addEventListener('mouseleave', () => {
            revealLayer.style.opacity = '0';
            customCursor.style.opacity = '0';
        });
    }


    // --- 3. Nav Link Hover Animation ---
    document.querySelectorAll('.hover-anim').forEach(link => {
        const originalText = link.textContent;
        let animationInterval = null;
        const letters = "abcdefghijklmnopqrstuvwxyz";

        link.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 1024) return;
            let iterations = 0;
            if (animationInterval) clearInterval(animationInterval);

            animationInterval = setInterval(() => {
                link.textContent = originalText.split('')
                    .map((letter, index) => {
                        if (index < iterations) return originalText[index];
                        if (index === (Math.floor(iterations) + Math.floor(Math.random() * (originalText.length - Math.floor(iterations))))) return letters[Math.floor(Math.random() * 26)];
                        return originalText[index];
                    })
                    .join('');
                if (iterations >= originalText.length) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                    link.textContent = originalText;
                }
                iterations += 0.5;
            }, 40);
        });

        link.addEventListener('mouseleave', () => {
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
            link.textContent = originalText;
        });
    });


    // --- 4. Theme Toggle & Responsive State Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const heroImage = document.getElementById('hero-img');
    const body = document.body;

    if (themeToggleBtn && heroImage && body) {
        const darkImage = './assets/my-second-photo.jpg';
        const lightImage = './assets/my-photo.jpg';

        const applyTheme = (isLight) => {
            if (isLight) {
                body.classList.add('light-mode');
                heroImage.src = lightImage;
            } else {
                body.classList.remove('light-mode');
                heroImage.src = darkImage;
            }
        };

        const handleResponsiveState = () => {
            if (window.innerWidth <= 1024) {
                const savedTheme = localStorage.getItem('theme');
                applyTheme(savedTheme === 'light');
            } else {
                heroImage.src = darkImage;
            }
        };

        themeToggleBtn.addEventListener('click', () => {
            const isLight = !body.classList.contains('light-mode');
            applyTheme(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        window.addEventListener('resize', handleResponsiveState);
        handleResponsiveState();
    }


    // --- 5. Mobile Navigation Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksList = document.getElementById('nav-links-list');

    if (hamburgerBtn && navLinksList) {
        hamburgerBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
    }

});