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

      {/* Snapshot Inspection Modal */}
      {selectedAlert && (
        <div className="modal-backdrop" onClick={() => setSelectedAlert(null)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle-bar">
              <div className="sheet-handle"></div>
            </div>

            <div className="modal-header">
              <div className="modal-title-wrap">
                {getAlertBadge(selectedAlert.type)}
                <h3 className="modal-title">{selectedAlert.title}</h3>
              </div>
              <button className="close-btn touch-target" onClick={() => setSelectedAlert(null)}>
                <IconX size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Snapshot Image Container */}
              <div className="snapshot-box">
                <div className="snapshot-bg">
                  <div className="sim-snapshot-graphic">
                    <div className="sim-cluster-circle"></div>
                    <div className="sim-bounding-box">
                      <span className="sim-box-tag">ALERT: Huddling Cluster ({selectedAlert.birdsAffected} birds)</span>
                    </div>
                  </div>
                </div>
                <div className="snapshot-hud">
                  <span>SNAPSHOT ID: #SNAP-{selectedAlert.id}</span>
                  <span>CONFIDENCE: {selectedAlert.confidence}</span>
                  <span className="hud-channel flex-inline items-center gap-1">
                    <IconBrandWhatsapp size={13} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                    WhatsApp Alert Sent
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
                  <span className="data-label">Time & Duration</span>
                  <span className="data-value">{selectedAlert.time} (8 mins detected)</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Est. Stress Risk</span>
                  <span className="data-value text-rose-600 font-bold">Cold Stress Cluster</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-footer">
              <button 
                className="modal-btn btn-secondary touch-target"
                onClick={() => setSelectedAlert(null)}
              >
                <IconVolumeOff size={16} />
                <span>Mute 1hr</span>
              </button>

              <button 
                className="modal-btn btn-primary touch-target"
                onClick={() => {
                  onAcknowledgeAlert(selectedAlert.id);
                  setSelectedAlert(null);
                }}
              >
                <IconUserCheck size={16} />
                <span>Acknowledge & Dispatch</span>
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

        /* Snapshot Modal */
        .modal-content {
          width: 100%;
          max-width: 540px;
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .modal-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .snapshot-box {
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-light);
          background: #0F172A;
        }

        .snapshot-bg {
          height: 200px;
          background: radial-gradient(circle at 60% 50%, #1E293B 0%, #0F172A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sim-snapshot-graphic {
          position: relative;
          width: 160px;
          height: 120px;
        }

        .sim-cluster-circle {
          width: 100px;
          height: 100px;
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
          font-size: 0.68rem;
          font-weight: 700;
          background: #EF4444;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
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
        }

        .hud-channel {
          color: #4ADE80;
          font-weight: 700;
        }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
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
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .data-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-footer {
          padding: 14px 20px;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-secondary {
          background: #F1F5F9;
          color: #475569;
          border: 1px solid var(--border-light);
        }

        .btn-primary {
          background: #0F172A;
          color: white;
          border: none;
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
          .modal-content {
            width: 94%;
            max-height: 88vh;
            border-radius: 16px;
            overflow-y: auto;
          }
          .modal-body {
            padding: 14px;
            gap: 12px;
          }
          .data-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .snapshot-hud {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            font-size: 0.68rem;
          }
          .modal-footer {
            flex-direction: column;
            gap: 8px;
            padding: 12px 14px;
          }
          .modal-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
