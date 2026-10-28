import React, { useState } from 'react';
import { 
  IconBell, IconAlertTriangle, IconShieldExclamation, IconCircleCheck, 
  IconInfoCircle, IconExternalLink, IconX, IconUserCheck, IconVolumeOff, 
  IconEye, IconBrandWhatsapp, IconMapPin 
} from '@tabler/icons-react';

export default function AlertCenter({ alerts, onAcknowledgeAlert }) {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const getAlertBadge = (type) => {
    switch (type) {
      case 'critical':
        return <span className="badge badge-danger"><IconShieldExclamation size={14} /> Critical</span>;
      case 'warning':
        return <span className="badge badge-warning"><IconAlertTriangle size={14} /> Warning</span>;
      default:
        return <span className="badge badge-info"><IconInfoCircle size={14} /> Info</span>;
    }
  };

  return (
    <div className="alert-center-card card">
      {/* Header */}
      <div className="alert-header">
        <div className="alert-title-row">
          <div className="alert-icon-wrap">
            <IconBell size={18} className="text-rose-600" />
          </div>
          <div>
            <h3 className="alert-title">Behavioral Alert Feed</h3>
            <p className="alert-desc">Real-time CCTV computer vision anomaly notifications</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({alerts.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'critical' ? 'active-critical' : ''}`}
            onClick={() => setFilter('critical')}
          >
            Critical
          </button>
          <button 
            className={`filter-btn ${filter === 'warning' ? 'active-warning' : ''}`}
            onClick={() => setFilter('warning')}
          >
            Warning
          </button>
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="alert-list">
        {filteredAlerts.length === 0 ? (
          <div className="empty-state">
            <IconCircleCheck size={32} className="text-emerald-500" />
            <p>No abnormal behavior detected in this shed.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`alert-item ${alert.acknowledged ? 'acknowledged' : ''} type-${alert.type}`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="alert-item-top">
                <div className="badge-and-channel">
                  {getAlertBadge(alert.type)}
                  {alert.type === 'critical' && (
                    <span className="channel-tag whatsapp">
                      <IconBrandWhatsapp size={12} />
                      <span>WhatsApp Dispatched</span>
                    </span>
                  )}
                </div>
                <span className="alert-time">{alert.time}</span>
              </div>

              <h4 className="alert-item-title">{alert.title}</h4>
              <p className="alert-item-zone">
                <IconMapPin size={13} className="text-slate-400" />
                <span>{alert.zone} • {alert.shed}</span>
              </p>

              <div className="alert-item-footer">
                <span className="alert-meta">Confidence: <strong>{alert.confidence}</strong></span>
                <span className="alert-meta">Birds: <strong>{alert.birdsAffected} affected</strong></span>
                <button className="inspect-link">
                  <span>Inspect Snapshot</span>
                  <IconExternalLink size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Snapshot Inspection Modal / Mobile Bottom-Sheet Drawer */}
      {selectedAlert && (
        <div className="alert-modal-backdrop" onClick={() => setSelectedAlert(null)}>
          <div className="alert-sheet-card card" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle-bar">
              <div className="sheet-handle"></div>
            </div>

            <div className="alert-sheet-header">
              <div className="alert-sheet-title-wrap">
                {getAlertBadge(selectedAlert.type)}
                <h3 className="alert-sheet-title">{selectedAlert.title}</h3>
              </div>
              <button 
                type="button"
                className="alert-sheet-close-btn touch-target" 
                onClick={() => setSelectedAlert(null)}
                aria-label="Close"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="alert-sheet-body">
              {/* Snapshot Image Container */}
              <div className="snapshot-box">
                <div className="snapshot-bg">
                  <div className="sim-snapshot-graphic">
                    <div className="sim-cluster-circle"></div>
                    <div className="sim-bounding-box">
                      <span className="sim-box-tag">
                        {selectedAlert.type.toUpperCase()}: {selectedAlert.title}
                      </span>
                    </div>
                  </div>
                  {/* CCTV Live Camera Overlay */}
                  <div className="cctv-overlay-bar">
                    <span className="cctv-rec-dot"></span>
                    <span className="cctv-meta">CAM-01 [Brooder West] • 1080p 30fps</span>
                    <span className="cctv-time">{selectedAlert.time}</span>
                  </div>
                </div>
                <div className="snapshot-hud">
                  <span>ID: #SNAP-{selectedAlert.id}</span>
                  <span>CONFIDENCE: <strong>{selectedAlert.confidence || '94.2%'}</strong></span>
                  <span className="hud-channel flex-inline items-center gap-1">
                    <IconBrandWhatsapp size={13} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                    WhatsApp Sync Ready
                  </span>
                </div>
              </div>

              {/* Anomaly Data Breakdown */}
              <div className="data-grid">
                <div className="data-item">
                  <span className="data-label">Location / Zone</span>
                  <span className="data-value">{selectedAlert.zone}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Shed Unit</span>
                  <span className="data-value">{selectedAlert.shed}</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Time & Status</span>
                  <span className="data-value">{selectedAlert.time} ({selectedAlert.acknowledged ? 'Resolved' : 'Active'})</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Flock Impact</span>
                  <span className="data-value text-rose-600 font-bold">{selectedAlert.birdsAffected || '45+'} birds affected</span>
                </div>
              </div>

              {/* WhatsApp Automated Dispatch Status Card */}
              <div className="wa-dispatch-preview-card">
                <div className="wa-card-header">
                  <div className="wa-badge-icon">
                    <IconBrandWhatsapp size={16} />
                  </div>
                  <div>
                    <span className="wa-card-title">Automated WhatsApp Broadcast Delivered</span>
                    <span className="wa-card-sub">Sent automatically to registered farm manager & attendant devices</span>
                  </div>
                </div>
                <div className="wa-snippet-body">
                  <code>
                    🚨 <strong>POULTRYVISION ALERT [{selectedAlert.type.toUpperCase()}]</strong><br />
                    📍 <strong>Location:</strong> {selectedAlert.shed} - {selectedAlert.zone}<br />
                    ⚠️ <strong>Anomaly:</strong> {selectedAlert.title} ({selectedAlert.birdsAffected || '45+'} birds)<br />
                    ⏱ <strong>Timestamp:</strong> {selectedAlert.time} | <strong>Confidence:</strong> {selectedAlert.confidence || '94%'}<br />
                    👉 <em>Status: Automated dispatch logged. Immediate pen inspection advised.</em>
                  </code>
                </div>
              </div>
            </div>

            {/* Modal / Drawer Footer Actions */}
            <div className="alert-sheet-footer">
              <button 
                type="button" 
                className="modal-btn-dismiss touch-target"
                onClick={() => setSelectedAlert(null)}
              >
                Close
              </button>

              <button 
                type="button"
                className={`modal-btn-ack touch-target ${selectedAlert.acknowledged ? 'is-ack' : ''}`}
                onClick={() => {
                  onAcknowledgeAlert(selectedAlert.id);
                  setSelectedAlert(null);
                }}
              >
                <IconUserCheck size={16} />
                <span>{selectedAlert.acknowledged ? 'Already Acknowledged' : 'Acknowledge Alert'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .alert-center-card {
          display: flex;
          flex-direction: column;
          max-height: 720px;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .alert-header {
          padding: 16px 18px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #F8FAFC;
        }

        .alert-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .alert-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: #FFE4E6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .alert-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .alert-desc {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .filter-pills {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .filter-btn {
          font-size: 0.74rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          transition: all 0.2s;
          white-space: nowrap;
          cursor: pointer;
        }

        .filter-btn.active {
          background: #0F172A;
          color: white;
          border-color: #0F172A;
        }

        .filter-btn.active-critical {
          background: #DC2626;
          color: white;
          border-color: #DC2626;
        }

        .filter-btn.active-warning {
          background: #D97706;
          color: white;
          border-color: #D97706;
        }

        .alert-list {
          padding: 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .empty-state {
          padding: 36px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.88rem;
        }

        .alert-item {
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background-color: #F8FAFC;
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .alert-item:hover {
          background-color: #F1F5F9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .alert-item.type-critical {
          border-left: 4px solid #DC2626;
        }
        .alert-item.type-warning {
          border-left: 4px solid #F59E0B;
        }
        .alert-item.type-info {
          border-left: 4px solid #3B82F6;
        }

        .alert-item.acknowledged {
          opacity: 0.65;
        }

        .alert-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .badge-and-channel {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .channel-tag.whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #15803D;
          background: #DCFCE7;
          border: 1px solid #BBF7D0;
          padding: 2px 7px;
          border-radius: var(--radius-full);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .badge-danger { background: #FEE2E2; color: #DC2626; }
        .badge-warning { background: #FEF3C7; color: #D97706; }
        .badge-info { background: #E0E7FF; color: #4F46E5; }

        .alert-time {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .alert-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .alert-item-zone {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .alert-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid var(--border-light);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .inspect-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #FB8500;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* Alert Detail Sheet & Modal */
        .alert-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: alertFadeIn 0.2s ease-out;
        }

        @keyframes alertFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .alert-sheet-card {
          width: 100%;
          max-width: 550px;
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          animation: alertScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes alertScaleIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .sheet-handle-bar {
          display: none;
        }

        .alert-sheet-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #FFFFFF;
        }

        .alert-sheet-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .alert-sheet-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .alert-sheet-close-btn {
          background: #F1F5F9;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }
        .alert-sheet-close-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .alert-sheet-body {
          padding: 18px 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .snapshot-box {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-light);
          background: #0F172A;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .snapshot-bg {
          height: 180px;
          background: radial-gradient(circle at 55% 50%, #1E293B 0%, #0F172A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .cctv-overlay-bar {
          position: absolute;
          top: 10px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #F8FAFC;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cctv-rec-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EF4444;
          box-shadow: 0 0 8px #EF4444;
          animation: recPulse 1.2s infinite;
        }

        @keyframes recPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .cctv-meta {
          flex: 1;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .cctv-time {
          color: #94A3B8;
        }

        .sim-snapshot-graphic {
          position: relative;
          width: 170px;
          height: 110px;
          margin-top: 14px;
        }

        .sim-cluster-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, transparent 70%);
          margin: 10px auto;
        }

        .sim-bounding-box {
          position: absolute;
          inset: 0;
          border: 2px dashed #EF4444;
          border-radius: 6px;
          display: flex;
          align-items: flex-start;
          padding: 4px;
        }

        .sim-box-tag {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          font-weight: 700;
          background: #EF4444;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          letter-spacing: 0.02em;
        }

        .snapshot-hud {
          padding: 8px 12px;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #94A3B8;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hud-channel {
          color: #22C55E;
          font-weight: 700;
        }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .data-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: #F8FAFC;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        .data-label {
          font-size: 0.70rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .data-value {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* WhatsApp Dispatch Preview Card */
        .wa-dispatch-preview-card {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wa-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wa-badge-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #22C55E;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wa-card-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #14532D;
          display: block;
        }

        .wa-card-sub {
          font-size: 0.70rem;
          color: #15803D;
          display: block;
        }

        .wa-snippet-body {
          background: #FFFFFF;
          border: 1px solid #DCFCE7;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 0.74rem;
          line-height: 1.45;
          color: #1F2937;
        }

        .wa-snippet-body code {
          font-family: inherit;
        }

        /* Footer Action Buttons */
        .alert-sheet-footer {
          padding: 14px 20px;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          background: #F8FAFC;
        }

        .modal-btn-dismiss {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
          font-weight: 600;
          background: #F1F5F9;
          color: #475569;
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .modal-btn-dismiss:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .modal-btn-ack {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
          font-weight: 700;
          background: #0F172A;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
        }
        .modal-btn-ack:hover {
          background: #1E293B;
        }
        .modal-btn-ack.is-ack {
          background: #E2E8F0;
          color: #64748B;
          cursor: default;
        }

        /* Mobile Bottom-Sheet Drawer */
        @media (max-width: 767px) {
          .alert-modal-backdrop {
            align-items: flex-end;
            padding: 0;
          }

          .alert-sheet-card {
            width: 100%;
            max-width: 100%;
            border-radius: 22px 22px 0 0;
            max-height: 86vh;
            animation: alertDrawerSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes alertDrawerSlideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }

          .sheet-handle-bar {
            display: flex;
            justify-content: center;
            padding-top: 10px;
            padding-bottom: 2px;
          }

          .sheet-handle {
            width: 44px;
            height: 5px;
            background-color: #CBD5E1;
            border-radius: 999px;
          }

          .alert-sheet-header {
            padding: 10px 16px 14px 16px;
          }

          .alert-sheet-title {
            font-size: 0.96rem;
          }

          .alert-sheet-body {
            padding: 14px 16px;
            gap: 12px;
          }

          .snapshot-bg {
            height: 160px;
          }

          .snapshot-hud {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            font-size: 0.68rem;
          }

          .data-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .alert-sheet-footer {
            flex-direction: column;
            gap: 8px;
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px)) 16px;
          }

          .modal-btn-dismiss, .modal-btn-ack {
            width: 100%;
            padding: 12px;
          }
        }

        @media (max-width: 640px) {
          .alert-header {
            padding: 12px 14px;
          }
          .alert-title {
            font-size: 0.95rem;
          }
          .alert-list {
            padding: 10px;
            gap: 8px;
          }
          .alert-item {
            padding: 12px;
          }
          .alert-item-title {
            font-size: 0.88rem;
          }
        }

        @media (max-width: 360px) {
          .alert-header {
            padding: 10px 10px;
          }
          .filter-btn {
            padding: 4px 8px;
            font-size: 0.70rem;
          }
          .alert-item {
            padding: 10px;
          }
          .alert-item-title {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
}
