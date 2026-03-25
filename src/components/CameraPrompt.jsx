import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CameraPrompt = ({ onGranted }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Show popup immediately on mount
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      // Stop stream immediately, we just want to check permission/trigger prompt
      stream.getTracks().forEach(track => track.stop());
      setShow(false);
      onGranted();
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('We need camera access to recognize food for your Monster Buddy!');
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'end',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)'
        }}>
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              width: '100%',
              padding: '32px 24px 48px',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--accent-purple-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Camera size={40} color="var(--accent-purple)" />
            </div>
            
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Camera Access</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.1rem' }}>
              To identify food and grow your Buddy, we need to use your camera.
            </p>

            {error && (
              <p style={{ color: '#ff4444', marginBottom: '20px', fontWeight: 600 }}>
                {error}
              </p>
            )}

            <button 
              className="btn-primary" 
              onClick={requestPermission}
              style={{ width: '100%', marginBottom: '16px' }}
            >
              Allow Access 🚀
            </button>
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-muted)', 
                fontWeight: 600,
                padding: '10px'
              }}
              onClick={() => setShow(false)}
            >
              Maybe Later
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CameraPrompt;
