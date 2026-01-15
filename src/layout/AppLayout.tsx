import React from 'react';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <aside className="bg-slate-900 text-white flex items-center justify-center">
        <CollapsibleSidebar />
      </aside>

      <main className="flex-1 bg-slate-100 p-4 overflow-auto">{children}</main>
    </div>
  );
};
