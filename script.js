// Particle animation (snow / floating dots)
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const PARTICLE_COUNT = 80; // moderate number for performance
    const MAX_SPEED = 0.3;
    const MIN_SPEED = 0.1;
    const PARTICLE_SIZE = 2.5;

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * PARTICLE_SIZE + 1,
                speedY: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
                speedX: (Math.random() - 0.5) * 0.2, // very slight horizontal drift
                opacity: Math.random() * 0.4 + 0.1, // low opacity
            });
        }
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#b0e0ff'; // soft cyan/white
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(176, 224, 255, ${p.opacity})`; // #b0e0ff with variable opacity
            ctx.fill();
        }
    }

    function updateParticles() {
        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX;

            // reset when off screen
            if (p.y > height + p.radius) {
                p.y = -p.radius;
                p.x = Math.random() * width;
            }
            if (p.x > width + p.radius) p.x = -p.radius;
            if (p.x < -p.radius) p.x = width + p.radius;
        }
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    resizeCanvas();
    animate();

    // (optional) reduce particle count if low performance – we keep it moderate
})();

// Existing mailto placeholder
(function() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // mailto behavior is default – we keep it
        });
    }
})();