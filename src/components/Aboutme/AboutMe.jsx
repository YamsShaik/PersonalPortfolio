import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaCogs,
  FaServer,
  FaShieldAlt,
  FaChartLine,
  FaSyncAlt,
  FaCode,
  FaLock,
  FaLifeRing,
  FaTachometerAlt,
  FaProjectDiagram,
} from 'react-icons/fa';
import './AboutMe.css';

const expertise = [
  {
    Icon: FaCogs,
    title: 'CI/CD pipelines',
    text: 'Continuous integration and deployment workflows that speed up delivery without lowering quality.',
  },
  {
    Icon: FaServer,
    title: 'Infrastructure automation',
    text: 'Terraform and Ansible give you consistent, repeatable, scalable infrastructure across AWS.',
  },
  {
    Icon: FaShieldAlt,
    title: 'DevSecOps integration',
    text: 'Security scanning runs through the whole development lifecycle, so vulnerabilities surface early.',
  },
  {
    Icon: FaChartLine,
    title: 'Monitoring and observability',
    text: 'Metrics, logs and traces that show how a system behaves, so problems are found before users report them.',
  },
];

const pillars = [
  { name: 'Metrics', tools: 'Prometheus, Grafana, CloudWatch', text: 'Numbers over time: latency, traffic, errors and saturation.' },
  { name: 'Logs', tools: 'ELK Stack, CloudWatch Logs', text: 'Searchable, structured events that explain what happened.' },
  { name: 'Traces', tools: 'OpenTelemetry, AWS X-Ray', text: 'The path of a single request across every service it touches.' },
];

const practices = [
  ['Golden signals', 'Dashboards built around latency, traffic, errors and saturation.'],
  ['SLOs and error budgets', 'Reliability targets that tell a team when to ship and when to slow down.'],
  ['Alerts that matter', 'Alerts on symptoms users feel, tuned to cut noise and on-call fatigue.'],
  ['Runbooks and post-incident reviews', 'Every incident leaves behind a fix, a guide and a lesson.'],
];

const passions = [
  {
    Icon: FaSyncAlt,
    title: 'Continuous integration',
    text: 'Automated pipelines that protect code quality through testing, static analysis and consistent builds. I build feedback loops that catch issues early and keep standards high.',
    tags: ['Automated testing', 'Static analysis', 'Build caching'],
  },
  {
    Icon: FaCode,
    title: 'Infrastructure as code',
    text: 'Infrastructure defined in code can be versioned, reviewed, tested and reproduced in every environment. I enjoy managing complex cloud resources with clear, declarative configuration.',
    tags: ['Terraform', 'CloudFormation', 'Ansible'],
  },
  {
    Icon: FaLock,
    title: 'DevSecOps',
    text: 'Security is a shared responsibility built into tools and processes, not bolted on at the end. I want systems that are resilient from the first commit.',
    tags: ['Image scanning', 'Secrets management', 'Least privilege'],
  },
  {
    Icon: FaChartLine,
    title: 'Monitoring and observability',
    text: 'You can only fix what you can see. I set up monitoring that goes beyond "is it up?" to answer "why is it slow?", with dashboards, alerting and tracing that shorten the time to find and fix a problem.',
    tags: ['Prometheus', 'Grafana', 'ELK Stack', 'Alerting'],
  },
  {
    Icon: FaLifeRing,
    title: 'Reliability and incident response',
    text: 'Reliable systems come from preparation: health checks, autoscaling, backups, clear runbooks and calm, blameless reviews after things go wrong.',
    tags: ['High availability', 'Runbooks', 'Blameless reviews'],
  },
  {
    Icon: FaTachometerAlt,
    title: 'Performance and cost optimization',
    text: 'I like finding bottlenecks and wasted resources. Better performance and a smaller cloud bill often come from the same changes.',
    tags: ['Right-sizing', 'Autoscaling', 'Cost monitoring'],
  },
  {
    Icon: FaProjectDiagram,
    title: 'Microservices architecture',
    text: 'Distributed systems that stay resilient, scalable and maintainable. Container orchestration, service meshes and event-driven design make that possible.',
    tags: ['Kubernetes', 'Docker', 'Service mesh'],
  },
];

