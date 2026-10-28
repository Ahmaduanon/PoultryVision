import React, { useState } from 'react';
import { IconCamera } from '@tabler/icons-react';
import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';
import DemoIntro from './components/DemoIntro.jsx';
import LiveCVStream from './components/LiveCVStream.jsx';
import TelemetryCards from './components/TelemetryCards.jsx';
import AlertCenter from './components/AlertCenter.jsx';
import BehavioralAnalytics from './components/BehavioralAnalytics.jsx';
import ShedManager from './components/ShedManager.jsx';
import ReportsPage from './components/ReportsPage.jsx';
import ShedSettings from './components/ShedSettings.jsx';
import BottomNav from './components/BottomNav.jsx';
import WaitlistModal from './components/AuthModal.jsx';

export default function App() {
  const [activeShed, setActiveShed] = useState('shed-01');
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'dashboard', 'cameras', 'alerts', 'reports', 'settings', 'demo-intro'
  const [showDemoIntro, setShowDemoIntro] = useState(false);

  // Waitlist State
  const [user] = useState(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Huddling & Cold Stress Cluster Detected',
      shed: 'Shed 01 - Broilers (Oyo Complex)',
      time: '14:02:18',
      zone: 'Brooder Heater Zone 02',
      confidence: '94%',
      birdsAffected: 38,
      acknowledged: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Feeder Line Access Drop (-42%)',
      shed: 'Shed 01 - Broilers (Oyo Complex)',
      time: '13:45:10',
      zone: 'North Feeder Line A',
      confidence: '88%',
      birdsAffected: 16,
      acknowledged: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Diurnal Lighting Cycle Triggered (Light ON)',
      shed: 'Shed 01 - Broilers (Oyo Complex)',
      time: '06:00:00',
      zone: 'Shed-wide Controls',
      confidence: '99%',
      birdsAffected: 4200,
      acknowledged: true,
    }
  ]);

  const handleTriggerAlert = (newAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleAcknowledgeAlert = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className={`app-container ${activeTab === 'landing' || activeTab === 'demo-intro' ? 'on-landing' : ''}`}>
      {/* Top Sticky Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeShed={activeShed}
        setActiveShed={setActiveShed}
        unreadAlertsCount={unreadAlertsCount}
        onOpenAlerts={() => setActiveTab('alerts')}
        user={user}
        onOpenWaitlist={openWaitlist}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeTab === 'landing' && (
          <LandingPage 
            onLaunchDemo={() => {
              setShowDemoIntro(true);
              setActiveTab('demo-intro');
            }} 
            onOpenWaitlist={openWaitlist}
          />
        )}

        {activeTab === 'demo-intro' && (
          <DemoIntro 
            onEnterDashboard={() => { 
              setShowDemoIntro(false); 
              setActiveTab('dashboard'); 
            }}
            onBackToHome={() => {
              setShowDemoIntro(false);
              setActiveTab('landing');
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="dashboard-grid fade-in">
            <div className="main-pane">
              {/* Quick Live CCTV jump banner */}
              <div 
                className="live-preview-banner card cursor-pointer"
                onClick={() => setActiveTab('live-feed')}
                role="button"
                tabIndex={0}
              >
                <div className="banner-left">
                  <div className="live-status-pill">
                    <span className="live-pulse-dot"></span>
                    <span>LIVE STREAM</span>
                  </div>
                  <div className="banner-text">
                    <span className="banner-headline">Real-Time CCTV Stream Active</span>
                    <span className="banner-details">4 Edge Cameras Streaming • YOLOv11 ONNX (FP16) @ 30 FPS</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="banner-action-btn"
                  onClick={(e) => { e.stopPropagation(); setActiveTab('live-feed'); }}
                >
                  <IconCamera size={16} />
                  <span>Watch Live CCTV</span>
                </button>
              </div>

              <TelemetryCards activeShed={activeShed} />
              <BehavioralAnalytics activeShed={activeShed} />
            </div>

            <div className="side-pane">
              <AlertCenter 
                alerts={alerts} 
                onAcknowledgeAlert={handleAcknowledgeAlert} 
              />
            </div>
          </div>
        )}

        {activeTab === 'live-feed' && (
          <div className="single-view-container fade-in">
            <LiveCVStream 
              activeShed={activeShed} 
              onTriggerAlert={handleTriggerAlert} 
            />
          </div>
        )}

        {activeTab === 'cameras' && (
          <div className="single-view-container fade-in">
            <ShedManager activeShed={activeShed} />
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="single-view-container fade-in">
            <AlertCenter 
              alerts={alerts} 
              onAcknowledgeAlert={handleAcknowledgeAlert} 
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="single-view-container fade-in">
            <ReportsPage activeShed={activeShed} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="single-view-container fade-in">
            <BehavioralAnalytics activeShed={activeShed} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="single-view-container fade-in">
            <ShedSettings activeShed={activeShed} />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation — only for dashboard/app views */}
      {activeTab !== 'landing' && activeTab !== 'demo-intro' && (
        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          alertCount={unreadAlertsCount} 
        />
      )}

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-app);
          padding-bottom: 0;
        }

        @media (max-width: 767px) {
          .app-container:not(.on-landing) {
            padding-bottom: calc(var(--bottom-nav-height) + 16px);
          }
        }

        .app-container.on-landing {
          padding-bottom: 0;
        }

        .main-content {
          flex: 1;
        }

        .main-pane {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
          width: 100%;
        }

        .side-pane {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
          width: 100%;
        }

        .single-view-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
        }

        .live-preview-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          color: white;
          border-radius: var(--radius-lg);
          gap: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
        }

        .live-preview-banner:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
        }

        .banner-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #FCA5A5;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          background: #EF4444;
          border-radius: 50%;
          box-shadow: 0 0 6px #EF4444;
          animation: recPulseLive 1.2s infinite;
        }

        @keyframes recPulseLive {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .banner-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .banner-headline {
          font-size: 0.90rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .banner-details {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .banner-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #84CC16;
          color: #0F172A;
          font-size: 0.80rem;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .banner-action-btn:hover {
          background: #A3E635;
        }

        @media (max-width: 640px) {
          .live-preview-banner {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 12px 14px;
          }
          .banner-action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .single-view-container {
            padding: 10px 8px;
          }
        }

        @media (max-width: 360px) {
          .single-view-container {
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
}
