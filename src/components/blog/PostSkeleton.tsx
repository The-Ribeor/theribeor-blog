const PostSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Imagen falsa */}
      <div className="aspect-[4/3] bg-white/5 rounded-[2rem]" />
      {/* Metadatos falsos */}
      <div className="flex gap-3">
        <div className="h-3 w-16 bg-white/5 rounded" />
        <div className="h-3 w-16 bg-white/5 rounded" />
      </div>
      {/* Título falso */}
      <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
      {/* Descripción falsa */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-5/6 bg-white/5 rounded" />
      </div>
    </div>
  );
};

export default PostSkeleton;