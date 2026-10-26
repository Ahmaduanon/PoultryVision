import React from 'react';
import { 
  IconActivity, IconFlame, IconSoup, IconUsers, 
  IconTrendingUp, IconTrendingDown 
} from '@tabler/icons-react';

export default function TelemetryCards({ activeShed }) {
  const cards = [
    {
      id: 'activity',
      title: 'Flock Activity Index',
      value: '84%',
      change: '+3.2%',
      isPositive: true,
      status: 'Normal Movement',
      badgeClass: 'badge-lime',
      icon: IconActivity,
      iconColor: 'text-lime-700',
      iconBg: 'bg-lime-50',
      subtext: 'Optimal spatial velocity (1.2 m/s average)'
    },
    {
      id: 'huddling',
      title: 'Huddling Risk Score',
      value: '12%',
      change: '-4.1%',
      isPositive: true,
      status: 'Low Stress',
      badgeClass: 'badge-lime',
      icon: IconFlame,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      subtext: 'Uniform dispersion across heating brooders'
    },
    {
      id: 'feeder',
      title: 'Feeder Line Access',
      value: '68%',
      change: '+1.5%',
      isPositive: true,
      status: 'Optimal Intake',
      badgeClass: 'badge-lime',
      icon: IconSoup,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      subtext: '42 birds currently in ROI Feeder Zone'
    },
    {
      id: 'density',
      title: 'Active Pen Density',
      value: '4,200',
      unit: 'birds',
      change: '8.4 / m²',
      isPositive: true,
      status: 'Within Threshold',
      badgeClass: 'badge-neutral',
      icon: IconUsers,
      iconColor: 'text-slate-700',
      iconBg: 'bg-slate-100',
      subtext: 'Total floor area: 500 m² (Shed 01)'
    }
  ];

  return (
    <div className="telemetry-grid">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div key={card.id} className="telemetry-card card">
            {/* Desktop Layout View */}
            <div className="desktop-card-view">
              <div className="card-top">
                <div className={`icon-box ${card.iconBg}`}>
                  <IconComponent size={20} className={card.iconColor} />
                </div>
                <span className={`status-badge ${card.badgeClass}`}>
                  <span className="dot"></span>
                  <span>{card.status}</span>
                </span>
              </div>

              <div className="card-middle">
                <span className="card-title">{card.title}</span>
                <div className="value-row">
                  <span className="card-value">{card.value}</span>
                  {card.unit && <span className="card-unit">{card.unit}</span>}
                  <span className={`change-pill ${card.isPositive ? 'positive' : 'negative'}`}>
                    {card.isPositive ? <IconTrendingUp size={13} /> : <IconTrendingDown size={13} />}
                    <span>{card.change}</span>
                  </span>
                </div>
              </div>

              <div className="card-bottom">
                <span className="subtext">{card.subtext}</span>
              </div>
            </div>

            {/* Mobile Slim Horizontal List View (< 768px) */}
            <div className="mobile-slim-view">
              <div className="slim-left">
                <div className={`icon-box slim-icon ${card.iconBg}`}>
                  <IconComponent size={18} className={card.iconColor} />
                </div>
                <div className="slim-meta">
                  <span className="slim-title">{card.title}</span>
                  <span className="slim-status">
                    <span className={`status-indicator-dot ${card.isPositive ? 'dot-green' : 'dot-amber'}`} />
                    <span>{card.status}</span>
                  </span>
                </div>
              </div>

              <div className="slim-right">
                <div className="slim-val-row">
                  <span className="slim-value">{card.value}</span>
                  {card.unit && <span className="slim-unit">{card.unit}</span>}
                </div>
                <span className={`change-pill slim-trend ${card.isPositive ? 'positive' : 'negative'}`}>
                  {card.isPositive ? <IconTrendingUp size={11} /> : <IconTrendingDown size={11} />}
                  <span>{card.change}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        /* Global Desktop Grid */
        .telemetry-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          width: 100%;
        }

        .telemetry-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }

        .telemetry-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
        }

        .desktop-card-view {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 18px 20px;
        }

        .mobile-slim-view {
          display: none;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .status-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .badge-lime {
          background: #ECFCCB;
          color: #3F6212;
          border: 1px solid #D9F99D;
        }
        .badge-lime .dot { background: #65A30D; }

        .badge-neutral {
          background: #F1F5F9;
          color: #475569;
          border: 1px solid #E2E8F0;
        }
        .badge-neutral .dot { background: #94A3B8; }

        .card-middle {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .value-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }

        .card-value {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0F172A;
          line-height: 1;
        }

        .card-unit {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .change-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: var(--radius-sm);
        }

        .change-pill.positive {
          background: #ECFDF5;
          color: #059669;
        }

        .change-pill.negative {
          background: #FEF2F2;
          color: #DC2626;
        }

        .card-bottom {
          padding-top: 10px;
          border-top: 1px solid var(--border-light);
        }

        .subtext {
          font-size: 0.76rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Mobile Slim Horizontal List View (< 768px) */
        @media (max-width: 767px) {
          .telemetry-grid {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .desktop-card-view {
            display: none !important;
          }

          .mobile-slim-view {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            width: 100%;
            box-sizing: border-box;
            gap: 12px;
          }

          .slim-left {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
            flex: 1;
          }

          .slim-icon {
            width: 34px !important;
            height: 34px !important;
            border-radius: 9px !important;
            flex-shrink: 0;
          }

          .slim-meta {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }

          .slim-title {
            font-size: 0.78rem;
            font-weight: 700;
            color: #1E293B;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
          }

          .slim-status {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.68rem;
            color: #64748B;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .status-indicator-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            flex-shrink: 0;
          }
          .dot-green { background: #10B981; }
          .dot-amber { background: #F59E0B; }

          .slim-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 2px;
            flex-shrink: 0;
          }

          .slim-val-row {
            display: flex;
            align-items: baseline;
            gap: 3px;
          }

          .slim-value {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0F172A;
            line-height: 1.1;
            font-family: var(--font-mono);
          }

          .slim-unit {
            font-size: 0.68rem;
            color: #64748B;
            font-weight: 600;
          }

          .slim-trend {
            font-size: 0.65rem !important;
            padding: 1px 5px !important;
            border-radius: 4px !important;
          }
        }

        @media (max-width: 360px) {
          .mobile-slim-view {
            padding: 8px 10px;
            gap: 8px;
          }
          .slim-title {
            font-size: 0.74rem;
          }
          .slim-value {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </div>
  );
}
