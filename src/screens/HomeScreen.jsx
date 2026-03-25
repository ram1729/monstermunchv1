import React from 'react';
import { useSession } from '../context/SessionContext';
import Layout from '../components/Layout';
import { Star, ChevronRight, Info } from 'lucide-react';

const HomeScreen = () => {
  const { monster } = useSession();

  return (
    <Layout>
      <div style={{ padding: '16px 20px' }}>
        {/* Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ 
               width: '40px', 
               height: '40px', 
               borderRadius: '50%', 
               background: '#2D4B4B',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               overflow: 'hidden'
             }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=monster" alt="Avatar" style={{ width: '80%' }} />
             </div>
             <h2 className="monster-buddy-title" style={{ fontSize: '1.4rem' }}>Monster Buddy</h2>
          </div>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'var(--primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Star size={18} color="var(--primary-lime)" fill="var(--primary-lime)" />
          </div>
        </header>

        {/* Active Buddy Card */}
        <section className="glass-panel" style={{ 
          padding: '24px', 
          marginBottom: '32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span style={{ 
            background: 'var(--accent-purple)', 
            color: '#fff', 
            padding: '4px 12px', 
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px'
          }}>Active Buddy</span>
          
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>{monster.type}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Currently Level {monster.level}. Your buddy is feeling energetic after that morning snack!
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600 }}>Evolution Progress</span>
              <span style={{ fontWeight: 700 }}>{monster.evolutionProgress}%</span>
            </div>
            <div style={{ 
              height: '14px', 
              background: '#E0E7E9', 
              borderRadius: '20px', 
              overflow: 'visible',
              position: 'relative'
            }}>
              <div style={{ 
                height: '100%', 
                width: `${monster.evolutionProgress}%`, 
                background: 'linear-gradient(90deg, #5AC8FF, var(--primary-lime))', 
                borderRadius: '20px',
                position: 'relative'
              }}>
                 <div style={{
                   position: 'absolute',
                   right: '-6px',
                   top: '-3px',
                   width: '20px',
                   height: '20px',
                   background: '#fff',
                   border: '2px solid var(--primary-lime)',
                   borderRadius: '50%',
                   boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                 }} />
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Only 350 more snack points to reach Giant Forest Guardian!
          </p>
        </section>

        {/* Monster Gallery Preview */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Monster Gallery</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
               <button style={{ border: 'none', background: '#E0E7E9', padding: '8px', borderRadius: '50%' }}><Info size={16} /></button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
             <MonsterThumb type="Fiery Berry" level="8" status="Scout" color="#FF9F5A" />
             <MonsterThumb type="Broccoli Beast" level="12" status="Active" color="var(--primary-lime)" active />
             <MonsterThumb type="Drip Drop" level="5" status="Floater" color="#5AC8FF" />
             <MonsterThumb type="Sparky" level="3" status="Zapper" color="#FFD1B0" />
          </div>
        </section>

        {/* Evolution Path */}
        <section className="glass-panel" style={{ padding: '24px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Evolution Path</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>The journey of {monster.type}</p>
            
            <button className="btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '12px', background: '#2D5A06', color: '#fff', boxShadow: 'none' }}>
               View Lore Book
            </button>
        </section>
      </div>
    </Layout>
  );
};

const MonsterThumb = ({ type, level, status, color, active }) => (
  <div className="glass-panel" style={{ 
    padding: '16px', 
    textAlign: 'center',
    border: active ? `2px solid var(--primary-lime)` : '1px solid rgba(0,0,0,0.05)',
    background: active ? 'rgba(157, 255, 56, 0.05)' : 'var(--bg-card)'
  }}>
    <div style={{ 
      width: '80px', 
      height: '80px', 
      background: active ? 'var(--primary-lime)' : '#F0F4F6',
      borderRadius: '16px',
      margin: '0 auto 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
       <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${type}`} alt={type} style={{ width: '60%' }} />
       {active && <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: 'var(--primary-lime)', borderRadius: '50%', border: '2px solid #fff' }} />}
    </div>
    <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{type}</h3>
    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lv. {level} {status}</p>
  </div>
);

export default HomeScreen;
