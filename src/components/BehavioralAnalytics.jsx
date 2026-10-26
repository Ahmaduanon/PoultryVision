import React, { useState } from 'react';
import { IconChartBar, IconTrendingUp, IconClock, IconCalendar, IconShieldCheck, IconDownload } from '@tabler/icons-react';

export default function BehavioralAnalytics({ activeShed }) {
  const [timeRange, setTimeRange] = useState('24h');

  // Simulated hourly data points for 24 hours
  const hourlyData = [
    { time: '00:00', activity: 22, huddling: 15, feeder: 10 },
    { time: '02:00', activity: 18, huddling: 18, feeder: 8 },
    { time: '04:00', activity: 25, huddling: 14, feeder: 15 },
    { time: '06:00', activity: 72, huddling: 10, feeder: 65 }, // Lights ON
    { time: '08:00', activity: 88, huddling: 8,  feeder: 82 },
    { time: '10:00', activity: 84, huddling: 12, feeder: 74 },
    { time: '12:00', activity: 79, huddling: 11, feeder: 68 },
    { time: '14:00', activity: 85, huddling: 9,  feeder: 78 },
    { time: '16:00', activity: 91, huddling: 7,  feeder: 85 },
    { time: '18:00', activity: 82, huddling: 14, feeder: 70 },
    { time: '20:00', activity: 54, huddling: 20, feeder: 42 },
    { time: '22:00', activity: 30, huddling: 24, feeder: 18 },
  ];

  return (
    <div className="analytics-card card">
      {/* Header Bar */}
      <div className="analytics-header">
        <div className="title-group">
          <div className="icon-wrap">
            <IconChartBar size={18} className="text-lime-700" />
          </div>
          <div>
            <h3 className="analytics-title">Flock Behavioral Telemetry & Trends</h3>
            <p className="analytics-subtitle">24-Hour continuous CCTV spatial velocity, huddling density & feeder metrics</p>
          </div>
        </div>

        <div className="range-controls">
          <div className="range-pills">
            <button 
              className={`range-btn ${timeRange === '6h' ? 'active' : ''}`}
              onClick={() => setTimeRange('6h')}
            >
              6 Hours
            </button>
            <button 
              className={`range-btn ${timeRange === '24h' ? 'active' : ''}`}
              onClick={() => setTimeRange('24h')}
            >
              24 Hours
            </button>
            <button 
              className={`range-btn ${timeRange === '7d' ? 'active' : ''}`}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </button>
          </div>

          <button className="export-btn" title="Export Telemetry Data (CSV)">
            <IconDownload size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Chart Visualizer */}
      <div className="chart-body">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot bg-lime-500"></span>
            <span>Flock Activity Index (%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot bg-amber-500"></span>
            <span>Huddling / Cold Stress Score</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot bg-blue-500"></span>
            <span>Feeder Line Occupancy (%)</span>
          </div>
        </div>

        {/* Custom SVG Bar & Trendline Graphic */}
        <div className="svg-chart-container">
          <div className="y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          <div className="chart-bars-wrap">
            {hourlyData.map((item, idx) => (
              <div key={idx} className="chart-col">
                <div className="bars-stack">
                  {/* Activity Bar */}
                  <div 
                    className="bar bar-activity" 
                    style={{ height: `${item.activity}%` }}
                    title={`Activity: ${item.activity}% at ${item.time}`}
                  />
                  {/* Feeder Line Bar */}
                  <div 
                    className="bar bar-feeder" 
                    style={{ height: `${item.feeder}%` }}
                    title={`Feeder Occupancy: ${item.feeder}% at ${item.time}`}
                  />
                  {/* Huddling Indicator Bar */}
                  <div 
                    className="bar bar-huddling" 
                    style={{ height: `${item.huddling}%` }}
                    title={`Huddling Index: ${item.huddling}% at ${item.time}`}
                  />
                </div>
                <span className="x-label">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Highlights */}
        <div className="analytics-summary-row">
          <div className="summary-stat">
            <span className="stat-lbl">Peak Activity Window</span>
            <span className="stat-val text-lime-700">16:00 - 18:00 (91%)</span>
          </div>
          <div className="summary-stat">
            <span className="stat-lbl">Diurnal Rhythm Health</span>
            <span className="stat-val text-slate-800">98.4% Normal</span>
          </div>
          <div className="summary-stat">
            <span className="stat-lbl">Feeder Cycle Compliance</span>
            <span className="stat-val text-blue-600">6 Feeding Waves</span>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .analytics-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #F8FAFC;
        }

        @media (min-width: 640px) {
          .analytics-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: #ECFCCB;
          border: 1px solid #D9F99D;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .analytics-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .analytics-subtitle {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .range-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .range-pills {
          display: flex;
          gap: 4px;
          background: #FFFFFF;
          padding: 3px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        .range-btn {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          border: none;
          background: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .range-btn.active {
          background: #0F172A;
          color: white;
        }

        .export-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .export-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .chart-body {
          padding: 16px 20px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chart-legend {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .bg-lime-500 { background: #84CC16; }
        .bg-amber-500 { background: #FB8500; }
        .bg-blue-500 { background: #3B82F6; }

        .svg-chart-container {
          display: flex;
          gap: 12px;
          height: 180px;
          padding-top: 10px;
        }

        .y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-muted);
          text-align: right;
          width: 35px;
        }

        .chart-bars-wrap {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 4px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 6px;
        }

        .chart-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;
        }

        .bars-stack {
          flex: 1;
          width: 100%;
          max-width: 18px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 2px;
          position: relative;
        }

        .bar {
          width: 5px;
          border-radius: 2px 2px 0 0;
          transition: height 0.3s ease;
        }

        .bar-activity { background: #84CC16; }
        .bar-feeder { background: #3B82F6; }
        .bar-huddling { background: #FB8500; }

        .x-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .analytics-summary-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
        }

        @media (max-width: 640px) {
          .analytics-header {
            padding: 12px 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .range-controls {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
          }

          .chart-body {
            padding: 12px 14px 16px 14px;
          }

          .chart-legend {
            gap: 8px 12px;
            font-size: 0.70rem;
          }

          .svg-chart-container {
            height: 150px;
            gap: 6px;
          }

          .y-axis {
            width: 25px;
            font-size: 0.6rem;
          }

          .bar {
            width: 3.5px;
          }

          .x-label {
            font-size: 0.58rem;
          }

          .analytics-summary-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          .range-pills {
            padding: 2px;
          }
          .range-btn {
            padding: 4px 6px;
            font-size: 0.68rem;
          }
          .export-btn {
            padding: 5px 8px;
            font-size: 0.68rem;
          }
          .analytics-title {
            font-size: 0.92rem;
          }
          .analytics-subtitle {
            font-size: 0.68rem;
          }
        }

        .summary-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
          background: #F8FAFC;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        .stat-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .stat-val {
          font-size: 0.88rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
