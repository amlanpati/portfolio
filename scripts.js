const revealLayer = document.querySelector('.reveal-layer');
const customCursor = document.querySelector('.custom-cursor'); 
const heroSection = document.querySelector('.hero');
const navbar = document.querySelector('.navbar');

// Add the event listener to the entire document, not just the hero section
document.addEventListener('mousemove', e => {
    // Get the positions of the navbar and hero sections on the page
    const navbarRect = navbar.getBoundingClientRect();
    const heroRect = heroSection.getBoundingClientRect();

    // Condition 1: Is the mouse inside the navbar region?
    if (e.clientY <= navbarRect.bottom) {
        // If yes, hide the custom elements. The browser's default cursor takes over.
        revealLayer.style.opacity = '0';
        customCursor.style.opacity = '0';
    } 
    // Condition 2: If not in the navbar, is the mouse inside the hero region?
    else if (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
    ) {
        // If yes, show the custom elements and update their position.
        revealLayer.style.opacity = '1';
        customCursor.style.opacity = '1';

        const x = e.clientX - heroRect.left;
        const y = e.clientY - heroRect.top;

        heroSection.style.setProperty('--x', `${x}px`);
        heroSection.style.setProperty('--y', `${y}px`);
    }
    // Condition 3: If the mouse is anywhere else on the page (not navbar, not hero)
    else {
        // Also hide the custom elements.
        revealLayer.style.opacity = '0';
        customCursor.style.opacity = '0';
    }
});

document.addEventListener('mouseleave', () => {
    // Hide the custom elements when the mouse leaves the window
    revealLayer.style.opacity = '0';
    customCursor.style.opacity = '0';
});

// Nav link hover animation
document.querySelectorAll('.hover-anim').forEach(link => {
    const originalText = link.textContent;
    let animationInterval = null;
    const letters = "abcdefghijklmnopqrstuvwxyz";

    // Event for when the mouse enters the link area
    link.addEventListener('mouseenter', () => {
        // ADD THIS LINE to stop the animation on mobile
        if (window.innerWidth <= 1024) return;

        let iterations = 0;
        
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        animationInterval = setInterval(() => {
            // Determine the single random character to "glitch" in the unrevealed part
            const unrevealedStartIndex = Math.floor(iterations);
            const randomIndexToScramble = unrevealedStartIndex + Math.floor(Math.random() * (originalText.length - unrevealedStartIndex));

            link.textContent = originalText
                .split('')
                .map((letter, index) => {
                    // 1. Reveal letters that are "unlocked"
                    if (index < iterations) {
                        return originalText[index];
                    }
                    // 2. "Glitch" a single random letter in the remaining part
                    if (index === randomIndexToScramble) {
                        return letters[Math.floor(Math.random() * 26)];
                    }
                    // 3. For all other letters, keep them as they are
                    return originalText[index];
                })
                .join('');

            // Stop the animation when the entire word is revealed
            if (iterations >= originalText.length) {
                clearInterval(animationInterval);
                animationInterval = null;
                link.textContent = originalText; // Ensure final text is correct
            }

            // Increase the speed of the reveal (a new letter is revealed every 2 frames)
            iterations += 0.5; 
        }, 40); // Interval set to 40ms for a smooth feel
    });

    // Event for when the mouse leaves the link area
    link.addEventListener('mouseleave', () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        // Immediately restore the original text
        link.textContent = originalText;
    });
});

// --- Theme Toggle & Responsive State Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Setup ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const heroImage = document.getElementById('hero-img');
    const body = document.body;

    // --- Image Paths ---
    const darkImage = './assets/my-second-photo.jpg'; // Normal pic (for mobile dark theme)
    // FIX #1: Corrected filename to match your HTML
    const lightImage = './assets/my-photo.jpg';       // Smiling pic (for mobile light theme AND desktop default)

    // --- Functions ---
    const applyTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-mode');
            if (heroImage) heroImage.src = lightImage;
        } else {
            body.classList.remove('light-mode');
            if (heroImage) heroImage.src = darkImage;
        }
    };

    // FIX #2: Create a handler that manages state based on window size
    const handleResponsiveState = () => {
        if (window.innerWidth <= 1024) {
            // MOBILE VIEW: Check localStorage and apply the correct theme
            const savedTheme = localStorage.getItem('theme');
            applyTheme(savedTheme === 'light');
        } else {
            // DESKTOP VIEW: Always reset the hero image to the default state
            if (heroImage) {
                heroImage.src = lightImage; // Reset to the smiling photo for the cursor effect
            }
        }
    };

    // --- Event Listeners ---
    // Listener for the theme button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = !body.classList.contains('light-mode');
            applyTheme(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Listener for window resize events to switch between states
    window.addEventListener('resize', handleResponsiveState);

    // Initial check when the page loads
    handleResponsiveState();
});

// --- Mobile Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksList = document.getElementById('nav-links-list');

    if (hamburgerBtn && navLinksList) {
        hamburgerBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });
    }
});