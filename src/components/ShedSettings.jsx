import React, { useState } from 'react';
import { 
  IconAdjustments, IconDeviceFloppy, IconCpu, 
  IconBell, IconDeviceMobile, IconBrandWhatsapp 
} from '@tabler/icons-react';

export default function ShedSettings({ activeShed }) {
  const [huddlingSens, setHuddlingSens] = useState(75);
  const [activityDrop, setActivityDrop] = useState(25);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div className="settings-card card">
      <div className="settings-header">
        <div className="title-group">
          <div className="icon-wrap">
            <IconAdjustments size={18} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="settings-title">AI Anomaly & Detection Calibration</h3>
            <p className="settings-subtitle">Configure CV threshold triggers & notification dispatch channels</p>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          <IconDeviceFloppy size={16} />
          <span>{savedStatus ? 'Configuration Saved!' : 'Save Parameters'}</span>
        </button>
      </div>

      <div className="settings-body">
        {/* CV Model Sensitivity Section */}
        <div className="setting-section">
          <h4 className="section-title"><IconCpu size={16} className="text-emerald-600" /> Computer Vision Inference Thresholds</h4>
          
          <div className="control-row">
            <div className="control-info">
              <label className="control-label">Huddling Cluster Sensitivity</label>
              <p className="control-desc">Controls spatial cluster density scoring before flagging cold stress</p>
            </div>
            <div className="slider-wrap">
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={huddlingSens}
                onChange={(e) => setHuddlingSens(e.target.value)}
                className="custom-slider"
              />
              <span className="slider-value">{huddlingSens}%</span>
            </div>
          </div>

          <div className="control-row">
            <div className="control-info">
              <label className="control-label">Inactivity / Lethargy Trigger</label>
              <p className="control-desc">Trigger alert if average spatial movement drops below target for &gt; 10 mins</p>
            </div>
            <div className="slider-wrap">
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={activityDrop}
                onChange={(e) => setActivityDrop(e.target.value)}
                className="custom-slider"
              />
              <span className="slider-value">{activityDrop}%</span>
            </div>
          </div>
        </div>

        {/* Alert Dispatch Gateway */}
        <div className="setting-section">
          <h4 className="section-title"><IconBell size={16} className="text-rose-600" /> Alert Dispatch & Mobile Notifications</h4>
          
          <div className="toggle-row">
            <div className="control-info">
              <label className="control-label"><IconDeviceMobile size={16} className="text-slate-600" /> Mobile Push Notifications (FCM)</label>
              <p className="control-desc">Deliver instant high-priority alerts to farm staff smartphones</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={pushEnabled} 
                onChange={(e) => setPushEnabled(e.target.checked)} 
              />
              <span className="switch-slider"></span>
            </label>
          </div>

          <div className="toggle-row">
            <div className="control-info">
              <label className="control-label"><IconBrandWhatsapp size={16} className="text-emerald-600" /> Emergency SMS / WhatsApp Broadcast</label>
              <p className="control-desc">Dispatch SMS & WhatsApp alert for critical stampedes or heating failure</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={smsEnabled} 
                onChange={(e) => setSmsEnabled(e.target.checked)} 
              />
              <span className="switch-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <style>{`
        .settings-card {
          display: flex;
          flex-direction: column;
        }

        .settings-header {
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .settings-title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .settings-subtitle {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .save-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          background: var(--color-primary);
          color: white;
          transition: background 0.2s;
        }
        .save-btn:hover { background: var(--color-primary-hover); }

        .settings-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .setting-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 8px;
        }

        .control-row, .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .control-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .control-label {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .control-desc {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .slider-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: min(100%, 200px);
          flex: 1;
        }

        .custom-slider {
          flex: 1;
          accent-color: var(--color-primary);
        }

        .slider-value {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.84rem;
          color: var(--color-primary);
          min-width: 40px;
          text-align: right;
        }

        /* Custom Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #CBD5E1;
          transition: .3s;
          border-radius: 24px;
        }

        .switch-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }

        input:checked + .switch-slider {
          background-color: var(--color-primary);
        }

        input:checked + .switch-slider:before {
          transform: translateX(20px);
        }

        @media (max-width: 640px) {
          .settings-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 14px 12px;
          }
          .save-btn {
            width: 100%;
            justify-content: center;
          }
          .settings-body {
            padding: 14px 10px;
            gap: 18px;
          }
          .control-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .slider-wrap {
            min-width: 0;
            width: 100%;
          }
          .toggle-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
