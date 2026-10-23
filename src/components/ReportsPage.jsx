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
          <span>{exportSuccess ? 'Report Downloaded!' : 'Export Report (PDF/CSV)'}</span>
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

        {/* Reports Table */}
        <div className="table-wrapper">
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
      </div>

      <style>{`
        .reports-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
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
        }

        .reports-title {
          font-size: 1.2rem;
          font-weight: 800;
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
          background: var(--color-primary);
          color: white;
        }

        .filter-bar {
          background: var(--bg-app);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
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
        }

        .table-wrapper {
          overflow-x: auto;
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
      `}</style>
    </div>
  );
}