// Sample latency curve for the illustrative dashboard
const LINE = 'M0,104 C30,96 50,112 80,92 S130,70 160,86 S210,112 240,78 S290,52 320,66 S370,44 400,50';

const AboutMe = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = passions[active];

  return (
    <div className="about">
      <div className="about-inner">
        {/* ---------- Intro ---------- */}
        <header className="about-intro">
          <h1>What I do</h1>
          <p>
            As a DevOps Engineer, I bridge the gap between development and operations to create
            smooth, efficient and secure delivery pipelines, then keep a close eye on them once
            they&apos;re running.
          </p>
        </header>

        {/* ---------- Expertise ---------- */}
        <ul className="expertise">
          {expertise.map(({ Icon, title, text }) => (
            <li key={title}>
              <span className="icon-tile">
                <Icon size={20} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ---------- Observability (signature moment) ---------- */}
        <section className="observe" aria-labelledby="observe-title">
          <div className="observe-copy">
            <h2 id="observe-title">I make systems easy to see into</h2>
            <p>
              Observability is how a team understands what its systems are doing from the outside.
              I build it on three foundations and tune it so the signals are useful, not just loud.
            </p>

            <dl className="pillars">
              {pillars.map((p) => (
                <div key={p.name} className="pillar">
                  <dt>{p.name}</dt>
                  <dd>
                    {p.text}
                    <span className="pillar-tools">{p.tools}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="dash" aria-label="Sample monitoring dashboard">
            <figcaption className="dash-head">
              <span className="dash-title">checkout-api / production</span>
              <span className="dash-live">
                <i /> Healthy
              </span>
            </figcaption>

            <div className="dash-stats">
              <div><span>p95 latency</span><strong>182 ms</strong></div>
              <div><span>Error rate</span><strong>0.04%</strong></div>
              <div><span>Availability</span><strong>99.98%</strong></div>
            </div>

            <svg className="dash-chart" viewBox="0 0 400 140" role="img" aria-label="Latency over the last hour">
              <defs>
                <linearGradient id="ab-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c8cff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7c8cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="36" x2="400" y2="36" className="dash-threshold" />
              <text x="4" y="30" className="dash-label">SLO 300 ms</text>
              <motion.path
                d={`${LINE} L400,140 L0,140 Z`}
                fill="url(#ab-fill)"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.path
                d={LINE}
                className="dash-line"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
              <circle cx="400" cy="50" r="4" className="dash-dot" />
            </svg>
            <p className="dash-note">Sample data, for illustration</p>
          </figure>
        </section>

        <dl className="practices">
          {practices.map(([name, text]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>

        {/* ---------- Passions: pick a topic ---------- */}
        <section className="passions" aria-labelledby="passion-title">
          <h2 id="passion-title">What I&apos;m passionate about</h2>

          <div className="passion-layout">
            <div className="passion-tabs" role="tablist" aria-label="Topics">
              {passions.map(({ Icon, title }, i) => (
                <button
                  key={title}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="passion-panel"
                  className={active === i ? 'tab active' : 'tab'}
                  onClick={() => setActive(i)}
                >
                  <Icon size={16} />
                  <span>{title}</span>
                </button>
              ))}
            </div>

            <div className="passion-panel" id="passion-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="icon-tile large">
                    <current.Icon size={26} />
                  </span>
                  <h3>{current.title}</h3>
                  <p>{current.text}</p>
                  <ul className="tags">
                    {current.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ---------- Drives ---------- */}
        <section className="drives" aria-labelledby="drives-title">
          <h2 id="drives-title">What drives me</h2>
          <blockquote>
            <p>
              I&apos;m driven by a passion for learning and a desire to build systems that are
              efficient, scalable and secure. The constant change in DevOps and cloud technology
              keeps me curious and keen to improve.
            </p>
            <p className="quiet">
              My goal is to contribute to systems that make a positive impact: cutting costs,
              protecting data, speeding up delivery, and making sure the team knows when something
              needs attention.
            </p>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default AboutMe;