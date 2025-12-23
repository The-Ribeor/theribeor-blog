import Image from 'next/image';

export default function AuthorBox() {
  return (
    <div className="mt-16 py-8 border-t border-white/5 flex items-center gap-5">
      {/* Imagen más pequeña y sutil */}
      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-inner">
        <Image 
          src="https://avatars.githubusercontent.com/u/166042870?v=4" 
          alt="Diego Berrio"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-0.5">
          Curado por
        </span>
        <h4 className="text-lg font-bold text-white tracking-tight leading-none">
          Diego Berrio
        </h4>
        <a 
          href="https://www.linkedin.com/in/diegoberrio1601/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-gray-500 hover:text-blue-500 transition-colors mt-1 flex items-center gap-1"
        >
          <span>@diegoberrio1601</span>
          {/* Un puntito decorativo o flecha sutil si quieres */}
          <span className="text-[10px]">↗</span>
        </a>
      </div>
    </div>
  );
}