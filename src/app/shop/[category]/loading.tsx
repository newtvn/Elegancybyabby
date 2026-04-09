import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="pt-28 pb-12 text-center">
        <div className="skeleton-shimmer h-4 w-16 mx-auto mb-3 rounded" />
        <div className="skeleton-shimmer h-10 w-48 mx-auto mb-3 rounded" />
        <div className="skeleton-shimmer h-4 w-64 mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
