import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaGitAlt,
  FaGithub,
  FaJenkins,
  FaDocker,
  FaAws,
  FaLinux,
  FaUbuntu,
  FaWindows,
  FaPython,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  SiGnubash,
  SiGithubactions,
  SiKubernetes,
  SiHelm,
  SiArgo,
  SiTerraform,
  SiAnsible,
  SiPrometheus,
  SiGrafana,
  SiDatadog,
} from 'react-icons/si';
import './Skills.css';

// Every class in this component and its CSS starts with "sk-" so it can
// never collide with Home, Navbar, About or Footer styles.

const namespaces = ['all', 'code', 'cicd', 'containers', 'cloud', 'security', 'monitoring', 'systems'];

const tools = [
  { name: 'Python', Icon: FaPython, ns: 'code' },
  { name: 'Bash', Icon: SiGnubash, ns: 'code' },
  { name: 'Git', Icon: FaGitAlt, ns: 'code' },
  { name: 'GitHub', Icon: FaGithub, ns: 'code' },


  { name: 'Jenkins', Icon: FaJenkins, ns: 'cicd' },
  { name: 'GitHub Actions', Icon: SiGithubactions, ns: 'cicd' },

  { name: 'Docker', Icon: FaDocker, ns: 'containers' },
  { name: 'Docker Compose', Icon: FaDocker, ns: 'containers' },
  { name: 'Kubernetes', Icon: SiKubernetes, ns: 'containers' },
  { name: 'Helm', Icon: SiHelm, ns: 'containers' },
  { name: 'ArgoCD', Icon: SiArgo, ns: 'containers' },

  { name: 'AWS', Icon: FaAws, ns: 'cloud' },
  { name: 'Terraform', Icon: SiTerraform, ns: 'cloud' },
  { name: 'Ansible', Icon: SiAnsible, ns: 'cloud' },

  { name: 'OWASP ZAP', Icon: FaShieldAlt, ns: 'security' },
  { name: 'Trivy', Icon: FaShieldAlt, ns: 'security' },

  { name: 'Prometheus', Icon: SiPrometheus, ns: 'monitoring' },
  { name: 'Grafana', Icon: SiGrafana, ns: 'monitoring' },
  { name: 'Datadog', Icon: SiDatadog, ns: 'monitoring' },

  { name: 'Linux', Icon: FaLinux, ns: 'systems' },
  { name: 'Ubuntu', Icon: FaUbuntu, ns: 'systems' },
  { name: 'Windows', Icon: FaWindows, ns: 'systems' },
];

const Skills = () => {
  const [ns, setNs] = useState('all');
  const reduce = useReducedMotion();

  const rows = ns === 'all' ? tools : tools.filter((t) => t.ns === ns);
  const command = ns === 'all' ? 'kubectl get skills -A' : `kubectl get skills -n ${ns}`;

  // Type the command out each time a namespace is picked
  const [typed, setTyped] = useState(command);
  useEffect(() => {
    if (reduce) {
      setTyped(command);
      return undefined;
    }
    setTyped('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [command, reduce]);

  const body = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.035, delayChildren: reduce ? 0 : 0.25 } },
  };
  const row = {
    hidden: reduce ? {} : { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  };

  return (
    <section className="sk-section" id="skills">
      <div className="sk-inner">
        <header className="sk-head">
          <h1>Skills and technologies</h1>
          <p>
            Everything I work with, listed the way I like to read it: in a terminal. Pick a
            namespace to filter.
          </p>
        </header>

        <div className="sk-window">
          <div className="sk-bar">
            <span className="sk-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="sk-bar-title">yams@devops: ~/skills</span>
          </div>

          <div className="sk-layout">
            <div className="sk-ns" role="group" aria-label="Choose a namespace">
              {namespaces.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={ns === id ? 'sk-ns-btn sk-active' : 'sk-ns-btn'}
                  aria-pressed={ns === id}
                  onClick={() => setNs(id)}
                >
                  {id}
                </button>
              ))}
            </div>

            <div className="sk-output">
              <p className="sk-command" aria-label={command}>
                <span className="sk-prompt">$</span> {typed}
                <span className="sk-cursor" aria-hidden="true" />
              </p>

              <table className="sk-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th className="sk-col-ns">NAMESPACE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <motion.tbody key={ns} variants={body} initial="hidden" animate="visible">
                  {rows.map(({ name, Icon, ns: rowNs }) => (
                    <motion.tr key={name} variants={row}>
                      <td>
                        <span className="sk-name">
                          <Icon size={18} />
                          {name}
                        </span>
                      </td>
                      <td className="sk-col-ns">{rowNs}</td>
                      <td>
                        <span className="sk-status">
                          <i /> Ready
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>

              <p className="sk-total">{rows.length} resources found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;