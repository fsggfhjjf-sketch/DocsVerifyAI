import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  UploadCloud, 
  FileCheck2, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Trash2, 
  Sparkles, 
  Play, 
  RefreshCw, 
  ShieldCheck, 
  Eye, 
  Download,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import VerificationDetailModal from '../components/VerificationDetailModal';

export default function UploadPage() {
  const [applicantName, setApplicantName] = useState('Aarav Sharma');
  const [rollNumber, setRollNumber] = useState('CBSE-2024-4521897');
  const [institution, setInstitution] = useState('IIT Delhi');
  const [program, setProgram] = useState('B.Tech Computer Science');

  const [files, setFiles] = useState([
    { name: '10th_CBSE_Marksheet.pdf', size: '1.4 MB', type: 'application/pdf', status: 'ready' },
    { name: '12th_CBSE_Marksheet.pdf', size: '1.6 MB', type: 'application/pdf', status: 'ready' },
    { name: 'Aadhar_Card_Front_Back.jpg', size: '840 KB', type: 'image/jpeg', status: 'ready' }
  ]);

  // Pipeline simulation states
  const [isVerifying, setIsVerifying] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0); // 0 to 6
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedDemoModal, setSelectedDemoModal] = useState(null);

  // Dropzone setup
  const onDrop = (acceptedFiles) => {
    const formatted = acceptedFiles.map(file => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      status: 'ready'
    }));
    setFiles(prev => [...prev, ...formatted]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Demo Presets for Hackathon Judges
  const loadDemoCase = (caseType) => {
    if (caseType === 'clean') {
      setApplicantName('Aarav Sharma');
      setRollNumber('CBSE-2024-4521897');
      setInstitution('IIT Delhi');
      setProgram('B.Tech Computer Science');
      setFiles([
        { name: '10th_Marksheet.pdf', size: '1.2 MB', type: 'application/pdf', status: 'ready' },
        { name: '12th_Marksheet.pdf', size: '1.5 MB', type: 'application/pdf', status: 'ready' },
        { name: 'Aadhar_Card.jpg', size: '820 KB', type: 'image/jpeg', status: 'ready' },
        { name: 'Transfer_Certificate.pdf', size: '680 KB', type: 'application/pdf', status: 'ready' }
      ]);
    } else if (caseType === 'fraud') {
      setApplicantName('Priya Patel');
      setRollNumber('GSEB-2024-7892341');
      setInstitution('NIT Trichy');
      setProgram('Scholarship Application');
      setFiles([
        { name: '10th_Marksheet.pdf', size: '1.1 MB', type: 'application/pdf', status: 'ready' },
        { name: '12th_Marksheet_Tampered.pdf', size: '1.3 MB', type: 'application/pdf', status: 'ready' },
        { name: 'Income_Certificate_Forged.pdf', size: '560 KB', type: 'application/pdf', status: 'ready' },
        { name: 'Aadhar_Card.jpg', size: '790 KB', type: 'image/jpeg', status: 'ready' }
      ]);
    } else if (caseType === 'mismatch') {
      setApplicantName('Sneha Reddy');
      setRollNumber('UPSC-2026-CSE-89234');
      setInstitution('UPSC');
      setProgram('Civil Services Examination');
      setFiles([
        { name: 'Degree_Certificate.pdf', size: '2.1 MB', type: 'application/pdf', status: 'ready' },
        { name: '10th_Marksheet.pdf', size: '1.2 MB', type: 'application/pdf', status: 'ready' },
        { name: 'Community_Certificate_Obscured.pdf', size: '650 KB', type: 'application/pdf', status: 'ready' }
      ]);
    }
    setVerificationResult(null);
  };

  // Run the 6-step AI pipeline simulation
  const startVerificationPipeline = () => {
    if (files.length === 0) {
      alert('Please upload or keep at least one document to verify.');
      return;
    }

    setIsVerifying(true);
    setPipelineStep(1);
    setVerificationResult(null);

    const isFraudCase = applicantName.includes('Priya') || files.some(f => f.name.toLowerCase().includes('tamper') || f.name.toLowerCase().includes('forged'));
    const isMismatchCase = applicantName.includes('Sneha');

    // Simulate 6 stages with realistic intervals
    setTimeout(() => {
      setPipelineStep(2); // OCR Extraction
      setTimeout(() => {
        setPipelineStep(3); // Cross-check
        setTimeout(() => {
          setPipelineStep(4); // Forensics Analysis
          setTimeout(() => {
            setPipelineStep(5); // Compliance
            setTimeout(() => {
              setPipelineStep(6); // Report Generation
              setTimeout(() => {
                setIsVerifying(false);

                if (isFraudCase) {
                  setVerificationResult({
                    status: 'flagged',
                    score: 42,
                    title: 'CRITICAL ANOMALIES FLAGGED: DOCUMENT TAMPERING DETECTED',
                    desc: 'Error Level Analysis (ELA) found mathematical grade alterations in 12th marksheet. Income certificate seal font differs from standard issuing authority template.',
                    recommendation: 'Reject application or trigger mandatory physical document audit.'
                  });
                } else if (isMismatchCase) {
                  setVerificationResult({
                    status: 'review',
                    score: 71,
                    title: 'MANUAL REVIEW REQUIRED: FORMAT INCONSISTENCY',
                    desc: 'Community certificate issuing authority seal is partially obscured. Identity matches with 96% confidence, but manual reviewer sign-off is required.',
                    recommendation: 'Assigned to Nodal Officer for fast-track manual clearance.'
                  });
                } else {
                  setVerificationResult({
                    status: 'verified',
                    score: 98,
                    title: 'ALL DOCUMENTS VERIFIED & CRYPTOGRAPHICALLY VALID',
                    desc: 'All 4 credentials verified across state board and central registries with zero tampering artifacts. All compliance criteria satisfied.',
                    recommendation: 'Eligible for instant automated admission clearance.'
                  });
                }
              }, 600);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const pipelineStages = [
    { title: '1. Ingestion & Pre-check', desc: 'Validating PDF/JPEG integrity and SHA-256 signatures' },
    { title: '2. OCR & NER Extraction', desc: 'Running OpenCV deskewing and Tesseract text reading' },
    { title: '3. Cross-Document Check', desc: 'Matching Name, DOB, Roll No across multiple transcripts' },
    { title: '4. Authenticity & Forensics', desc: 'Running Error Level Analysis (ELA) and pixel tampering scan' },
    { title: '5. Rule Compliance Engine', desc: 'Verifying minimum cutoffs and eligibility criteria' },
    { title: '6. Report Generation', desc: 'Compiling cryptographic verification report and audit logs' },
  ];

  return (
    <div className="page-container animate-fadeIn">
      {/* Header Presets Banner */}
      <div className="card card-glass mb-24" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                padding: '3px 10px',
                background: 'rgba(242, 118, 94, 0.15)',
                color: 'var(--coral-500)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Interactive Hackathon Demonstration
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Document Verification Sandbox</h3>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => loadDemoCase('clean')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'var(--success-500)', color: 'var(--success-500)' }}
            >
              <CheckCircle size={14} /> Case A: Legit Student
            </button>
            <button
              onClick={() => loadDemoCase('fraud')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'var(--danger-500)', color: 'var(--danger-500)' }}
            >
              <AlertOctagon size={14} /> Case B: Tampered Fraud
            </button>
            <button
              onClick={() => loadDemoCase('mismatch')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'var(--warning-500)', color: 'var(--warning-500)' }}
            >
              <AlertTriangle size={14} /> Case C: Discrepancy Case
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Column: Form & Dropzone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Metadata Form */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
              1. Candidate & Target Institution
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Applicant Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={applicantName} 
                  onChange={(e) => setApplicantName(e.target.value)} 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Registration / Roll No.</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={rollNumber} 
                  onChange={(e) => setRollNumber(e.target.value)} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Receiving Institution</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={institution} 
                  onChange={(e) => setInstitution(e.target.value)} 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Applied Program</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={program} 
                  onChange={(e) => setProgram(e.target.value)} 
                />
              </div>
            </div>
          </div>

          {/* Drag & Drop Upload Area */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
              2. Upload Documents for Ingestion
            </h4>

            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <div className="upload-icon">
                <UploadCloud size={32} />
              </div>
              <h3>Drag & drop your files here</h3>
              <p>Supports 10th/12th marksheets, degree certificates, Aadhar card, PAN, and income/caste proofs.</p>
              
              <div className="upload-formats">
                <span className="format-tag">PDF (Vector & Scan)</span>
                <span className="format-tag">JPEG / PNG</span>
                <span className="format-tag">Max 25MB</span>
              </div>
            </div>

            {/* Uploaded File List */}
            {files.length > 0 && (
              <div className="upload-file-list">
                {files.map((file, idx) => (
                  <div key={idx} className="upload-file-item">
                    <div className="file-icon" style={{ background: 'rgba(49, 91, 140, 0.18)', color: 'var(--primary-400)' }}>
                      <FileText size={20} />
                    </div>
                    <div className="file-details">
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{file.size} • {file.type}</div>
                    </div>
                    <button 
                      className="btn-ghost" 
                      onClick={() => removeFile(idx)}
                      style={{ color: 'var(--danger-500)', padding: '6px' }}
                      title="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start Verification Action Button */}
          <button
            onClick={startVerificationPipeline}
            disabled={isVerifying}
            className="btn btn-primary btn-lg"
            style={{
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(242, 118, 94, 0.35)',
              cursor: isVerifying ? 'not-allowed' : 'pointer'
            }}
          >
            {isVerifying ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Running AI Pipeline (Stage {pipelineStep}/6)...</span>
              </>
            ) : (
              <>
                <Play size={20} />
                <span>Run AI Verification Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Live Pipeline Visualizer & Result */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pipeline Execution Tracker */}
          <div className="card card-glass">
            <div className="section-header">
              <div>
                <h3>6-Stage Verification Pipeline Execution</h3>
                <span className="section-subtitle">Real-time status of neural & forensic checks</span>
              </div>
              {isVerifying && (
                <span className="status-badge processing">
                  <span className="status-dot"></span> Live Processing
                </span>
              )}
            </div>

            <div className="verification-timeline">
              {pipelineStages.map((stage, idx) => {
                const stepNum = idx + 1;
                const isCompleted = pipelineStep > stepNum || verificationResult !== null;
                const isActive = pipelineStep === stepNum && isVerifying;

                return (
                  <div 
                    key={idx} 
                    className={`timeline-step ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}
                  >
                    <div className="step-indicator">
                      {isCompleted ? '✓' : stepNum}
                    </div>
                    <div className="step-content">
                      <div className="step-title" style={{ color: isActive ? 'var(--primary-400)' : isCompleted ? '#fff' : 'var(--text-tertiary)' }}>
                        {stage.title}
                      </div>
                      <div className="step-desc">
                        {stage.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Verdict Card */}
          {verificationResult && (
            <div className="card card-glass animate-fadeIn" style={{
              border: verificationResult.status === 'verified' ? '1px solid var(--success-500)' :
                      verificationResult.status === 'flagged' ? '1px solid var(--danger-500)' :
                      '1px solid var(--warning-500)',
              background: verificationResult.status === 'verified' ? 'rgba(16, 185, 129, 0.04)' :
                          verificationResult.status === 'flagged' ? 'rgba(239, 68, 68, 0.05)' :
                          'rgba(245, 158, 11, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-xl)',
                  background: verificationResult.status === 'verified' ? 'rgba(16, 185, 129, 0.15)' :
                              verificationResult.status === 'flagged' ? 'rgba(239, 68, 68, 0.15)' :
                              'rgba(245, 158, 11, 0.15)',
                  color: verificationResult.status === 'verified' ? 'var(--success-500)' :
                         verificationResult.status === 'flagged' ? 'var(--danger-500)' :
                         'var(--warning-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {verificationResult.status === 'verified' && <ShieldCheck size={28} />}
                  {verificationResult.status === 'flagged' && <AlertOctagon size={28} />}
                  {verificationResult.status === 'review' && <AlertTriangle size={28} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: verificationResult.status === 'verified' ? 'var(--success-500)' :
                             verificationResult.status === 'flagged' ? 'var(--danger-500)' :
                             'var(--warning-500)'
                    }}>
                      AI CONFIDENCE: {verificationResult.score}%
                    </span>

                    <span className={`status-badge ${verificationResult.status}`}>
                      <span className="status-dot"></span>
                      {verificationResult.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>
                    {verificationResult.title}
                  </h4>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                {verificationResult.desc}
              </p>

              <div style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
                marginBottom: '16px'
              }}>
                <strong>Recommended Next Action:</strong> {verificationResult.recommendation}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => alert(`Generated Cryptographic Verification Certificate for ${applicantName}`)}
                >
                  <Download size={14} /> Download Official PDF Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
