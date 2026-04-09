import { Package, Inbox } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

interface DashboardCardsProps {
  categoryCounts: Record<string, number>;
  totalProducts: number;
  pendingRequests: number;
}

export function DashboardCards({ categoryCounts, totalProducts, pendingRequests }: DashboardCardsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 card-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Total Products</span>
          </div>
          <p className="text-3xl font-bold text-text-primary mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 card-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center">
              <Inbox className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">Pending Requests</span>
          </div>
          <p className="text-3xl font-bold text-text-primary mt-2">{pendingRequests}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Products by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="bg-white rounded-xl border border-[#e5e5e5] p-4">
              <p className="text-text-muted text-xs mb-1">{cat.label}</p>
              <p className="text-xl font-bold text-text-primary">{categoryCounts[cat.slug] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
