import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { CheckCircle2, Trophy, ArrowRight, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const food = location.state?.food;

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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
           <div style={{ 
             width: '120px', 
             height: '120px', 
             background: 'var(--primary-lime)', 
             borderRadius: '50%', 
             margin: '0 auto 32px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             boxShadow: '0 0 30px var(--primary-lime-glow)'
           }}>
              <CheckCircle2 size={64} color="var(--primary-dark)" />
           </div>

           <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Delicious!</h1>
           {food && (
             <p style={{ 
               fontSize: '1rem', 
               fontWeight: 700, 
               color: 'var(--primary-dark)', 
               marginBottom: '8px',
               background: 'rgba(157, 255, 56, 0.15)',
               padding: '8px 16px',
               borderRadius: '100px',
               display: 'inline-block'
             }}>
               🍽️ {food.name}
             </p>
           )}
           <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
              Your Buddy loved that snack!
           </p>

           {/* Nutrient Breakdown */}
           {food && (
             <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
               <h3 style={{ marginBottom: '16px', textAlign: 'left' }}>Nutrients Added</h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                 <NutrientBubble label="Carbs" value={`${food.carbs}g`} color="var(--accent-orange)" />
                 <NutrientBubble label="Protein" value={`${food.proteins}g`} color="#E1BEE7" />
                 <NutrientBubble label="Fats" value={`${food.fats}g`} color="#B2FF59" />
               </div>
             </div>
           )}

           {/* Rewards */}
           <div className="glass-panel" style={{ padding: '24px', marginBottom: '40px', textAlign: 'left' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Trophy size={20} color="#FFD700" /> Rewards Earned
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <RewardItem icon={<Heart fill="#FF5252" color="#FF5252" size={20} />} label="Happiness" value="+15%" />
                 <RewardItem icon={<Zap color="var(--primary-dark)" size={20} />} label="Energy" value={food ? `+${Math.round((food.carbs + food.proteins * 2) * 2)} EP` : '+250 EP'} />
                 <RewardItem icon={<ArrowRight color="#5AC8FF" size={20} />} label="Evolution" value={food?.fiber === 'high' ? '+8%' : '+4%'} />
              </div>
           </div>

           <button 
             className="btn-primary" 
             style={{ width: '100%', padding: '20px' }}
             onClick={() => navigate('/home')}
           >
              Back to Dashboard 🏠
           </button>
        </motion.div>
      </div>
    </Layout>
  );
};

const NutrientBubble = ({ label, value, color }) => (
  <div style={{ 
    background: color, 
    opacity: 0.9,
    borderRadius: '20px', 
    padding: '16px 8px',
    textAlign: 'center'
  }}>
    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{value}</h3>
    <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>{label}</p>
  </div>
);

const RewardItem = ({ icon, label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <span style={{ fontWeight: 600 }}>{label}</span>
     </div>
     <span style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>{value}</span>
  </div>
);

export default ResultScreen;
