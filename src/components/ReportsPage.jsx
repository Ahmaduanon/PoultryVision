import React, { useState } from 'react';
import { IconFileText, IconDownload, IconCalendar } from '@tabler/icons-react';

export default function ReportsPage({ activeShed }) {
  const [dateRange, setDateRange] = useState('7d');
  const [exportSuccess, setExportSuccess] = useState(false);

  const reportsList = [
    {
      id: 'REP-2026-0916',
      title: 'Daily Flock Behavioral Welfare Report',
      date: '2026-09-16',
      shed: 'Shed 01 - Broilers',
      activityAvg: '82%',
      huddlingAlerts: 1,
      mortalityRisk: 'Low (0.02%)',
      status: 'Generated'
    },
    {
      id: 'REP-2026-0915',
      title: 'Daily Flock Behavioral Welfare Report',
      date: '2026-09-15',
      shed: 'Shed 01 - Broilers',
      activityAvg: '85%',
      huddlingAlerts: 0,
      mortalityRisk: 'Optimal (0.01%)',
      status: 'Generated'
    },
    {
      id: 'REP-2026-0914',
      title: 'Diurnal Lighting & Feeder Line Access Summary',
      date: '2026-09-14',
      shed: 'Shed 01 - Broilers',
      activityAvg: '79%',
      huddlingAlerts: 2,
      mortalityRisk: 'Low (0.03%)',
      status: 'Generated'
    }
  ];

  const handleExport = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  return (
    <div className="reports-container card fade-in">
      <div className="reports-header">
        <div className="title-group">
          <div className="icon-wrap">
            <IconFileText size={20} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="reports-title">Flock Welfare & Anomaly Reports</h2>
            <p className="reports-subtitle">Exportable daily audit logs, spatial behavior trends, and mortality risk index</p>
          </div>
        </div>

        <button className="export-btn touch-target" onClick={handleExport}>
          <IconDownload size={16} />
          <span>{exportSuccess ? 'Report Downloaded!' : 'Export All Reports'}</span>
        </button>
      </div>

      <div className="reports-body">
        {/* Report Filter Bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <IconCalendar size={16} className="text-slate-500" />
            <select 
              value={dateRange} 
              onChange={e => setDateRange(e.target.value)}
              className="filter-select"
            >
              <option value="today">Today (Sept 16, 2026)</option>
              <option value="7d">Last 7 Days Summary</option>
              <option value="30d">Last 30 Days (Full Batch Cycle)</option>
            </select>
          </div>
        </div>

        {/* 1. Desktop Table View (>= 768px) */}
        <div className="desktop-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Shed Unit</th>
                <th>Date Generated</th>
                <th>Avg Activity Index</th>
                <th>Huddling Incidents</th>
                <th>Est. Mortality Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportsList.map((rep) => (
                <tr key={rep.id}>
                  <td className="font-mono text-bold">{rep.id}</td>
                  <td>{rep.shed}</td>
                  <td className="font-mono">{rep.date}</td>
                  <td><span className="badge badge-success">{rep.activityAvg}</span></td>
                  <td>{rep.huddlingAlerts} alerts</td>
                  <td className="text-emerald-600 font-bold">{rep.mortalityRisk}</td>
                  <td>
                    <button className="action-link-btn" onClick={handleExport}>
                      <IconDownload size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Mobile Responsive Report Cards (< 768px) */}
        <div className="mobile-reports-cards">
          {reportsList.map((rep) => (
            <div key={rep.id} className="mobile-report-card">
              <div className="card-top-row">
                <div className="id-date-wrap">
                  <span className="font-mono report-id-pill">{rep.id}</span>
                  <span className="font-mono report-date">{rep.date}</span>
                </div>
                <span className="badge badge-success">{rep.mortalityRisk}</span>
              </div>

              <div className="card-metrics-grid">
                <div className="metric-tile">
                  <span className="tile-lbl">Shed Unit</span>
                  <span className="tile-val">{rep.shed}</span>
                </div>
                <div className="metric-tile">
                  <span className="tile-lbl">Activity Index</span>
                  <span className="tile-val font-mono text-lime-700">{rep.activityAvg}</span>
                </div>
                <div className="metric-tile">
                  <span className="tile-lbl">Huddling Alerts</span>
                  <span className="tile-val font-mono">{rep.huddlingAlerts}</span>
                </div>
              </div>

              <button className="mobile-download-btn" onClick={handleExport}>
                <IconDownload size={14} />
                <span>Download Report (PDF/CSV)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reports-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
        }

        .reports-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
          flex-wrap: wrap;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reports-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.2;
        }

        .reports-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .export-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          background: #0F172A;
          color: white;
          transition: background 0.2s;
        }
        .export-btn:hover {
          background: #1E293B;
        }

        .filter-bar {
          background: #F8FAFC;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .filter-select {
          appearance: none;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 0.84rem;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          width: 100%;
        }

        /* Desktop Table View */
        .desktop-table-wrapper {
          display: block;
          overflow-x: auto;
          width: 100%;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }

        .reports-table th, .reports-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border-light);
        }

        .reports-table th {
          background: var(--bg-app);
          font-weight: 700;
          color: var(--text-muted);
          font-size: 0.76rem;
          text-transform: uppercase;
        }

        .font-mono { font-family: var(--font-mono); }
        .font-bold { font-weight: 700; }
        .text-bold { font-weight: 700; }

        .action-link-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.8rem;
        }

        /* Mobile Report Cards View */
        .mobile-reports-cards {
          display: none;
        }

        @media (max-width: 767px) {
          .reports-container {
            padding: 14px 12px;
            gap: 14px;
            border-radius: var(--radius-md);
          }

          .reports-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding-bottom: 12px;
          }

          .reports-title {
            font-size: 1.05rem;
          }

          .reports-subtitle {
            font-size: 0.76rem;
          }

          .export-btn {
            width: 100%;
            justify-content: center;
            padding: 10px 14px;
            font-size: 0.82rem;
          }

          .desktop-table-wrapper {
            display: none !important;
          }

          .mobile-reports-cards {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .mobile-report-card {
            background: #F8FAFC;
            border: 1px solid var(--border-light);
            border-radius: 12px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .card-top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
          }

          .id-date-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .report-id-pill {
            font-size: 0.74rem;
            font-weight: 800;
            color: #0F172A;
            background: #E2E8F0;
            padding: 2px 7px;
            border-radius: 6px;
          }

          .report-date {
            font-size: 0.72rem;
            color: #64748B;
          }

          .card-metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            background: #FFFFFF;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
          }

          .metric-tile {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .tile-lbl {
            font-size: 0.64rem;
            color: #64748B;
            font-weight: 600;
            text-transform: uppercase;
          }

          .tile-val {
            font-size: 0.78rem;
            font-weight: 700;
            color: #0F172A;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .mobile-download-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 100%;
            padding: 8px 12px;
            background: #FFFFFF;
            border: 1px solid #CBD5E1;
            border-radius: 8px;
            font-size: 0.76rem;
            font-weight: 700;
            color: #1E293B;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .mobile-download-btn:hover {
            background: #F1F5F9;
          }
        }

        @media (max-width: 360px) {
          .reports-container {
            padding: 10px 8px;
          }

          .card-metrics-grid {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}
