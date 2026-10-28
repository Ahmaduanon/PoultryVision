import React, { useState, useEffect } from 'react';
import { 
  IconArrowRight, IconCamera, IconCheck, IconBolt,
  IconBellRinging, IconCpu, IconActivity, IconMapPin, IconEye, 
  IconAlertTriangle, IconVideo, IconBrandWhatsapp, IconChartBar, 
  IconPlant2, IconBuildingSkyscraper, IconUsers, IconTrendingUp, 
  IconMessageDots, IconChevronDown, IconShieldCheck
} from '@tabler/icons-react';

export default function LandingPage({ onLaunchDemo, onOpenWaitlist }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is PoultryVision and how does it work with my CCTV?",
      a: "PoultryVision is an AI-powered flock monitoring platform that integrates directly with your poultry house CCTV recording stream (IP cameras, NVR, or DVR). The AI continuously reviews live and recorded footage 24/7, detects subtle behavioral anomalies (such as cold-stress huddling, drinker avoidance, or lethargy), and dispatches instant WhatsApp and SMS alerts directly to your phone."
    },
    {
      q: "What kind of CCTV cameras and NVR/DVR systems are supported?",
      a: "PoultryVision is designed to work with standard on-farm security cameras. We support IP cameras with RTSP video streams, as well as major commercial NVR and DVR brands common in Nigerian agricultural installations (including Hikvision, Dahua, Uniview, and generic ONVIF-compatible systems)."
    },
    {
      q: "Do I need high-speed broadband in my poultry sheds?",
      a: "No. The system utilizes lightweight, bandwidth-efficient stream ingestion. Instead of sending raw high-bitrate video, our cloud engine processes compressed keyframe sequences, allowing reliable 24/7 review and instant alert dispatch even over standard rural 3G or 4G mobile routers."
    },
    {
      q: "Does PoultryVision monitor my flock at night?",
      a: "Yes. In fact, night hours are when broiler and layer flocks are most vulnerable to temperature drops, heater brooder failures, and draft leaks. PoultryVision supports infrared night-vision CCTV feeds, continuously tracking thermal huddling and distress clustering while your team sleeps."
    },
    {
      q: "Does PoultryVision diagnose specific avian diseases?",
      a: "No. PoultryVision is strictly an early-warning behavioral monitoring system, not a veterinary medical diagnostic tool. It highlights behavioral anomalies (such as sudden lethargy, micro-clustering, or feeder line avoidance) so your farm manager and veterinarian can inspect the exact pen area before issues escalate."
    },
    {
      q: "How are alerts delivered when something is wrong?",
      a: "When PoultryVision detects an anomaly, it immediately sends a multi-channel alert via WhatsApp and SMS featuring the shed location, anomaly type, and a visual snapshot clip, while logging the incident in your live web dashboard."
    }
  ];

  return (
    <div className="landing-wrapper fade-in">
      {/* Precision Background Grid Overlay */}
      <div className="precision-bg-grid" aria-hidden="true"></div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO — The Core Promise (Centered Layout with Flock Background) */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero-centered-block">
        {/* Background Image Layer */}
        <div className="hero-bg-image" style={{ backgroundImage: `url('/flock-hero.jpg')` }}></div>
        <div className="hero-radial-vignette"></div>

        <div className="hero-centered-container">
          {/* Eyebrow Pill */}
          <div className="hero-pill-eyebrow">
            <IconCamera size={14} className="text-amber-600" />
            <span>AI-Powered CCTV Flock Monitoring • Direct NVR/DVR Stream Review</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-centered-headline">
            See what’s happening in your flock <br className="hidden-mobile" />
            <span className="text-orange-highlight">before it becomes a bigger problem.</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-centered-subheadline">
            PoultryVision connects directly to your poultry house CCTV recording stream — continuously reviewing flock behavior 24/7 and dispatching instant WhatsApp and SMS alerts the moment anomalies arise.
          </p>

          {/* Centered Pill CTAs */}
          <div className="hero-pill-actions">
            <button 
              className="pill-btn-dark-lg touch-target"
              onClick={onLaunchDemo}
            >
              <span>See demo</span>
              <IconArrowRight size={16} />
            </button>
            
            <button 
              className="pill-btn-outline-lg touch-target"
              onClick={onOpenWaitlist}
            >
              <span>Join waitlist</span>
              <IconArrowRight size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <span className="badge-dot green"></span>
              <span>Direct CCTV NVR / DVR Sync</span>
            </div>
            <div className="trust-badge-item">
              <span className="badge-dot orange"></span>
              <span>24/7 Continuous AI Review</span>
            </div>
            <div className="trust-badge-item">
              <span className="badge-dot blue"></span>
              <span>Instant WhatsApp & SMS Alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. PROBLEM SECTION — "You can’t watch every bird" */}
      {/* ------------------------------------------------------------------ */}
      <section className="problem-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">The Continuous Oversight Challenge</div>
            <h2 className="section-heading">A flock can change before you notice.</h2>
            <p className="section-lead">
              Even with CCTV cameras installed in your sheds, farm managers cannot stare at security monitors 24 hours a day across multiple pens. Subtle shifts in movement, nocturnal cold-stress huddling, and feeder avoidance slip past unnoticed until mortality starts.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-card card stagger-child">
              <div className="problem-card-top">
                <div className="card-number">01</div>
                <span className="problem-pill">Passive Video Problem</span>
              </div>
              <h3 className="card-title">CCTV footage sits unwatched</h3>
              <p className="card-desc">
                Traditional security cameras merely record video to a hard drive in the farm office. Farm attendants have too many physical chores to stare at screens, leaving over 95% of recorded footage unreviewed until after losses occur.
              </p>
              <div className="problem-stat-box">
                <span className="stat-highlight">95%+</span>
                <span className="stat-label">of recorded pen CCTV video is never actively reviewed in real-time.</span>
              </div>
            </div>

            <div className="problem-card card stagger-child">
              <div className="problem-card-top">
                <div className="card-number">02</div>
                <span className="problem-pill">Silent Early Stress</span>
              </div>
              <h3 className="card-title">Night & draft changes are subtle</h3>
              <p className="card-desc">
                Heater failures at 2:00 AM, sudden cold drafts, and drinker line clogs don't trigger loud alarms. Birds subtly huddle into dense packs or avoid cold floor zones 24 to 48 hours before physical mortality or uneven batch weights become obvious.
              </p>
              <div className="problem-stat-box">
                <span className="stat-highlight">24–48 hrs</span>
                <span className="stat-label">behavioral shifts precede clinical symptoms or sudden mortality spikes.</span>
              </div>
            </div>

            <div className="problem-card card stagger-child">
              <div className="problem-card-top">
                <div className="card-number">03</div>
                <span className="problem-pill">Response Delay</span>
              </div>
              <h3 className="card-title">Manual checks happen too late</h3>
              <p className="card-desc">
                By the time an attendant enters the shed for the morning walk-through at 7:00 AM, prolonged nocturnal hypothermia or feeder pan blockages have already harmed flock vitality and compromised batch Feed Conversion Ratios (FCR).
              </p>
              <div className="problem-stat-box">
                <span className="stat-highlight">5–8 hrs</span>
                <span className="stat-label">delay between overnight pen equipment failure and morning inspection.</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase for Problem */}
          <div className="problem-visual-box card stagger-child">
            <img src="/flock-hero.jpg" alt="Poultry House Flock Observation" className="problem-img" />
            <div className="visual-overlay-layer">
              <div className="overlay-badge-row">
                <div className="overlay-badge badge-orange">
                  <span>CCTV NVR Live AI Feed • Cam 01</span>
                </div>
                <div className="overlay-status-pill">
                  <span className="pulse-dot-green"></span>
                  <span>Continuous Cloud AI Review</span>
                </div>
              </div>
              <div className="overlay-content-bottom">
                <p className="overlay-quote">
                  "PoultryVision converts passive CCTV recordings into an active 24/7 flock sentinel — automatically catching huddling and feeder avoidance while you sleep."
                </p>
                <div className="overlay-metrics-strip">
                  <div className="strip-item">
                    <span className="strip-label">Camera Source:</span>
                    <span className="strip-val">Shed 01 NVR (1080p RTSP)</span>
                  </div>
                  <div className="strip-item">
                    <span className="strip-label">Flock Dispersion:</span>
                    <span className="strip-val text-emerald-400">Normal (82% Active)</span>
                  </div>
                  <div className="strip-item">
                    <span className="strip-label">Alert Trigger:</span>
                    <span className="strip-val text-amber-400">WhatsApp Notification Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. SOLUTION SECTION — Introduce PoultryVision */}
      {/* ------------------------------------------------------------------ */}
      <section className="solution-block reveal-on-scroll">
        <div className="section-inner">
          <div className="solution-split">
            <div className="solution-text stagger-child">
              <div className="eyebrow-tag">Meet PoultryVision</div>
              <h2 className="section-heading">Turn your CCTV cameras into an active 24/7 flock guardian.</h2>
              <p className="section-lead">
                PoultryVision connects directly to your poultry house CCTV NVR/DVR stream. Instead of passive video sitting unwatched on a hard drive, our AI continuously reviews recorded footage in near real-time, detecting flock stress patterns and sending immediate alerts directly to your phone.
              </p>
              
              <div className="solution-benefits-list">
                <div className="benefit-item">
                  <div className="benefit-check">
                    <IconCheck size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <strong>Continuous 24/7 Stream Review:</strong>
                    <span> Automatically monitors video day and night without requiring human eyes on security monitors.</span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-check">
                    <IconCheck size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <strong>Instant Multi-Channel Alerts:</strong>
                    <span> Dispatches immediate WhatsApp and SMS notifications with photo snapshots of flagged pen areas.</span>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-check">
                    <IconCheck size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <strong>Compatible with Existing CCTV:</strong>
                    <span> Integrates seamlessly with your existing IP cameras, analog DVRs, or NVR setups.</span>
                  </div>
                </div>
              </div>

              <div className="solution-cta-row">
                <button className="pill-btn-dark-lg touch-target" onClick={onLaunchDemo}>
                  <span>See how it works</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="solution-steps-list">
              <div className="step-card card stagger-child">
                <span className="step-num-pill">01</span>
                <div className="step-content-body">
                  <h4 className="step-heading">Stream Ingestion</h4>
                  <p className="step-body">
                    Your on-farm CCTV cameras or NVR continuously stream recorded pen footage to PoultryVision via a secure, low-bandwidth cloud bridge. No camera hardware replacements needed.
                  </p>
                  <div className="step-tag-pill">
                    <IconCamera size={14} className="text-slate-500" />
                    <span>Works with IP & Analog NVR/DVR</span>
                  </div>
                </div>
              </div>

              <div className="step-card card stagger-child">
                <span className="step-num-pill">02</span>
                <div className="step-content-body">
                  <h4 className="step-heading">Automated AI Review</h4>
                  <p className="step-body">
                    Our computer vision algorithms review the video round-the-clock — analyzing spatial flock dispersion, movement velocity vectors, feeder line attendance, and thermal clustering.
                  </p>
                  <div className="step-tag-pill">
                    <IconBolt size={14} className="text-amber-500" />
                    <span>Real-time Behavioral Analytics</span>
                  </div>
                </div>
              </div>

              <div className="step-card card stagger-child">
                <span className="step-num-pill">03</span>
                <div className="step-content-body">
                  <h4 className="step-heading">Immediate Actionable Alerts</h4>
                  <p className="step-body">
                    When unusual clustering or inactivity is identified, PoultryVision dispatches an immediate alert to WhatsApp and your dashboard with an annotated video snapshot of the exact pen coordinate.
                  </p>
                  <div className="step-tag-pill">
                    <IconBellRinging size={14} className="text-emerald-600" />
                    <span>WhatsApp, SMS & Web Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. HOW IT WORKS */}
      {/* ------------------------------------------------------------------ */}
      <section id="how-it-works" className="how-it-works-block reveal-on-scroll">
        <div className="section-inner text-center">
          <div className="eyebrow-tag">Automated Pipeline</div>
          <h2 className="section-heading">From CCTV stream to instant alert in seconds.</h2>
          <p className="section-lead max-w-700">
            A fully automated monitoring pipeline designed for commercial Nigerian poultry complexes — continuous oversight without added labor.
          </p>

          <div className="horizontal-diagram-grid">
            <div className="diagram-card card stagger-child">
              <div className="icon-circle">
                <IconCamera size={24} className="text-orange-accent" />
              </div>
              <span className="diagram-step-tag">Step 1</span>
              <h3 className="diagram-title">CCTV Stream Recording Ingested</h3>
              <p className="diagram-desc">
                Your existing shed CCTV cameras or NVR/DVR sync recorded footage with PoultryVision automatically over your local Wi-Fi or cellular router.
              </p>
              <div className="diagram-features">
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Existing IP / NVR / DVR cameras</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />24/7 continuous recording sync</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Bandwidth-efficient compression</span>
              </div>
            </div>

            <div className="diagram-arrow stagger-child">
              <IconArrowRight size={24} className="text-slate-300" />
            </div>

            <div className="diagram-card card stagger-child">
              <div className="icon-circle">
                <IconCpu size={24} className="text-orange-accent" />
              </div>
              <span className="diagram-step-tag">Step 2</span>
              <h3 className="diagram-title">AI Continuous Behavioral Review</h3>
              <p className="diagram-desc">
                Our vision models review the video continuously, computing flock density heatmaps, optical flow velocity, and feeder zone attendance against baseline diurnal norms.
              </p>
              <div className="diagram-features">
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Detects huddling & cold stress</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Feeder & drinker traffic analysis</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Infrared night vision compatible</span>
              </div>
            </div>

            <div className="diagram-arrow stagger-child">
              <IconArrowRight size={24} className="text-slate-300" />
            </div>

            <div className="diagram-card card stagger-child">
              <div className="icon-circle">
                <IconBellRinging size={24} className="text-orange-accent" />
              </div>
              <span className="diagram-step-tag">Step 3</span>
              <h3 className="diagram-title">Instant Multi-Channel Alerts</h3>
              <p className="diagram-desc">
                If an anomaly occurs, PoultryVision dispatches an immediate WhatsApp and SMS alert with a photo snapshot, guiding attendants straight to the affected pen section.
              </p>
              <div className="diagram-features">
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />WhatsApp & SMS instant dispatch</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Flagged video snapshot image</span>
                <span><IconCheck size={13} className="text-emerald-500" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }} />Exact zone coordinates provided</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. WHAT POULTRYVISION LOOKS FOR */}
      {/* ------------------------------------------------------------------ */}
      <section id="capabilities" className="looks-for-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">Computer Vision Capabilities</div>
            <h2 className="section-heading">Look beyond individual birds. See the flock.</h2>
            <p className="section-lead max-w-700">
              Our AI evaluates continuous CCTV recording streams across four core behavioral dimensions to catch pen distress before physical mortality occurs:
            </p>
          </div>

          <div className="looks-grid">
            <div className="feature-item-card card stagger-child">
              <div className="feature-header-wrap">
                <div className="feature-card-icon"><IconActivity size={24} className="text-lime-600" /></div>
                <span className="feature-badge">Vitality Metric</span>
              </div>
              <h3 className="feature-card-title">Flock Activity Index</h3>
              <p className="feature-card-desc">
                Continuously measures collective kinetic velocity across pen quadrants from your overhead CCTV cameras. Flags abnormal lethargy or sudden drops in flock vitality compared to diurnal baselines.
              </p>
              <div className="feature-detail-box">
                <span className="detail-label">What it flags:</span>
                <span className="detail-text">Sluggish movement, widespread lethargy, or sudden drops in overall flock energy.</span>
              </div>
            </div>

            <div className="feature-item-card card stagger-child">
              <div className="feature-header-wrap">
                <div className="feature-card-icon"><IconMapPin size={24} className="text-orange-500" /></div>
                <span className="feature-badge">Thermal Stress</span>
              </div>
              <h3 className="feature-card-title">Spatial Clustering & Huddling</h3>
              <p className="feature-card-desc">
                Quantifies how evenly birds spread out across the house floor versus abnormal tight crowding. Automatically detects severe micro-clustering under faulty brooder lamps or draft corridors.
              </p>
              <div className="feature-detail-box">
                <span className="detail-label">What it flags:</span>
                <span className="detail-text">Cold drafts from curtain tears, brooder heater malfunctions, or avoidance of wet litter.</span>
              </div>
            </div>

            <div className="feature-item-card card stagger-child">
              <div className="feature-header-wrap">
                <div className="feature-card-icon"><IconEye size={24} className="text-blue-500" /></div>
                <span className="feature-badge">Nutritional Access</span>
              </div>
              <h3 className="feature-card-title">Movement & Feeder Traffic</h3>
              <p className="feature-card-desc">
                Analyzes bird density and movement frequency along automated feeder pans and nipple drinker lines. Identifies whether birds are moving freely to feed or avoiding specific pan lines.
              </p>
              <div className="feature-detail-box">
                <span className="detail-label">What it flags:</span>
                <span className="detail-text">Feeder line blockages, restricted drinker access, or feeding panic stampedes.</span>
              </div>
            </div>

            <div className="feature-item-card card stagger-child">
              <div className="feature-header-wrap">
                <div className="feature-card-icon"><IconAlertTriangle size={24} className="text-amber-500" /></div>
                <span className="feature-badge">Targeted Alerts</span>
              </div>
              <h3 className="feature-card-title">Behavioral Anomalies</h3>
              <p className="feature-card-desc">
                Highlights behavior that may deserve closer observation. Rather than making speculative medical claims, PoultryVision flags the exact spots where flock dynamics look atypical.
              </p>
              <div className="feature-detail-box">
                <span className="detail-label">Important distinction:</span>
                <span className="detail-text">Flags behavior that "may deserve inspection" rather than claiming to diagnose disease.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. WHY IT MATTERS */}
      {/* ------------------------------------------------------------------ */}
      <section className="why-matters-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">Operational Impact</div>
            <h2 className="section-heading">Earlier visibility. Better decisions.</h2>
            <p className="section-lead max-w-700">
              Poultry management depends on noticing changes early. PoultryVision gives farmers another layer of visibility — helping you know where to look, what to investigate, and when something appears different from normal.
            </p>
          </div>

          <div className="outcomes-grid">
            <div className="outcome-card card stagger-child">
              <div className="outcome-bullet"></div>
              <h3 className="outcome-title">24/7 Unbroken Oversight</h3>
              <p className="outcome-desc">
                Protect your flock during vulnerable night hours and between shift changes when no workers are physically in the shed. Automated CCTV review catches nocturnal heater failures instantly.
              </p>
              <div className="outcome-impact-tag">
                <strong>Operational Benefit:</strong>
                <span> Continuous automated security without needing dedicated night-shift video observers.</span>
              </div>
            </div>

            <div className="outcome-card card stagger-child">
              <div className="outcome-bullet"></div>
              <h3 className="outcome-title">Investigate sooner with proof</h3>
              <p className="outcome-desc">
                Receive prioritized WhatsApp and SMS alerts with timestamped snapshot clips. Direct attendants immediately to flagged coordinates rather than having them pace massive sheds aimlessly.
              </p>
              <div className="outcome-impact-tag">
                <strong>Operational Benefit:</strong>
                <span> Catch thermal stress, draft leaks, or water shortages 24–48 hours ahead of physical symptoms.</span>
              </div>
            </div>

            <div className="outcome-card card stagger-child">
              <div className="outcome-bullet"></div>
              <h3 className="outcome-title">Make informed management decisions</h3>
              <p className="outcome-desc">
                Use objective video data alongside your farm crew's practical knowledge. Back up intuition with historical behavioral records when adjusting curtain ventilation, heating, or feed timing.
              </p>
              <div className="outcome-impact-tag">
                <strong>Operational Benefit:</strong>
                <span> Objective historical records across every batch from day-old chicks to final market harvest.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. BUILT FOR REAL POULTRY FARMS */}
      {/* ------------------------------------------------------------------ */}
      <section className="built-for-farms-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">Practical Agritech</div>
            <h2 className="section-heading">Designed around how Nigerian farms actually work.</h2>
            <p className="section-lead max-w-700">
              PoultryVision starts with a simple idea: useful technology shouldn't require farmers to rebuild their entire operation or spend millions on delicate proprietary hardware.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card card stagger-child">
              <div className="pillar-icon"><IconVideo size={24} className="text-lime-600" /></div>
              <h3 className="pillar-title">Works with Existing CCTV</h3>
              <p className="pillar-desc">
                Connects directly to the IP cameras, NVR, or DVR systems already installed in your poultry complex. No specialized optical sensors or expensive camera replacements required.
              </p>
              <span className="pillar-highlight">Utilizes existing farm hardware</span>
            </div>

            <div className="pillar-card card stagger-child">
              <div className="pillar-icon"><IconBrandWhatsapp size={24} className="text-emerald-600" /></div>
              <h3 className="pillar-title">Direct WhatsApp & SMS Alerts</h3>
              <p className="pillar-desc">
                You don't need to stay glued to a computer monitor. Priority alerts and snapshot evidence arrive directly in your WhatsApp inbox and SMS, keeping you informed wherever you are.
              </p>
              <span className="pillar-highlight">Multi-channel instant alerts</span>
            </div>

            <div className="pillar-card card stagger-child">
              <div className="pillar-icon"><IconChartBar size={24} className="text-blue-600" /></div>
              <h3 className="pillar-title">Simple, Actionable Observations</h3>
              <p className="pillar-desc">
                Get understandable observations instead of complicated computer-vision matrices. Clear status indicators and actionable check points that any farm attendant can read in seconds.
              </p>
              <span className="pillar-highlight">Plain-English observations</span>
            </div>

            <div className="pillar-card card stagger-child">
              <div className="pillar-icon"><IconPlant2 size={24} className="text-amber-600" /></div>
              <h3 className="pillar-title">Built for Nigerian Conditions</h3>
              <p className="pillar-desc">
                Engineered for tropical open-sided poultry sheds, natural curtain ventilation, sawdust or wood shavings litter, and intermittent cellular connectivity across Nigerian poultry states.
              </p>
              <span className="pillar-highlight">Tested in tropical sheds</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. DASHBOARD / PRODUCT PREVIEW */}
      {/* ------------------------------------------------------------------ */}
      <section id="dashboard" className="preview-block reveal-on-scroll">
        <div className="section-inner text-center">
          <div className="eyebrow-tag">Product Concept Preview</div>
          <h2 className="section-heading">Your flock. At a glance.</h2>
          <p className="section-lead max-w-600">
            Get a simple overview of what the AI sees — without having to interpret raw computer-vision data or complex telemetry.
          </p>

          <div className="preview-mockup-container card stagger-child">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="mockup-title">PoultryVision Flock Observation Console • Shed 01 NVR Live</span>
            </div>

            <div className="mockup-body">
              <div className="mockup-stats-row">
                <div className="mockup-stat-card">
                  <span className="mockup-label">Flock Activity</span>
                  <span className="mockup-value text-orange-accent">82%</span>
                  <span className="mockup-sub">Overall Movement Index</span>
                </div>

                <div className="mockup-stat-card">
                  <span className="mockup-label">Movement Pace</span>
                  <span className="mockup-value text-emerald-600">Normal</span>
                  <span className="mockup-sub">Expected Diurnal Flow</span>
                </div>

                <div className="mockup-stat-card">
                  <span className="mockup-label">Flock Distribution</span>
                  <span className="mockup-value text-slate-700">Moderate clustering</span>
                  <span className="mockup-sub">Feeder Line Alignment</span>
                </div>

                <div className="mockup-stat-card highlight-inspect">
                  <span className="mockup-label">Areas to Inspect</span>
                  <span className="mockup-value text-orange-accent">2</span>
                  <span className="mockup-sub">WhatsApp Alert Dispatched</span>
                </div>
              </div>

              {/* Mock Pen Zones Diagram */}
              <div className="mockup-zones-bar">
                <div className="zone-indicator">
                  <span className="zone-name">North Feeder Line A</span>
                  <span className="zone-status status-good">Active • 84% Feed Traffic</span>
                </div>
                <div className="zone-indicator alert-zone">
                  <span className="zone-name">Brooder Heater Zone 02</span>
                  <span className="zone-status status-warn">Alert: Cluster Detected (38 Birds)</span>
                </div>
                <div className="zone-indicator">
                  <span className="zone-name">South Drinker Corridor</span>
                  <span className="zone-status status-good">Normal Flow • 92% Vitality</span>
                </div>
              </div>

              {/* Interactive Demo Launcher Trigger */}
              <div className="mockup-cta-overlay">
                <button className="pill-btn-dark-lg touch-target" onClick={onLaunchDemo}>
                  <span>Explore Interactive Prototype Demo</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. WHO IT'S FOR */}
      {/* ------------------------------------------------------------------ */}
      <section className="who-for-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">Target Operations</div>
            <h2 className="section-heading">Built for farmers who can't be everywhere at once.</h2>
            <p className="section-lead max-w-700">
              Designed specifically for growing commercial poultry operations where visual flock oversight needs to scale with bird capacity.
            </p>
          </div>

          <div className="audience-grid">
            <div className="audience-card card stagger-child">
              <div className="audience-icon-wrap"><IconBuildingSkyscraper size={24} className="text-indigo-600" /></div>
              <h3 className="audience-title">Commercial poultry farms</h3>
              <p className="audience-desc">
                Managing 5,000 to 50,000+ birds across multiple sheds with CCTV cameras. Maintain unified oversight over flock vitality and catch localized environmental failures before they impact batch uniformity or feed conversion ratios.
              </p>
              <div className="audience-key-point">
                <span>Key Value: Multi-shed visibility without multiplying manual inspection hours.</span>
              </div>
            </div>

            <div className="audience-card card stagger-child">
              <div className="audience-icon-wrap"><IconUsers size={24} className="text-emerald-600" /></div>
              <h3 className="audience-title">Farm managers & off-site owners</h3>
              <p className="audience-desc">
                Add 24/7 automated oversight to your daily flock checks. Receive instant WhatsApp notifications when heating or ventilation fails at night, without having to stay awake in front of security monitors.
              </p>
              <div className="audience-key-point">
                <span>Key Value: Immediate alert peace-of-mind wherever you are.</span>
              </div>
            </div>

            <div className="audience-card card stagger-child">
              <div className="audience-icon-wrap"><IconTrendingUp size={24} className="text-orange-600" /></div>
              <h3 className="audience-title">Growing poultry businesses</h3>
              <p className="audience-desc">
                Introduce smarter monitoring as your flock and operation expand. Leverage your existing CCTV infrastructure to scale oversight safely without adding heavy overhead labor costs.
              </p>
              <div className="audience-key-point">
                <span>Key Value: Professional flock monitoring standards that scale affordably.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 10. TRUST / CREDIBILITY */}
      {/* ------------------------------------------------------------------ */}
      <section className="trust-block reveal-on-scroll">
        <div className="section-inner text-center">
          <div className="eyebrow-tag">Grounded in Practical Farming</div>
          <h2 className="section-heading">Technology built around real farming problems.</h2>
          <p className="section-lead max-w-700">
            PoultryVision is being developed with direct farmer feedback and practical poultry science at its center — not Silicon Valley hype.
          </p>

          <div className="trust-pillars-grid">
            <div className="trust-pillar-box card stagger-child">
              <div className="trust-pillar-icon"><IconBrandWhatsapp size={24} className="text-emerald-600" /></div>
              <h3 className="trust-pillar-title">Direct Farmer Feedback</h3>
              <p className="trust-pillar-desc">
                Developed through hands-on conversations with commercial broiler and layer producers in Nigeria's primary poultry regions: Oyo, Ogun, and Kaduna states. Every feature addresses a real day-to-day pen management challenge.
              </p>
            </div>

            <div className="trust-pillar-box card stagger-child">
              <div className="trust-pillar-icon"><IconCpu size={24} className="text-blue-600" /></div>
              <h3 className="trust-pillar-title">Purpose-Trained AI & CV</h3>
              <p className="trust-pillar-desc">
                Our computer vision models are built specifically to analyze dense poultry flock movement, spatial clustering dynamics, and velocity changes under variable natural lighting and mesh shadows.
              </p>
            </div>

            <div className="trust-pillar-box card stagger-child">
              <div className="trust-pillar-icon"><IconShieldCheck size={24} className="text-lime-600" /></div>
              <h3 className="trust-pillar-title">Poultry Management Principles</h3>
              <p className="trust-pillar-desc">
                Grounded in established broiler welfare metrics, diurnal feeding cycles, and practical biosecurity standards. We emphasize early observation and actionable flags rather than unsupported medical claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 11. EARLY-ACCESS / VALIDATION CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="early-access-block reveal-on-scroll">
        <div className="section-inner card early-access-card text-center stagger-child">
          <div className="early-access-badge">Early Pilot Phase</div>
          <h2 className="section-heading text-inverse">Help shape the future of poultry monitoring.</h2>
          <p className="section-lead text-inverse-sub max-w-700">
            We're developing PoultryVision with poultry farmers — not just for them. Connect your farm's CCTV recording stream to our pilot and help us build technology that solves problems that actually matter on your farm.
          </p>

          <div className="early-access-actions">
            <button 
              className="pill-btn-dark-lg touch-target bg-orange-override"
              onClick={onOpenWaitlist}
            >
              <span>Join the waitlist</span>
              <IconArrowRight size={16} />
            </button>

            <button 
              className="btn-secondary-white touch-target"
              onClick={onOpenWaitlist}
            >
              <IconMessageDots size={16} className="text-orange-accent" />
              <span>Talk to us about your farm</span>
            </button>
          </div>

          <p className="early-access-subnote">
            🇳🇬 Free early pilot access for participating Nigerian commercial broiler and layer farms.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 12. FAQ */}
      {/* ------------------------------------------------------------------ */}
      <section id="faq" className="faq-block reveal-on-scroll">
        <div className="section-inner">
          <div className="section-header text-center">
            <div className="eyebrow-tag">Got Questions?</div>
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-lead max-w-600">
              Straightforward answers about PoultryVision, CCTV camera integration, and how the technology works.
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item card stagger-child ${openFaqIndex === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span className="faq-q-text">{faq.q}</span>
                  <IconChevronDown size={16} className={`faq-arrow ${openFaqIndex === index ? "rotate-180" : ""}`} />
                </div>
                {openFaqIndex === index && (
                  <div className="faq-answer fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-inner">
          <div className="footer-brand-wrap">
            <img 
              src="/brand-logo-dark.png" 
              alt="PoultryVision" 
              className="footer-brand-logo" 
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} PoultryVision Concept. AI-assisted CCTV flock monitoring for Nigerian poultry farms.</p>
        </div>
      </footer>

      {/* Landing Page CSS */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-on-scroll.revealed .stagger-child:nth-child(1) { transition-delay: 0.05s; }
        .reveal-on-scroll.revealed .stagger-child:nth-child(2) { transition-delay: 0.12s; }
        .reveal-on-scroll.revealed .stagger-child:nth-child(3) { transition-delay: 0.18s; }
        .reveal-on-scroll.revealed .stagger-child:nth-child(4) { transition-delay: 0.24s; }
        .stagger-child {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.revealed .stagger-child {
          opacity: 1;
          transform: translateY(0);
        }

        .landing-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0;
          background-color: #F8FAFC;
          background-image: 
            radial-gradient(circle at 50% 12%, rgba(251, 133, 0, 0.06), transparent 50%),
            radial-gradient(circle at 85% 45%, rgba(16, 185, 129, 0.04), transparent 40%),
            radial-gradient(circle at 15% 75%, rgba(251, 133, 0, 0.04), transparent 45%),
            radial-gradient(rgba(15, 23, 42, 0.075) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 100% 100%, 28px 28px;
          color: var(--text-primary);
          padding-bottom: 0;
          position: relative;
        }

        /* Subtle technical background grid accents on sections */
        .landing-wrapper > section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 64px;
          padding-bottom: 64px;
          box-sizing: border-box;
          position: relative;
        }

        /* Subtle ambient glow effects behind alternate sections */
        .problem-block, .looks-for-block, .preview-block {
          background-image: radial-gradient(ellipse at 50% 50%, rgba(251, 133, 0, 0.035) 0%, transparent 70%);
        }

        .solution-block, .built-for-farms-block, .trust-block {
          background-image: radial-gradient(ellipse at 50% 40%, rgba(16, 185, 129, 0.03) 0%, transparent 65%);
        }

        @media (max-width: 767px) {
          .landing-wrapper > section {
            min-height: auto;
            min-height: 100svh;
            padding-top: 48px;
            padding-bottom: 48px;
          }
        }

        .text-orange-highlight {
          color: #FB8500;
        }

        .text-orange-accent {
          color: #FB8500;
        }

        .bg-orange-override {
          background-color: #FB8500 !important;
          color: white !important;
        }
        .bg-orange-override:hover {
          background-color: #E07600 !important;
        }

        .eyebrow-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: #FB8500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        /* 1. HERO CENTERED LAYOUT WITH LANDSCAPE BACKGROUND */
        .hero-centered-block {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 60px 24px;
          overflow: hidden;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-position: center bottom;
          background-size: cover;
          background-repeat: no-repeat;
          opacity: 0.85;
          filter: saturate(1.1);
        }

        .hero-radial-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(248, 250, 252, 0.94) 0%, rgba(248, 250, 252, 0.82) 45%, rgba(248, 250, 252, 0.35) 100%);
        }

        .hero-centered-container {
          position: relative;
          z-index: 10;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 22px;
        }

        .hero-pill-eyebrow {
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
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }

        .hero-centered-headline {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #0F172A;
        }

        @media (min-width: 768px) {
          .hero-centered-headline {
            font-size: 3.6rem;
          }
        }

        .hidden-mobile {
          display: none;
        }
        @media (min-width: 768px) {
          .hidden-mobile { display: inline; }
        }

        .hero-centered-subheadline {
          font-size: 1.1rem;
          color: #475569;
          max-width: 700px;
          line-height: 1.6;
        }

        .hero-pill-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 6px;
        }

        .pill-btn-dark-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0F172A;
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3);
        }
        .pill-btn-dark-lg:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .pill-btn-outline-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          color: #0F172A;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }
        .pill-btn-outline-lg:hover {
          background: #FFFFFF;
          border-color: #CBD5E1;
        }

        .hero-trust-badges {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 14px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .trust-badge-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .badge-dot.green { background: #10B981; }
        .badge-dot.orange { background: #FB8500; }
        .badge-dot.blue { background: #2563EB; }

        /* SECTION LAYOUT GLOBALS */
        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .section-inner {
            padding: 0 48px;
          }
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .section-heading {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        @media (min-width: 768px) {
          .section-heading {
            font-size: 2.8rem;
          }
        }

        .section-lead {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 800px;
        }

        @media (min-width: 768px) {
          .section-lead {
            font-size: 1.15rem;
          }
        }

        .max-w-600 { max-width: 600px; }
        .max-w-700 { max-width: 700px; }

        /* 2. PROBLEM SECTION */
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .problem-card {
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .problem-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-number {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 1rem;
          color: #FB8500;
        }

        .problem-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          background: #FFF7ED;
          color: #EA580C;
          border-radius: var(--radius-full);
          border: 1px solid #FFEDD5;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .problem-stat-box {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-highlight {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          flex-shrink: 0;
        }

        .stat-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .problem-visual-box {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-lg);
          max-height: 380px;
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        .problem-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
        }

        .visual-overlay-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(15,23,42,0.88) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          color: white;
        }

        .overlay-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .badge-orange {
          background: #FB8500;
          color: white;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .overlay-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          padding: 5px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pulse-dot-green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .overlay-content-bottom {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .overlay-quote {
          font-size: 1.05rem;
          font-weight: 600;
          font-style: italic;
          max-width: 650px;
          line-height: 1.5;
        }

        .overlay-metrics-strip {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .strip-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
        }
        .strip-label { color: #94A3B8; }
        .strip-val { font-weight: 700; }

        /* 3. SOLUTION SECTION */
        .solution-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 960px) {
          .solution-split {
            grid-template-columns: 1fr 1.15fr;
          }
        }

        .solution-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 24px 0;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .benefit-item strong {
          color: var(--text-primary);
        }

        .benefit-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ECFDF5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .solution-steps-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .step-card {
          padding: 22px 24px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .step-num-pill {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.95rem;
          color: #FB8500;
          background: #FFF7ED;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          border: 1px solid #FDBA74;
          flex-shrink: 0;
        }

        .step-content-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .step-heading {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .step-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .step-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-app);
          padding: 3px 10px;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-top: 6px;
          border: 1px solid var(--border-light);
        }

        /* 4. HOW IT WORKS */
        .horizontal-diagram-grid {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .diagram-card {
          flex: 1;
          min-width: 260px;
          padding: 36px 26px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          text-align: center;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #FFF7ED;
          border: 1px solid #FDBA74;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .diagram-step-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #FB8500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .diagram-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .diagram-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .diagram-features {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.78rem;
          color: var(--text-muted);
          width: 100%;
        }

        .diagram-arrow {
          display: none;
          align-self: center;
        }

        @media (min-width: 960px) {
          .diagram-arrow {
            display: block !important;
            transform: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }

        /* 5. WHAT POULTRYVISION LOOKS FOR */
        .looks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .feature-item-card {
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .feature-header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .feature-card-icon {
          font-size: 2rem;
        }

        .feature-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: var(--radius-full);
          background: #F1F5F9;
          color: #475569;
          border: 1px solid var(--border-light);
        }

        .feature-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .feature-card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .feature-detail-box {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .detail-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #FB8500;
          letter-spacing: 0.04em;
        }

        .detail-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* 6. WHY IT MATTERS */
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .outcome-card {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .outcome-bullet {
          width: 32px;
          height: 4px;
          background: #FB8500;
          border-radius: 2px;
        }

        .outcome-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .outcome-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .outcome-impact-tag {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }
        .outcome-impact-tag strong {
          color: #0F172A;
        }

        /* 7. BUILT FOR REAL POULTRY FARMS */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .pillar-card {
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .pillar-icon {
          font-size: 2rem;
        }

        .pillar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .pillar-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .pillar-highlight {
          margin-top: auto;
          padding-top: 12px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #FB8500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* 8. DASHBOARD PREVIEW */
        .preview-mockup-container {
          max-width: 950px;
          margin: 32px auto 0 auto;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
        }

        .mockup-header {
          padding: 14px 20px;
          background: #F8FAFC;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mockup-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot.red { background: #EF4444; }
        .dot.yellow { background: #F59E0B; }
        .dot.green { background: #10B981; }

        .mockup-title {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .mockup-body {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .mockup-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .mockup-stat-card {
          padding: 18px 16px;
          background: var(--bg-app);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          text-align: left;
        }

        .highlight-inspect {
          border-color: #FDBA74;
          background: #FFF7ED;
        }

        .mockup-label {
          font-size: 0.74rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }

        .mockup-value {
          font-size: 1.7rem;
          font-weight: 800;
        }

        .mockup-sub {
          font-size: 0.74rem;
          color: var(--text-secondary);
        }

        .mockup-zones-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          padding: 16px;
          background: #F8FAFC;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          text-align: left;
        }

        .zone-indicator {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .zone-name {
          font-size: 0.76rem;
          font-weight: 700;
          color: #334155;
        }
        .zone-status {
          font-size: 0.72rem;
          font-weight: 600;
        }
        .status-good { color: #10B981; }
        .status-warn { color: #EA580C; font-weight: 700; }

        .mockup-cta-overlay {
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        /* 9. WHO IT'S FOR */
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .audience-card {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .audience-icon-wrap {
          font-size: 2.2rem;
        }

        .audience-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .audience-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .audience-key-point {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
          font-size: 0.78rem;
          font-weight: 600;
          color: #FB8500;
        }

        /* 10. TRUST & CREDIBILITY */
        .trust-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 24px;
          text-align: left;
        }

        .trust-pillar-box {
          padding: 32px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
        }

        .trust-pillar-icon {
          font-size: 2rem;
        }

        .trust-pillar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .trust-pillar-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* 11. EARLY ACCESS CTA */
        .early-access-card {
          background: #0F172A;
          color: white;
          padding: 70px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
        }

        @media (min-width: 768px) {
          .early-access-card {
            padding: 85px 48px;
          }
        }

        .early-access-badge {
          display: inline-flex;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          background: rgba(251, 133, 0, 0.2);
          border: 1px solid rgba(251, 133, 0, 0.4);
          font-size: 0.78rem;
          font-weight: 700;
          color: #FB8500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-inverse { color: white; }
        .text-inverse-sub { color: #94A3B8; }

        .early-access-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        .early-access-subnote {
          font-size: 0.82rem;
          color: #64748B;
          margin-top: 6px;
        }

        .btn-secondary-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary-white:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        /* 12. FAQ */
        .faq-accordion {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }

        .faq-item {
          padding: 22px 24px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: var(--radius-md);
          transition: all 0.2s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }
        .faq-item:hover {
          border-color: #CBD5E1;
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .faq-arrow {
          transition: transform 0.2s;
          color: var(--text-muted);
          flex-shrink: 0;
          margin-left: 12px;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .faq-answer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border-light);
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* FOOTER */
        .footer-bar {
          background: #FFFFFF;
          border-top: 1px solid var(--border-light);
          padding: 28px 20px;
          margin-top: 40px;
        }

        .footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-brand-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-copy {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* COMPREHENSIVE MOBILE & ANDROID RESPONSIVENESS */
        @media (max-width: 640px) {
          .landing-wrapper > section {
            padding-top: 36px !important;
            padding-bottom: 36px !important;
            min-height: auto !important;
          }

          .section-inner {
            padding: 0 16px !important;
          }

          .section-header {
            margin-bottom: 24px !important;
            gap: 8px !important;
          }

          .section-heading {
            font-size: clamp(1.45rem, 5.5vw, 1.85rem) !important;
            text-align: center;
          }

          .section-lead {
            font-size: 0.90rem !important;
            line-height: 1.55 !important;
            text-align: center;
          }

          /* Hero Mobile */
          .hero-centered-block {
            padding: 72px 14px 40px 14px !important;
            min-height: auto !important;
          }

          .hero-centered-container {
            gap: 16px !important;
          }

          .hero-centered-headline {
            font-size: clamp(1.65rem, 6.5vw, 2.1rem) !important;
            line-height: 1.2 !important;
          }

          .hero-centered-subheadline {
            font-size: 0.94rem !important;
            line-height: 1.55 !important;
          }

          .hero-pill-actions {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 310px !important;
            gap: 10px !important;
            margin: 10px auto 0 auto !important;
          }

          .pill-btn-dark-lg, .pill-btn-outline-lg {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 20px !important;
            font-size: 0.9rem !important;
          }

          .hero-trust-badges {
            gap: 8px !important;
            margin-top: 10px !important;
          }

          .trust-badge-item {
            font-size: 0.74rem !important;
            padding: 5px 10px !important;
          }

          /* All Grids enforce single column to prevent horizontal overflow */
          .problem-grid,
          .looks-grid,
          .outcomes-grid,
          .pillars-grid,
          .audience-grid,
          .trust-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          /* Cards compact padding */
          .problem-card,
          .feature-item-card,
          .outcome-card,
          .pillar-card,
          .audience-card,
          .trust-pillar-box {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }

          /* Problem visual */
          .problem-visual-box {
            max-height: none !important;
          }

          .problem-img {
            height: 280px !important;
          }

          .visual-overlay-layer {
            padding: 16px !important;
          }

          .overlay-quote {
            font-size: 0.88rem !important;
            line-height: 1.4 !important;
          }

          .overlay-metrics-strip {
            gap: 10px !important;
            font-size: 0.74rem !important;
          }

          /* Solution steps */
          .solution-split {
            gap: 24px !important;
          }

          .solution-benefits-list {
            margin: 16px 0 !important;
            gap: 10px !important;
          }

          .step-card {
            padding: 16px 14px !important;
            gap: 12px !important;
          }

          .step-num-pill {
            padding: 6px 10px !important;
            font-size: 0.85rem !important;
          }

          /* Diagram cards (How it works - Automated Pipeline) */
          .horizontal-diagram-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 20px !important;
          }

          .diagram-card {
            min-width: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 22px 18px !important;
            border-radius: 16px !important;
            text-align: left !important;
            align-items: flex-start !important;
            gap: 10px !important;
            background: #FFFFFF !important;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04) !important;
          }

          .diagram-card .icon-circle {
            width: 44px !important;
            height: 44px !important;
            margin-bottom: 2px !important;
          }

          .diagram-card .diagram-step-tag {
            font-size: 0.70rem !important;
          }

          .diagram-card .diagram-title {
            font-size: 1.05rem !important;
            line-height: 1.35 !important;
          }

          .diagram-card .diagram-desc {
            font-size: 0.84rem !important;
            line-height: 1.5 !important;
          }

          .diagram-card .diagram-features {
            text-align: left !important;
            align-items: flex-start !important;
            gap: 6px !important;
            font-size: 0.78rem !important;
          }

          .diagram-arrow {
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding: 10px 0 !important;
            color: #94A3B8 !important;
            transform: rotate(90deg) !important;
          }

          /* Dashboard preview mockup */
          .preview-mockup-container {
            margin-top: 16px !important;
            border-radius: 14px !important;
          }

          .mockup-body {
            padding: 16px 12px !important;
            gap: 14px !important;
          }

          .mockup-stats-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }

          .mockup-stat-card {
            padding: 12px 10px !important;
          }

          .mockup-value {
            font-size: 1.35rem !important;
          }

          .mockup-zones-bar {
            grid-template-columns: 1fr !important;
            padding: 12px 10px !important;
            gap: 8px !important;
          }

          /* Early access card */
          .early-access-card {
            padding: 36px 18px !important;
            border-radius: 18px !important;
            gap: 16px !important;
            text-align: center;
          }

          .early-access-actions {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 300px !important;
            gap: 10px !important;
          }

          .early-access-actions button,
          .btn-secondary-white {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 20px !important;
            font-size: 0.9rem !important;
          }

          /* FAQ */
          .faq-item {
            padding: 16px 14px !important;
          }

          .faq-question {
            font-size: 0.92rem !important;
          }

          /* Footer */
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
        }

        /* Ultra-narrow Android screens (<= 360px: Galaxy A/S small, Fold cover) */
        @media (max-width: 360px) {
          .section-inner {
            padding: 0 10px !important;
          }

          .hero-centered-headline {
            font-size: 1.55rem !important;
          }

          .hero-pill-eyebrow {
            font-size: 0.74rem !important;
            padding: 4px 10px !important;
          }

          .mockup-stats-row {
            grid-template-columns: 1fr !important;
          }

          .problem-card,
          .feature-item-card,
          .outcome-card,
          .pillar-card,
          .audience-card,
          .trust-pillar-box,
          .step-card,
          .diagram-card,
          .faq-item {
            padding: 16px 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
