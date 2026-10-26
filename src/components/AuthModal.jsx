import React, { useState } from 'react';
import { 
  IconUser, IconMail, IconPhone, IconX, 
  IconArrowRight, IconCircleCheck, IconLoader2 
} from '@tabler/icons-react';
import { GOOGLE_SHEET_URL } from '../config/waitlist.js';

export default function WaitlistModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [farmType, setFarmType] = useState('Broiler');
  const [flockSize, setFlockSize] = useState('1,000–5,000');
  const [cctvStatus, setCctvStatus] = useState('Yes — IP / NVR System');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const submissionPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim() || 'N/A',
      farmType,
      flockSize,
      cctvStatus,
      challenge: challenge.trim() || 'N/A',
      submittedAt: new Date().toLocaleString()
    };

    // 1. Save locally to localStorage as immediate offline-safe backup
    try {
      const existing = JSON.parse(localStorage.getItem('poultryvision_waitlist') || '[]');
      existing.push(submissionPayload);
      localStorage.setItem('poultryvision_waitlist', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }

    // 2. Transmit directly to Google Sheet if Web App URL is configured
    if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== '') {
      try {
        const formData = new FormData();
        formData.append('submittedAt', submissionPayload.submittedAt);
        formData.append('fullName', submissionPayload.fullName);
        formData.append('email', submissionPayload.email);
        formData.append('whatsapp', submissionPayload.whatsapp);
        formData.append('farmType', submissionPayload.farmType);
        formData.append('flockSize', submissionPayload.flockSize);
        formData.append('cctvStatus', submissionPayload.cctvStatus);
        formData.append('challenge', submissionPayload.challenge);

        // mode: 'no-cors' sends a simple POST request without CORS preflight blocking
        await fetch(GOOGLE_SHEET_URL.trim(), {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
      } catch (err) {
        console.warn('Google Sheet submission error (saved to localStorage):', err);
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleModalClose}>
      <div className="waitlist-card card" onClick={(e) => e.stopPropagation()}>
        {/* Header Branding & Close Button */}
        <div className="waitlist-header">
          <div className="brand-logo">
            <img 
              src="/brand-logo-dark.png" 
              alt="PoultryVision" 
              className="modal-brand-logo" 
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <button className="close-btn touch-target" onClick={handleModalClose} aria-label="Close modal">
            <IconX size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <>
            {/* Title & Subtext */}
            <div className="waitlist-intro">
              <h2 className="waitlist-title">Join the PoultryVision Waitlist</h2>
              <p className="waitlist-subtext">
                Be among the first Nigerian poultry farmers to access AI-powered flock monitoring. We'll notify you as soon as early access opens.
              </p>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="waitlist-form">
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <div className="input-wrap">
                  <IconUser size={18} className="input-icon text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Olusegun Falana"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <div className="input-wrap">
                  <IconMail size={18} className="input-icon text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="your.name@farm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="form-group">
                <label className="form-label">
                  WhatsApp Number <span className="optional-tag">(Optional)</span>
                </label>
                <div className="input-wrap">
                  <IconPhone size={18} className="input-icon text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+234 803 000 0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Farm Type & Flock Size */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Farm Type</label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value)}
                    className="form-select"
                  >
                    <option value="Broiler">Broiler</option>
                    <option value="Layer">Layer</option>
                    <option value="Day-Old Chicks/Nursery">Day-Old Chicks/Nursery</option>
                    <option value="Mixed/Integrated">Mixed/Integrated</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Flock Size</label>
                  <select
                    value={flockSize}
                    onChange={(e) => setFlockSize(e.target.value)}
                    className="form-select"
                  >
                    <option value="Under 1,000">Under 1,000</option>
                    <option value="1,000–5,000">1,000–5,000</option>
                    <option value="5,000–20,000">5,000–20,000</option>
                    <option value="20,000–100,000">20,000–100,000</option>
                    <option value="100,000+">100,000+</option>
                  </select>
                </div>
              </div>

              {/* CCTV Camera Setup */}
              <div className="form-group">
                <label className="form-label">
                  Do you currently have CCTV installed in your pens?
                </label>
                <select
                  value={cctvStatus}
                  onChange={(e) => setCctvStatus(e.target.value)}
                  className="form-select"
                >
                  <option value="Yes — IP / NVR System">Yes — IP / NVR System Installed</option>
                  <option value="Yes — Analog / DVR System">Yes — Analog / DVR System Installed</option>
                  <option value="Planning to install soon">Planning to install soon</option>
                  <option value="No — Need recommendation">No — Need equipment recommendation</option>
                </select>
              </div>

              {/* Biggest Monitoring Challenge */}
              <div className="form-group">
                <label className="form-label">
                  What's your biggest monitoring challenge? <span className="optional-tag">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. I manage 3 pens and can't watch all of them at the same time..."
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="waitlist-submit-btn"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 size={18} className="spin-animation" />
                    <span>Adding you to waitlist...</span>
                  </>
                ) : (
                  <>
                    <span>Join the waitlist</span>
                    <IconArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="success-container">
            <div className="success-icon-wrap">
              <IconCircleCheck size={46} className="text-emerald-600" />
            </div>
            <h2 className="success-heading">You're on the list!</h2>
            <p className="success-subtext">
              We'll reach out as soon as PoultryVision early access opens. Thank you for your interest.
            </p>
            <button
              type="button"
              className="waitlist-submit-btn"
              onClick={handleModalClose}
              style={{ maxWidth: '240px', marginTop: '12px' }}
            >
              Done
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="waitlist-footer">
          <span>🇳🇬 Built for Nigerian poultry farms</span>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 120;
          padding-top: max(16px, var(--safe-top));
          padding-bottom: max(16px, var(--safe-bottom));
          padding-left: max(16px, var(--safe-left));
          padding-right: max(16px, var(--safe-right));
        }

        .waitlist-card {
          width: 100%;
          max-width: 500px;
          background: var(--bg-card);
          border-radius: var(--radius-lg, 16px);
          box-shadow: var(--shadow-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 92vh;
          max-height: 92dvh;
          overflow-y: auto;
          animation: modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .waitlist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-primary);
        }

        .brand-highlight {
          color: var(--color-primary);
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: var(--radius-md);
          transition: background-color 0.15s, color 0.15s;
        }

        .close-btn:hover {
          background-color: var(--border-light);
          color: var(--text-primary);
        }

        .waitlist-intro {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .waitlist-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .waitlist-subtext {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .waitlist-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 480px) {
          .modal-backdrop {
            padding-top: max(8px, var(--safe-top));
            padding-bottom: max(8px, var(--safe-bottom));
            padding-left: max(8px, var(--safe-left));
            padding-right: max(8px, var(--safe-right));
          }
          .waitlist-card {
            padding: 18px 14px;
            max-height: 94vh;
            max-height: 94dvh;
            gap: 12px;
            border-radius: 14px;
          }
          .waitlist-title {
            font-size: 1.15rem;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        .form-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required-star {
          color: #DC2626;
        }

        .optional-tag {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          width: 18px;
          height: 18px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          font-family: inherit;
          font-size: 0.86rem;
          background: var(--bg-card);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input {
          padding: 10px 14px 10px 40px;
        }

        .form-select {
          padding: 10px 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .form-textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 72px;
          line-height: 1.45;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: var(--text-muted);
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
        }

        .waitlist-submit-btn {
          width: 100%;
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          padding: 12px 24px;
          font-size: 0.92rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          margin-top: 4px;
        }

        .waitlist-submit-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.22);
        }

        .waitlist-submit-btn:active {
          transform: translateY(0);
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }

        .success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 16px;
          gap: 12px;
          animation: modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(5, 150, 105, 0.25);
          margin-bottom: 4px;
        }

        .success-heading {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .success-subtext {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          max-width: 360px;
        }

        .waitlist-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
          border-top: 1px solid var(--border-light);
          padding-top: 12px;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
