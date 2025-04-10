class WaveAnimation {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 200;
        this.time = 0;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        
        // Create particles
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                angle: Math.random() * Math.PI * 2
            });
        }
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        
        this.time += 0.005;
        
        for (let particle of this.particles) {
            // Update position with wave motion
            const waveX = Math.sin(this.time + particle.y * 0.02) * 50;
            const x = particle.x + waveX;
            const y = particle.y;
            
            // Rotate particle
            particle.angle += 0.02;
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(particle.angle);
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Move particle
            particle.x += particle.speedX * 0.5;
            particle.y += particle.speedY * 0.5;
            
            // Wrap around screen
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = this.canvas.height + 50;
            if (particle.y > this.canvas.height + 50) particle.y = -50;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WaveAnimation();
}); 