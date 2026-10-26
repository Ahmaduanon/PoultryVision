import React, { useState } from 'react';
import { IconCamera, IconPlus, IconCpu, IconMapPin, IconX } from '@tabler/icons-react';

export default function ShedManager({ activeShed }) {
  const [cameras, setCameras] = useState([
    {
      id: 'cam-01',
      name: 'Overhead Main Camera 01',
      shed: 'Shed 01 - Broilers',
      ip: '192.168.1.104',
      rtsp: 'rtsp://admin:pass@192.168.1.104:554/h264',
      status: 'online',
      fps: 30,
      latency: '12ms',
      model: 'YOLOv11 ONNX (FP16)',
      temp: '42°C',
      zone: 'Main Corridor & Brooder #1'
    },
    {
      id: 'cam-02',
      name: 'North Feeder Line Cam 02',
      shed: 'Shed 01 - Broilers',
      ip: '192.168.1.105',
      rtsp: 'rtsp://admin:pass@192.168.1.105:554/h264',
      status: 'online',
      fps: 30,
      latency: '14ms',
      model: 'YOLOv11 ONNX (FP16)',
      temp: '44°C',
      zone: 'North Feeder & Drinker Line A'
    },
    {
      id: 'cam-03',
      name: 'Brooder Heater Zone Cam 03',
      shed: 'Shed 01 - Broilers',
      ip: '192.168.1.106',
      rtsp: 'rtsp://admin:pass@192.168.1.106:554/h264',
      status: 'online',
      fps: 28,
      latency: '16ms',
      model: 'YOLOv11 ONNX (FP16)',
      temp: '46°C',
      zone: 'Thermal Brooder Heater #2'
    },
    {
      id: 'cam-04',
      name: 'South Drinker Line Cam 04',
      shed: 'Shed 02 - Layers',
      ip: '192.168.1.107',
      rtsp: 'rtsp://admin:pass@192.168.1.107:554/h264',
      status: 'warning',
      fps: 18,
      latency: '45ms',
      model: 'YOLOv11 ONNX (FP16)',
      temp: '48°C',
      zone: 'Layer Nest Box & Drinker B'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCamName, setNewCamName] = useState('');
  const [newCamIP, setNewCamIP] = useState('');

  const handleAddCamera = (e) => {
    e.preventDefault();
    if (!newCamName || !newCamIP) return;
    setCameras(prev => [
      ...prev,
      {
        id: `cam-0${prev.length + 1}`,
        name: newCamName,
        shed: 'Shed 01 - Broilers',
        ip: newCamIP,
        rtsp: `rtsp://admin:pass@${newCamIP}:554/h264`,
        status: 'online',
        fps: 30,
        latency: '15ms',
        model: 'YOLOv11 ONNX (FP16)',
        temp: '41°C',
        zone: 'Custom Zone'
      }
    ]);
    setShowAddModal(false);
    setNewCamName('');
    setNewCamIP('');
  };

  return (
    <div className="shed-manager-container card fade-in">
      <div className="manager-header">
        <div className="title-group">
          <div className="icon-wrap">
            <IconCamera size={20} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="manager-title">Farm Camera Directory & Edge Hardware</h2>
            <p className="manager-subtitle">Manage RTSP IP camera streams & real-time ONNX inference nodes</p>
          </div>
        </div>

        <button className="add-cam-btn touch-target" onClick={() => setShowAddModal(true)}>
          <IconPlus size={16} />
          <span>Add IP Camera Stream</span>
        </button>
      </div>

      <div className="manager-body">
        <div className="cameras-grid">
          {cameras.map((cam) => (
            <div key={cam.id} className="camera-card card">
              <div className="cam-card-top">
                <div className="cam-title-wrap">
                  <span className={`status-dot ${cam.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <h3 className="cam-name">{cam.name}</h3>
                </div>
                <span className={`badge ${cam.status === 'online' ? 'badge-success' : 'badge-warning'}`}>
                  {cam.status}
                </span>
              </div>

              <div className="cam-metadata-grid">
                <div className="meta-item">
                  <span className="meta-lbl">IP Address</span>
                  <span className="meta-val">{cam.ip}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">RTSP Latency</span>
                  <span className="meta-val">{cam.latency}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">Frame Rate</span>
                  <span className="meta-val">{cam.fps} FPS</span>
                </div>
                <div className="meta-item">
                  <span className="meta-lbl">Edge Temp</span>
                  <span className="meta-val">{cam.temp}</span>
                </div>
              </div>

              <div className="cam-zone-bar">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <IconMapPin size={13} className="text-slate-400" /> Zone: <strong>{cam.zone}</strong>
                </span>
              </div>

              <div className="cam-card-footer">
                <span className="model-chip"><IconCpu size={14} /> {cam.model}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Camera Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Register New RTSP Camera Stream</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}><IconX size={18} /></button>
            </div>
            <form onSubmit={handleAddCamera} className="modal-body">
              <div className="form-group">
                <label className="form-label">Camera Name / Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. North Brooder Camera 05"
                  value={newCamName}
                  onChange={e => setNewCamName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">IP Address / RTSP Host</label>
                <input 
                  type="text" 
                  placeholder="192.168.1.110"
                  value={newCamIP}
                  onChange={e => setNewCamIP(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="modal-btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn btn-primary">Connect Stream</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .shed-manager-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .manager-header {
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

        .manager-title {
          font-size: 1.2rem;
          font-weight: 800;
        }

        .manager-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .add-cam-btn {
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

        .cameras-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 20px;
        }

        .camera-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cam-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cam-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .cam-name {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .cam-metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          background: var(--bg-app);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-lbl {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .meta-val {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .cam-zone-bar {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .cam-card-footer {
          border-top: 1px dashed var(--border-light);
          padding-top: 10px;
        }

        .model-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-label {
          font-size: 0.82rem;
          font-weight: 700;
        }

        .form-input {
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          font-family: inherit;
          font-size: 0.88rem;
          outline: none;
        }
        .form-input:focus { border-color: var(--color-primary); }

        @media (max-width: 640px) {
          .shed-manager-container {
            padding: 12px 8px;
            gap: 14px;
          }
          .manager-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .add-cam-btn {
            width: 100%;
            justify-content: center;
          }
          .cameras-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .camera-card {
            padding: 14px 12px;
          }
          .cam-name {
            font-size: 0.88rem;
          }
          .cam-metadata-grid {
            gap: 8px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}
