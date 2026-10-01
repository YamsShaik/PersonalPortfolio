import React, { useState, useEffect, useRef } from 'react';
import { FaAws, FaDocker, FaCloud } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins, SiAnsible } from 'react-icons/si';
import './Preloader.css';

// Every class here starts with "pl-" so the preloader can't clash with
// Home, Navbar, About, Skills, Experience, Projects, Contact or Footer styles.

const techStack = [
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Kubernetes', Icon: SiKubernetes },
  { name: 'Terraform', Icon: SiTerraform },
  { name: 'Jenkins', Icon: SiJenkins },
  { name: 'Ansible', Icon: SiAnsible },
];

const stages = [
  { label: 'Commit', detail: 'main · a41f9c2', cmd: 'git push origin main' },
  { label: 'Build', detail: 'Docker image', cmd: 'docker build -t portfolio .' },
  { label: 'Test', detail: '128 checks passed', cmd: 'npm run test --ci' },
  { label: 'Deploy', detail: 'EKS rolling update', cmd: 'kubectl rollout status deploy/web' },
  { label: 'Live', detail: '99.99% uptime', cmd: 'curl -I https://shaikyams.dev' },
];

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const finishRef = useRef(onFinish);

  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  // Progress ticks up in random steps until it reaches 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Once complete: hold briefly, fade out, then tell the parent
  useEffect(() => {
    if (progress < 100) return undefined;
    const fade = setTimeout(() => setExiting(true), 700);
    const done = setTimeout(() => finishRef.current?.(), 1300);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [progress]);

  const pct = Math.floor(progress);
  const complete = progress >= 100;
  const active = Math.min(stages.length - 1, Math.floor(progress / 20));

  const stateOf = (i) => {
    if (complete || i < active) return 'done';
    if (i === active) return 'active';
    return 'idle';
  };

  return (
    <div className={`pl-root${exiting ? ' pl-exit' : ''}`} role="status" aria-live="polite">
      <div className="pl-glow" aria-hidden="true" />
      <div className="pl-grid" aria-hidden="true" />

      <div className="pl-inner">
        {/* Brand */}
        <div className="pl-brand">
          <span className="pl-logo">
            <FaCloud size={20} />
          </span>
          <span className="pl-name">Shaik Yams</span>
        </div>

        {/* Terminal window with the pipeline */}
        <section className="pl-card" aria-label="Loading portfolio">
          <div className="pl-card-head">
            <span className="pl-dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="pl-card-title">deploy-pipeline</span>
            <span className={`pl-badge${complete ? ' pl-badge-live' : ''}`}>
              <span className="pl-badge-dot" />
              {complete ? 'Live' : 'Deploying'}
            </span>
          </div>

          <ol className="pl-stages">
            {stages.map((s, i) => (
              <li key={s.label} className={`pl-stage pl-${stateOf(i)}`}>
                <span className="pl-node" />
                <div>
                  <strong>{s.label}</strong>
                  <span>{s.detail}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="pl-console" aria-hidden="true">
            <span className="pl-prompt">$</span> {stages[active].cmd}
            {!complete && <span className="pl-cursor" />}
          </div>

          <div className="pl-progress">
            <div
              className="pl-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <div className="pl-fill" style={{ width: `${progress}%` }}>
                <span className="pl-shine" />
              </div>
            </div>
            <div className="pl-meta">
              <span>{complete ? 'Ready' : 'Building portfolio'}</span>
              <span className="pl-pct">{pct}%</span>
            </div>
          </div>
        </section>

        {/* Tools row */}
        <div className="pl-tools" aria-hidden="true">
          {techStack.map(({ name, Icon }, i) => (
            <span key={name} className="pl-tool" style={{ '--i': i }} title={name}>
              <Icon size={22} />
            </span>
          ))}
        </div>

        <p className="pl-tagline">Building the future of infrastructure</p>
      </div>
    </div>
  );
};

export default Preloader;