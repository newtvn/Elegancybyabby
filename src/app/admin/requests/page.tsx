"use client";

import { useEffect, useState } from "react";
import { SpecialRequest } from "@/types";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { getDemoRequests, isSupabaseConfigured } from "@/lib/demo-store";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<SpecialRequest[]>([]);

  useEffect(() => {
    async function loadRequests() {
      if (isSupabaseConfigured()) {
        try {
          const { createClient } = await import("@/lib/supabase/client");
          const supabase = createClient();
          const { data } = await supabase.from("special_requests").select("*").order("created_at", { ascending: false });
          setRequests((data as SpecialRequest[]) || []);
          return;
        } catch {
          // Fall through to demo
        }
      }

      setRequests(getDemoRequests());
    }

    loadRequests();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl text-text-primary mb-6">Special Requests</h1>
      <RequestsTable requests={requests} />
    </div>
  );
}
