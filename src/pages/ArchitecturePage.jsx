import React from 'react';
import { 
  Network, 
  Cpu, 
  Server, 
  Database, 
  Layers, 
  ShieldCheck, 
  FileCheck2, 
  Lock, 
  Sparkles,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';
import PipelineVisualizer from '../components/PipelineVisualizer';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

export default function ArchitecturePage() {
  return (
    <div className="page-container animate-fadeIn">
      {/* Top Banner */}
      <div className="card card-glass mb-24">
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
            Technical Blueprints • SIH 2026
          </span>
        </div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
          System Architecture & Pipeline Specification
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '800px' }}>
          Detailed architectural breakdown of the 6-stage verification engine, 5 modular system layers, and integrated artificial intelligence / computer vision tech stack.
        </p>
      </div>

      {/* 6-Stage Pipeline Explorer */}
      <div className="mb-24">
        <PipelineVisualizer interactive={true} />
      </div>

      {/* 5-Layer Architecture & Tech Stack */}
      <div className="mb-24">
        <ArchitectureDiagram />
      </div>

      {/* Deep-Dive Technical Methodology */}
      <div className="grid-3 mb-24">
        <div className="card card-glass">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <Cpu size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>
            Image Forensics & ELA
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Error Level Analysis (ELA) isolates compression frequency variations between original documents and edited areas (e.g. photoshopped percentages or signatures).
          </p>
        </div>

        <div className="card card-glass">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--success-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <GitBranch size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>
            Cross-Document Graph
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Constructs an entity knowledge graph linking candidate name variations, phonetic matches (Soundex), and roll numbers across transcripts and external registries.
          </p>
        </div>

        <div className="card card-glass">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.15)',
            color: 'var(--warning-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>
            Zero-Trust Rule Engine
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Evaluates deterministic institutional criteria including minimum aggregate cutoff limits, mandatory category proofs, and issuing authority validity windows.
          </p>
        </div>
      </div>
    </div>
  );
}
