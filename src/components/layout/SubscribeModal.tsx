"use client";
import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/subscriberService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await subscribeToNewsletter(email);
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  return (
    // Contenedor principal: Ocupa toda la pantalla, fondo oscuro y centra el contenido
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay (el fondo oscuro que bloquea el resto de la web) */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Caja del Modal (Relativa para estar encima del overlay) */}
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={60} className="text-blue-500 mx-auto" />
            <h3 className="text-2xl font-bold text-white tracking-tight">¡Te has suscrito!</h3>
            <p className="text-gray-400">Pronto recibirás nuestras mejores historias.</p>
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
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 active:scale-[0.98]"
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