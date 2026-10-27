import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ReportsPage from './pages/ReportsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import SettingsPage from './pages/SettingsPage';
import MobileBottomNav from './components/MobileBottomNav';
import './App.css';

// Dashboard layout wrapper
function DashboardLayout({ children, pageTitle, pageSubtitle, searchQuery, setSearchQuery }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          pageTitle={pageTitle} 
          pageSubtitle={pageSubtitle}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onToggleMobile={() => setMobileOpen(prev => !prev)}
        />
        <div className="content-inner">
          {children}
        </div>
      </main>
      <MobileBottomNav onOpenMenu={() => setMobileOpen(true)} />
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Queue View */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout 
              pageTitle="Verification Operations Dashboard" 
              pageSubtitle="Real-time document verification queue, fraud alerts, and throughput analytics"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <DashboardPage searchQuery={searchQuery} />
            </DashboardLayout>
          } 
        />

        {/* Applications List */}
        <Route 
          path="/applications" 
          element={
            <DashboardLayout 
              pageTitle="Application Verification Queue" 
              pageSubtitle="Multi-institutional document submission backlog and audit status"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <DashboardPage searchQuery={searchQuery} />
            </DashboardLayout>
          } 
        />

        {/* Upload & Verification Sandbox */}
        <Route 
          path="/upload" 
          element={
            <DashboardLayout 
              pageTitle="Upload & AI Pipeline Sandbox" 
              pageSubtitle="Submit credentials and execute the 6-stage autonomous AI verification pipeline"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <UploadPage />
            </DashboardLayout>
          } 
        />

        {/* Reports & Compliance */}
        <Route 
          path="/reports" 
          element={
            <DashboardLayout 
              pageTitle="Audit Reports & Certificates" 
              pageSubtitle="Cryptographically signed verification certificates and compliance audit trails"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <ReportsPage />
            </DashboardLayout>
          } 
        />

        {/* System Architecture Blueprint */}
        <Route 
          path="/architecture" 
          element={
            <DashboardLayout 
              pageTitle="SIH 2026 System Architecture & Flow" 
              pageSubtitle="6-Stage AI Processing Pipeline, 5-Layer Modular Architecture & Tech Stack"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <ArchitecturePage />
            </DashboardLayout>
          } 
        />

        {/* Settings */}
        <Route 
          path="/settings" 
          element={
            <DashboardLayout 
              pageTitle="System Settings & Policy Engine" 
              pageSubtitle="Tune AI forensics thresholds, OCR accuracy limits, and external API connectors"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <SettingsPage />
            </DashboardLayout>
          } 
        />
      </Routes>
    </Router>
  );
}
