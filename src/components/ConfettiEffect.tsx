import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
}

const ConfettiEffect: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    const colors = ['#c084fc', '#f472b6', '#60a5fa', '#34d399', '#fbbf24'];
    
    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.2 - 0.1,
      });
    }
    
    const drawParticle = (particle: typeof particles[0]) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      
      // Draw a square or rectangle for confetti
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 1.5);
      
      ctx.restore();
    };
    
    const updateParticle = (particle: typeof particles[0]) => {
      particle.y += particle.speed;
      particle.x += Math.sin(particle.angle) * 0.5;
      particle.rotation += particle.rotationSpeed;
      
      // Reset if it goes off screen
      if (particle.y > canvas.height) {
        particle.y = -particle.size;
        particle.x = Math.random() * canvas.width;
      }
    };
    
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        drawParticle(particle);
        updateParticle(particle);
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default ConfettiEffect;
