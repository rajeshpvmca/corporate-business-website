/**
 * Main JavaScript File
 * Initializes AOS and Swiper.js
 */

document.addEventListener('DOMContentLoaded', function() {

    // Initialize Swiper for Hero Section
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Initialize Swiper for Testimonials
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            loop: true,
            speed: 5000,
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            allowTouchMove: true,
            grabCursor: true,
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    // Load Header and Footer dynamically
    async function loadComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) {
            try {
                const response = await fetch('header.html');
                const html = await response.text();
                headerPlaceholder.innerHTML = html;
                
                // Set active link
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                const links = document.querySelectorAll('#nav-links .nav-link');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === currentPath) {
                        link.classList.add('active');
                    }
                });
                
                // Navbar scroll effect for dynamically loaded nav
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 50) {
                            navbar.classList.add('shadow-sm');
                        } else {
                            navbar.classList.remove('shadow-sm');
                        }
                    });
                }
            } catch (err) {
                console.error('Error loading header:', err);
            }
        }

        if (footerPlaceholder) {
            try {
                const response = await fetch('footer.html');
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
            } catch (err) {
                console.error('Error loading footer:', err);
            }
        }
    }

    loadComponents();
});


/**
 * Preloader and AOS Initialization
 * Runs after all assets (images, scripts, etc.) have fully loaded.
 */
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'slide',
                once: true,
                offset: 50
            });
        }
    }

    if (preloader) {
        // Wait a short duration to show off the cool preloader, then fade it out
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Wait for fade transition to finish before initializing AOS and triggering animations
            setTimeout(() => {
                preloader.style.display = 'none';
                initAOS();
            }, 600);
        }, 800);
    } else {
        initAOS();
    }
});
