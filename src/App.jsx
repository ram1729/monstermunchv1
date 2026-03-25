import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import MobileGuard from './components/MobileGuard';
import CameraPrompt from './components/CameraPrompt';
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import ScannerScreen from './screens/ScannerScreen';
import GalleryScreen from './screens/GalleryScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ResultScreen from './screens/ResultScreen';
import QuestsScreen from './screens/QuestsScreen';

function App() {
  const [cameraGranted, setCameraGranted] = useState(false);

  return (
    <SessionProvider>
      <MobileGuard>
        <Router basename="/monstermunchv1">
          <div className="app-container">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/onboarding" element={<OnboardingScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/scanner" element={<ScannerScreen />} />
              <Route path="/feed" element={<FeedScreen />} />
              <Route path="/result" element={<ResultScreen />} />
              <Route path="/quests" element={<QuestsScreen />} />
              <Route path="/gallery" element={<GalleryScreen />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
            {!cameraGranted && (
              <CameraPrompt onGranted={() => setCameraGranted(true)} />
            )}
          </div>
        </Router>
      </MobileGuard>
    </SessionProvider>
  );
}

export default App;
