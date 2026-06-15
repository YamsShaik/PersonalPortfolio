import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
   FaGitAlt, FaJenkins, FaDocker, FaAws,
  FaLinux, FaChartLine, FaShieldAlt, FaTerminal, FaCode
} from 'react-icons/fa';
import { SiTerraform, SiAnsible, SiKubernetes } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const skills = [
    { 
      category: 'Programming', 
      items: ['Python', 'Bash', 'Go'], 
      icon: <FaCode />,
      color: '#4f46e5'
    },
    { 
      category: 'Version Control', 
      items: ['Git', 'GitHub', 'GitLab'], 
      icon: <FaGitAlt />,
      color: '#7c3aed'
    },
    { 
      category: 'CI/CD', 
      items: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD'], 
      icon: <FaJenkins />,
      color: '#2563eb'
    },
    { 
      category: 'Containerization', 
      items: ['Docker', 'Docker Compose'], 
      icon: <FaDocker />,
      color: '#3b82f6'
    },
    { 
      category: 'Orchestration', 
      items: ['Kubernetes', 'Helm', 'ArgoCD'], 
      icon: <SiKubernetes />,
      color: '#0284c7'
    },
    { 
      category: 'Infrastructure as Code', 
      items: ['Terraform', 'CloudFormation'], 
      icon: <SiTerraform />,
      color: '#0891b2'
    },
    { 
      category: 'Configuration Mgmt', 
      items: ['Ansible'], 
      icon: <SiAnsible />,
      color: '#0d9488'
    },
    { 
      category: 'Cloud Platforms', 
      items: ['AWS'], 
      icon: <FaAws />,
      color: '#6366f1'
    },
    { 
      category: 'Monitoring', 
      items: ['Prometheus', 'Grafana', 'Datadog'], 
      icon: <FaChartLine />,
      color: '#4f46e5'
    },
    { 
      category: 'Scripting & Shell', 
      items: ['Bash', 'Python'], 
      icon: <FaTerminal />,
      color: '#7c3aed'
    },
    { 
      category: 'Operating Systems', 
      items: ['Linux', 'Ubuntu', 'CentOS', 'Windows'], 
      icon: <FaLinux />,
      color: '#2563eb'
    },
    { 
      category: 'DevSecOps', 
      items: ['OWASP ZAP', 'SonarQube', 'Trivy'], 
      icon: <FaShieldAlt />,
      color: '#3b82f6'
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="premium-skills-section"
      id="premium-skills"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="premium-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="animated-grid"></div>
      </div>

      <div className="premium-content">
        <motion.div className="premium-section-header" variants={containerVariants}>
          <motion.div className="header-label" variants={titleVariants}>
            <span className="label-badge">💻 EXPERTISE</span>
          </motion.div>
          
          <motion.h2 className="premium-section-title" variants={titleVariants}>
            Technical Skills & Technologies
          </motion.h2>
          
          <motion.div 
            className="title-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          
          <motion.p className="premium-section-subtitle" variants={titleVariants}>
            Mastering the tools and platforms that power modern DevOps infrastructure
          </motion.p>
        </motion.div>

        <motion.div 
          className="premium-skills-grid"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="premium-skill-card"
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{
                y: -12,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
            >
              <motion.div 
                className="card-glow"
                animate={hoveredCard === index ? { opacity: 1 } : { opacity: 0 }}
                style={{ 
                  background: `radial-gradient(circle, ${skill.color}20, transparent)`
                }}
              />

              <motion.div 
                className="premium-skill-icon-wrapper"
                whileHover={{
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div 
                  className="icon-background"
                  style={{ background: `${skill.color}15` }}
                />
                <motion.div
                  className="premium-skill-icon"
                  style={{ color: skill.color }}
                  whileHover={{
                    rotate: [0, -8, 8, -4, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.div>
              </motion.div>

              <motion.h3 className="premium-skill-title">
                {skill.category}
              </motion.h3>

              <motion.ul className="premium-skill-items">
                {skill.items.map((item, i) => (
                  <motion.li 
                    key={i}
                    className="premium-skill-item"
                    initial={{ x: -15, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="item-dot" style={{ background: skill.color }}></span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div 
                className="card-underline"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ background: skill.color }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated background particles */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;