import React, { useRef, useEffect, useState } from 'react';
import { 
  IconCamera, IconScan, IconActivity, IconFlame, IconLayoutGrid, 
  IconAdjustments, IconMaximize, IconShieldExclamation, IconCircleCheck, 
  IconPlayerPlay, IconPlayerPause, IconBolt, IconWifi, IconVideo,
  IconEye, IconEyeOff, IconAlertTriangle, IconRefresh
} from '@tabler/icons-react';

export default function LiveCVStream({ activeShed, onTriggerAlert }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  
  // Layer Toggles
  const [showBoxes, setShowBoxes] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showROI, setShowROI] = useState(true);
  
  // Camera Selection
  const [activeCam, setActiveCam] = useState('cam-01');
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Anomaly Simulation Mode
  const [anomalyMode, setAnomalyMode] = useState('normal'); // 'normal', 'huddling', 'panic'
  const [metrics, setMetrics] = useState({ fps: 30, count: 45, activity: 84, huddlingScore: 12 });
  const [mobileControlTab, setMobileControlTab] = useState('layers'); // 'cameras', 'layers', 'simulate'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set internal resolution
    canvas.width = 1280;
    canvas.height = 720;

    // Generate flock particles
    const numBirds = 45;
    const birds = Array.from({ length: numBirds }, (_, i) => ({
      id: 100 + i,
      x: 120 + Math.random() * (canvas.width - 240),
      y: 120 + Math.random() * (canvas.height - 240),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 16 + Math.random() * 6,
      confidence: (0.91 + Math.random() * 0.08).toFixed(2),
      isImmobile: false,
    }));

    let animationFrameId;

    const render = () => {
      // 1. Clear Canvas for Video Transparency Overlay
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Feeder Line 1 (Top Polygon ROI)
      const feeder1 = { x: 150, y: 120, w: 980, h: 50 };
      ctx.fillStyle = showROI ? 'rgba(5, 150, 105, 0.12)' : 'rgba(255,255,255,0.02)';
      ctx.strokeStyle = showROI ? '#10B981' : '#475569';
      ctx.lineWidth = 2;
      ctx.fillRect(feeder1.x, feeder1.y, feeder1.w, feeder1.h);
      ctx.strokeRect(feeder1.x, feeder1.y, feeder1.w, feeder1.h);
      if (showROI) {
        ctx.fillStyle = '#10B981';
        ctx.font = '700 13px "JetBrains Mono", monospace';
        ctx.fillText('ROI #1: Feeder Line North [84% Attendance]', feeder1.x + 12, feeder1.y + 32);
      }

      // Draw Drinker Line 2 (Bottom Polygon ROI)
      const drinker1 = { x: 150, y: 550, w: 980, h: 50 };
      ctx.fillStyle = showROI ? 'rgba(37, 99, 235, 0.12)' : 'rgba(255,255,255,0.02)';
      ctx.strokeStyle = showROI ? '#3B82F6' : '#475569';
      ctx.fillRect(drinker1.x, drinker1.y, drinker1.w, drinker1.h);
      ctx.strokeRect(drinker1.x, drinker1.y, drinker1.w, drinker1.h);
      if (showROI) {
        ctx.fillStyle = '#3B82F6';
        ctx.font = '700 13px "JetBrains Mono", monospace';
        ctx.fillText('ROI #2: Drinker Line South [Flow Normal]', drinker1.x + 12, drinker1.y + 32);
      }

      // Draw Brooder Heater Lamps (Thermal Zones)
      const heaterCluster = { x: 950, y: 360, radius: 160 };
      ctx.save();
      const heaterGradient = ctx.createRadialGradient(
        heaterCluster.x, heaterCluster.y, 10,
        heaterCluster.x, heaterCluster.y, heaterCluster.radius
      );
      heaterGradient.addColorStop(0, anomalyMode === 'huddling' ? 'rgba(239, 68, 68, 0.35)' : 'rgba(251, 133, 0, 0.2)');
      heaterGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = heaterGradient;
      ctx.beginPath();
      ctx.arc(heaterCluster.x, heaterCluster.y, heaterCluster.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Update Bird Positions based on anomaly mode
      birds.forEach((bird) => {
        if (anomalyMode === 'huddling') {
          // Birds flock towards the heater zone
          const dx = heaterCluster.x - bird.x;
          const dy = heaterCluster.y - bird.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 40) {
            bird.vx += (dx / dist) * 0.16;
            bird.vy += (dy / dist) * 0.16;
          }
        } else if (anomalyMode === 'panic') {
          // Fast erratic movements
          bird.vx += (Math.random() - 0.5) * 1.6;
          bird.vy += (Math.random() - 0.5) * 1.6;
        } else {
          // Normal gentle wandering
          bird.vx += (Math.random() - 0.5) * 0.32;
          bird.vy += (Math.random() - 0.5) * 0.32;
        }

        // Speed caps
        const maxSpeed = anomalyMode === 'panic' ? 4.8 : 1.6;
        bird.vx = Math.max(-maxSpeed, Math.min(maxSpeed, bird.vx));
        bird.vy = Math.max(-maxSpeed, Math.min(maxSpeed, bird.vy));

        bird.x += bird.vx;
        bird.y += bird.vy;

        // Bounce off walls
        if (bird.x < 70 || bird.x > canvas.width - 70) bird.vx *= -1;
        if (bird.y < 70 || bird.y > canvas.height - 70) bird.vy *= -1;

        // Draw Heatmap spot if enabled
        if (showHeatmap) {
          ctx.save();
          const hmGrad = ctx.createRadialGradient(bird.x, bird.y, 2, bird.x, bird.y, 48);
          hmGrad.addColorStop(0, anomalyMode === 'huddling' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(163, 230, 53, 0.35)');
          hmGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = hmGrad;
          ctx.beginPath();
          ctx.arc(bird.x, bird.y, 48, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Bird Center Point Reticle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw Velocity Vectors
        if (showVectors) {
          ctx.strokeStyle = anomalyMode === 'panic' ? '#EF4444' : '#06B6D4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(bird.x, bird.y);
          ctx.lineTo(bird.x + bird.vx * 14, bird.y + bird.vy * 14);
          ctx.stroke();

          // Arrow head
          ctx.fillStyle = anomalyMode === 'panic' ? '#EF4444' : '#06B6D4';
          ctx.beginPath();
          ctx.arc(bird.x + bird.vx * 14, bird.y + bird.vy * 14, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw AI Bounding Boxes
        if (showBoxes) {
          const bw = bird.size * 2.5;
          const bh = bird.size * 2.5;
          const bx = bird.x - bw / 2;
          const by = bird.y - bh / 2;

          let color = '#A3E635'; // Lime green brand accent
          if (anomalyMode === 'huddling') color = '#EF4444';
          if (anomalyMode === 'panic') color = '#FB8500';

          ctx.strokeStyle = color;
          ctx.lineWidth = 1.8;
          ctx.strokeRect(bx, by, bw, bh);

          // Bounding Box Label
          ctx.fillStyle = color;
          ctx.fillRect(bx, by - 18, bw, 18);
          ctx.fillStyle = '#0F172A';
          ctx.font = '700 10px "JetBrains Mono", monospace';
          ctx.fillText(`ID:${bird.id}`, bx + 4, by - 5);
        }
      });

      // Update HUD metrics periodically
      const speedSum = birds.reduce((acc, b) => acc + Math.sqrt(b.vx * b.vx + b.vy * b.vy), 0);
      const avgActivity = Math.min(99, Math.round((speedSum / numBirds) * 45));
      setMetrics({
        fps: 30,
        count: numBirds,
        activity: anomalyMode === 'huddling' ? 18 : avgActivity,
        huddlingScore: anomalyMode === 'huddling' ? 88 : (anomalyMode === 'panic' ? 45 : 12),
      });

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showBoxes, showVectors, showHeatmap, showROI, anomalyMode, isPlaying]);

  const handleModeChange = (mode) => {
    setAnomalyMode(mode);
    if (mode === 'huddling') {
      onTriggerAlert({
        id: Date.now(),
        type: 'critical',
        title: 'Severe Cold Stress & Huddling Detected',
        shed: 'Shed 01 - Broilers',
        time: 'Just now',
        zone: 'Brooder Heater Zone 02',
        confidence: '96%',
        birdsAffected: 38,
        snapshot: 'huddling_snapshot.png'
      });
    } else if (mode === 'panic') {
      onTriggerAlert({
        id: Date.now(),
        type: 'warning',
        title: 'High Velocity Stampede / Panic Cluster',
        shed: 'Shed 01 - Broilers',
        time: 'Just now',
        zone: 'Center Floor Corridor',
        confidence: '89%',
        birdsAffected: 22,
        snapshot: 'panic_snapshot.png'
      });
    }
  };

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (videoRef.current) {
      if (next) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  };

  return (
    <div className="cv-player-container card">
      {/* 1. Video Screen HUD & Player */}
      <div className="canvas-wrapper">
        <video 
          ref={videoRef}
          src="/chickens-demo.webm"
          className="cv-underlying-video"
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <canvas ref={canvasRef} className="cv-canvas" />

        {/* Minimal Unobtrusive HUD Overlay (Top-Only) */}
        <div className="stream-hud-bar">
          <div className="hud-badge-left">
            <span className="live-dot pulse-red"></span>
            <span className="hud-text">LIVE NVR • {activeCam.toUpperCase()} • 1080P 30FPS</span>
          </div>

          <div className="hud-actions-right">
            <button 
              className="hud-control-btn"
              onClick={togglePlay}
              title={isPlaying ? 'Pause CCTV Stream' : 'Play CCTV Stream'}
            >
              {isPlaying ? <IconPlayerPause size={15} /> : <IconPlayerPlay size={15} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DOCKED DEDICATED TOOLBAR BENEATH VIDEO */}
      <div className="docked-control-console">
        {/* Desktop Layout (>= 768px) */}
        <div className="desktop-controls-layout">
          {/* Row 1: Camera Selector & Live Stream Status */}
          <div className="console-row camera-status-row">
            <div className="camera-pill-group">
              <span className="row-label">
                <IconCamera size={15} className="label-icon text-slate-500" />
                <span>Camera Stream:</span>
              </span>
              <div className="cam-buttons">
                <button 
                  className={`cam-chip ${activeCam === 'cam-01' ? 'active' : ''}`}
                  onClick={() => setActiveCam('cam-01')}
                >
                  Cam 01 (Overhead Main)
                </button>
                <button 
                  className={`cam-chip ${activeCam === 'cam-02' ? 'active' : ''}`}
                  onClick={() => setActiveCam('cam-02')}
                >
                  Cam 02 (North Feeder)
                </button>
                <button 
                  className={`cam-chip ${activeCam === 'cam-03' ? 'active' : ''}`}
                  onClick={() => setActiveCam('cam-03')}
                >
                  Cam 03 (Brooder Zone)
                </button>
              </div>
            </div>

            <div className="stream-live-telemetry">
              <div className="telemetry-chip">
                <span className="chip-key">Tracked Birds:</span>
                <span className="chip-val font-mono">{metrics.count}</span>
              </div>
              <div className="telemetry-chip">
                <span className="chip-key">Activity:</span>
                <span className={`chip-val font-mono ${metrics.activity < 40 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {metrics.activity}%
                </span>
              </div>
              <div className="telemetry-chip">
                <span className="chip-key">Huddling:</span>
                <span className={`chip-val font-mono ${metrics.huddlingScore > 50 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {metrics.huddlingScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: AI Computer Vision Layers */}
          <div className="console-row layer-toggles-row">
            <span className="row-label">
              <IconScan size={15} className="label-icon text-lime-600" />
              <span>AI Vision Overlays:</span>
            </span>

            <div className="layer-button-grid">
              <button 
                className={`layer-toggle-btn ${showBoxes ? 'active-boxes' : ''}`}
                onClick={() => setShowBoxes(!showBoxes)}
              >
                <IconScan size={15} />
                <span>Bounding Boxes</span>
                <span className="status-indicator"></span>
              </button>

              <button 
                className={`layer-toggle-btn ${showVectors ? 'active-vectors' : ''}`}
                onClick={() => setShowVectors(!showVectors)}
              >
                <IconActivity size={15} />
                <span>Optical Flow Vectors</span>
                <span className="status-indicator"></span>
              </button>

              <button 
                className={`layer-toggle-btn ${showHeatmap ? 'active-heatmap' : ''}`}
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                <IconFlame size={15} />
                <span>Thermal Density Heatmap</span>
                <span className="status-indicator"></span>
              </button>

              <button 
                className={`layer-toggle-btn ${showROI ? 'active-roi' : ''}`}
                onClick={() => setShowROI(!showROI)}
              >
                <IconLayoutGrid size={15} />
                <span>Feeder/Drinker ROI Zones</span>
                <span className="status-indicator"></span>
              </button>
            </div>
          </div>

          {/* Row 3: Behavioral Anomaly Simulation */}
          <div className="console-row sim-actions-row">
            <span className="row-label">
              <IconAdjustments size={15} className="label-icon text-amber-500" />
              <span>Simulate Anomaly Events:</span>
            </span>

            <div className="sim-button-group">
              <button 
                className={`sim-action-btn ${anomalyMode === 'normal' ? 'active-normal' : ''}`}
                onClick={() => handleModeChange('normal')}
              >
                <IconCircleCheck size={14} />
                <span>Normal Foraging (Baseline)</span>
              </button>

              <button 
                className={`sim-action-btn ${anomalyMode === 'huddling' ? 'active-huddling' : ''}`}
                onClick={() => handleModeChange('huddling')}
              >
                <IconShieldExclamation size={14} />
                <span>Trigger Cold Stress Huddling</span>
              </button>

              <button 
                className={`sim-action-btn ${anomalyMode === 'panic' ? 'active-panic' : ''}`}
                onClick={() => handleModeChange('panic')}
              >
                <IconBolt size={14} />
                <span>Trigger Stampede / Panic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tabbed / Segmented Toolbar (< 768px) */}
        <div className="mobile-controls-layout">
          {/* Segmented Tab Bar */}
          <div className="mobile-segment-bar">
            <button 
              type="button"
              className={`segment-btn ${mobileControlTab === 'cameras' ? 'active' : ''}`}
              onClick={() => setMobileControlTab('cameras')}
            >
              <IconCamera size={14} />
              <span>Cameras</span>
            </button>
            <button 
              type="button"
              className={`segment-btn ${mobileControlTab === 'layers' ? 'active' : ''}`}
              onClick={() => setMobileControlTab('layers')}
            >
              <IconScan size={14} />
              <span>AI Layers</span>
            </button>
            <button 
              type="button"
              className={`segment-btn ${mobileControlTab === 'simulate' ? 'active' : ''}`}
              onClick={() => setMobileControlTab('simulate')}
            >
              <IconAdjustments size={14} />
              <span>Simulate</span>
            </button>
          </div>

          {/* Segment Tab Content */}
          <div className="mobile-segment-content">
            {mobileControlTab === 'cameras' && (
              <div className="mobile-cameras-view fade-in">
                <div className="mobile-cam-pills">
                  <button 
                    className={`cam-chip ${activeCam === 'cam-01' ? 'active' : ''}`}
                    onClick={() => setActiveCam('cam-01')}
                  >
                    Cam 01 (Overhead)
                  </button>
                  <button 
                    className={`cam-chip ${activeCam === 'cam-02' ? 'active' : ''}`}
                    onClick={() => setActiveCam('cam-02')}
                  >
                    Cam 02 (North Feeder)
                  </button>
                  <button 
                    className={`cam-chip ${activeCam === 'cam-03' ? 'active' : ''}`}
                    onClick={() => setActiveCam('cam-03')}
                  >
                    Cam 03 (Brooder)
                  </button>
                </div>
                <div className="mobile-telemetry-strip">
                  <div className="mob-telemetry-chip">
                    <span className="mob-chip-k">Birds</span>
                    <span className="mob-chip-v font-mono">{metrics.count}</span>
                  </div>
                  <div className="mob-telemetry-chip">
                    <span className="mob-chip-k">Activity</span>
                    <span className={`mob-chip-v font-mono ${metrics.activity < 40 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {metrics.activity}%
                    </span>
                  </div>
                  <div className="mob-telemetry-chip">
                    <span className="mob-chip-k">Huddling</span>
                    <span className={`mob-chip-v font-mono ${metrics.huddlingScore > 50 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {metrics.huddlingScore}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {mobileControlTab === 'layers' && (
              <div className="mobile-layers-grid fade-in">
                <button 
                  className={`layer-toggle-btn ${showBoxes ? 'active-boxes' : ''}`}
                  onClick={() => setShowBoxes(!showBoxes)}
                >
                  <IconScan size={14} />
                  <span>Boxes</span>
                  <span className="status-indicator"></span>
                </button>

                <button 
                  className={`layer-toggle-btn ${showVectors ? 'active-vectors' : ''}`}
                  onClick={() => setShowVectors(!showVectors)}
                >
                  <IconActivity size={14} />
                  <span>Vectors</span>
                  <span className="status-indicator"></span>
                </button>

                <button 
                  className={`layer-toggle-btn ${showHeatmap ? 'active-heatmap' : ''}`}
                  onClick={() => setShowHeatmap(!showHeatmap)}
                >
                  <IconFlame size={14} />
                  <span>Heatmap</span>
                  <span className="status-indicator"></span>
                </button>

                <button 
                  className={`layer-toggle-btn ${showROI ? 'active-roi' : ''}`}
                  onClick={() => setShowROI(!showROI)}
                >
                  <IconLayoutGrid size={14} />
                  <span>Feeder ROI</span>
                  <span className="status-indicator"></span>
                </button>
              </div>
            )}

            {mobileControlTab === 'simulate' && (
              <div className="mobile-sim-stack fade-in">
                <button 
                  className={`sim-action-btn ${anomalyMode === 'normal' ? 'active-normal' : ''}`}
                  onClick={() => handleModeChange('normal')}
                >
                  <IconCircleCheck size={14} />
                  <span>Normal (Baseline)</span>
                </button>

                <button 
                  className={`sim-action-btn ${anomalyMode === 'huddling' ? 'active-huddling' : ''}`}
                  onClick={() => handleModeChange('huddling')}
                >
                  <IconShieldExclamation size={14} />
                  <span>Cold Stress Huddling</span>
                </button>

                <button 
                  className={`sim-action-btn ${anomalyMode === 'panic' ? 'active-panic' : ''}`}
                  onClick={() => handleModeChange('panic')}
                >
                  <IconBolt size={14} />
                  <span>Panic Stampede</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cv-player-container {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        /* Video Screen Viewport */
        .canvas-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0B0F19;
          overflow: hidden;
        }

        .cv-underlying-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .cv-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          z-index: 2;
          pointer-events: none;
        }

        /* Minimal Stream HUD (Top Overlay Only) */
        .stream-hud-bar {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 3;
          pointer-events: auto;
        }

        .hud-badge-left {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.04em;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .pulse-red {
          background: #EF4444;
          box-shadow: 0 0 8px #EF4444;
          animation: pulseRed 2s infinite;
        }
        @keyframes pulseRed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }

        .hud-control-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--radius-full);
          color: white;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hud-control-btn:hover {
          background: rgba(15, 23, 42, 0.95);
          border-color: rgba(255, 255, 255, 0.35);
        }

        /* Docked Control Console */
        .docked-control-console {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
        }

        .console-row {
          padding: 12px 18px;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .row-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 155px;
          flex-shrink: 0;
        }

        /* Camera Row */
        .camera-status-row {
          justify-content: space-between;
          background: #F8FAFC;
        }

        .camera-pill-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cam-buttons {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .cam-chip {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          color: #475569;
          border: 1px solid #CBD5E1;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .cam-chip:hover {
          background: #F1F5F9;
          border-color: #94A3B8;
        }
        .cam-chip.active {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        .stream-live-telemetry {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .telemetry-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.74rem;
          background: #FFFFFF;
          padding: 4px 10px;
          border-radius: var(--radius-md);
          border: 1px solid #E2E8F0;
        }
        .chip-key { color: #64748B; font-weight: 500; }
        .chip-val { font-weight: 700; }

        /* Layer Toggles Grid */
        .layer-button-grid {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          flex: 1;
        }

        .layer-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: var(--radius-md);
          background: #F8FAFC;
          color: #475569;
          border: 1px solid #E2E8F0;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .layer-toggle-btn:hover {
          background: #F1F5F9;
          border-color: #CBD5E1;
        }

        .status-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #CBD5E1;
        }

        .layer-toggle-btn.active-boxes {
          background: #F7FEE7;
          color: #3F6212;
          border-color: #A3E635;
        }
        .layer-toggle-btn.active-boxes .status-indicator { background: #84CC16; }

        .layer-toggle-btn.active-vectors {
          background: #ECFEFF;
          color: #0E7490;
          border-color: #67E8F9;
        }
        .layer-toggle-btn.active-vectors .status-indicator { background: #06B6D4; }

        .layer-toggle-btn.active-heatmap {
          background: #FFF7ED;
          color: #C2410C;
          border-color: #FDBA74;
        }
        .layer-toggle-btn.active-heatmap .status-indicator { background: #FB8500; }

        .layer-toggle-btn.active-roi {
          background: #EFF6FF;
          color: #1D4ED8;
          border-color: #93C5FD;
        }
        .layer-toggle-btn.active-roi .status-indicator { background: #2563EB; }

        /* Simulation Buttons */
        .sim-button-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          flex: 1;
        }

        .sim-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          color: #64748B;
          border: 1px solid #E2E8F0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sim-action-btn:hover {
          background: #F8FAFC;
          color: #1E293B;
        }

        .sim-action-btn.active-normal {
          background: #ECFDF5;
          color: #065F46;
          border-color: #A7F3D0;
          font-weight: 700;
        }

        .sim-action-btn.active-huddling {
          background: #FEF2F2;
          color: #991B1B;
          border-color: #FECACA;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);
        }

        .sim-action-btn.active-panic {
          background: #FFFBEB;
          color: #92400E;
          border-color: #FDE68A;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.15);
        }

        /* Desktop vs Mobile Control Layout Visibility */
        .desktop-controls-layout {
          display: flex;
          flex-direction: column;
        }

        .mobile-controls-layout {
          display: none;
        }

        @media (max-width: 767px) {
          .desktop-controls-layout {
            display: none;
          }

          .mobile-controls-layout {
            display: flex;
            flex-direction: column;
            background: #FFFFFF;
          }

          /* Mobile Top HUD adjustment */
          .stream-hud-bar {
            top: 8px;
            left: 8px;
            right: 8px;
          }

          .hud-badge-left {
            padding: 4px 10px;
            font-size: 0.65rem;
            gap: 6px;
          }

          .hud-control-btn {
            padding: 4px 10px;
            font-size: 0.65rem;
          }

          /* Mobile Segmented Bar */
          .mobile-segment-bar {
            display: flex;
            background: #F1F5F9;
            border-radius: 12px;
            padding: 4px;
            gap: 4px;
            margin: 10px 12px 6px 12px;
            border: 1px solid #E2E8F0;
          }

          .segment-btn {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 7px 10px;
            border-radius: 8px;
            border: none;
            font-size: 0.78rem;
            font-weight: 600;
            color: #64748B;
            background: transparent;
            cursor: pointer;
            transition: all 0.15s ease;
            white-space: nowrap;
          }

          .segment-btn.active {
            background: #FFFFFF;
            color: #0F172A;
            box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
            font-weight: 700;
          }

          .mobile-segment-content {
            padding: 8px 12px 14px 12px;
          }

          /* Mobile Cameras View */
          .mobile-cam-pills {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }

          .mobile-cam-pills .cam-chip {
            flex: 1;
            text-align: center;
            padding: 7px 10px;
            font-size: 0.74rem;
          }

          .mobile-telemetry-strip {
            display: flex;
            gap: 6px;
            justify-content: space-between;
            margin-top: 8px;
          }

          .mob-telemetry-chip {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 6px 4px;
            text-align: center;
          }

          .mob-chip-k {
            font-size: 0.65rem;
            color: #64748B;
            font-weight: 600;
            text-transform: uppercase;
          }

          .mob-chip-v {
            font-size: 0.88rem;
            font-weight: 800;
          }

          /* Mobile AI Layers 2x2 Grid */
          .mobile-layers-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .mobile-layers-grid .layer-toggle-btn {
            width: 100%;
            justify-content: space-between;
            padding: 9px 12px;
            font-size: 0.75rem;
            border-radius: 10px;
          }

          /* Mobile Simulation Stack */
          .mobile-sim-stack {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .mobile-sim-stack .sim-action-btn {
            width: 100%;
            justify-content: flex-start;
            padding: 9px 14px;
            font-size: 0.78rem;
            border-radius: 10px;
          }
        }
      `}</style>
    </div>
  );
}
