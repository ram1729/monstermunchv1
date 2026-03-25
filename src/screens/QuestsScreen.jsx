import React from 'react';
import Layout from '../components/Layout';
import { Target, CheckCircle2, Clock, Zap } from 'lucide-react';

const QuestsScreen = () => {
  const quests = [
    { id: 1, title: 'Fiber Finder', desc: 'Scan 2 high-fiber items', progress: 1, total: 2, xp: 100, done: false },
    { id: 2, title: 'Fruit Feast', desc: 'Feed Barnaby 3 fruits', progress: 3, total: 3, xp: 250, done: true },
    { id: 3, title: 'Energy Boost', desc: 'Reach 800 EP', progress: 650, total: 800, xp: 50, done: false },
  ];

  return (
    <Layout>
      <div style={{ padding: '16px 20px' }}>
        <header style={{ marginBottom: '32px' }}>
           <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Active Quests</h1>
           <p style={{ color: 'var(--text-muted)' }}>Complete goals to earn XP and evolve your Buddy!</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
           {quests.map(q => (
             <div key={q.id} className="glass-panel" style={{ 
               padding: '24px', 
               background: q.done ? 'rgba(157, 255, 56, 0.1)' : 'var(--bg-card)',
               border: q.done ? '2px solid var(--primary-lime)' : '1px solid rgba(0,0,0,0.05)'
             }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                   <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{q.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{q.desc}</p>
                   </div>
                   {q.done ? (
                     <CheckCircle2 size={24} color="var(--primary-dark)" />
                   ) : (
                     <div style={{ background: 'var(--accent-purple-light)', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)' }}>
                        +{q.xp} XP
                     </div>
                   )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ flex: 1, height: '8px', background: '#E0E7E9', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(q.progress / q.total) * 100}%`, background: q.done ? 'var(--primary-dark)' : 'var(--accent-purple)', borderRadius: '10px' }} />
                   </div>
                   <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{q.progress}/{q.total}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Daily Bonus Card */}
        <section className="glass-panel" style={{ 
          padding: '24px', 
          background: 'linear-gradient(135deg, var(--primary-dark), #1A3304)',
          color: '#fff',
          textAlign: 'center'
        }}>
           <Zap size={32} color="var(--primary-lime)" strokeWidth={3} style={{ marginBottom: '16px' }} />
           <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#fff' }}>Daily Streak!</h2>
           <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '24px' }}>Log in 3 more days to unlock the "Super Green" badge.</p>
           
           <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {[1, 1, 1, 0, 0, 0, 0].map((s, i) => (
                <div key={i} style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: s ? 'var(--primary-lime)' : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                   {s && <CheckCircle2 size={16} color="var(--primary-dark)" />}
                </div>
              ))}
           </div>
        </section>
      </div>
    </Layout>
  );
};

export default QuestsScreen;
