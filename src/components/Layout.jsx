import React from 'react';
import BottomNav from './BottomNav';

const Layout = ({ children, hideNav = false }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      maxWidth: '500px', // Mobile constraint even when emulated
      margin: '0 auto',
      position: 'relative',
      background: 'var(--bg-app)',
      paddingBottom: hideNav ? '0' : '80px',
      overflowX: 'hidden'
    }}>
      <main style={{ width: '100%', height: '100%' }}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default Layout;
