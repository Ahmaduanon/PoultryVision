import React, { useState } from 'react';
import { 
  IconAdjustments, IconDeviceFloppy, IconCpu, 
  IconBell, IconDeviceMobile, IconBrandWhatsapp,
  IconSend, IconCheck, IconLoader2, IconExternalLink, IconPhoneCall,
  IconAlertTriangle, IconInfoCircle
} from '@tabler/icons-react';
import { sendWhatsAppAlert, generateDirectWhatsAppLink } from '../services/whatsapp.js';

export default function ShedSettings({ activeShed }) {
  const [huddlingSens, setHuddlingSens] = useState(75);
  const [activityDrop, setActivityDrop] = useState(25);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('+234 803 456 7890');
  const [savedStatus, setSavedStatus] = useState(false);
  const [testAlertState, setTestAlertState] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [apiResult, setApiResult] = useState(null);

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  const getTestAlertText = () => {
    const shedName = activeShed === 'shed-01' 
      ? 'Shed 01 - Broilers (Oyo Complex)' 
      : activeShed === 'shed-02' 
      ? 'Shed 02 - Layers (Ogun Complex)' 
      : 'Shed 03 - Nursery Chicks (Kaduna)';
      
    return `🚨 *POULTRYVISION SYSTEM TEST ALERT*\n📍 Farm Unit: ${shedName}\n✅ Gateway Status: Connected\n📡 Dispatch Route: Emergency WhatsApp API\n⏱ Timestamp: ${new Date().toLocaleTimeString()}\n\nEmergency notifications for cold-stress clustering, feeder failures, or flock panic will be broadcast directly to this phone.`;
  };

  const handleSendTestAlert = async () => {
    setTestAlertState('sending');
    setApiResult(null);

    const message = getTestAlertText();
    const result = await sendWhatsAppAlert({
      to: whatsappNumber,
      message,
      shedName: activeShed === 'shed-01' ? 'Shed 01 - Broilers' : 'Shed 02 - Layers',
    });

    setApiResult(result);
    setTestAlertState('sent');
  };

  const waFallbackUrl = generateDirectWhatsAppLink(whatsappNumber, getTestAlertText());

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
              <label className="control-label"><IconBrandWhatsapp size={16} className="text-emerald-600" /> Emergency WhatsApp Broadcast</label>
              <p className="control-desc">Dispatch instant WhatsApp alerts for critical stampedes, huddling clusters, or brooder failure</p>
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

          {/* WhatsApp Recipient & Test Dispatch Module */}
          {smsEnabled && (
            <div className="wa-recipient-box">
              <div className="wa-box-header">
                <div className="wa-box-title">
                  <IconPhoneCall size={16} className="text-emerald-600" />
                  <span>WhatsApp Alert Recipient & Live Diagnostic Test</span>
                </div>
                <span className="wa-status-badge">Gateway Connected</span>
              </div>

              <div className="wa-form-row">
                <div className="wa-input-wrap">
                  <label className="wa-field-label">Target WhatsApp Number (Farm Manager / Vet)</label>
                  <div className="phone-input-field">
                    <span className="country-flag">🇳🇬</span>
                    <input 
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="wa-tel-input"
                    />
                  </div>
                  <span className="wa-helper-text">
                    Enter the WhatsApp phone number that should receive critical real-time alerts.
                  </span>
                </div>

                <div className="wa-btn-wrap">
                  <button 
                    type="button" 
                    className="test-alert-btn touch-target"
                    onClick={handleSendTestAlert}
                    disabled={testAlertState === 'sending' || !whatsappNumber.trim()}
                  >
                    {testAlertState === 'sending' ? (
                      <>
                        <IconLoader2 size={16} className="animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <IconSend size={16} />
                        <span>Send Test Alert</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Test Alert Result Toast / Card */}
              {testAlertState === 'sent' && apiResult && (
                <div className={`test-alert-success-card fade-in ${apiResult.success ? 'status-ok' : apiResult.mode === 'missing_credentials' ? 'status-info' : 'status-warn'}`}>
                  <div className="test-card-top">
                    <div className="test-card-title-group">
                      <div className={`success-icon-badge ${apiResult.success ? 'bg-emerald-600' : apiResult.mode === 'missing_credentials' ? 'bg-amber-600' : 'bg-rose-600'}`}>
                        {apiResult.success ? (
                          <IconCheck size={16} />
                        ) : apiResult.mode === 'missing_credentials' ? (
                          <IconInfoCircle size={16} />
                        ) : (
                          <IconAlertTriangle size={16} />
                        )}
                      </div>
                      <div>
                        <span className="test-heading">
                          {apiResult.success
                            ? 'Live Alert Sent via Meta Cloud API'
                            : apiResult.mode === 'missing_credentials'
                            ? 'Meta Cloud API Credentials Needed in .env'
                            : 'Meta WhatsApp API Dispatch Error'}
                        </span>
                        <span className="test-sub">
                          {apiResult.success
                            ? `Delivered to ${whatsappNumber} • Message ID: ${apiResult.messageId}`
                            : apiResult.mode === 'missing_credentials'
                            ? 'To send silently in the background, set VITE_META_WA_ACCESS_TOKEN in .env'
                            : apiResult.error}
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      className="test-dismiss-btn"
                      onClick={() => setTestAlertState('idle')}
                    >
                      Dismiss
                    </button>
                  </div>

                  {apiResult.mode === 'missing_credentials' && (
                    <div className="env-guide-box">
                      <span className="guide-title">Required Environment Variables:</span>
                      <code>
                        VITE_META_WA_PHONE_NUMBER_ID=your_meta_phone_number_id<br />
                        VITE_META_WA_ACCESS_TOKEN=your_system_user_access_token<br />
                        VITE_META_WA_TEMPLATE_NAME=poultry_alert (optional)
                      </code>
                    </div>
                  )}

                  <div className="test-payload-preview">
                    <code>
                      {getTestAlertText()}
                    </code>
                  </div>

                  <div className="test-actions-bar">
                    <a 
                      href={apiResult.fallbackUrl || waFallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="open-wa-btn"
                    >
                      <IconBrandWhatsapp size={16} />
                      <span>{apiResult.success ? 'Verify on WhatsApp' : 'Open WhatsApp to Send Directly'}</span>
                      <IconExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
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
          min-width: 200px;
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

        /* WhatsApp Recipient & Test Module */
        .wa-recipient-box {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .wa-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .wa-box-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          color: #14532D;
        }

        .wa-status-badge {
          font-size: 0.70rem;
          font-weight: 700;
          color: #15803D;
          background: #DCFCE7;
          border: 1px solid #86EFAC;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .wa-form-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .wa-input-wrap {
          flex: 1;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .wa-field-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1E293B;
        }

        .phone-input-field {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: var(--radius-md);
          padding: 0 12px;
          height: 42px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          transition: border-color 0.15s;
        }
        .phone-input-field:focus-within {
          border-color: #22C55E;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
        }

        .country-flag {
          font-size: 1.15rem;
          margin-right: 8px;
        }

        .wa-tel-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.88rem;
          font-family: inherit;
          color: #0F172A;
          background: transparent;
        }

        .wa-helper-text {
          font-size: 0.72rem;
          color: #64748B;
        }

        .wa-btn-wrap {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-top: 22px;
        }

        .test-alert-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 42px;
          padding: 0 18px;
          border-radius: var(--radius-md);
          background: #22C55E;
          color: white;
          font-weight: 700;
          font-size: 0.84rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, opacity 0.15s;
        }
        .test-alert-btn:hover:not(:disabled) {
          background: #16A34A;
        }
        .test-alert-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .test-alert-success-card {
          background: #FFFFFF;
          border: 1px solid #86EFAC;
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.1);
        }

        .test-alert-success-card.status-info {
          border-color: #FCD34D;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.1);
        }

        .test-alert-success-card.status-warn {
          border-color: #FCA5A5;
          box-shadow: 0 4px 14px rgba(239, 68, 68, 0.1);
        }

        .test-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .test-card-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .success-icon-badge {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-emerald-600 { background-color: #059669; }
        .bg-amber-600 { background-color: #D97706; }
        .bg-rose-600 { background-color: #E11D48; }

        .env-guide-box {
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 0.74rem;
          color: #92400E;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .guide-title {
          font-weight: 700;
        }

        .env-guide-box code {
          font-family: var(--font-mono);
          font-size: 0.70rem;
          background: rgba(255, 255, 255, 0.7);
          padding: 6px 8px;
          border-radius: 4px;
          display: block;
          white-space: pre-line;
        }

        .test-heading {
          font-size: 0.84rem;
          font-weight: 700;
          color: #14532D;
          display: block;
        }

        .test-sub {
          font-size: 0.72rem;
          color: #15803D;
          display: block;
        }

        .test-dismiss-btn {
          font-size: 0.74rem;
          color: #64748B;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
        }

        .test-payload-preview {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 0.75rem;
          color: #1E293B;
          line-height: 1.5;
        }

        .test-payload-preview code {
          font-family: inherit;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .test-actions-bar {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .open-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #22C55E;
          color: white;
          padding: 9px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s;
        }
        .open-wa-btn:hover {
          background: #16A34A;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 640px) {
          .wa-form-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .wa-btn-wrap {
            padding-top: 0;
          }
          .test-alert-btn {
            width: 100%;
          }
          .open-wa-btn {
            width: 100%;
            justify-content: center;
          }
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
