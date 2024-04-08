// Auth - Jack Kraus

// Define the Particle class
class Particle {
    constructor(x, y, size, speed, amplitude) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.amplitude = amplitude;
        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
    }

    // Attract this particle to another particle
    attractTo(particle) {
        let dx = particle.x - this.x;
        let dy = particle.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Apply a simple attraction force (you can adjust the strength and range)
        // Ensure that particles don't get too close (minimum distance)

        //TODO: Do this properly, but this fun to mess with. 

        let minDistance = this.size + particle.size;
        if (distance > minDistance) {
            let force = .01 / (distance / 10 + 1);
            this.vx += dx * force;
            this.vy += dy * force;
        } else if (distance = minDistance){
            let force2 = 1 / (distance);
            this.vx += dx + force2;
            this.vy += dy + force2;
        }
    }

    // Update the position of the particle
    update() {
        this.angle += this.speed;
        //this.y += Math.sin(this.angle) * this.amplitude;

        // Update position based on velocity
        this.x += this.vx;
        this.y += this.vy;

        // Damping (to eventually stop the particles)
        this.vx *= 0.095;
        this.vy *= 0.095;
    }

    // Draw the particle
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    }
}

// Set up the canvas
let canvas = document.getElementById('particleCanvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create some particles
let particles = [];
for (let i = 0; i < 20; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 10 + 5;
    let speed = Math.random() * 0.05 + 0.01;
    let amplitude = Math.random() * 20 + 10;
    particles.push(new Particle(x, y, size, speed, amplitude));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each particle
    particles.forEach((particle, index) => {
        // Attract each particle to every other particle
        particles.forEach((other, otherIndex) => {
            if (index !== otherIndex) {
                particle.attractTo(other);
            }
        });

        particle.update();
        particle.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();
