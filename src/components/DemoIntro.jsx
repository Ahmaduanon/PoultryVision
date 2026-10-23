import React from 'react';
import { 
  IconSparkles, IconCheck, IconVideo, IconCpu, 
  IconBrandWhatsapp, IconArrowRight 
} from '@tabler/icons-react';

export default function DemoIntro({ onEnterDashboard, onBackToHome }) {
  return (
    <div className="demo-intro-viewport fade-in">
      <div className="demo-intro-container">
        {/* Brand Logo */}
        <div className="demo-logo-wrap">
          <img 
            src="/brand-logo-dark.png" 
            alt="PoultryVision Logo" 
            className="demo-brand-logo" 
          />
        </div>

        {/* 1. Eyebrow badge */}
        <div className="demo-eyebrow-pill">
          <IconSparkles size={14} className="demo-eyebrow-icon" />
          <span>Product Demo Walkthrough</span>
        </div>

        {/* 2. Heading */}
        <h1 className="demo-heading">See PoultryVision in action</h1>

        {/* 3. Subtext */}
        <p className="demo-subtext">
          Watch how our AI connects directly to your poultry house CCTV live footage stream — continuously reviewing flock behavior 24/7 and dispatching instant WhatsApp and dashboard alerts the moment anomalies arise.
        </p>

        {/* 4. Video embed */}
        <div className="demo-video-wrapper">
          <div className="demo-video-container">
            <video
              className="demo-video-element"
              src="/chickens-demo.webm"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <p className="demo-video-caption">
            Live CCTV pen footage continuously analyzed by PoultryVision AI models
          </p>
        </div>

        {/* 5. Three-step indicator */}
        <div className="demo-steps-indicator">
          <div className="demo-step-item completed">
            <span className="demo-step-check">
              <IconCheck size={12} strokeWidth={2.8} />
            </span>
            <IconVideo size={15} className="demo-step-type-icon text-slate-500" />
            <span className="demo-step-label">CCTV stream recording ingested</span>
          </div>

          <div className="demo-step-connector" aria-hidden="true" />

          <div className="demo-step-item completed">
            <span className="demo-step-check">
              <IconCheck size={12} strokeWidth={2.8} />
            </span>
            <IconCpu size={15} className="demo-step-type-icon text-lime-600" />
            <span className="demo-step-label">Continuous AI behavioral review</span>
          </div>

          <div className="demo-step-connector" aria-hidden="true" />

          <div className="demo-step-item alert">
            <IconBrandWhatsapp size={16} className="demo-step-type-icon text-orange-500" />
            <span className="demo-step-label alert-text">Instant WhatsApp & SMS alert</span>
          </div>
        </div>

        {/* 6. CTA button & 7. Skip link */}
        <div className="demo-cta-group">
          <button
            type="button"
            className="demo-cta-button"
            onClick={onEnterDashboard}
          >
            <span>Enter Dashboard</span>
            <IconArrowRight size={18} style={{ marginLeft: '6px' }} />
          </button>

          <button
            type="button"
            className="demo-skip-link"
            onClick={onBackToHome || onEnterDashboard}
          >
            or go back to homepage
          </button>
        </div>
      </div>

      <style>{`
        .demo-intro-viewport {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-app);
          background-image: 
            radial-gradient(circle at 50% 15%, rgba(251, 133, 0, 0.08), transparent 45%),
            radial-gradient(circle at 85% 65%, rgba(16, 185, 129, 0.05), transparent 40%),
            radial-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 28px 28px;
          padding: 40px 20px;
          box-sizing: border-box;
          position: relative;
        }

        .demo-intro-container {
          width: 100%;
          max-width: 900px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
        }

        .demo-logo-wrap {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }

        .demo-brand-logo {
          height: 38px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.04));
        }

        .demo-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(251, 133, 0, 0.3);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          color: #D97706;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          margin-bottom: 4px;
        }

        .demo-eyebrow-icon {
          color: #D97706;
          flex-shrink: 0;
        }

        .demo-heading {
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin: 16px 0 10px 0;
        }

        @media (max-width: 640px) {
          .demo-heading {
            font-size: 1.85rem;
          }
        }

        .demo-subtext {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 28px auto;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .demo-subtext {
            font-size: 0.95rem;
            margin-bottom: 20px;
          }
        }

        .demo-video-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .demo-video-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06);
          border: 1px solid var(--border-light);
          background-color: #0F172A;
          position: relative;
        }

        .demo-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .demo-video-caption {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          margin: 0;
        }

        .demo-steps-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border-light);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-sm);
        }

        .demo-step-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .demo-step-item.completed {
          color: var(--text-secondary);
        }

        .demo-step-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .demo-step-connector {
          width: 20px;
          height: 1px;
          background-color: var(--border-light);
          flex-shrink: 0;
        }

        .demo-step-item.alert .alert-text {
          color: var(--color-secondary);
          font-weight: 700;
        }

        @media (max-width: 600px) {
          .demo-steps-indicator {
            flex-direction: column;
            gap: 10px;
            border-radius: var(--radius-md);
            align-items: flex-start;
            padding: 12px 16px;
            width: 100%;
            max-width: 320px;
          }
          .demo-step-connector {
            display: none;
          }
        }

        .demo-cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .demo-cta-button {
          width: 100%;
          max-width: 400px;
          background-color: #0F172A;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1rem;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          border: 1px solid transparent;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .demo-cta-button:hover {
          background-color: #1E293B;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -5px rgba(15, 23, 42, 0.35);
        }

        .demo-cta-button:active {
          transform: translateY(0);
        }

        .demo-skip-link {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 4px 8px;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
          user-select: none;
        }

        .demo-skip-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
