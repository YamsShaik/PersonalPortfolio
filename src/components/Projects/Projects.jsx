import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

// Every class here starts with "pj-" so this section can't clash with
// Home, Navbar, About, Skills, Experience or Footer styles.

const projects = [
  {
    id: 1,
    short: 'AWS EKS',
    title: 'CI/CD Pipeline for Multi-Language Microservices',
    platform: 'AWS EKS',
    description:
      'Developed a CI/CD pipeline using GitHub Actions to automate the build, testing and deployment of microservices written in Java, Python and Go. Integrated ArgoCD for continuous deployment, ensuring seamless rollout of updates to an AWS EKS cluster.',
    skills: ['GitHub Actions', 'ArgoCD', 'AWS EKS', 'ALB Ingress Controller', 'Route 53', 'CI/CD'],
    impact:
      'Improved deployment speed, enhanced release reliability, ensured seamless traffic routing with custom DNS, and optimized application performance across different microservices through automated pipelines.',
    stats: [{ value: '70%', label: 'faster deployments' }],
    github: 'https://github.com/ShaikYams97/ultimate-devops-project-demo.git',
  },
  {
    id: 2,
    short: 'Kubernetes',
    title: 'CI/CD Pipeline and Kubernetes Deployment',
    platform: 'Kubernetes',
    description:
      'Designed and implemented a robust CI/CD pipeline using GitHub Actions to automate the build, testing and deployment of the Wanderlust travel booking platform. Containerized the application using Docker and orchestrated deployment on AWS using Kubernetes.',
    skills: ['GitHub Actions', 'Docker', 'Kubernetes', 'AWS', 'Prometheus', 'Grafana', 'CI/CD'],
    impact:
      'Enhanced deployment efficiency, reduced manual intervention, and improved application monitoring and security through automated workflows.',
    stats: [],
    github: 'https://github.com/ShaikYams97/Wanderlust-Mega-Project.git',
  },
  {
    id: 3,
    short: 'Azure AKS',
    title: 'Azure DevOps CI/CD Pipeline to AKS',
    platform: 'Azure Kubernetes Service (AKS)',
    description:
      'Built an end-to-end CI/CD pipeline using Azure DevOps Pipelines to build, test and containerize a microservices application, pushing images to Azure Container Registry (ACR) and deploying to Azure Kubernetes Service (AKS) using Helm charts. Implemented multi-stage YAML pipelines with approval gates for staging and production environments.',
    skills: ['Azure DevOps', 'AKS', 'ACR', 'Helm', 'YAML Pipelines', 'CI/CD'],
    impact:
      'Standardized deployments across environments with Helm, and eliminated manual approval bottlenecks through automated gated releases.',
    stats: [{ value: '65%', label: 'shorter release cycle' }],
    github: '',
  },
  {
    id: 4,
    short: 'AWS Terraform',
    title: 'Production-Grade AWS Infrastructure with Terraform',
    platform: 'AWS (Terraform)',
    description:
      'Provisioned a complete AWS environment as code using reusable Terraform modules: multi-AZ VPC with public and private subnets, NAT gateways, an EKS cluster with managed node groups, ECR repositories and IAM roles for service accounts (IRSA). Stored state in S3 with DynamoDB locking and ran plan and apply through a GitHub Actions workflow with pull request reviews.',
    skills: ['Terraform', 'AWS VPC', 'EKS', 'IAM and IRSA', 'S3', 'DynamoDB', 'ECR', 'IaC'],
    impact:
      'Made environments reproducible and consistent across dev, staging and production, enforced least-privilege access, and enabled safe team collaboration through remote state locking and reviewed changes.',
    stats: [{ value: '75%', label: 'faster environment setup' }],
    github: '',
  },
  {
    id: 5,
    short: 'Observability',
    title: 'Full-Stack Observability on AWS EKS',
    platform: 'Prometheus, Grafana, Loki and OpenTelemetry',
    description:
      'Built a unified observability stack for microservices on EKS covering metrics, logs and traces. Deployed Prometheus and Grafana with kube-prometheus-stack, Loki with Promtail for centralized logs, and OpenTelemetry with Jaeger for distributed tracing. Defined SLO-based alert rules in Alertmanager routed to Slack and PagerDuty, and integrated Amazon CloudWatch for AWS-level metrics.',
    skills: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Jaeger', 'Alertmanager', 'CloudWatch', 'PromQL'],
    impact:
      'Gave teams a single view of service health, shortened incident triage by correlating metrics, logs and traces, and cut alert noise through SLO-driven alerting.',
    stats: [
      { value: '55%', label: 'faster incident detection' },
      { value: '40%', label: 'fewer noisy alerts' },
    ],
    github: '',
  },
];

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const project = projects[index];

  const go = (next) => {
    const n = (next + projects.length) % projects.length;
    setDir(n > index || (index === projects.length - 1 && n === 0) ? 1 : -1);
    setIndex(n);
  };

  return (
    <section className="pj-section" id="projects">
      <div className="pj-inner">
        <header className="pj-head">
          <h1>Featured projects</h1>
          <p>Hands-on builds across AWS, Azure and Kubernetes. Choose a project to read more.</p>
        </header>

        <div className="pj-tabs" role="tablist" aria-label="Projects">
          {projects.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              id={`pj-tab-${p.id}`}
              aria-selected={index === i}
              aria-controls="pj-panel"
              className={index === i ? 'pj-tab pj-active' : 'pj-tab'}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
            >
              {p.short}
            </button>
          ))}
        </div>

        <div className="pj-stage" id="pj-panel" role="tabpanel" aria-labelledby={`pj-tab-${project.id}`}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={project.id}
              className="pj-card"
              custom={dir}
              initial={reduce ? false : { opacity: 0, x: dir * 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: dir * -36 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="pj-card-head">
                <div>
                  <span className="pj-platform">{project.platform}</span>
                  <h2>{project.title}</h2>
                </div>
                {project.github && (
                  <a
                    className="pj-code"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> View code
                  </a>
                )}
              </div>

              <div className="pj-card-body">
                <div className="pj-story">
                  <p className="pj-desc">{project.description}</p>

                  <h3>Technologies used</h3>
                  <ul className="pj-skills">
                    {project.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                <aside className="pj-impact">
                  <h3>Impact</h3>
                  {project.stats.length > 0 && (
                    <dl className="pj-stats">
                      {project.stats.map((s) => (
                        <div key={s.label}>
                          <dt>{s.value}</dt>
                          <dd>{s.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p>{project.impact}</p>
                </aside>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="pj-nav">
          <button type="button" className="pj-arrow" onClick={() => go(index - 1)} aria-label="Previous project">
            <FaChevronLeft />
          </button>
          <span className="pj-count" aria-live="polite">
            {index + 1} of {projects.length}
          </span>
          <button type="button" className="pj-arrow" onClick={() => go(index + 1)} aria-label="Next project">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;