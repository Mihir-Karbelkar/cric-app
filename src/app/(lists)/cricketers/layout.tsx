import React, { Suspense } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center flex-col ">{children}</div>;
}

export default Layout;
