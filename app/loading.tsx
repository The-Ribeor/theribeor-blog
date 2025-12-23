import PostSkeleton from "@/components/blog/PostSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Skeleton del post destacado */}
        <div className="mb-16 h-[400px] w-full bg-white/5 rounded-[2.5rem] animate-pulse" />
        
        {/* Grid de skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostSkeleton key={i} />
          ))} {/* <-- Aquí faltaba cerrar correctamente el paréntesis del .map */}
        </div>
      </div>
    </main>
  );
}