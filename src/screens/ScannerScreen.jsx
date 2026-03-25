import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Camera, RefreshCw, Zap, Search } from 'lucide-react';
import { getRandomFood } from '../data/foodDatabase';
import { useSession } from '../context/SessionContext';

const ScannerScreen = () => {
  const navigate = useNavigate();
  const { feedMonster } = useSession();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const food = getRandomFood();
      feedMonster(food);
      navigate('/result', { state: { food } });
    }, 2000);
  };

  return (
    <Layout>
      <div style={{ position: 'relative', height: 'calc(100vh - 80px)', background: '#000' }}>
        {/* Camera View */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />

        {/* Overlay UI */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          padding: '24px',
          pointerEvents: 'none'
        }}>
           <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%', color: '#fff' }}>
                 <Zap size={24} />
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Scanner</h2>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%', color: '#fff' }}>
                 <RefreshCw size={24} onClick={startCamera} />
              </div>
           </header>

           {/* Scanning Frame */}
           <div style={{ 
             width: '280px', 
             height: '280px', 
             border: '2px solid var(--primary-lime)', 
             borderRadius: '32px', 
             margin: '0 auto',
             position: 'relative',
             boxShadow: '0 0 0 1000px rgba(0,0,0,0.4)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
              {isScanning && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  background: 'var(--primary-lime)',
                  top: '10%',
                  boxShadow: '0 0 15px var(--primary-lime)',
                  animation: 'scan-anim 2s infinite ease-in-out'
                }} />
              )}
              <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '40px', height: '40px', borderTop: '4px solid var(--primary-lime)', borderLeft: '4px solid var(--primary-lime)', borderTopLeftRadius: '20px' }} />
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '40px', height: '40px', borderTop: '4px solid var(--primary-lime)', borderRight: '4px solid var(--primary-lime)', borderTopRightRadius: '20px' }} />
              <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '40px', height: '40px', borderBottom: '4px solid var(--primary-lime)', borderLeft: '4px solid var(--primary-lime)', borderBottomLeftRadius: '20px' }} />
              <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', borderBottom: '4px solid var(--primary-lime)', borderRight: '4px solid var(--primary-lime)', borderBottomRightRadius: '20px' }} />
           </div>

           <footer style={{ pointerEvents: 'auto', textAlign: 'center' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.9)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '24px',
                marginBottom: '16px'
              }}>
                 <p style={{ fontWeight: 600, marginBottom: '16px' }}>Point camera at food item</p>
                 <button 
                   className="btn-primary" 
                   onClick={handleScan}
                   disabled={isScanning}
                   style={{ width: '100%' }}
                 >
                   {isScanning ? 'Scanning...' : 'Identify Food'}
                 </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#fff' }}>
                 <Search size={18} />
                 <span style={{ fontWeight: 600, textDecoration: 'underline' }}>Enter manually</span>
              </div>
           </footer>
        </div>
      </div>
      <style>{`
        @keyframes scan-anim {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </Layout>
  );
};

export default ScannerScreen;
