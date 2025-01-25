'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}