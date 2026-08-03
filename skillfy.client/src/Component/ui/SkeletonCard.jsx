export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-3 w-8" />
          <div className="skeleton h-3 w-24" />
        </div>
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  );
}
