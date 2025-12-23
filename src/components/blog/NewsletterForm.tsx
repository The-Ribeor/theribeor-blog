"use client";
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/subscriberService';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-4 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 size={40} className="text-blue-500 mb-2" />
        <p className="text-white font-bold tracking-tight">¡Bienvenido a la bitácora!</p>
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
          className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-black font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50"
        >
          {status === 'loading' ? 'Enviando...' : 'Suscribirse'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-[10px] mt-2 text-left ml-4">Hubo un error. Intenta de nuevo.</p>
      )}
    </div>
  );
}