import React, { useState } from 'react';
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
              <LiveCVStream 
                activeShed={activeShed} 
                onTriggerAlert={handleTriggerAlert} 
              />
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

        {activeTab === 'cameras' && (
          <ShedManager activeShed={activeShed} />
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
          <ReportsPage activeShed={activeShed} />
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
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-app);
          padding-bottom: 0;
        }

        @media (max-width: 767px) {
          .app-container:not(.on-landing) {
            padding-bottom: calc(var(--bottom-nav-height) + 16px);
            padding-left: max(0px, var(--safe-left));
            padding-right: max(0px, var(--safe-right));
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
          gap: 20px;
        }

        .side-pane {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .single-view-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(12px, 3vw, 24px);
        }

        @media (max-width: 640px) {
          .single-view-container {
            padding: clamp(8px, 2.5vw, 16px);
          }
        }
      `}</style>
    </div>
  );
}
