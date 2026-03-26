import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { RefreshCw, Zap, Search, Loader } from 'lucide-react';
import { matchLabelToFood, createGenericFood } from '../data/foodDatabase';
import { loadModel, classifyImage } from '../utils/classifier';
import { useSession } from '../context/SessionContext';

const ScannerScreen = () => {
  const navigate = useNavigate();
  const { feedMonster } = useSession();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [modelStatus, setModelStatus] = useState('Loading AI...');
  const [modelReady, setModelReady] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setModelStatus('Camera access denied');
    }
  };

  useEffect(() => {
    startCamera();
    
    // Pre-load the AI model
    loadModel((status) => setModelStatus(status))
      .then(() => {
        setModelReady(true);
        setModelStatus('Ready to scan!');
      })
      .catch(() => setModelStatus('Model failed to load'));

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleScan = async () => {
    if (!videoRef.current || !modelReady) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      // Classify the current video frame
      const predictions = await classifyImage(videoRef.current);
      
      if (predictions && predictions.length > 0) {
        // Try to match the top predictions to our food database
        let matchedFood = null;
        let matchedPrediction = null;
        
        for (const pred of predictions) {
          matchedFood = matchLabelToFood(pred.label);
          if (matchedFood) {
            matchedPrediction = pred;
            break;
          }
        }

        if (matchedFood) {
          // Found a known food!
          setScanResult({
            food: matchedFood,
            prediction: matchedPrediction,
            allPredictions: predictions
          });
        } else {
          // No food match — show what was detected and create generic entry
          const topPred = predictions[0];
          const genericFood = createGenericFood(topPred.label);
          setScanResult({
            food: genericFood,
            prediction: topPred,
            allPredictions: predictions,
            isGeneric: true
          });
        }
      }
    } catch (err) {
      console.error('Classification error:', err);
      setModelStatus('Classification failed — try again');
    } finally {
      setIsScanning(false);
    }
  };

  const handleFeed = () => {
    if (scanResult?.food) {
      feedMonster(scanResult.food);
      navigate('/result', { state: { food: scanResult.food } });
    }
  };

  return (
    <Layout>
      <div style={{ position: 'relative', height: 'calc(100vh - 80px)', background: '#000' }}>
        {/* Camera View */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />

        {/* Overlay UI */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '24px', pointerEvents: 'none'
        }}>
           {/* Header */}
           <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%', color: '#fff' }}>
                 <Zap size={24} />
              </div>
              <div style={{ 
                background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: '20px',
                color: modelReady ? 'var(--primary-lime)' : '#FFD700', fontSize: '0.8rem', fontWeight: 700
              }}>
                {modelStatus}
              </div>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%', color: '#fff', cursor: 'pointer' }}
                   onClick={startCamera}>
                 <RefreshCw size={24} />
              </div>
           </header>

           {/* Scanning Frame */}
           <div style={{ 
             width: '280px', height: '280px', 
             border: `3px solid ${isScanning ? '#FFD700' : 'var(--primary-lime)'}`, 
             borderRadius: '32px', margin: '0 auto', position: 'relative',
             boxShadow: '0 0 0 1000px rgba(0,0,0,0.4)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             transition: 'border-color 0.3s'
           }}>
              {isScanning && (
                <div style={{
                  position: 'absolute', width: '100%', height: '3px',
                  background: 'var(--primary-lime)', top: '10%',
                  boxShadow: '0 0 20px var(--primary-lime), 0 0 40px var(--primary-lime)',
                  animation: 'scan-anim 1.5s infinite ease-in-out'
                }} />
              )}
              {/* Corner Markers */}
              <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '40px', height: '40px', borderTop: '4px solid var(--primary-lime)', borderLeft: '4px solid var(--primary-lime)', borderTopLeftRadius: '20px' }} />
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '40px', height: '40px', borderTop: '4px solid var(--primary-lime)', borderRight: '4px solid var(--primary-lime)', borderTopRightRadius: '20px' }} />
              <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '40px', height: '40px', borderBottom: '4px solid var(--primary-lime)', borderLeft: '4px solid var(--primary-lime)', borderBottomLeftRadius: '20px' }} />
              <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', borderBottom: '4px solid var(--primary-lime)', borderRight: '4px solid var(--primary-lime)', borderBottomRightRadius: '20px' }} />
              
              {/* Loading indicator */}
              {isScanning && (
                <Loader size={48} color="var(--primary-lime)" style={{ animation: 'spin 1s linear infinite' }} />
              )}
           </div>

           {/* Footer */}
           <footer style={{ pointerEvents: 'auto', textAlign: 'center' }}>
              {/* Scan Result */}
              {scanResult && !isScanning && (
                <div style={{ 
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                  borderRadius: '24px', padding: '20px', marginBottom: '12px', textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                        {scanResult.isGeneric ? '🔍' : '✅'} {scanResult.food.name}
                      </h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {scanResult.prediction.confidence}% confidence
                        {scanResult.isGeneric && ' • Not in food database'}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.7rem', background: 'var(--primary-lime)', padding: '4px 10px', borderRadius: '12px', fontWeight: 800 }}>
                      {scanResult.food.calories} cal
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <NutrientPill label="Carbs" value={`${scanResult.food.carbs}g`} />
                    <NutrientPill label="Protein" value={`${scanResult.food.proteins}g`} />
                    <NutrientPill label="Fat" value={`${scanResult.food.fats}g`} />
                  </div>
                  <button className="btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleFeed}>
                    Feed to Buddy! 🍽️
                  </button>
                  
                  {/* Show all predictions for transparency */}
                  <details style={{ marginTop: '12px' }}>
                    <summary style={{ fontSize: '0.7rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      All detections ({scanResult.allPredictions.length})
                    </summary>
                    <div style={{ marginTop: '8px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {scanResult.allPredictions.map((p, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                          {p.label}: {p.confidence}%
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}

              {/* Scan Button */}
              {!scanResult && (
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
                  borderRadius: '32px', padding: '24px', marginBottom: '12px'
                }}>
                   <p style={{ fontWeight: 600, marginBottom: '16px' }}>Point camera at a food item</p>
                   <button 
                     className="btn-primary" 
                     onClick={handleScan}
                     disabled={isScanning || !modelReady}
                     style={{ width: '100%', opacity: modelReady ? 1 : 0.5 }}
                   >
                     {isScanning ? 'Analyzing...' : modelReady ? 'Identify Food 📸' : 'Loading AI...'}
                   </button>
                </div>
              )}

              {/* Re-scan or manual entry */}
              {scanResult && (
                <button 
                  onClick={() => setScanResult(null)}
                  style={{ 
                    background: 'rgba(255,255,255,0.9)', border: 'none', padding: '12px 24px',
                    borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', width: '100%', marginBottom: '8px'
                  }}
                >
                  Scan Again 🔄
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#fff', marginTop: '8px' }}>
                 <Search size={18} />
                 <span style={{ fontWeight: 600, textDecoration: 'underline' }}>Enter manually</span>
              </div>
           </footer>
        </div>
      </div>
      <style>{`
        @keyframes scan-anim {
          0% { top: 10%; }
          50% { top: 85%; }
          100% { top: 10%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

const NutrientPill = ({ label, value }) => (
  <div style={{ 
    flex: 1, background: '#F0F4F6', borderRadius: '12px', padding: '8px',
    textAlign: 'center', fontSize: '0.75rem'
  }}>
    <div style={{ fontWeight: 800 }}>{value}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{label}</div>
  </div>
);

export default ScannerScreen;
