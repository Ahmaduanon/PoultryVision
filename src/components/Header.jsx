import React, { useState, useEffect } from 'react';
import { 
  IconBell, IconChevronDown, IconCamera, IconLayersIntersect, IconServer, 
  IconFileAnalytics, IconUser, IconLogout, IconMenu2, IconX, IconArrowRight, 
  IconArrowLeft, IconBrandWhatsapp 
} from '@tabler/icons-react';

export default function Header({ activeTab, setActiveTab, activeShed, setActiveShed, unreadAlertsCount, user, onOpenWaitlist, onLogout }) {
  const [time, setTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const shedOptions = [
    { id: 'shed-01', name: 'Shed 01 - Broilers (Oyo Complex)', birds: 4200 },
    { id: 'shed-02', name: 'Shed 02 - Layers (Ogun Complex)', birds: 3800 },
    { id: 'shed-03', name: 'Shed 03 - Nursery Chicks (Kaduna)', birds: 1500 },
  ];

  // Landing & Demo Intro Header (public — clean branding & navigation)
  if (activeTab === 'landing' || activeTab === 'demo-intro') {
    return (
      <header className="landing-header-wrapper">
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-backdrop" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true"
          />
        )}

        <div className="landing-header-pill">
          {/* Official Brand Logo */}
          <div 
            className="brand-container cursor-pointer" 
            onClick={() => setActiveTab('landing')}
            title="PoultryVision Home"
          >
            <img 
              src="/brand-logo-dark.png" 
              alt="PoultryVision" 
              className="landing-brand-logo" 
            />
          </div>

          {/* Desktop Center Links */}
          <nav className="desktop-landing-links">
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#capabilities" className="nav-link">Capabilities</a>
            <a href="#dashboard" className="nav-link">Dashboard</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="landing-auth-actions">
            <button 
              type="button"
              className="nav-btn-demo" 
              onClick={() => setActiveTab('demo-intro')}
            >
              See demo
            </button>
            <button 
              type="button"
              className="nav-btn-waitlist" 
              onClick={onOpenWaitlist}
            >
              Join waitlist
            </button>
            <button 
              type="button"
              className="hamburger-btn touch-target"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Floating Card Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-hamburger-dropdown fade-in">
            <div className="mobile-dropdown-links">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
              <a href="#capabilities" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
              <a href="#dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </div>
            <div className="mobile-drawer-auth">
              <button 
                type="button"
                className="nav-btn-demo w-full" 
                onClick={() => { setMobileMenuOpen(false); setActiveTab('demo-intro'); }}
              >
                See demo
              </button>
              <button 
                type="button"
                className="nav-btn-waitlist w-full" 
                onClick={() => { setMobileMenuOpen(false); onOpenWaitlist(); }}
              >
                Join waitlist
              </button>
            </div>
          </div>
        )}

        <style>{`
          .landing-header-wrapper {
            position: fixed;
            top: 16px;
            left: 0;
            right: 0;
            z-index: 90;
            display: flex;
            justify-content: center;
            padding: 0 20px;
            pointer-events: none;
          }

          .mobile-menu-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.25);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            z-index: 95;
            pointer-events: auto;
          }

          .landing-header-pill {
            pointer-events: auto;
            position: relative;
            z-index: 100;
            width: 100%;
            max-width: 1080px;
            height: 56px;
            background: rgba(255, 255, 255, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(226, 232, 240, 0.9);
            border-radius: 9999px;
            box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px 0 20px;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .brand-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
          }

          .landing-brand-logo {
            height: 25px;
            width: auto;
            max-width: 145px;
            object-fit: contain;
            display: block;
            transition: opacity 0.15s ease, transform 0.15s ease;
          }

          .brand-container:hover .landing-brand-logo {
            opacity: 0.88;
            transform: scale(0.99);
          }

          .desktop-landing-links {
            display: none;
            align-items: center;
            gap: 4px;
          }

          @media (min-width: 820px) {
            .desktop-landing-links {
              display: flex;
            }
          }

          .nav-link {
            font-size: 0.88rem;
            font-weight: 500;
            color: #475569;
            text-decoration: none;
            padding: 7px 14px;
            border-radius: 9999px;
            transition: all 0.15s ease;
          }

          .nav-link:hover {
            color: #0F172A;
            background: rgba(241, 245, 249, 0.9);
          }

          .landing-auth-actions {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-btn-demo {
            font-size: 0.84rem;
            font-weight: 600;
            padding: 8px 18px;
            border-radius: 9999px;
            background: #0F172A;
            color: #FFFFFF;
            border: 1px solid #0F172A;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            white-space: nowrap;
          }

          .nav-btn-demo:hover {
            background: #1E293B;
            border-color: #1E293B;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
          }

          .nav-btn-demo:active {
            transform: translateY(0);
          }

          @media (max-width: 767px) {
            .nav-btn-demo {
              display: none;
            }
          }

          .nav-btn-waitlist {
            font-size: 0.84rem;
            font-weight: 600;
            padding: 8px 18px;
            border-radius: 9999px;
            background: #FB8500;
            color: #FFFFFF;
            border: 1px solid #FB8500;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 8px rgba(251, 133, 0, 0.28);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            white-space: nowrap;
          }

          .nav-btn-waitlist:hover {
            background: #E07400;
            border-color: #E07400;
            transform: translateY(-1px);
            box-shadow: 0 5px 14px rgba(251, 133, 0, 0.38);
          }

          .nav-btn-waitlist:active {
            transform: translateY(0);
          }

          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            background: rgba(241, 245, 249, 0.8);
            border: 1px solid rgba(226, 232, 240, 0.9);
            border-radius: 9999px;
            width: 36px;
            height: 36px;
            padding: 0;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .hamburger-btn:hover {
            background: #E2E8F0;
            color: #0F172A;
          }

          @media (min-width: 820px) {
            .hamburger-btn {
              display: none;
            }
          }

          .mobile-hamburger-dropdown {
            pointer-events: auto;
            position: absolute;
            top: calc(100% + 8px);
            left: 16px;
            right: 16px;
            max-width: 1080px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(226, 232, 240, 0.95);
            border-radius: 20px;
            box-shadow: 0 16px 36px -4px rgba(15, 23, 42, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.06);
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            animation: dropdownIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 100;
          }

          @keyframes dropdownIn {
            from {
              opacity: 0;
              transform: translateY(-8px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .mobile-dropdown-links {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .mobile-hamburger-dropdown a {
            font-size: 0.95rem;
            font-weight: 500;
            color: #334155;
            text-decoration: none;
            padding: 10px 14px;
            border-radius: 12px;
            transition: background 0.15s ease, color 0.15s ease;
          }

          .mobile-hamburger-dropdown a:hover {
            background: #F1F5F9;
            color: #0F172A;
          }

          .mobile-drawer-auth {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 12px;
            border-top: 1px solid #E2E8F0;
            margin-top: 6px;
          }

          .mobile-drawer-auth .nav-btn-demo {
            display: flex !important;
            width: 100%;
            padding: 11px 18px;
            font-size: 0.9rem;
          }

          .mobile-drawer-auth .nav-btn-waitlist {
            width: 100%;
            padding: 11px 18px;
            font-size: 0.9rem;
          }

          @media (max-width: 767px) {
            .landing-header-wrapper {
              top: 10px;
              padding: 0 12px;
            }
            .landing-header-pill {
              height: 52px;
              padding: 0 6px 0 16px;
            }
            .landing-brand-logo {
              height: 22px;
              max-width: 125px;
            }
          }
        `}</style>
      </header>
    );
  }

  // App Control Center Header (For Logged In Users / Dashboard Navigation)
  return (
    <header className="header-bar">
      <div className="header-left">
        <div className="brand-container cursor-pointer" onClick={() => setActiveTab('landing')}>
          <img src="/brand-logo-dark.png" alt="PoultryVision" className="header-brand-logo" />
          <span className="brand-console-pill">Console</span>
        </div>

        {/* Desktop Top View Navigation for Logged In Users */}
        <div className="top-nav-links">
          <button 
            className={`top-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <IconCamera className="w-4 h-4" />
            <span>Live Control Center</span>
          </button>
          <button 
            className={`top-nav-btn ${activeTab === 'cameras' ? 'active' : ''}`}
            onClick={() => setActiveTab('cameras')}
          >
            <IconServer className="w-4 h-4" />
            <span>Pens & Cameras</span>
          </button>
          <button 
            className={`top-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <IconFileAnalytics className="w-4 h-4" />
            <span>Reports</span>
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="shed-selector-container">
          <IconLayersIntersect className="w-4 h-4 text-slate-400" />
          <select 
            value={activeShed} 
            onChange={(e) => setActiveShed(e.target.value)}
            className="shed-select"
          >
            {shedOptions.map((shed) => (
              <option key={shed.id} value={shed.id}>
                {shed.name} ({shed.birds.toLocaleString()} birds)
              </option>
            ))}
          </select>
          <IconChevronDown className="w-4 h-4 text-slate-500 pointer-events-none" />
        </div>

        {user ? (
          <div className="user-profile-pill">
            <div className="user-avatar">
              <IconUser className="w-3.5 h-3.5 text-emerald-700" />
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role || 'Farm Manager'}</span>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Log Out">
              <IconLogout className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        ) : (
          <div className="auth-btn-group">
            <button className="auth-nav-btn join-waitlist-btn hidden-mobile" onClick={onOpenWaitlist}>
              <span>Join Waitlist</span>
            </button>
            <button className="auth-nav-btn exit-demo-btn" onClick={() => setActiveTab('landing')} title="Exit Demo">
              <IconArrowLeft size={14} />
              <span className="exit-btn-text">Exit</span>
            </button>
          </div>
        )}

        <button 
          onClick={() => setActiveTab('alerts')} 
          className="alert-btn"
          title="Open Alert Center"
        >
          <IconBell className="w-5 h-5 text-slate-700" />
          {unreadAlertsCount > 0 && (
            <span className="alert-badge">{unreadAlertsCount}</span>
          )}
        </button>
      </div>

      <style>{`
        .cursor-pointer { cursor: pointer; }
        .header-bar {
          height: var(--header-height);
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-light);
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: var(--shadow-sm);
        }

        @media (min-width: 640px) {
          .header-bar {
            padding: 0 24px;
          }
        }

        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (min-width: 640px) {
          .header-left, .header-right {
            gap: 16px;
          }
        }

        .brand-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-brand-logo {
          height: 28px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .brand-console-pill {
          font-size: 0.68rem;
          font-weight: 700;
          color: #3F6212;
          background: #ECFCCB;
          border: 1px solid #D9F99D;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .join-waitlist-btn {
          background: #0F172A;
          color: white;
          border-radius: var(--radius-full);
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .join-waitlist-btn:hover {
          background: #1E293B;
        }

        .exit-demo-btn {
          background: #F8FAFC;
          color: #475569;
          border-radius: var(--radius-full);
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1px solid var(--border-light);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .exit-demo-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .brand-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid rgba(5, 150, 105, 0.2);
          flex-shrink: 0;
        }

        .brand-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 7px;
          height: 7px;
          background: var(--color-primary);
          border-radius: 50%;
          border: 2px solid white;
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-highlight {
          color: var(--color-primary);
        }

        .brand-subtitle {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .top-nav-links {
          display: none;
          align-items: center;
          gap: 4px;
          background: var(--bg-app);
          padding: 3px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          margin-left: 12px;
        }

        @media (min-width: 960px) {
          .top-nav-links {
            display: flex;
          }
        }

        .top-nav-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .top-nav-btn.active {
          background: var(--bg-card);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        .shed-selector-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-light);
          padding: 5px 10px;
          border-radius: var(--radius-md);
          max-width: 170px;
        }

        @media (min-width: 640px) {
          .shed-selector-container {
            max-width: none;
            padding: 6px 14px;
          }
        }

        .shed-select {
          appearance: none;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 0.78rem;
          color: var(--text-primary);
          padding-right: 14px;
          cursor: pointer;
          outline: none;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }

        .user-profile-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-app);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .user-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .user-role {
          font-size: 0.64rem;
          color: var(--text-muted);
        }

        .logout-btn {
          padding: 2px;
        }

        .auth-btn-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .auth-nav-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: var(--radius-md);
        }

        .auth-nav-btn.signin {
          background: var(--bg-app);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        .alert-btn {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background-color: var(--bg-app);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .alert-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: var(--color-danger);
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          height: 16px;
          min-width: 16px;
          padding: 0 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        @media (max-width: 640px) {
          .header-brand-logo {
            height: 22px;
          }
          .brand-console-pill {
            display: none;
          }
          .hidden-mobile {
            display: none !important;
          }
          .shed-selector-container {
            max-width: 125px;
            padding: 4px 6px;
          }
          .shed-select {
            font-size: 0.72rem;
          }
          .exit-demo-btn {
            padding: 5px 8px;
            font-size: 0.75rem;
            gap: 4px;
          }
          .alert-btn {
            width: 32px;
            height: 32px;
          }
          .brand-subtitle, .user-role {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
