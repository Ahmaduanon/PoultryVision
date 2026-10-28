import React, { useState } from 'react';
import { 
  IconCamera, IconPlus, IconCpu, IconMapPin, IconX, 
  IconVideo, IconWifi, IconLoader2, IconCheck, IconLayersIntersect 
} from '@tabler/icons-react';

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
  const [newCamShed, setNewCamShed] = useState('Shed 01 - Broilers');
  const [newCamZone, setNewCamZone] = useState('Thermal Brooder #3');
  const [newCamPreset, setNewCamPreset] = useState('1080p');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleAddCamera = (e) => {
    e.preventDefault();
    if (!newCamName.trim() || !newCamIP.trim()) return;
    
    setIsConnecting(true);
    setTimeout(() => {
      const cleanIP = newCamIP.replace(/^rtsp:\/\/(.*@)?/, '').split(/[:\/]/)[0] || newCamIP;
      setCameras(prev => [
        ...prev,
        {
          id: `cam-0${prev.length + 1}`,
          name: newCamName,
          shed: newCamShed,
          ip: cleanIP,
          rtsp: newCamIP.startsWith('rtsp://') ? newCamIP : `rtsp://admin:pass@${cleanIP}:554/h264`,
          status: 'online',
          fps: newCamPreset === '4k' ? 15 : 30,
          latency: '14ms',
          model: 'YOLOv11 ONNX (FP16)',
          temp: '41°C',
          zone: newCamZone || 'Custom Brooder Zone'
        }
      ]);
      setIsConnecting(false);
      setShowAddModal(false);
      setNewCamName('');
      setNewCamIP('');
    }, 600);
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

      {/* Add Camera Modal — Pinned at Top with Smooth Dropdown */}
      {showAddModal && (
        <div className="cam-modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="cam-modal-card card" onClick={e => e.stopPropagation()}>
            <div className="cam-modal-header">
              <div className="cam-header-title-wrap">
                <div className="cam-icon-badge">
                  <IconVideo size={18} />
                </div>
                <div>
                  <h3 className="cam-modal-title">Register RTSP Camera Stream</h3>
                  <p className="cam-modal-sub">Deploy real-time edge ONNX inference pipeline</p>
                </div>
              </div>
              <button 
                type="button" 
                className="cam-close-btn touch-target" 
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                <IconX size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCamera} className="cam-modal-body">
              <div className="form-group">
                <label className="form-label">Camera Label / Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Brooder East Camera 05"
                  value={newCamName}
                  onChange={e => setNewCamName(e.target.value)}
                  className="cam-input"
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Pen / Shed Location</label>
                  <select 
                    value={newCamShed}
                    onChange={e => setNewCamShed(e.target.value)}
                    className="cam-select"
                  >
                    <option value="Shed 01 - Broilers">Shed 01 - Broilers (Oyo)</option>
                    <option value="Shed 02 - Layers">Shed 02 - Layers (Ogun)</option>
                    <option value="Shed 03 - Nursery">Shed 03 - Nursery (Kaduna)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Zone Tag</label>
                  <input 
                    type="text"
                    value={newCamZone}
                    onChange={e => setNewCamZone(e.target.value)}
                    placeholder="e.g. Feeder Line #3"
                    className="cam-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-with-helper">
                  <label className="form-label">RTSP Stream URI / IP Address</label>
                  <span className="format-hint">Format: rtsp://user:pass@ip:port/h264</span>
                </div>
                <div className="rtsp-input-box">
                  <IconWifi size={16} className="text-slate-400 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="192.168.1.110 or rtsp://admin:pass@..."
                    value={newCamIP}
                    onChange={e => setNewCamIP(e.target.value)}
                    className="rtsp-clean-input"
                    required
                  />
                </div>
              </div>

              {/* Resolution & FPS Presets */}
              <div className="form-group">
                <label className="form-label">Stream Resolution Preset</label>
                <div className="preset-pills">
                  <button 
                    type="button" 
                    className={`preset-btn ${newCamPreset === '1080p' ? 'active' : ''}`}
                    onClick={() => setNewCamPreset('1080p')}
                  >
                    1080p @ 30 FPS <span className="recommended-tag">Recommended</span>
                  </button>
                  <button 
                    type="button" 
                    className={`preset-btn ${newCamPreset === '720p' ? 'active' : ''}`}
                    onClick={() => setNewCamPreset('720p')}
                  >
                    720p @ 30 FPS
                  </button>
                  <button 
                    type="button" 
                    className={`preset-btn ${newCamPreset === '4k' ? 'active' : ''}`}
                    onClick={() => setNewCamPreset('4k')}
                  >
                    4K @ 15 FPS
                  </button>
                </div>
              </div>

              {/* Edge Inference Badge */}
              <div className="ai-inference-note">
                <IconCpu size={16} className="text-emerald-600 flex-shrink-0" />
                <span className="note-text">
                  <strong>AI Pipeline:</strong> YOLOv11 ONNX (FP16) spatial tracking will attach automatically on stream ping.
                </span>
              </div>

              <div className="cam-modal-footer">
                <button 
                  type="button" 
                  className="cam-btn-cancel touch-target" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="cam-btn-connect touch-target"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <IconLoader2 size={16} className="animate-spin" />
                      <span>Validating Stream...</span>
                    </>
                  ) : (
                    <>
                      <IconCheck size={16} />
                      <span>Connect Stream</span>
                    </>
                  )}
                </button>
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
          margin-bottom: 4px;
        }

        .form-label {
          font-size: 0.80rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Add Camera Modal — Pinned to Top with Smooth Dropdown */
        .cam-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 150;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(16px, 4vh, 48px) 16px 20px 16px;
          overflow-y: auto;
          animation: camBackdropFade 0.2s ease-out;
        }

        @keyframes camBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cam-modal-card {
          max-width: 540px;
          width: 100%;
          background: #FFFFFF;
          border-radius: 20px;
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
          overflow: hidden;
          animation: camSlideDown 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 24px;
        }

        @keyframes camSlideDown {
          from {
            opacity: 0;
            transform: translateY(-28px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .cam-modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #F8FAFC;
        }

        .cam-header-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cam-icon-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: #DCFCE7;
          color: #15803D;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cam-modal-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cam-modal-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .cam-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E2E8F0;
          border: none;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }
        .cam-close-btn:hover {
          background: #CBD5E1;
          color: #0F172A;
        }

        .cam-modal-body {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .label-with-helper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }

        .format-hint {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .cam-input, .cam-select {
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          font-family: inherit;
          font-size: 0.86rem;
          color: var(--text-primary);
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.15s;
          width: 100%;
          box-sizing: border-box;
        }
        .cam-input:focus, .cam-select:focus {
          border-color: #84CC16;
          box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.15);
        }

        .rtsp-input-box {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 0 12px;
          gap: 8px;
          transition: border-color 0.15s;
        }
        .rtsp-input-box:focus-within {
          border-color: #84CC16;
          box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.15);
        }

        .rtsp-clean-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          padding: 10px 0;
          color: #0F172A;
          background: transparent;
        }

        .preset-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .preset-btn {
          font-size: 0.74rem;
          font-weight: 600;
          padding: 7px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #F8FAFC;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .preset-btn:hover {
          background: #F1F5F9;
          color: var(--text-primary);
        }

        .preset-btn.active {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        .recommended-tag {
          font-size: 0.65rem;
          background: #84CC16;
          color: #0F172A;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .ai-inference-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          background: #F0FDF4;
          border: 1px solid #DCFCE7;
          font-size: 0.74rem;
          color: #166534;
          line-height: 1.4;
        }

        .cam-modal-footer {
          padding-top: 6px;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .cam-btn-cancel {
          padding: 9px 16px;
          border-radius: var(--radius-md);
          background: #F1F5F9;
          color: #475569;
          border: 1px solid var(--border-light);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
        }

        .cam-btn-connect {
          padding: 9px 18px;
          border-radius: var(--radius-md);
          background: #0F172A;
          color: white;
          border: none;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s;
        }
        .cam-btn-connect:hover {
          background: #1E293B;
        }

        @media (max-width: 640px) {
          .cam-modal-backdrop {
            padding-top: 12px;
            padding-left: 10px;
            padding-right: 10px;
          }
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .preset-pills {
            flex-direction: column;
          }
          .preset-btn {
            width: 100%;
            justify-content: space-between;
          }
          .cam-modal-footer {
            flex-direction: column;
            gap: 8px;
          }
          .cam-btn-cancel, .cam-btn-connect {
            width: 100%;
            justify-content: center;
          }
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
