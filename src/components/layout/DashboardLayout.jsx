import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans antialiased text-[#111111] overflow-x-hidden">
      <Sidebar
        isMobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onOpenMobileMenu={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 px-4 sm:px-8 pb-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
