import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  FileText, 
  CheckCircle, 
  AlertOctagon, 
  Search,
  Download,
  Sparkles,
  BarChart3,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockApplications, dashboardStats } from '../data/mockData';
import VerificationDetailModal from '../components/VerificationDetailModal';

export default function DashboardPage({ searchQuery = '' }) {
  const [applications, setApplications] = useState(mockApplications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [institutionFilter, setInstitutionFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesInstitution = institutionFilter === 'all' || app.institution === institutionFilter;

    return matchesSearch && matchesStatus && matchesInstitution;
  });

  const handleUpdateStatus = (appId, newStatus, note) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  // Recharts Chart Data
  const weeklyData = [
    { day: 'Mon', applications: 145, verified: 120, flagged: 8 },
    { day: 'Tue', applications: 162, verified: 140, flagged: 12 },
    { day: 'Wed', applications: 178, verified: 158, flagged: 9 },
    { day: 'Thu', applications: 155, verified: 132, flagged: 15 },
    { day: 'Fri', applications: 198, verified: 175, flagged: 11 },
    { day: 'Sat', applications: 210, verified: 188, flagged: 13 },
    { day: 'Sun', applications: 199, verified: 179, flagged: 10 }
  ];

  const pieData = [
    { name: 'Marksheets (10th/12th/UG)', value: 3421, color: '#315B8C' },
    { name: 'Identity Proof (Aadhar/PAN)', value: 2156, color: '#F2765E' },
    { name: 'Certificates (Caste/Income)', value: 1843, color: '#5f97cd' },
    { name: 'Govt. Letters & NOC', value: 1232, color: '#d66b53' }
  ];

  return (
    <div className="page-container animate-fadeIn">
      {/* 4 Primary Stat Cards */}
      <div className="stat-cards-grid">
        <div className="stat-card stat-primary">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Submissions</span>
            <div className="stat-card-icon">
              <FileCheck2 size={22} />
            </div>
          </div>
          <div className="stat-card-value">1,247</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Across 18 Institutes</span>
            <span className="stat-card-trend up">
              <ArrowUpRight size={14} /> +14.2%
            </span>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-card-header">
            <span className="stat-card-label">Verified Original</span>
            <div className="stat-card-icon">
              <ShieldCheck size={22} />
            </div>
          </div>
          <div className="stat-card-value">892</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Auto-approved</span>
            <span className="stat-card-trend up">
              <ArrowUpRight size={14} /> 71.5%
            </span>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-card-header">
            <span className="stat-card-label">Flagged / Tampered</span>
            <div className="stat-card-icon">
              <AlertOctagon size={22} />
            </div>
          </div>
          <div className="stat-card-value">87</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Fraud intercepted</span>
            <span className="stat-card-trend down">
              <ArrowDownRight size={14} /> 7.0%
            </span>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-card-header">
            <span className="stat-card-label">Human Officer Review</span>
            <div className="stat-card-icon">
              <Clock size={22} />
            </div>
          </div>
          <div className="stat-card-value">156</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Pending action</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--coral-500)', fontWeight: 600 }}>
              Avg 1.8h turnaround
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Graphs Section */}
      <div className="grid-2 mb-24">
        {/* Verification Volume Trend */}
        <div className="card card-glass">
          <div className="section-header">
            <div>
              <h3>AI Processing & Verification Volume</h3>
              <span className="section-subtitle">Real-time throughput over the past 7 days</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--coral-400)', fontFamily: 'var(--font-mono)' }}>
              Avg Latency: 2.1s
            </span>
          </div>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2765E" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#F2765E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#315B8C" stopOpacity={0.55}/>
                    <stop offset="95%" stopColor="#315B8C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,235,221,0.08)" />
                <XAxis dataKey="day" stroke="rgba(245,235,221,0.5)" fontSize={12} />
                <YAxis stroke="rgba(245,235,221,0.5)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: '#2c2222', border: '1px solid #413333', borderRadius: '8px', color: '#F5EBDD' }}
                />
                <Area type="monotone" dataKey="applications" name="Total Ingested" stroke="#F2765E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="verified" name="Auto Verified" stroke="#315B8C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVerified)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ingested Document Distribution */}
        <div className="card card-glass">
          <div className="section-header">
            <div>
              <h3>Document Ingestion Breakdown</h3>
              <span className="section-subtitle">Distribution across credential types</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success-500)', fontWeight: 600 }}>
              8,652 Total Scanned
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '260px' }}>
            <div style={{ width: '50%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pieData.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0 }}></span>
                  <span style={{ color: 'var(--text-secondary)', flex: 1 }} className="truncate">{p.name}</span>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Applications Management Table */}
      <div className="card card-glass">
        {/* Table Filters & Actions */}
        <div className="toolbar">
          <div className="toolbar-left">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Application Verification Queue</h3>
            <span style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--primary-400)',
              fontWeight: 700
            }}>
              {filteredApps.length} Records
            </span>
          </div>

          <div className="toolbar-right">
            {/* Status Filter */}
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified Original</option>
              <option value="flagged">Flagged / Tampered</option>
              <option value="review">Manual Review</option>
              <option value="pending">In Processing</option>
            </select>

            {/* Institution Filter */}
            <select 
              className="filter-select"
              value={institutionFilter}
              onChange={(e) => setInstitutionFilter(e.target.value)}
            >
              <option value="all">All Institutions</option>
              <option value="IIT Delhi">IIT Delhi</option>
              <option value="NIT Trichy">NIT Trichy</option>
              <option value="BITS Pilani">BITS Pilani</option>
              <option value="UPSC">UPSC</option>
              <option value="TCS">TCS</option>
              <option value="IISc Bangalore">IISc Bangalore</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant Profile</th>
                <th>Target Program</th>
                <th>Institution</th>
                <th>Docs Verified</th>
                <th>AI Confidence</th>
                <th>Verification State</th>
                <th style={{ textAlign: 'right' }}>Inspect Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} onClick={() => setSelectedApp(app)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="applicant-cell">
                      <div className="applicant-avatar">
                        {app.initials || 'AP'}
                      </div>
                      <div>
                        <div className="applicant-name">{app.applicantName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                          {app.id} • {app.submittedDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{app.type}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{app.institution}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                        {app.documentsVerified || 0} / {app.documentsCount}
                      </span>
                      <div className="progress-bar" style={{ width: '60px' }}>
                        <div 
                          className={`progress-bar-fill ${app.status === 'flagged' ? 'danger' : 'brand'}`}
                          style={{ width: `${((app.documentsVerified || 0) / app.documentsCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: app.confidenceScore > 80 ? 'var(--success-500)' : app.confidenceScore > 50 ? 'var(--warning-500)' : 'var(--danger-500)'
                      }}>
                        {app.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td>
                    {app.status === 'verified' && (
                      <span className="status-badge verified"><span className="status-dot"></span> Verified</span>
                    )}
                    {app.status === 'flagged' && (
                      <span className="status-badge flagged"><span className="status-dot"></span> Flagged Fraud</span>
                    )}
                    {app.status === 'review' && (
                      <span className="status-badge review"><span className="status-dot"></span> Needs Review</span>
                    )}
                    {app.status === 'processing' && (
                      <span className="status-badge processing"><span className="status-dot"></span> Processing</span>
                    )}
                    {app.status === 'pending' && (
                      <span className="status-badge pending"><span className="status-dot"></span> Queued</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(app);
                      }}
                    >
                      <Eye size={14} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for detailed inspection */}
      {selectedApp && (
        <VerificationDetailModal 
          application={selectedApp} 
          onClose={() => setSelectedApp(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
