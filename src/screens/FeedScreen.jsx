import React from 'react';
import Layout from '../components/Layout';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import { Leaf, Dumbbell, Trash2, ArrowUpCircle, X } from 'lucide-react';

const FeedScreen = () => {
  const { monster, feedMonster } = useSession();
  const navigate = useNavigate();

  const handleFeed = () => {
    // Simulate feeding the current displayed item
    const food = { name: 'Fresh Apple', carbs: 25, proteins: 0.5, fats: 0.3, fiber: 'high' };
    feedMonster(food);
    navigate('/result', { state: { food } });
  };

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
           <h2 className="monster-buddy-title" style={{ fontSize: '1.4rem' }}>Monster Buddy</h2>
           <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'var(--primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Leaf size={18} color="var(--primary-lime)" />
          </div>
        </header>

        {/* Current Feed Item Card */}
        <section className="glass-panel" style={{ padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
           <div style={{ 
             width: '180px', 
             height: '180px', 
             background: 'linear-gradient(45deg, #E8F5E9, #F1F8E9)', 
             borderRadius: '24px', 
             margin: '0 auto 24px',
             position: 'relative',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
              <span style={{ fontSize: '5rem' }}>🍎</span>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                background: 'var(--primary-dark)',
                color: 'var(--primary-lime)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 800,
                fontSize: '0.75rem',
                border: '2px solid var(--primary-lime)'
              }}>YUM! FRESH APPLE</div>
           </div>
           
           <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Barnaby is hungry!</h1>
           <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>That apple looks like a great snack!</p>

           {/* Nutrient Cards */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <NutrientCard 
                icon={<Leaf size={20} />} 
                value={`${Math.round(monster.stats.carbs * 100)}g`} 
                label="ENERGY CARBS" 
                progress={monster.evolutionProgress} 
                goal="Daily Goal" 
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <NutrientCardMini 
                   icon={<Leaf size={18} />} 
                   value={`${monster.stats.fats.toFixed(1)}g`} 
                   label="HEALTHY FATS" 
                   color="#B2FF59" 
                 />
                 <NutrientCardMini 
                   icon={<Dumbbell size={18} />} 
                   value={`${monster.stats.proteins.toFixed(1)}g`} 
                   label="PROTEINS" 
                   color="#E1BEE7" 
                 />
              </div>
           </div>
        </section>

        {/* Alert Section */}
        <section className="glass-panel" style={{ 
          padding: '20px', 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center',
          background: 'rgba(235, 241, 243, 0.4)',
          marginBottom: '32px'
        }}>
           <div style={{ 
             width: '64px', 
             height: '64px', 
             borderRadius: '50%', 
             background: '#fff', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             flexShrink: 0
           }}>
              <Trash2 size={24} color="#90A4AE" />
           </div>
           <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Junk Food Alert</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Soda and candy make Barnaby sleepy. Stick to the fruit!</p>
           </div>
        </section>

        {/* Action Button */}
        <button 
          className="btn-primary" 
          style={{ width: '100%', padding: '24px', fontSize: '1.5rem', marginBottom: '20px' }}
          onClick={handleFeed}
        >
           Feed Now!
        </button>
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
           <ArrowUpCircle size={20} color="var(--primary-dark)" />
           <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Barnaby's mood will improve by 15%</p>
        </div>
      </div>
    </Layout>
  );
};

const NutrientCard = ({ icon, value, label, progress, goal }) => (
  <div style={{ 
    background: '#fff', 
    borderRadius: '24px', 
    padding: '20px', 
    boxShadow: 'var(--shadow-soft)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-orange)' }}>
          {icon}
       </div>
       <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '1.4rem' }}>{value}</h2>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>{label}</p>
       </div>
    </div>
    <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
          <span style={{ fontWeight: 600 }}>{goal}</span>
          <span style={{ fontWeight: 800, color: 'var(--accent-orange)' }}>{progress}%</span>
       </div>
       <div style={{ height: '8px', background: '#E0E7E9', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent-orange)', borderRadius: '10px' }} />
       </div>
    </div>
  </div>
);

const NutrientCardMini = ({ icon, value, label, color }) => (
  <div style={{ 
    borderRadius: '24px', 
    padding: '24px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  }}>
     <div style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{icon}</div>
     <h2 style={{ fontSize: '1.2rem' }}>{value}</h2>
     <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)' }}>{label}</p>
     <div style={{ 
       position: 'absolute', 
       top: 0, left: 0, 
       width: '100%', height: '100%', 
       background: color, 
       opacity: 0.1, 
       borderRadius: '24px', 
       zIndex: -1 
     }} />
  </div>
);

export default FeedScreen;
