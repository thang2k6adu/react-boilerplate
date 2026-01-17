import React from 'react';
import CollapsibleSidebar from '@/layout/CollapsibleSidebar';
import { Header } from '@/layout/Header.tsx';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <aside className="bg-slate-900 text-white flex items-center justify-center">
        <CollapsibleSidebar />
      </aside>

      <main className="relative flex-1 flex flex-col bg-slate-50">
        <Header />
        <section className="grid grid-cols-12 flex-1 overflow-auto p-8 gap-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
