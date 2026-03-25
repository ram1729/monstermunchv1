import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { CheckCircle2, Trophy, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultScreen = () => {
  const navigate = useNavigate();

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

           <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Delicious!</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '48px' }}>
              Your Buddy loved that snack. They're feeling stronger and happier!
           </p>

           <div className="glass-panel" style={{ padding: '32px 24px', marginBottom: '48px', textAlign: 'left' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Trophy size={20} color="#FFD700" /> Rewards Earned
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <RewardItem icon={<Heart fill="#FF5252" color="#FF5252" />} label="Happiness" value="+15%" />
                 <RewardItem icon={<Trophy color="var(--primary-dark)" />} label="Energy" value="+250 EP" />
                 <RewardItem icon={<ArrowRight color="#5AC8FF" />} label="Evolution" value="+5%" />
              </div>
           </div>

           <button 
             className="btn-primary" 
             style={{ width: '100%', padding: '24px' }}
             onClick={() => navigate('/home')}
           >
              Back to Dashboard
           </button>
        </motion.div>
      </div>
    </Layout>
  );
};

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
