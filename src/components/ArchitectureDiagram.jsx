import React, { useState } from 'react';
import { 
  Laptop, 
  Server, 
  Cpu, 
  Database, 
  FileSpreadsheet, 
  Layers, 
  ArrowRight, 
  Code2, 
  CheckCircle, 
  ExternalLink,
  ShieldAlert,
  Boxes
} from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState('engine');

  const layers = [
    {
      id: 'ui',
      title: 'USER INTERFACE',
      color: '#F2765E',
      icon: Laptop,
      features: ['Web Application (React)', 'Upload Documents Portal', 'View Verification Status', 'Download Audit Reports'],
      tech: 'React 19 + Vite, Vanilla CSS System, Framer Motion, Recharts',
      description: 'Responsive, accessible dashboard for students, admissions officers, and government verifiers with real-time WebSocket feedback.'
    },
    {
      id: 'api',
      title: 'API LAYER',
      color: '#315B8C',
      icon: Server,
      features: ['REST APIs & OpenAPI Docs', 'Asynchronous Request Queue', 'JWT Authentication & RBAC', 'Rate Limiting & DDoS Shield'],
      tech: 'FastAPI / Python, Celery Queue, Redis, Pydantic Schema Validation',
      description: 'High-throughput async gateway handling multipart uploads, task polling, and secure institutional authentication.'
    },
    {
      id: 'engine',
      title: 'PROCESSING ENGINE',
      color: '#5f97cd',
      icon: Cpu,
      subFlow: [
        { name: 'Image Processing', tool: 'OpenCV' },
        { name: 'OCR Engine', tool: 'Tesseract / Cloud OCR' },
        { name: 'NLP & Validation', tool: 'Hugging Face / SpaCy' },
        { name: 'Cross-Verification', tool: 'Risk Forensics' }
      ],
      features: ['Denoising & Perspective Deskewing', 'Multilingual Text Extraction', 'Named Entity Disambiguation', 'Tamper & ELA Forensic Classifier'],
      tech: 'OpenCV, Tesseract OCR, Hugging Face Transformers, scikit-learn',
      description: 'The core AI pipeline executing computer vision forensics, OCR text extraction, fuzzy cross-document reconciliation, and risk classification.'
    },
    {
      id: 'db',
      title: 'DATABASE LAYER',
      color: '#e2947d',
      icon: Database,
      features: ['Application & Applicant Records', 'Institute & Govt. DB Connectors', 'Immutable Verification Logs', 'Cryptographic Audit Trail'],
      tech: 'PostgreSQL, SQLAlchemy, Firebase (optional), S3 Blob Store',
      description: 'Stores encrypted document metadata, verification timelines, institutional lookup caches, and audit trails for legal compliance.'
    },
    {
      id: 'reporting',
      title: 'REPORTING SYSTEM',
      color: '#315B8C',
      icon: FileSpreadsheet,
      features: ['Interactive Verification Dashboard', 'Dynamic AI Confidence Scoring', 'Flagged Anomaly Breakdowns', 'Downloadable Tamper-Proof PDF'],
      tech: 'ReportLab, WeasyPrint, Cryptographic QR Signatures',
      description: 'Compiles multi-source verification evidence into printable compliance reports with fraud justifications and QR verification seals.'
    }
  ];

  const techCategories = [
    {
      title: 'Programming & Frameworks',
      color: '#315B8C',
      badges: ['Python 3.11', 'FastAPI', 'React 19', 'Django']
    },
    {
      title: 'OCR & Image Processing',
      color: '#4e7cae',
      badges: ['OpenCV', 'Tesseract OCR', 'TrOCR / Donut', 'PIL/Pillow']
    },
    {
      title: 'NLP & Machine Learning',
      color: '#F2765E',
      badges: ['Hugging Face', 'scikit-learn', 'PyTorch Forensics', 'SpaCy']
    },
    {
      title: 'Databases & Storage',
      color: '#e2947d',
      badges: ['PostgreSQL', 'Redis Cache', 'Firebase / S3', 'ChromaDB']
    },
    {
      title: 'APIs & Integration',
      color: '#F2765E',
      badges: ['DigiLocker API', 'CBSE / Board APIs', 'REST Endpoints', 'Webhooks']
    },
    {
      title: 'Deployment & DevOps',
      color: '#315B8C',
      badges: ['Docker', 'AWS / GCP Cloud', 'Streamlit (Prototypes)', 'GitHub CI/CD']
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Architecture Visualizer Card */}
      <div className="card card-glass" style={{ padding: '28px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              padding: '3px 10px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#60a5fa',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              System Architecture Diagram
            </span>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>• 5 Interconnected Core Layers</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>SIH 2026 Modular Architecture</h3>
        </div>

        {/* Layer Blocks Flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                style={{
                  background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                  border: isSelected ? `2px solid ${layer.color}` : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? `0 4px 20px ${layer.color}25` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: `${layer.color}20`,
                      color: layer.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: layer.color, textTransform: 'uppercase' }}>
                          LAYER {idx + 1}
                        </span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {layer.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack pill */}
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {layer.tech.split(',')[0]}
                  </span>
                </div>

                {/* Subflow for Processing Engine */}
                {layer.subFlow && (
                  <div style={{
                    marginTop: '16px',
                    padding: '14px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    overflowX: 'auto'
                  }}>
                    {layer.subFlow.map((sub, sIdx) => (
                      <React.Fragment key={sub.name}>
                        <div style={{
                          minWidth: '150px',
                          padding: '8px 12px',
                          background: 'var(--bg-elevated)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {sub.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--primary-400)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                            {sub.tool}
                          </div>
                        </div>
                        {sIdx < layer.subFlow.length - 1 && (
                          <ArrowRight size={16} color="var(--text-tertiary)" style={{ flexShrink: 0 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Feature bullets when active */}
                {isSelected && (
                  <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px'
                  }}>
                    {layer.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                        <CheckCircle size={14} color={layer.color} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="card card-glass" style={{ padding: '28px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              padding: '3px 10px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--success-500)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Tech Stack Specification
            </span>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>• Comprehensive SIH Toolkit</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Technology & Framework Breakdown</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {techCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: cat.color
              }}></div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: cat.color, textTransform: 'uppercase', marginBottom: '12px' }}>
                {cat.title}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.badges.map((b, bIdx) => (
                  <span
                    key={bIdx}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
