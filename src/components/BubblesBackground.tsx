"use client";
import React, { useEffect, useState } from 'react';

const BubblesBackground = () => {
  // Estado para saber si ya estamos en el cliente
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Si no está montado (SSR), no renderizamos nada para evitar el mismatch
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(16)].map((_, i) => {
        const side = i % 2 === 0 ? Math.random() * 45 : Math.random() * 45 + 55;
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 blur-[80px] animate-float"
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              left: `${side}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          33% { transform: translateY(-100px) translateX(30px) scale(1.1); }
          66% { transform: translateY(50px) translateX(-30px) scale(0.9); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BubblesBackground;