"use client";
import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/subscriberService';
import confetti from 'canvas-confetti'; // 👈 Importamos confetti

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  // Función de celebración optimizada para el Modal
  const triggerCelebration = () => {
    const end = Date.now() + 3 * 1000; // 3 segundos
    const colors = ['#3b82f6', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 150 // Por encima del modal
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 150
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus('success');
      triggerCelebration(); // 👈 ¡Disparamos el efecto!
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 3500); // Un poco más de tiempo para que se vea el confeti
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-blue-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={40} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">¡Te has suscrito!</h3>
            <p className="text-gray-400">Bienvenido al archivo digital de The Ribeor.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-bold text-white tracking-tighter mb-2">Mantente al tanto.</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Recibe las últimas noticias sobre diseño y tecnología directamente en tu bandeja.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                required
                type="email" 
                placeholder="Tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50 active:scale-[0.98] uppercase text-[11px] tracking-widest"
              >
                {status === 'loading' ? 'Suscribiendo...' : 'Suscribirme'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Hubo un error. Inténtalo de nuevo.</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}