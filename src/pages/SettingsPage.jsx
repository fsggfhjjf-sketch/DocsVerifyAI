import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  ShieldCheck, 
  Key, 
  Bell, 
  Database, 
  CheckCircle, 
  Save, 
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';

export default function SettingsPage() {
  const [institutionName, setInstitutionName] = useState('IIT Delhi Admissions & Verification Cell');
  const [officerEmail, setOfficerEmail] = useState('nodal.officer@iitd.ac.in');
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [ocrMinAccuracy, setOcrMinAccuracy] = useState(90);
  const [enableDigiLocker, setEnableDigiLocker] = useState(true);
  const [enableELA, setEnableELA] = useState(true);
  const [enableStrictDOB, setEnableStrictDOB] = useState(true);
  const [autoFlagPhotoShop, setAutoFlagPhotoShop] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="page-container animate-fadeIn">
      {/* Top Banner */}
      <div className="card card-glass mb-24">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                padding: '3px 10px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--primary-400)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Institutional Administration
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>System Configuration & AI Thresholds</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Fine-tune computer vision forensics sensitivity, compliance rules, and external government API integrations.
            </p>
          </div>

          <button 
            onClick={handleSave}
            className="btn btn-primary btn-sm"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>

        {savedSuccess && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--success-500)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} />
            <span>Settings and AI verification thresholds saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid-2">
        {/* Left Column: Organization & Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Institutional Profile */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--primary-400)" />
              <span>Institutional Identity</span>
            </h4>

            <div className="form-group">
              <label className="form-label">Verifying Institution / Authority</label>
              <input 
                type="text" 
                className="form-input" 
                value={institutionName} 
                onChange={(e) => setInstitutionName(e.target.value)} 
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nodal Officer Contact Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={officerEmail} 
                onChange={(e) => setOfficerEmail(e.target.value)} 
              />
            </div>
          </div>

          {/* Compliance Rule Policy Engine */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--success-500)" />
              <span>Compliance Rule Engine Policies</span>
            </h4>

            <div className="settings-row">
              <div className="settings-label">
                <span>Auto-Flag Image Editing Software</span>
                <p>Flag any document whose EXIF metadata shows Adobe Photoshop, GIMP, or Canvas editing.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={autoFlagPhotoShop} 
                  onChange={(e) => setAutoFlagPhotoShop(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <div className="settings-label">
                <span>Strict Date-of-Birth (DOB) Match</span>
                <p>Require 100% exact match between 10th marksheet and Identity proof (Aadhar/PAN).</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={enableStrictDOB} 
                  onChange={(e) => setEnableStrictDOB(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-row">
              <div className="settings-label">
                <span>DigiLocker / CBSE API Cross-Check</span>
                <p>Automatically query official board roll number database when available.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={enableDigiLocker} 
                  onChange={(e) => setEnableDigiLocker(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: AI & Forensic Thresholds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* AI Forensics Thresholds */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--accent-cyan)" />
              <span>AI Forensics & OCR Tuning</span>
            </h4>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>Minimum Verification Confidence Threshold</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-400)' }}>
                  {confidenceThreshold}%
                </span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={confidenceThreshold} 
                onChange={(e) => setConfidenceThreshold(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--primary-500)', cursor: 'pointer' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Applications scoring above this threshold receive automated clearance.
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0 }}>OCR Character Recognition Threshold</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--success-500)' }}>
                  {ocrMinAccuracy}%
                </span>
              </div>
              <input 
                type="range" 
                min="70" 
                max="99" 
                value={ocrMinAccuracy} 
                onChange={(e) => setOcrMinAccuracy(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--success-500)', cursor: 'pointer' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Lower confidence OCR tokens trigger secondary neural enhancement passes.
              </p>
            </div>

            <div className="settings-row">
              <div className="settings-label">
                <span>Error Level Analysis (ELA) Scan</span>
                <p>Run frequency compression analysis to isolate pixel modifications and forged marks.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={enableELA} 
                  onChange={(e) => setEnableELA(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* API Gateway Configuration */}
          <div className="card card-glass">
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="var(--warning-500)" />
              <span>FastAPI Backend Connection</span>
            </h4>

            <div className="form-group">
              <label className="form-label">FastAPI Service Endpoint</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue="http://127.0.0.1:8000/api/v1/verify" 
                readOnly
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">API Key / Token (Read-Only)</label>
              <input 
                type="password" 
                className="form-input" 
                defaultValue="sih2026_docverify_ai_live_token_77a9b2c3" 
                readOnly
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
