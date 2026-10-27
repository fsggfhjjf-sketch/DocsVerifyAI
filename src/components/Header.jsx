import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  FileWarning, 
  Info, 
  Menu,
  X 
} from 'lucide-react';
import { notifications } from '../data/mockData';

export default function Header({ pageTitle, pageSubtitle, onSearch, searchQuery, onToggleMobile }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const dropdownRef = useRef(null);

  const unreadCount = notificationList.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'flagged':
        return <FileWarning size={16} color="var(--danger-500)" />;
      case 'verified':
        return <CheckCircle2 size={16} color="var(--success-500)" />;
      case 'review':
        return <AlertTriangle size={16} color="var(--warning-500)" />;
      default:
        return <Info size={16} color="var(--primary-400)" />;
    }
  };

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Mobile Hamburger Drawer Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={onToggleMobile}
          aria-label="Toggle navigation drawer"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <h2 className="header-title">{pageTitle || 'Dashboard'}</h2>
          <p className="header-subtitle">{pageSubtitle || 'AI-Powered Intelligent Document Verification System • SIH 2026'}</p>
        </div>
      </div>

      <div className="header-right">
        {/* System Health Pill */}
        <div className="system-health-pill">
          <span className="health-pulse-dot"></span>
          <span className="health-badge-label">AI Pipeline Active</span>
        </div>

        {/* Global Search Bar */}
        <div className="header-search">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search queue..."
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>

        {/* Notification Bell with Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            className="header-icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div>
                  <h4>Notifications</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {unreadCount} unread alerts
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead} 
                    style={{ background: 'none', border: 'none', color: 'var(--primary-400)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notificationList.map((n) => (
                  <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notification-icon" style={{ background: 'var(--bg-card)' }}>
                      {getNotificationIcon(n.type)}
                    </div>
                    <div className="notification-content">
                      <p>{n.message}</p>
                      <div className="notification-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help / Guide */}
        <a 
          href="#/architecture"
          className="header-icon-btn" 
          title="System Architecture & Flow"
          style={{ textDecoration: 'none' }}
        >
          <HelpCircle size={18} />
        </a>
      </div>
    </header>
  );
}
