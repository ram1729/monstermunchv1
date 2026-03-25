import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, ArrowDown } from 'lucide-react';

const MobileGuard = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mobileWidth = window.innerWidth <= 768;
      setIsMobile(mobileUA || mobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return (
      <div className="desktop-warning">
        <div className="glass-panel" style={{ padding: '48px 40px', maxWidth: '520px' }}>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '24px',
            lineHeight: 1 
          }}>📱</div>
          <h1 className="monster-buddy-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>Mobile Only Experience</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
            Monster Buddy is designed for mobile devices. Please open this page on your phone or tablet.
          </p>

          <div style={{ 
            background: 'rgba(45, 90, 6, 0.06)', 
            padding: '24px', 
            borderRadius: '20px', 
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <p style={{ fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Monitor size={18} /> Testing on desktop?
            </p>
            <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>Press <strong>F12</strong> to open DevTools</li>
              <li>Click the <strong>Toggle Device Toolbar</strong> icon</li>
              <li>Select a mobile device & refresh</li>
            </ol>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <ArrowDown size={16} />
            <p style={{ fontSize: '0.85rem' }}>Or resize your browser window below 768px wide</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default MobileGuard;
