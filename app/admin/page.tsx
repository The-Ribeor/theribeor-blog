"use client";
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown'; // 👈 Importante para la vista previa

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'edit' | 'preview'>('edit'); // Toggle para móviles
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Design',
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
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', day: 'numeric', year: 'numeric' 
        })
      });
      alert("¡Post publicado con éxito!");
      setForm({ title: '', slug: '', category: 'Design', imageUrl: '', description: '', content: '' });
    } catch (error) {
      alert("Error al publicar.");
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
    <div className="min-h-screen bg-black text-white pt-20 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Editor de Contenido</h1>
            <p className="text-gray-500 text-sm italic">Escribe en Markdown para dar vida a tus historias.</p>
          </div>
          <button onClick={() => signOut(auth)} className="text-gray-500 hover:text-red-500 text-xs uppercase tracking-widest transition-colors">
            Cerrar Sesión
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Fila de Datos Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="md:col-span-2 bg-[#111] border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="Título del Post" onChange={e => setForm({...form, title: e.target.value})} value={form.title} required />
            <input className="bg-[#111] border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="URL-slug" onChange={e => setForm({...form, slug: e.target.value})} value={form.slug} required />
            <select className="bg-[#111] border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm" onChange={e => setForm({...form, category: e.target.value})} value={form.category}>
              <option value="Design">Design</option>
              <option value="Tech">Tech</option>
              <option value="Insights">Insights</option>
            </select>
          </div>

          {/* URL de Imagen y Descripción */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="bg-[#111] border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="URL de la imagen de portada" onChange={e => setForm({...form, imageUrl: e.target.value})} value={form.imageUrl} required />
            <input className="md:col-span-2 bg-[#111] border border-white/5 p-4 rounded-xl outline-none focus:border-blue-500 text-sm" placeholder="Descripción corta para la tarjeta..." onChange={e => setForm({...form, description: e.target.value})} value={form.description} required />
          </div>

          {/* EDITOR SPLIT (ESCRITURA + PREVIEW) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-3xl overflow-hidden min-h-[600px]">
            {/* Lado Escritura */}
            <div className="bg-[#080808] p-6 border-r border-white/10">
              <div className="flex justify-between mb-4">
                <label className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Markdown Editor</label>
              </div>
              <textarea 
                className="w-full h-[500px] bg-transparent outline-none resize-none font-mono text-sm leading-relaxed text-gray-300"
                placeholder="# Escribe tu historia aquí..."
                onChange={e => setForm({...form, content: e.target.value})} 
                value={form.content} 
                required 
              />
            </div>

            {/* Lado Vista Previa (Markdown Real) */}
            <div className="bg-black p-8 overflow-y-auto max-h-[600px]">
              <label className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-6 block">Vista Previa en Vivo</label>
              <div className="prose prose-invert prose-blue max-w-none">
                <ReactMarkdown>
                  {form.content || "*La previsualización aparecerá aquí...*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-bold text-lg transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Publicando...' : 'Lanzar publicación'}
          </button>
        </form>
      </div>
    </div>
  );
}