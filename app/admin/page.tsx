"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect /admin to /admin/dashboard
    router.replace("/admin/dashboard");
  }, [router]);
  
  return null;
}
