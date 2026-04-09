"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { SpecialRequest } from "@/types";
import { updateDemoRequestStatus, isSupabaseConfigured } from "@/lib/demo-store";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  reviewed: "bg-blue-50 text-blue-700 border border-blue-200",
  completed: "bg-green-50 text-green-700 border border-green-200",
};

interface RequestsTableProps {
  requests: SpecialRequest[];
}

export function RequestsTable({ requests: initialRequests }: RequestsTableProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const updateStatus = async (id: string, status: SpecialRequest["status"]) => {
    if (id.startsWith("demo-")) {
      updateDemoRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } else if (isSupabaseConfigured()) {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        await supabase.from("special_requests").update({ status }).eq("id", id);
        setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
      } catch {
        alert("Failed to update status.");
      }
    }
  };

  return (
    <div className="space-y-3">
      {requests.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-12 text-center text-text-muted">
          No special requests yet.
        </div>
      )}
      {requests.map((req) => (
        <div key={req.id} className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden card-shadow">
          <button
            onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-bg-secondary transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary">{req.full_name}</p>
              <p className="text-xs text-text-muted truncate">{req.email} &middot; {req.phone}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[req.status]}`}>
              {req.status}
            </span>
            <span className="text-xs text-text-muted">{new Date(req.created_at).toLocaleDateString()}</span>
            {expandedId === req.id ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
          </button>

          {expandedId === req.id && (
            <div className="px-5 pb-5 border-t border-[#f0f0f0] pt-4 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-1">Description</p>
                <p className="text-sm text-text-secondary leading-relaxed">{req.description}</p>
              </div>
              {req.reference_image && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-1">Reference Image</p>
                  <a href={req.reference_image} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-secondary transition-colors underline underline-offset-4">
                    <ImageIcon className="w-4 h-4" /> View Image
                  </a>
                </div>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">Update Status</p>
                <div className="flex gap-2">
                  {(["pending", "reviewed", "completed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(req.id, status)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize cursor-pointer ${
                        req.status === status ? statusColors[status] : "bg-bg-secondary text-text-muted hover:text-text-primary border border-transparent"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
