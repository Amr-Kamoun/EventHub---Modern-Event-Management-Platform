import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './FooterComponent';

function Layout() {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
