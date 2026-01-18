import React from 'react';
import CollapsibleSidebar from '@/layout/CollapsibleSidebar';
import { Header } from '@/layout/Header.tsx';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <CollapsibleSidebar />

      <main className="relative flex-1 flex flex-col">
        <Header user={{ name: 'Tran Duc Thang', role: 'Admin' }} />
        <section className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-auto p-8 gap-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
