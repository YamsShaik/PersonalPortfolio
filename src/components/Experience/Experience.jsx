import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  FaJenkins,
  FaAws,
  FaDocker,
  FaCode,
  FaMapMarkerAlt,
  FaChevronDown,
  FaCheck,
} from 'react-icons/fa';
import { SiKubernetes, SiGrafana } from 'react-icons/si';
import './Experience.css';

// Every class here starts with "xp-" so this section can't clash with
// Home, Navbar, About, Skills or Footer styles.

const metrics = [
  { value: 40, label: 'less deployment time' },
  { value: 70, label: 'less manual effort' },
  { value: 30, label: 'lower AWS costs' },
];

const achievements = [
  {
    id: 1,
    title: 'CI/CD implementation',
    description: 'Developed and maintained pipelines using Jenkins, GitHub Actions and GitLab CI/CD.',
    impact: 'Reduced deployment time by 40%',
    Icon: FaJenkins,
  },
  {
    id: 2,
    title: 'AWS infrastructure automation',
    description: 'Automated infrastructure provisioning with Terraform and CloudFormation.',
    impact: 'Reduced manual effort by 70%',
    Icon: FaAws,
  },
  {
    id: 3,
    title: 'Kubernetes deployment',
    description: 'Deployed and managed clusters on AWS EKS for microservices.',
    impact: 'Ensured high availability and fault tolerance',
    Icon: SiKubernetes,
  },
  {
    id: 4,
    title: 'Containerization strategy',
    description: 'Implemented Docker and Kubernetes for streamlined application deployment.',
    impact: 'Minimized environment inconsistencies',
    Icon: FaDocker,
  },
  {
    id: 5,
    title: 'DevSecOps integration',
    description: 'Integrated security tools into CI/CD pipelines.',
    impact: 'Enhanced early vulnerability detection',
    Icon: FaCode,
  },
  {
    id: 6,
    title: 'Cloud monitoring',
    description: 'Configured monitoring using CloudWatch, Prometheus and Grafana.',
    impact: 'Improved system observability and incident response time',
    Icon: SiGrafana,
  },
];

const focusAreas = [
  ['Infrastructure automation', 'Automated AWS resources with Terraform and CloudFormation.'],
  ['Kubernetes implementation', 'Deployed and managed clusters, ensuring high availability.'],
  ['DevSecOps integration', 'Enhanced security with tools like OWASP ZAP and SonarQube.'],
  ['Monitoring setup', 'Configured CloudWatch, Prometheus and Grafana dashboards.'],
  ['Cost optimization', 'Reduced AWS costs by 30% while maintaining performance.'],
];

// Counts up once, when it scrolls into view
const CountUp = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setVal(to);
      return undefined;
    }
    const start = performance.now();
    const duration = 1400;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return <span ref={ref}>{val}%</span>;
};

// Time in role, worked out from the start date (July 2023)
const timeInRole = () => {
  const now = new Date();
  const months = (now.getFullYear() - 2023) * 12 + (now.getMonth() - 6);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} ${y === 1 ? 'yr' : 'yrs'}` : '', m ? `${m} ${m === 1 ? 'mo' : 'mos'}` : '']
    .filter(Boolean)
    .join(' ');
};

const Experience = () => {
  const [open, setOpen] = useState(1);
  const reduce = useReducedMotion();

  return (
    <section className="xp-section" id="experience">
      <div className="xp-inner">
        <header className="xp-head">
          <h1>Professional experience</h1>
          <p>Where I&apos;ve put these skills to work in production.</p>
        </header>

        <div className="xp-body">
          {/* ---------- Role summary (stays in view while scrolling) ---------- */}
          <aside className="xp-role">
            <p className="xp-current">
              <span className="xp-dot" /> Current role
            </p>
            <h2>DevOps Engineer</h2>
            <p className="xp-company">ProCorp</p>
            <p className="xp-meta">July 2023 to present · {timeInRole()}</p>
            <p className="xp-meta">
              <FaMapMarkerAlt aria-hidden="true" /> Hyderabad, India
            </p>

            <dl className="xp-metrics">
              {metrics.map(({ value, label }) => (
                <div key={label}>
                  <dt>
                    <CountUp to={value} />
                  </dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* ---------- Achievements + focus areas ---------- */}
          <div className="xp-main">
            <h2 className="xp-sub">Key achievements</h2>

            <ul className="xp-list">
              {achievements.map(({ id, title, description, impact, Icon }) => {
                const isOpen = open === id;
                return (
                  <li key={id} className={isOpen ? 'xp-item xp-open' : 'xp-item'}>
                    <button
                      type="button"
                      className="xp-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`xp-panel-${id}`}
                      onClick={() => setOpen(isOpen ? null : id)}
                    >
                      <span className="xp-icon">
                        <Icon size={20} />
                      </span>
                      <span className="xp-titles">
                        <strong>{title}</strong>
                        <span>{impact}</span>
                      </span>
                      <FaChevronDown className="xp-chevron" aria-hidden="true" />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`xp-panel-${id}`}
                          className="xp-panel"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                          <p>{description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <h2 className="xp-sub xp-sub-spaced">Focus areas</h2>
            <ul className="xp-focus">
              {focusAreas.map(([title, text]) => (
                <li key={title}>
                  <FaCheck className="xp-check" aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;