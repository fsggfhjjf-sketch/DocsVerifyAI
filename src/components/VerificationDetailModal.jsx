import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  FileWarning, 
  CheckCircle, 
  FileText, 
  Eye, 
  Download, 
  Check, 
  AlertOctagon, 
  User, 
  Calendar, 
  Building, 
  Hash, 
  Layers, 
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';

export default function VerificationDetailModal({ application, onClose, onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, documents, forensics, crosscheck, audit
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [prevAppId, setPrevAppId] = useState(application?.id);
  const [currentStatus, setCurrentStatus] = useState(application?.status || 'pending');
  const [reviewerNote, setReviewerNote] = useState('');

  if (application && application.id !== prevAppId) {
    setPrevAppId(application.id);
    setCurrentStatus(application.status || 'pending');
  }

  if (!application) return null;

  const selectedDoc = application.documents ? application.documents[selectedDocIndex] : null;

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(application.id, newStatus, reviewerNote);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge verified"><span className="status-dot"></span> Verified Original</span>;
      case 'flagged':
        return <span className="status-badge flagged"><span className="status-dot"></span> Flagged / Tampered</span>;
      case 'review':
        return <span className="status-badge review"><span className="status-dot"></span> Manual Review</span>;
      default:
        return <span className="status-badge pending"><span className="status-dot"></span> Processing</span>;
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header-responsive">
          <div className="modal-header-left">
            <div className="modal-header-avatar">
              {application.initials || 'AP'}
            </div>
            <div className="modal-header-info">
              <div className="modal-header-title-row">
                <h3 className="modal-applicant-name">
                  {application.applicantName}
                </h3>
                <span className="modal-applicant-id">
                  ({application.id})
                </span>
                {getStatusBadge(currentStatus)}
              </div>
              <div className="modal-header-meta">
                <span>Program: <strong>{application.type}</strong></span>
                <span>Institution: <strong>{application.institution}</strong></span>
                <span>Submitted: <strong>{application.submittedDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="modal-header-right">
            <div className="modal-confidence-badge" style={{
              background: application.confidenceScore > 80 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: application.confidenceScore > 80 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'
            }}>
              <span className="conf-label">Confidence</span>
              <span className="conf-value" style={{
                color: application.confidenceScore > 80 ? 'var(--success-500)' : 'var(--danger-500)'
              }}>
                {application.confidenceScore}%
              </span>
            </div>

            <button 
              onClick={onClose}
              className="header-icon-btn modal-close-btn"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs-bar">
          {[
            { id: 'overview', label: 'Overview & OCR' },
            { id: 'documents', label: 'Documents & Forensics' },
            { id: 'crosscheck', label: 'Cross-Verification Matrix' },
            { id: 'flags', label: `Flags & Anomalies (${application.flags?.length || 0})` },
            { id: 'audit', label: 'Audit Trail & Workflow' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="modal-body-responsive">
          {/* TAB 1: OVERVIEW & EXTRACTED OCR DATA */}
          {activeTab === 'overview' && (
            <div className="modal-overview-grid">
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
                  Extracted Entities (OCR + Named Entity Recognition)
                </h4>
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {application.extractedData && Object.keys(application.extractedData).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {Object.entries(application.extractedData).map(([key, val]) => (
                        <div key={key} className="detail-field">
                          <span className="detail-field-label" style={{ textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="detail-field-value mono">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>
                      Processing OCR text extraction...
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                    Uploaded Documents Checklist
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {application.documents?.map((doc, idx) => (
                      <div
                        key={idx}
                        onClick={() => { setSelectedDocIndex(idx); setActiveTab('documents'); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: 'var(--bg-card)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={16} color="var(--primary-400)" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{doc.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>({doc.size})</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: doc.confidence > 80 ? 'var(--success-500)' : doc.status === 'flagged' ? 'var(--danger-500)' : 'var(--warning-500)'
                          }}>
                            {doc.confidence > 0 ? `${doc.confidence}% match` : 'processing'}
                          </span>
                          <Eye size={14} color="var(--text-tertiary)" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status & Review Action Box */}
              <div>
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
                    Decision & Action Workflow
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Change verification state or submit notes for institutional audit compliance.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    <button
                      onClick={() => handleStatusChange('verified')}
                      className={`btn ${currentStatus === 'verified' ? 'btn-success' : 'btn-secondary'}`}
                      style={{ justifyContent: 'center' }}
                    >
                      <CheckCircle size={16} /> Mark as Verified & Valid
                    </button>
                    <button
                      onClick={() => handleStatusChange('flagged')}
                      className={`btn ${currentStatus === 'flagged' ? 'btn-danger' : 'btn-secondary'}`}
                      style={{ justifyContent: 'center' }}
                    >
                      <AlertOctagon size={16} /> Flag for Potential Fraud / Tampering
                    </button>
                    <button
                      onClick={() => handleStatusChange('review')}
                      className={`btn ${currentStatus === 'review' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ justifyContent: 'center' }}
                    >
                      <Clock size={16} /> Assign to Senior Human Officer
                    </button>
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Reviewer Audit Remarks</label>
                    <textarea
                      rows="3"
                      placeholder="Add official verification notes..."
                      value={reviewerNote}
                      onChange={(e) => setReviewerNote(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        resize: 'none'
                      }}
                    ></textarea>
                  </div>
                </div>

                {/* AI Summary Box */}
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  background: application.confidenceScore > 80 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                  border: application.confidenceScore > 80 ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Sparkles size={16} color={application.confidenceScore > 80 ? 'var(--success-500)' : 'var(--danger-500)'} />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>AI Forensics Recommendation</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {application.confidenceScore > 80 
                      ? 'All cryptographic signatures and cross-document fields match official board templates. High authenticity confidence.'
                      : 'Suspicious variations detected in numerical figures and metadata creation timestamps. Further manual inspection is advised before acceptance.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENTS & FORENSICS VIEWER */}
          {activeTab === 'documents' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '6px' }}>
                {application.documents?.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDocIndex(idx)}
                    className={`btn btn-sm ${selectedDocIndex === idx ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {doc.name}
                  </button>
                ))}
              </div>

              {selectedDoc && (
                <div className="modal-doc-viewer-grid">
                  {/* Simulated Visual Document Canvas */}
                  <div style={{
                    background: '#241a1a',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    border: '1px solid var(--border-medium)',
                    position: 'relative',
                    minHeight: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(245,235,221,0.1)',
                      paddingBottom: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral-500)' }}></span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {selectedDoc.name} — Computer Vision Heatmap
                        </span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                        Resolution: 300 DPI • ELA active
                      </span>
                    </div>

                    {/* Simulated Document Outline with Tamper Bounding Box */}
                    <div style={{
                      background: '#332424',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px',
                      border: '1px dashed rgba(245,235,221,0.2)',
                      flex: 1,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(245,235,221,0.1)', paddingBottom: '8px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#F5EBDD' }}>
                          CENTRAL BOARD OF SECONDARY EDUCATION
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(245,235,221,0.7)' }}>
                          SENIOR SCHOOL CERTIFICATE EXAMINATION 2024
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Candidate: <strong>{application.applicantName}</strong></span>
                        <span>Roll No: <strong>{application.extractedData?.registrationNo || '4521897'}</strong></span>
                      </div>

                      {/* Flagged Bounding Box Simulation if Document is flagged */}
                      {selectedDoc.status === 'flagged' ? (
                        <div style={{
                          border: '2px solid var(--coral-500)',
                          background: 'rgba(242, 118, 94, 0.16)',
                          borderRadius: '4px',
                          padding: '10px',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '8px',
                            background: 'var(--coral-500)',
                            color: '#fff',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '3px'
                          }}>
                            TAMPERING DETECTED: 98.4% CONFIDENCE
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#ffd5cc' }}>
                            Subject: Mathematics | Marks: <strong>98 / 100</strong> (Originally 68)
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--coral-400)', marginTop: '4px' }}>
                            • Non-uniform pixel compression around "9"<br/>
                            • Font kerning differs from standard CBSE Helvetica font
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          border: '1px solid #10b981',
                          background: 'rgba(16, 185, 129, 0.08)',
                          borderRadius: '4px',
                          padding: '10px'
                        }}>
                          <div style={{ fontSize: '0.78rem', color: '#6ee7b7' }}>
                            ✓ Authenticity Validated: Official Board Watermark & Seal Verified
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
                        <span>QR Code: Verified</span>
                        <span>Signature: Digitally Encrypted</span>
                      </div>
                    </div>
                  </div>

                  {/* Forensic Metadata Inspector */}
                  <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
                      EXIF & Forensics Inspection
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                      <div className="detail-field">
                        <span className="detail-field-label">File Type</span>
                        <span className="detail-field-value mono">{selectedDoc.type?.toUpperCase()}</span>
                      </div>
                      <div className="detail-field">
                        <span className="detail-field-label">File Size</span>
                        <span className="detail-field-value mono">{selectedDoc.size}</span>
                      </div>
                      <div className="detail-field">
                        <span className="detail-field-label">Error Level Analysis (ELA)</span>
                        <span className="detail-field-value mono" style={{ color: selectedDoc.status === 'flagged' ? 'var(--danger-500)' : 'var(--success-500)' }}>
                          {selectedDoc.status === 'flagged' ? 'High Divergence (Modified)' : 'Normal (< 2.1%)'}
                        </span>
                      </div>
                      <div className="detail-field">
                        <span className="detail-field-label">Creation Tool / Software</span>
                        <span className="detail-field-value mono">
                          {selectedDoc.status === 'flagged' ? 'Adobe Photoshop 24.1 (Altered)' : 'Govt PDF Generator v4.0'}
                        </span>
                      </div>
                      <div className="detail-field">
                        <span className="detail-field-label">OCR Character Accuracy</span>
                        <span className="detail-field-value mono">{selectedDoc.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CROSS-VERIFICATION MATRIX */}
          {activeTab === 'crosscheck' && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Cross-document verification algorithms compare extracted entities across all submitted documents and government databases.
              </p>

              <div className="data-table-wrapper card" style={{ padding: 0 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Verified Field</th>
                      <th>Primary Source</th>
                      <th>Secondary Source</th>
                      <th>Comparison Result</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.crossCheckResults?.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.field}</td>
                        <td>{item.doc1}</td>
                        <td>{item.doc2}</td>
                        <td>
                          {item.match ? (
                            <span style={{ color: 'var(--success-500)', fontSize: '0.8rem', fontWeight: 600 }}>Exact Match (100%)</span>
                          ) : (
                            <span style={{ color: 'var(--danger-500)', fontSize: '0.8rem', fontWeight: 600 }}>Mismatch Detected</span>
                          )}
                        </td>
                        <td>
                          {item.match ? (
                            <span className="status-badge verified"><span className="status-dot"></span> Passed</span>
                          ) : (
                            <span className="status-badge flagged"><span className="status-dot"></span> Discrepancy</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FLAGS & ANOMALIES */}
          {activeTab === 'flags' && (
            <div>
              {application.flags && application.flags.length > 0 ? (
                <div>
                  {application.flags.map((flag, idx) => (
                    <div key={idx} className={`issue-card ${flag.type === 'critical' ? '' : 'warning'}`}>
                      <div className="issue-title" style={{ color: flag.type === 'critical' ? 'var(--danger-500)' : 'var(--warning-500)' }}>
                        <FileWarning size={18} />
                        <span>{flag.title}</span>
                      </div>
                      <div className="issue-desc">
                        {flag.desc}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-500)' }}>
                    <ShieldCheck size={40} />
                  </div>
                  <h3>No Tampering or Anomalies Found</h3>
                  <p>All scanned documents meet strict institutional standards and board template specifications.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div>
              <div className="verification-timeline">
                {application.verificationSteps?.map((step, idx) => (
                  <div key={idx} className={`timeline-step ${step.completed ? 'completed' : step.active ? 'active' : ''}`}>
                    <div className="step-indicator">
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    <div className="step-content">
                      <div className="step-title">{step.title}</div>
                      <div className="step-desc">{step.desc}</div>
                      {step.time && <div className="step-time">Timestamp: {step.time}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer-responsive">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            Digital Signature: SHA256:{application.id}-2026-OK
          </span>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close Inspector
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => alert(`Generated Official SIH Audit Report for ${application.applicantName}`)}
            >
              <Download size={14} /> Download Evidentiary PDF
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
