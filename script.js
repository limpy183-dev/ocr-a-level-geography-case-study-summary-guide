// Scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    // Only add scroll-to-top on case study pages (not index)
    if (!document.querySelector('.index-page')) {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '↑';
        btn.title = 'Back to top';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }

    // Animate sections on scroll
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(16px)';
        s.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(s);
    });
});
