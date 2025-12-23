"use client";
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/subscriberService';
import confetti from 'canvas-confetti'; 

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Función para disparar la celebración
  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Disparamos confeti azul y blanco desde los lados
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#3b82f6', '#ffffff'] // Azul 500 y Blanco
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#3b82f6', '#ffffff']
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus('success');
        setEmail('');
        triggerCelebration(); // 👈 ¡Disparamos el efecto aquí!
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-blue-500/10 p-4 rounded-full mb-4">
          <CheckCircle2 size={48} className="text-blue-500" />
        </div>
        <h4 className="text-white text-xl font-bold tracking-tight">¡Registro completado!</h4>
        <p className="text-gray-500 text-sm mt-1">Ya eres parte del archivo digital.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mt-6">
        <input 
          required
          type="email" 
          placeholder="tu@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] px-10 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 disabled:opacity-50 active:scale-95 shadow-xl shadow-white/5"
        >
          {status === 'loading' ? 'Procesando...' : 'Unirse ahora'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-[10px] mt-4 font-medium tracking-wide">
          Lo sentimos, algo salió mal. Por favor intenta de nuevo.
        </p>
      )}
    </div>
  );
}