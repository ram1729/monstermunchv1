import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Key, Rocket, Shield } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  return (
    <Layout hideNav>
      <div style={{ 
        padding: '16px 20px', 
        textAlign: 'center', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Hero Image Area */}
        <div style={{ marginBottom: '32px' }}>
           <div style={{
             width: '240px',
             height: '240px',
             background: '#fff',
             borderRadius: '32px',
             margin: '0 auto',
             boxShadow: 'var(--shadow-card)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             position: 'relative'
           }}>
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sparky" alt="Monster" style={{ width: '80%' }} />
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'var(--accent-purple)',
                borderRadius: '50%',
                opacity: 0.1
              }} />
           </div>
        </div>

        <h1 className="monster-buddy-title" style={{ fontSize: '3rem', marginBottom: '8px' }}>Monster Buddy</h1>
        <p style={{ 
          fontSize: '0.9rem', 
          fontWeight: 800, 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '40px'
        }}>Welcome back, explorer!</p>

        {/* Login Form */}
        <div className="glass-panel" style={{ padding: '32px 24px', marginBottom: '40px' }}>
           <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '12px' }}>
                 <User size={18} /> Monster Name
              </label>
              <input 
                type="text" 
                placeholder="Sparky, Bubbles..." 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '100px',
                  border: 'none',
                  background: '#fff',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                  fontFamily: 'inherit'
                }}
              />
           </div>

           <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '12px' }}>
                 <Key size={18} /> Secret Code
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '100px',
                  border: 'none',
                  background: '#fff',
                  fontSize: '1rem',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                  fontFamily: 'inherit'
                }}
              />
           </div>

           <button 
             className="btn-primary" 
             style={{ width: '100%', padding: '20px' }}
             onClick={() => navigate('/onboarding')}
           >
              Let's Play! <Rocket size={24} style={{ marginLeft: '8px' }} />
           </button>
        </div>

        {/* Footer Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
           <button style={{ 
             background: 'rgba(138, 63, 252, 0.08)', 
             border: 'none', 
             padding: '12px 24px', 
             borderRadius: '100px',
             color: 'var(--accent-purple)',
             fontWeight: 700,
             display: 'flex',
             alignItems: 'center',
             gap: '8px'
           }}>
              <Shield size={18} /> Parent Login
           </button>
           
           <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
             Don't have a buddy yet? <span style={{ color: 'var(--primary-dark)', fontWeight: 700, textDecoration: 'underline' }}>Adopt one here!</span>
           </p>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomeScreen;
