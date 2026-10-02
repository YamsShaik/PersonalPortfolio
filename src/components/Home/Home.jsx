import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  FaAws,
  FaDocker,
  FaDownload,
  FaCloud,
  FaCodeBranch,
  FaCubes,
  FaCode,
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiElastic,
  SiGithubactions,
  SiGnubash,
  SiPython,
} from 'react-icons/si';
import './Home.css';

const techStack = [
  { name: 'AWS', Icon: FaAws },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Kubernetes', Icon: SiKubernetes },
  { name: 'Terraform', Icon: SiTerraform },
  { name: 'Jenkins', Icon: SiJenkins },
  { name: 'GitHub Actions', Icon: SiGithubactions },
  { name: 'Ansible', Icon: SiAnsible },
  { name: 'Prometheus', Icon: SiPrometheus },
  { name: 'Grafana', Icon: SiGrafana },
  { name: 'ELK Stack', Icon: SiElastic },
  { name: 'Python', Icon: SiPython },
  { name: 'Bash', Icon: SiGnubash },
];

const pipeline = [
  { label: 'Commit', detail: 'main · a41f9c2' },
  { label: 'Build', detail: 'Docker image' },
  { label: 'Test', detail: '128 checks passed' },
  { label: 'Deploy', detail: 'EKS rolling update' },
  { label: 'Live', detail: '99.99% uptime' },
];

const services = [
  {
    Icon: FaCloud,
    title: 'AWS Cloud Infrastructure',
    text: 'Scalable, secure and cost-aware AWS architectures built around what your business actually needs.',
  },
  {
    Icon: FaCodeBranch,
    title: 'CI/CD Pipeline Automation',
    text: 'Delivery pipelines that ship software quickly, repeatably and with fewer surprises.',
  },
  {
    Icon: FaCubes,
    title: 'Kubernetes Orchestration',
    text: 'Containerized applications run on Kubernetes for high availability and easy scaling.',
  },
  {
    Icon: FaCode,
    title: 'Infrastructure as Code',
    text: 'Terraform, CloudFormation and Ansible keep every environment consistent and version-controlled.',
  },
];

const Home = () => {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();

  // Soft spotlight that follows the cursor inside the hero
  const handleMove = (e) => {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    heroRef.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] },
  });

  return (
    <div className="home">
      <section className="hero" ref={heroRef} onMouseMove={handleMove}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy">
          <motion.p className="status" {...reveal(0.1)}>
            <span className="status-dot" /> Available for new projects
          </motion.p>

          <motion.h1 {...reveal(0.2)}>
            Hi, I&apos;m Shaik Yams.
            <br />
            I build infrastructure that doesn&apos;t blink.
          </motion.h1>

          <motion.div className="role" {...reveal(0.35)}>
            <TypeAnimation
              sequence={[
                'DevOps Engineer',
                1400,
                'AWS Specialist',
                1400,
                'Cloud Architect',
                1400,
                'Kubernetes Administrator',
                1400,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="role-text"
            />
          </motion.div>

          <motion.p className="bio" {...reveal(0.45)}>
            With solid technical experience in DevOps and AWS, I help businesses scale their
            infrastructure efficiently. I automate CI/CD pipelines, optimize cloud resources, and
            keep modern applications highly available and fault tolerant.
          </motion.p>

          <motion.div className="cta" {...reveal(0.55)}>
            <a
              href="https://drive.google.com/file/d/1IUMmJgJlu3ffztFv9H3-erGTfQY8CNp3/view?usp=sharing"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <FaDownload /> View resume
            </a>
          </motion.div>
        </div>

        {/* Signature moment: a deploy pipeline that runs on load and loops */}
        <motion.aside className="pipeline" aria-label="Example deployment pipeline" {...reveal(0.5)}>
          <div className="pipeline-head">
            <span className="dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="pipeline-title">deploy-pipeline</span>
          </div>
          <ol className="stages">
            {pipeline.map((s, i) => (
              <li key={s.label} className="stage" style={{ '--i': i }}>
                <span className="stage-node" />
                <div>
                  <strong>{s.label}</strong>
                  <span>{s.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </motion.aside>
      </section>

      <section className="stack" aria-labelledby="stack-title">
        <h2 id="stack-title">The tools I work with</h2>
        <div className="marquee">
          <div className="marquee-track">
            {[...techStack, ...techStack].map(({ name, Icon }, i) => (
              <div className="chip" key={`${name}-${i}`} aria-hidden={i >= techStack.length}>
                <Icon size={26} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="services-title">
        <h2 id="services-title">What I can do for you</h2>
        <ul className="service-list">
          {services.map(({ Icon, title, text }) => (
            <li className="service" key={title}>
              <span className="service-icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;