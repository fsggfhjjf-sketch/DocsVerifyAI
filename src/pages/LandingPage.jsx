import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  UploadCloud, 
  ScanLine, 
  FileCheck2, 
  Layers, 
  Cpu, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Activity, 
  Zap, 
  AlertTriangle,
  Award
} from 'lucide-react';
import PipelineVisualizer from '../components/PipelineVisualizer';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Top Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <ShieldCheck size={24} color="#fff" />
          </div>
          <div className="nav-logo-text">DocVerify AI</div>
        </div>

        <div className="nav-links">
          <a href="#pipeline">6-Stage Pipeline</a>
          <a href="#architecture">Architecture</a>
          <a href="#features">Features</a>
          <a href="#techstack">Tech Stack</a>
        </div>

        <div className="nav-actions">
          <Link to="/upload" className="btn btn-secondary btn-sm">
            <UploadCloud size={16} /> Quick Upload
          </Link>
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Launch Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge animate-fadeInUp">
          <span className="badge-dot"></span>
          <span>SIH 2026 Grand Challenge • AI Document Verification</span>
        </div>

        <h1 className="hero-title animate-fadeInUp stagger-1">
          Intelligent Document Verification{' '}
          <span className="gradient-text">Powered by AI & Forensics</span>
        </h1>

        <p className="hero-subtitle animate-fadeInUp stagger-2">
          Automatically verify student marksheets, government certificates, and identity credentials.
          Detect forged seals, tampered marks, metadata anomalies, and cross-document inconsistencies with forensic-grade precision.
        </p>

        <div className="hero-actions animate-fadeInUp stagger-3">
          <Link to="/upload" className="btn btn-primary btn-lg">
            <UploadCloud size={20} /> Test Live Document Verification
          </Link>
          <Link to="/dashboard" className="btn btn-secondary btn-lg">
            <FileCheck2 size={20} /> View Nodal Officer Dashboard
          </Link>
        </div>

        {/* Live Counters */}
        <div className="hero-stats animate-fadeInUp stagger-4">
          <div className="hero-stat">
            <div className="hero-stat-value">99.4%</div>
            <div className="hero-stat-label">AI Forensic Accuracy</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">&lt; 2.1s</div>
            <div className="hero-stat-label">Avg. Verification Latency</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">6 Stages</div>
            <div className="hero-stat-label">Autonomous Verification Pipeline</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">Zero Trust</div>
            <div className="hero-stat-label">Tamper & Metadata Detection</div>
          </div>
        </div>
      </section>

      {/* 6-Stage Pipeline Section */}
      <section id="pipeline" style={{ padding: '40px 48px', maxWidth: '1360px', margin: '0 auto' }}>
        <PipelineVisualizer interactive={true} />
      </section>

      {/* Architecture & Tech Stack Section */}
      <section id="architecture" style={{ padding: '40px 48px', maxWidth: '1360px', margin: '0 auto' }}>
        <ArchitectureDiagram />
      </section>

      {/* Features & What Makes it Useful Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why DocVerify AI Matters</h2>
        <p className="section-desc">
          Replacing vulnerable, manual document inspection with high-throughput neural networks and auditable verification chains.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(49, 91, 140, 0.18)', color: 'var(--primary-400)' }}>
              <Zap size={26} />
            </div>
            <h3 className="feature-title">Eliminates 90% Manual Effort</h3>
            <p className="feature-desc">
              Institutions process tens of thousands of admission and recruitment packets. DocVerify AI batch-processes files in seconds with zero operator fatigue.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(242, 118, 94, 0.18)', color: 'var(--coral-500)' }}>
              <AlertTriangle size={26} />
            </div>
            <h3 className="feature-title">Forensic-Grade Tamper Detection</h3>
            <p className="feature-desc">
              Uses Error Level Analysis (ELA) and pixel frequency divergence to uncover forged grades, cloned registrar seals, and photoshopped certificates.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(49, 91, 140, 0.2)', color: '#5f97cd' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 className="feature-title">Cross-Document Reconciliation</h3>
            <p className="feature-desc">
              Cross-compares dates of birth, candidate spellings, father names, and roll numbers between 10th/12th marksheets, Aadhar cards, and government APIs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(245, 235, 221, 0.12)', color: 'var(--cream-100)' }}>
              <Cpu size={26} />
            </div>
            <h3 className="feature-title">Multilingual OCR & NER</h3>
            <p className="feature-desc">
              Powered by advanced Tesseract OCR and Transformer models capable of parsing handwritten marks, noisy scans, and state government documents.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(242, 118, 94, 0.15)', color: 'var(--coral-400)' }}>
              <FileCheck2 size={26} />
            </div>
            <h3 className="feature-title">Rule-Based Compliance Engine</h3>
            <p className="feature-desc">
              Institutional criteria (cutoffs, valid issuance dates, mandatory attachments) are checked deterministically with explainable pass/fail decisions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{ background: 'rgba(214, 107, 83, 0.18)', color: '#d66b53' }}>
              <Award size={26} />
            </div>
            <h3 className="feature-title">Human-in-the-Loop Governance</h3>
            <p className="feature-desc">
              Borderline cases and anomalies are automatically routed to human nodal officers with annotated visual evidence and recommended actions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Transform Document Verification?</h2>
          <p>
            Experience how DocVerify AI brings automated trust, speed, and forensic precision to institutional admissions and government recruitment.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/upload" className="btn btn-primary btn-lg">
              Start Verification Demo <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-text">
          © 2026 DocVerify AI • Built for Smart India Hackathon (SIH 2026)
        </div>
        <div className="footer-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/architecture">Architecture</Link>
          <Link to="/reports">Audit Reports</Link>
        </div>
      </footer>
    </div>
  );
}
