export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="card p-6 animate-pulse h-40" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 h-48 animate-pulse" />
        <div className="card p-6 h-48 animate-pulse" />
      </div>
      <div className="card p-6 h-52 animate-pulse" />
      <div className="card p-6 h-52 animate-pulse" />
    </div>
  );
}

