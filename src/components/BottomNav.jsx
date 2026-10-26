import React from 'react';
import { IconHome, IconCamera, IconBell, IconServer, IconFileAnalytics } from '@tabler/icons-react';

export default function BottomNav({ activeTab, setActiveTab, alertCount }) {
  const tabs = [
    { id: 'landing', label: 'Home', shortLabel: 'Home', icon: IconHome },
    { id: 'dashboard', label: 'Live CCTV', shortLabel: 'Live', icon: IconCamera },
    { id: 'cameras', label: 'Pens', shortLabel: 'Pens', icon: IconServer },
    { id: 'alerts', label: 'Alerts', shortLabel: 'Alerts', icon: IconBell, badge: alertCount },
    { id: 'reports', label: 'Reports', shortLabel: 'Reports', icon: IconFileAnalytics },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                <IconComponent size={20} />
                {tab.badge > 0 && (
                  <span className="nav-badge">{tab.badge}</span>
                )}
              </div>
              <span className="nav-label">
                <span className="label-full">{tab.label}</span>
                <span className="label-short">{tab.shortLabel}</span>
              </span>
            </button>
          );
        })}
      </div>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--bottom-nav-height);
          padding-bottom: var(--safe-bottom);
          box-sizing: border-box;
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-light);
          z-index: 50;
          box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .bottom-nav {
            display: none !important;
          }
        }

        .nav-container {
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 100%;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px 8px;
          min-width: 0;
          flex: 1;
          transition: color 0.2s;
        }

        .label-short {
          display: none;
        }

        @media (max-width: 420px) {
          .label-full {
            display: none !important;
          }
          .label-short {
            display: inline !important;
          }
          .nav-item {
            padding: 4px 2px;
          }
          .nav-label {
            font-size: 0.66rem;
          }
        }

        .nav-item.active {
          color: #0F172A;
          font-weight: 700;
        }

        .nav-item.active .icon-wrapper {
          color: #84CC16;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background: #DC2626;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: var(--radius-full);
          border: 1px solid white;
        }

        .nav-label {
          font-size: 0.72rem;
        }
      `}</style>
    </nav>
  );
}
