export default function CardSkeleton() {
  return (
    <div className="w-full max-w-[400px] aspect-[3/4] rounded-[32px] bg-brand-navy/40 border border-white/5 p-6 space-y-4 animate-pulse">
      <div className="w-full h-2/3 rounded-2xl bg-white/5" />
      <div className="space-y-2">
        <div className="h-6 w-1/2 bg-white/10 rounded-lg" />
        <div className="h-4 w-3/4 bg-white/5 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-brand-teal/20 rounded-full" />
        <div className="h-8 w-20 bg-brand-orange/20 rounded-full" />
      </div>
    </div>
  );
}