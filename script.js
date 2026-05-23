document.addEventListener('DOMContentLoaded', () => {

    // ── LUCIDE ICONS ──
    lucide.createIcons();

    // ── MOBILE MENU ──
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const mobileMenuLinks = mobileMenu ? mobileMenu.getElementsByTagName('a') : [];
    for (let link of mobileMenuLinks) {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // ── REVEAL ON SCROLL ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── STAGGERED REVEAL FOR GRIDS ──
    document.querySelectorAll('.skill-card, .project-card, .work-item').forEach((card, i) => {
        card.style.transitionDelay = `${(i % 4) * 80}ms`;
    });

    // ── ANIMATED COUNTER ──
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 1800;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + suffix;
                }, 16);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // ── ACTIVE NAV LINK ──
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = '#d946ef';
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(sec => navObserver.observe(sec));

    // ── PARALLAX ORBS (subtle) ──
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        const hero = document.querySelector('#sobre');
        if (hero) {
            hero.style.backgroundPosition = `${50 + x * 0.1}% ${50 + y * 0.1}%`;
        }
    });

    // ── CURSOR GLOW (optional subtle effect) ──
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed; pointer-events: none; z-index: 9998;
        width: 300px; height: 300px; border-radius: 50%;
        background: radial-gradient(circle, rgba(192,38,211,0.04) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

});