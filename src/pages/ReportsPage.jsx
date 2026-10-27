import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle, 
  AlertTriangle, 
  QrCode, 
  ShieldCheck, 
  Search, 
  Filter, 
  FileSpreadsheet,
  FileCheck2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { mockApplications } from '../data/mockData';

export default function ReportsPage() {
  const [filterType, setFilterType] = useState('all');
  const [selectedReportApp, setSelectedReportApp] = useState(mockApplications[0]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const filtered = mockApplications.filter(app => {
    if (filterType === 'all') return true;
    return app.status === filterType;
  });

  return (
    <div className="page-container animate-fadeIn">
      {/* Top Banner */}
      <div className="card card-glass mb-24">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                padding: '3px 10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success-500)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Institutional Compliance & Legal Evidence
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Audit Logs & Verification Reports</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Cryptographically signed reports ready for university admissions committees and government regulatory bodies.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => alert('Exporting all verification records to CSV format...')}
            >
              <FileSpreadsheet size={16} /> Export CSV
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                setSelectedReportApp(mockApplications[0]);
                setShowCertificateModal(true);
              }}
            >
              <ShieldCheck size={16} /> View Digital Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card card-glass">
        <div className="toolbar">
          <div className="toolbar-left">
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Generated Reports Archive</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              ({filtered.length} reports available)
            </span>
          </div>

          <div className="toolbar-right">
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Report Types</option>
              <option value="verified">Verified Clearances</option>
              <option value="flagged">Fraud Investigation Reports</option>
              <option value="review">Officer Review Packets</option>
            </select>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID & Timestamp</th>
                <th>Candidate Profile</th>
                <th>Target Institution</th>
                <th>Verification Score</th>
                <th>Compliance Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary-400)', fontSize: '0.85rem' }}>
                        REP-{app.id.replace('APP-', '')}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                        Generated {app.submittedDate} • SHA-256
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.applicantName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{app.type}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem' }}>{app.institution}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: app.confidenceScore > 80 ? 'var(--success-500)' : app.confidenceScore > 50 ? 'var(--warning-500)' : 'var(--danger-500)'
                      }}>
                        {app.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td>
                    {app.status === 'verified' && (
                      <span className="status-badge verified"><span className="status-dot"></span> Authenticated</span>
                    )}
                    {app.status === 'flagged' && (
                      <span className="status-badge flagged"><span className="status-dot"></span> Tamper Suspected</span>
                    )}
                    {app.status === 'review' && (
                      <span className="status-badge review"><span className="status-dot"></span> Officer Pending</span>
                    )}
                    {app.status === 'pending' && (
                      <span className="status-badge pending"><span className="status-dot"></span> In Queue</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedReportApp(app);
                          setShowCertificateModal(true);
                        }}
                        title="View Certificate"
                      >
                        <QrCode size={14} /> Certificate
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => alert(`Downloading verified audit packet for ${app.applicantName} (PDF)...`)}
                        title="Download PDF Report"
                      >
                        <Download size={14} /> PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Certificate Modal */}
      {showCertificateModal && selectedReportApp && createPortal(
        <div className="modal-overlay" onClick={() => setShowCertificateModal(false)}>
          <div className="modal-container" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            {/* Certificate Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #2c2222, #413333)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '24px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--gradient-brand)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: '0 0 20px rgba(242, 118, 94, 0.4)'
              }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '0.02em' }}>
                DIGITAL VERIFICATION CERTIFICATE
              </h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--primary-300)', marginTop: '4px' }}>
                ISSUED BY DOCVERIFY AI VERIFICATION NETWORK • SIH 2026
              </p>
            </div>

            {/* Certificate Body */}
            <div className="modal-body-responsive">
              <div style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div className="form-row-2col">
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Candidate Name</span>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedReportApp.applicantName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Registration No.</span>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {selectedReportApp.extractedData?.registrationNo || '4521897'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Verification Status</span>
                    <div style={{ fontWeight: 800, color: selectedReportApp.status === 'verified' ? 'var(--success-500)' : 'var(--danger-500)', marginTop: '2px' }}>
                      {selectedReportApp.status?.toUpperCase()} ({selectedReportApp.confidenceScore}% Confidence)
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Receiving Authority</span>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedReportApp.institution}</div>
                  </div>
                </div>
              </div>

              {/* QR Code and Cryptographic Seal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#fff',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000'
                  }}>
                    <QrCode size={48} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Cryptographic Verification QR
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      Scan to verify integrity on blockchain / govt registry
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      HASH: 8f92a30b...45c9de12
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>Digitally Signed By</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-400)', marginTop: '2px' }}>
                    DocVerify Autonomous Node
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--success-500)', marginTop: '2px' }}>
                    ✓ Valid Certificate
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-footer-responsive">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowCertificateModal(false)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => alert(`Certificate downloaded for ${selectedReportApp.applicantName}`)}
              >
                <Download size={14} /> Download Certificate (PDF)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
