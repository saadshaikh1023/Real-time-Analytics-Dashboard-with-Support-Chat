'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Header } from './Header';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};