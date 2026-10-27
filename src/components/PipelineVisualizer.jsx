import React, { useState } from 'react';
import { 
  Upload, 
  ScanLine, 
  GitCompare, 
  ShieldAlert, 
  ClipboardCheck, 
  FileCheck, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';

export default function PipelineVisualizer({ activeStepIndex = null, interactive = true }) {
  const [selectedStep, setSelectedStep] = useState(activeStepIndex !== null ? activeStepIndex : 0);

  const steps = [
    {
      step: '1',
      title: 'DOCUMENT INGESTION',
      subtitle: 'Intake & Validation',
      icon: Upload,
      color: '#315B8C',
      badgeColor: 'rgba(49, 91, 140, 0.18)',
      highlights: [
        'Upload application form and multi-doc packages',
        'Support PDF, JPEG, PNG, TIFF file formats',
        'Multi-format validation & anti-virus scanning',
        'Secure cryptographic hashing & intake queue'
      ],
      tech: ['React Dropzone', 'FastAPI', 'S3/Blob Storage', 'SHA-256 Hashing'],
      details: 'Converts multi-page PDFs and compressed images into standardized high-DPI raster representations, strips malicious script payloads, and calculates unique SHA-256 hashes for cryptographic non-repudiation.'
    },
    {
      step: '2',
      title: 'PREPROCESSING & EXTRACTION',
      subtitle: 'Image Prep & OCR Engine',
      icon: ScanLine,
      color: '#4e7cae',
      badgeColor: 'rgba(78, 124, 174, 0.18)',
      highlights: [
        'Image enhancement: denoise, deskew, contrast CLAHE',
        'OCR text extraction via Tesseract & TrOCR',
        'NLP Named Entity Recognition for key information',
        'Extract fields: Name, DOB, Roll No., Marks, Institute'
      ],
      tech: ['OpenCV', 'Tesseract OCR', 'TrOCR / Donut', 'Hugging Face Transformers'],
      details: 'Employs OpenCV morphological filters for perspective skew correction and binarization. Neural OCR engines extract characters with bounding box coordinates, and Transformer NLP models extract structured schema attributes.'
    },
    {
      step: '3',
      title: 'VERIFICATION & CROSS-CHECK',
      subtitle: 'Entity Matching & Govt DBs',
      icon: GitCompare,
      color: '#d66b53',
      badgeColor: 'rgba(214, 107, 83, 0.18)',
      highlights: [
        'Cross-check extracted data across all submitted documents',
        'Verify against Institutional DBs & Digilocker / Govt APIs',
        'Fuzzy string matching & phonetic alignment (Soundex/Levenshtein)',
        'Detect internal inconsistencies between 10th, 12th & ID cards'
      ],
      tech: ['Levenshtein Distance', 'Govt API Adapters', 'PostgreSQL', 'FuzzyWuzzy'],
      details: 'Ensures name spellings, dates of birth, parents names, and roll numbers align precisely between identity proof and educational transcripts. Connects with academic repository APIs for instant roll number authentication.'
    },
    {
      step: '4',
      title: 'AUTHENTICITY ANALYSIS',
      subtitle: 'Computer Vision Forensics',
      icon: ShieldAlert,
      color: '#F2765E',
      badgeColor: 'rgba(242, 118, 94, 0.18)',
      highlights: [
        'Error Level Analysis (ELA) for image compression anomalies',
        'Detect forged/altered numbers, pixel tampering & stamp duplication',
        'Font kerning, typeface anomaly & resolution mismatch detection',
        'Risk scoring: Original, Tampered, Inconsistent, Low Quality'
      ],
      tech: ['PyTorch Forensics', 'Error Level Analysis (ELA)', 'EXIF Inspector', 'CNN Classifier'],
      details: 'Detects digital splicing, cloned stamps, and altered percentages. Examines JPEG compression artifacts across frequency domains to identify regions modified by Photoshop or PDF editing software.'
    },
    {
      step: '5',
      title: 'COMPLIANCE VERIFICATION',
      subtitle: 'Rule-Based Engine',
      icon: ClipboardCheck,
      color: '#e2947d',
      badgeColor: 'rgba(226, 148, 125, 0.18)',
      highlights: [
        'Validate eligibility criteria (cutoffs, quotas, age limits)',
        'Check complete document checklist per program guidelines',
        'Verify issuing authorities and certificate validity periods',
        'Deterministic rule execution with auditable trace tree'
      ],
      tech: ['Python Rule Engine', 'JSON Schema Rules', 'Regulatory Logic', 'Policy DB'],
      details: 'Validates university or government recruitment prerequisites: minimum required aggregate percentages (e.g. 60%+), valid caste or income certificate issuing dates, and required mandatory attachments.'
    },
    {
      step: '6',
      title: 'REPORT GENERATION',
      subtitle: 'Audit Logs & Decisions',
      icon: FileCheck,
      color: '#315B8C',
      badgeColor: 'rgba(49, 91, 140, 0.18)',
      highlights: [
        'Comprehensive verification report with overall confidence score',
        'Visual heatmaps highlighting flagged regions and mismatch reasons',
        'Three-tier status: Verified, Flagged for Fraud, or Manual Review',
        'Tamper-evident downloadable PDF with cryptographic QR code'
      ],
      tech: ['ReportLab / WeasyPrint', 'PDFKit', 'Audit Trail Logger', 'QR Signature'],
      details: 'Produces high-fidelity audit reports containing evidentiary proof of each check. Includes a cryptographic QR verification badge that human admissions officers can scan to verify authenticity directly.'
    }
  ];

  const current = steps[selectedStep] || steps[0];

  return (
    <div className="card card-glass" style={{ padding: '28px', border: '1px solid var(--border-subtle)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ 
              padding: '3px 10px', 
              background: 'rgba(99, 102, 241, 0.15)', 
              color: 'var(--primary-400)', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              SIH 2026 Core Workflow
            </span>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>• 6-Stage AI Architecture</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>End-to-End Verification Pipeline</h3>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success-500)' }}></span> Verified
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger-500)' }}></span> Flagged
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--warning-500)' }}></span> Manual Review
          </span>
        </div>
      </div>

      {/* 6 Stage Interactive Step Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: '12px',
        marginBottom: '24px' 
      }}>
        {steps.map((st, idx) => {
          const Icon = st.icon;
          const isSelected = selectedStep === idx;
          return (
            <div
              key={st.step}
              onClick={() => interactive && setSelectedStep(idx)}
              style={{
                cursor: interactive ? 'pointer' : 'default',
                padding: '16px 12px',
                borderRadius: 'var(--radius-lg)',
                background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                border: isSelected ? `2px solid ${st.color}` : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? `0 0 20px ${st.color}25` : 'none',
                transition: 'all 0.2s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Step number badge */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: st.color,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                marginBottom: '10px',
                boxShadow: `0 2px 8px ${st.color}40`
              }}>
                {st.step}
              </div>

              <div style={{
                color: isSelected ? '#fff' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                lineHeight: 1.3,
                marginBottom: '4px'
              }}>
                {st.title}
              </div>

              <div style={{
                color: 'var(--text-tertiary)',
                fontSize: '0.68rem',
                fontWeight: 500
              }}>
                {st.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Details Box for Selected Step */}
      <div className="pipeline-details-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: `${current.color}20`,
              color: current.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <current.icon size={20} />
            </span>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Stage {current.step}: {current.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: current.color, fontWeight: 600 }}>
                {current.subtitle}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {current.details}
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Core Operations & Capabilities
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
              {current.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={14} color={current.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack for this stage */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-400)', marginBottom: '12px', textTransform: 'uppercase' }}>
              <Sparkles size={14} />
              <span>Technology & Models</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {current.tech.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'var(--primary-300)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)'
          }}>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>
              Execution Performance
            </span>
            Latency target: &lt; 450ms • Scalable microservice
          </div>
        </div>
      </div>
    </div>
  );
}
