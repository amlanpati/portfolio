document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader Logic (with minimum display time) ---
    let assetsLoaded = false;
    let minTimePassed = false;

    // This event fires when all assets are fully loaded
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
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
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 2500); // This time should be the total duration of your animations
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

    // --- 6. On-Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing the element after it has animated in
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 7. Works Section Scroll Animation (Sticky Header) ---
    const worksHeader = document.querySelector('.works-title');
    if (worksHeader) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const worksSectionTop = worksHeader.getBoundingClientRect().top + window.scrollY;
            const headerHeight = worksHeader.offsetHeight;

            // Only apply transform if we are within the 'works' section scroll area
            if (currentScrollY > (worksSectionTop - window.innerHeight) && currentScrollY < (worksSectionTop + worksHeader.parentElement.offsetHeight - headerHeight)) {
                let transformValue = 0;
                const scrollDistance = currentScrollY - worksSectionTop;

                if (currentScrollY > lastScrollY) {
                    // Scrolling down: move right
                    transformValue = Math.min(scrollDistance * 0.3, window.innerWidth * 0.15); // Adjust multiplier for speed
                } else {
                    // Scrolling up: move left
                    transformValue = Math.max(scrollDistance * 0.3, -window.innerWidth * 0.15); // Adjust multiplier for speed
                }
                worksHeader.style.transform = `translateX(${transformValue}px)`;
            } else {
                worksHeader.style.transform = `translateX(0px)`; // Reset if outside section
            }

            lastScrollY = currentScrollY;
        });
    }

    // --- 8. Works Section: 3D Tilt & Image Carousel Logic ---
    document.querySelectorAll('.product-showcase').forEach(showcase => {
        const image3DWrapper = showcase.querySelector('.image-3d-wrapper');

        // --- Part A: 3D Tilt Effect on Image Wrapper ---
        if (image3DWrapper) {
            showcase.addEventListener('mousemove', (e) => {
                const rect = showcase.getBoundingClientRect();
                // Calculate mouse position relative to the center of the showcase, not just the image
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Invert rotation for a more natural feel
                const rotateX = ((y - centerY) / centerY) * -7; // Max rotation
                const rotateY = ((x - centerX) / centerX) * 7;  // Max rotation

                image3DWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            showcase.addEventListener('mouseleave', () => {
                // Reset to default state
                image3DWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        }

        // --- Part B: Inner Image Carousel for Web App ---
        const webImages = showcase.querySelectorAll('.web-app-wrapper img');
        if (webImages.length > 1) {
            const imageNav = showcase.querySelector('.image-nav');
            const dotsContainer = imageNav.querySelector('.image-dots');
            const prevBtn = imageNav.querySelector('.image-prev');
            const nextBtn = imageNav.querySelector('.image-next');
            let currentImageIndex = 0;

            function showImage(index) {
                webImages.forEach((img, i) => {
                    img.classList.toggle('hidden', i !== index);
                });
                dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % webImages.length;
                showImage(currentImageIndex);
            });

            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + webImages.length) % webImages.length;
                showImage(currentImageIndex);
            });

            dotsContainer.querySelectorAll('.dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    currentImageIndex = parseInt(dot.dataset.imageIndex);
                    showImage(currentImageIndex);
                });
            });
        }
    });

    // --- 9. Live Clock in Footer ---
    const timeElement = document.getElementById('current-time');

    function updateTime() {
        if (timeElement) {
            // Options to format time for India (IST)
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            const currentTime = new Date().toLocaleTimeString('en-US', options) + " IST";
            timeElement.textContent = currentTime;
        }
    }

    updateTime(); // Call it once immediately
    setInterval(updateTime, 1000); // And then update it every second


});