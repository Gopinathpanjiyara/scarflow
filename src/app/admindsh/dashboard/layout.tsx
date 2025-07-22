"use client";

import { useRouter } from "next/navigation";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  
  // Initialize session timeout
  useSessionTimeout();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admindsh');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Session timeout warning */}
      <div className="fixed bottom-4 right-4">
        <div className="text-sm text-gray-500">
          Session will timeout after 3 minutes of inactivity
        </div>
      </div>
    </div>
  );
} 