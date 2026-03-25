import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronRight, Smile, Calendar, Ruler, Weight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 8,
    height: 130,
    weight: 32
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/home');
  };

  return (
    <Layout hideNav>
      <div style={{ padding: '20px' }}>
        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
           <div style={{ flex: 1, height: '10px', background: '#E0E7E9', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(step / 3) * 100}%` }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary-dark), var(--primary-lime))' }} 
              />
           </div>
           <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Step {step} of 3</span>
        </div>

        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', lineHeight: 1.1 }}>Let's build your</h1>
          <h1 className="monster-buddy-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Buddy</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
            Tell us about yourself so your monster knows how to grow with you!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
             <InputGroup 
               icon={<Smile size={20} color="var(--primary-dark)" />} 
               label="Your Name" 
               placeholder="e.g. Monster Master"
               value={formData.name}
               onChange={(val) => setFormData({...formData, name: val})}
             />
             
             <InputGroup 
               icon={<Calendar size={20} color="var(--accent-purple)" />} 
               label="How Old Are You?" 
               sublabel="Your monster years"
               type="number"
               value={formData.age}
               onChange={(val) => setFormData({...formData, age: val})}
             />

             <InputGroup 
               icon={<Ruler size={20} color="#D84315" />} 
               label="How Tall?" 
               sublabel="In monster units (cm)"
               type="number"
               value={formData.height}
               onChange={(val) => setFormData({...formData, height: val})}
             />

             <InputGroup 
               icon={<Weight size={20} color="#2E7D32" />} 
               label="How Heavy?" 
               sublabel="Weight in kilograms"
               type="number"
               value={formData.weight}
               onChange={(val) => setFormData({...formData, weight: val})}
             />
          </div>

          <button className="btn-primary" style={{ width: '100%', padding: '24px' }} onClick={nextStep}>
             Next Step <ArrowRight size={24} style={{ marginLeft: '8px' }} />
          </button>

          <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
             You can change these details later in Settings
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

const InputGroup = ({ icon, label, sublabel, placeholder, type = 'text', value, onChange }) => (
  <div className="glass-panel" style={{ 
    padding: '24px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px',
    background: '#fff'
  }}>
    <div style={{ 
      width: '48px', 
      height: '48px', 
      borderRadius: '16px', 
      background: 'rgba(0,0,0,0.03)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
       {icon}
    </div>
    <div style={{ flex: 1 }}>
       <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</label>
       {sublabel && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sublabel}</p>}
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: type === 'number' ? '80px' : '150px',
        background: '#E0E7E9',
        border: 'none',
        padding: '12px 16px',
        borderRadius: '100px',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '1rem',
        fontFamily: 'inherit'
      }}
    />
  </div>
);

export default OnboardingScreen;
