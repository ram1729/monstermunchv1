import React from 'react';
import Layout from '../components/Layout';
import { useSession } from '../context/SessionContext';
import { Search, ListFilter, Lock, Info } from 'lucide-react';

const GalleryScreen = () => {
  const { monster } = useSession();

  const discoveryCount = 4;
  const totalMonsters = 12;

  const monsters = [
    { id: 1, type: 'Fiery Berry', level: '8', status: 'Scout', active: false },
    { id: 2, type: 'Broccoli Beast', level: '12', status: 'Active', active: true },
    { id: 3, type: 'Drip Drop', level: '5', status: 'Floater', active: false },
    { id: 4, type: 'Sparky', level: '3', status: 'Zapper', active: false },
    { id: 5, type: 'Locked', locked: true, unlockLevel: 15 },
    { id: 6, type: 'Locked', locked: true, unlockLevel: 20 },
    { id: 7, type: 'Locked', locked: true, unlockLevel: 25 },
    { id: 8, type: 'Locked', locked: true, unlockLevel: 30 },
  ];

  return (
    <Layout>
      <div style={{ padding: '16px 20px' }}>
         <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
           <h2 className="monster-buddy-title" style={{ fontSize: '1.4rem' }}>Monster Gallery</h2>
           <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '50%' }}><ListFilter size={20} /></div>
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '50%' }}><Search size={20} /></div>
           </div>
        </header>

        <section style={{ marginBottom: '32px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h1 style={{ fontSize: '1.8rem' }}>Monster Gallery</h1>
              <p style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{discoveryCount} / {totalMonsters} Discovered</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {monsters.map(m => (
                <div key={m.id} className="glass-panel" style={{ 
                  padding: '20px', 
                  textAlign: 'center',
                  border: m.active ? `3px solid var(--primary-lime)` : '2px solid rgba(0,0,0,0.02)',
                  background: m.active ? 'rgba(157, 255, 56, 0.05)' : (m.locked ? 'rgba(0,0,0,0.02)' : 'var(--bg-card)'),
                  opacity: m.locked ? 0.6 : 1
                }}>
                   <div style={{ 
                     width: '90px', 
                     height: '90px', 
                     background: m.active ? 'var(--primary-lime)' : (m.locked ? '#E0E7E9' : '#fff'),
                     borderRadius: '24px',
                     margin: '0 auto 16px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     position: 'relative'
                   }}>
                      {m.locked ? (
                        <Lock size={32} color="#90A4AE" />
                      ) : (
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${m.type}`} alt={m.type} style={{ width: '65%' }} />
                      )}
                      {m.active && <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: 'var(--primary-lime)', borderRadius: '50%', border: '3px solid #fff' }} />}
                   </div>
                   
                   {m.locked ? (
                     <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Unlock at Level {m.unlockLevel}</p>
                   ) : (
                     <>
                       <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{m.type}</h3>
                       <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{m.active ? 'Active' : ''} Lv. {m.level} {m.status}</p>
                     </>
                   )}
                </div>
              ))}
           </div>
        </section>

        {/* Info Card */}
        <section className="glass-panel" style={{ 
          padding: '24px', 
          background: 'rgba(235, 241, 243, 0.4)',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
           <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FFD1B0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Info size={24} color="#D84315" />
           </div>
           <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>Did you know?</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Broccoli Beasts grow stronger when you log high-fiber snacks. They love crunchy greens!</p>
           </div>
        </section>
      </div>
    </Layout>
  );
};

export default GalleryScreen;
