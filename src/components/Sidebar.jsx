import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileCheck2, 
  FileText, 
  Network, 
  Settings, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload & Verify', path: '/upload', icon: UploadCloud, highlight: true },
    { label: 'Applications', path: '/applications', icon: FileCheck2, badge: '3 Flagged' },
    { label: 'Reports & Audit', path: '/reports', icon: FileText },
    { label: 'Architecture & Stack', path: '/architecture', icon: Network },
    { label: 'System Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-toggle" 
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <ShieldCheck size={24} />
        </div>
        {!collapsed && (
          <div className="logo-text">
            <h1>DocVerify AI</h1>
            <span>SIH 2026 • AI Verifier</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon">
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          );
        })}

        <div className="nav-section-label">Public Views</div>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={collapsed ? "Landing Page" : undefined}
        >
          <span className="nav-icon">
            <Sparkles size={18} />
          </span>
          <span>Landing Page</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer / User Info */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            <span>SIH</span>
          </div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">IIT Verification Cell</div>
              <div className="user-role">Nodal Officer • Active</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
