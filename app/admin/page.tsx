"use client";
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado completo para coincidir con tu objeto Post
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Design', // Valor por defecto
    imageUrl: '',
    description: '',
    content: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'posts'), {
        ...form,
        // Generamos la fecha automáticamente para que siempre tenga el formato correcto
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      });
      alert("¡Post publicado con éxito!");
      setForm({ title: '', slug: '', category: 'Design', imageUrl: '', description: '', content: '' });
    } catch (error) {
      console.error(error);
      alert("Error al publicar. Revisa las reglas de Firebase.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tighter text-center">Admin access</h2>
          <input type="email" placeholder="Email" className="w-full bg-black border border-white/10 p-3 rounded-xl mb-4 text-white outline-none focus:border-blue-500" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full bg-black border border-white/10 p-3 rounded-xl mb-6 text-white outline-none focus:border-blue-500" onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">Editor de Contenido</h1>
            <p className="text-gray-500 text-sm mt-2">Publicando como: {user.email}</p>
          </div>
          <button onClick={() => signOut(auth)} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors border border-white/10">
            Cerrar Sesión
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna Izquierda: Detalles */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Título del Post</label>
              <input className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" placeholder="Ej: El futuro del minimalismo" onChange={e => setForm({...form, title: e.target.value})} value={form.title} required />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Slug (URL)</label>
              <input className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" placeholder="ej-el-futuro-del-minimalismo" onChange={e => setForm({...form, slug: e.target.value})} value={form.slug} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Categoría</label>
                <select className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" onChange={e => setForm({...form, category: e.target.value})} value={form.category}>
                  <option value="Design">Design</option>
                  <option value="Tech">Tech</option>
                  <option value="Insights">Insights</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Imagen (URL)</label>
                <input className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500" placeholder="https://unsplash..." onChange={e => setForm({...form, imageUrl: e.target.value})} value={form.imageUrl} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Descripción Corta</label>
              <textarea className="w-full bg-[#111] border border-white/10 p-4 rounded-2xl h-32 outline-none focus:border-blue-500" placeholder="Una breve introducción para la tarjeta..." onChange={e => setForm({...form, description: e.target.value})} value={form.description} required />
            </div>
          </div>

          {/* Columna Derecha: Contenido Largo */}
          <div className="space-y-6">
            <div className="space-y-2 h-full flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Cuerpo del Artículo</label>
              <textarea className="flex-1 w-full bg-[#111] border border-white/10 p-6 rounded-2xl outline-none focus:border-blue-500 min-h-[400px] font-mono text-sm" placeholder="Escribe aquí tu historia..." onChange={e => setForm({...form, content: e.target.value})} value={form.content} required />
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 py-5 rounded-[2rem] font-bold text-xl transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
            >
              {loading ? 'Publicando...' : 'Publicar en The Ribeor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}