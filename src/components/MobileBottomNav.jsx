import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileCheck2, 
  FileText, 
  Menu
} from 'lucide-react';

export default function MobileBottomNav({ onOpenMenu }) {
  const navTabs = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload', path: '/upload', icon: UploadCloud },
    { label: 'Queue', path: '/applications', icon: FileCheck2 },
    { label: 'Reports', path: '/reports', icon: FileText },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {navTabs.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `mobile-nav-btn ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} className="mobile-nav-icon" />
            <span className="mobile-nav-label">{item.label}</span>
          </NavLink>
        );
      })}

      {/* Menu / Drawer Toggle */}
      <button 
        type="button" 
        className="mobile-nav-btn"
        onClick={onOpenMenu}
        aria-label="Open full menu"
      >
        <Menu size={20} className="mobile-nav-icon" />
        <span className="mobile-nav-label">Menu</span>
      </button>
    </nav>
  );
}
