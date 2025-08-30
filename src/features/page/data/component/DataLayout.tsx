import Navbar from "@/features/components/navbar";
import AppSidebar from "@/features/components/sidebar";
import { ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
