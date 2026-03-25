import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Scan, Utensils, Image } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '80px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100
    }}>
      <NavTab to="/home" icon={<Home size={24} />} label="Home" />
      <NavTab to="/scanner" icon={<Scan size={24} />} label="Scanner" isCenter />
      <NavTab to="/feed" icon={<Utensils size={24} />} label="Feed" />
      <NavTab to="/gallery" icon={<Image size={24} />} label="Gallery" />
    </nav>
  );
};

const NavTab = ({ to, icon, label, isCenter }) => {
  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        gap: '4px',
        color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)',
        transition: 'all 0.2s',
        marginBottom: isCenter ? '12px' : '0'
      })}
    >
      {isCenter ? (
        <div style={{
          background: 'var(--primary-lime)',
          padding: '12px',
          borderRadius: '16px',
          boxShadow: '0 8px 16px var(--primary-lime-glow)',
          color: 'var(--primary-dark)',
          marginBottom: '4px'
        }}>
          {icon}
        </div>
      ) : (
        icon
      )}
      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
    </NavLink>
  );
};

export default BottomNav;
