import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload } from 'react-icons/fa';
import { FaAws, FaDocker } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins, SiAnsible, SiGitlab } from 'react-icons/si';
import './Home.css';

const Home = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  const cloudPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <div className="home-container">
      {/* Enhanced Background Animation */}
      <div className="background-animation">
        <div className="cloud-servers">
          <motion.svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 800 600" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M100,300 Q150,100 300,200 T500,300 T700,400"
              stroke="#4E8BC0"
              strokeWidth="4"
              fill="transparent"
              variants={cloudPathVariants}
            />
            <motion.circle cx="100" cy="300" r="20" fill="#5C6BC0" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.circle cx="300" cy="200" r="30" fill="#3949AB" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
            <motion.circle cx="500" cy="300" r="25" fill="#5C6BC0" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            />
            <motion.circle cx="700" cy="400" r="20" fill="#3949AB" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            />
            
            {/* Additional animated elements */}
            <motion.path
              d="M200,450 Q300,400 400,450 T600,400"
              stroke="#7986CB"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 3, duration: 2, ease: "easeInOut" }}
            />
            
            <motion.rect 
              x="150" 
              y="150" 
              width="40" 
              height="40" 
              rx="5"
              fill="#3949AB"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.8, rotate: 180 }}
              transition={{ delay: 2, duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            
            <motion.rect 
              x="600" 
              y="200" 
              width="30" 
              height="30" 
              rx="5"
              fill="#5C6BC0"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.8, rotate: -180 }}
              transition={{ delay: 2.5, duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.svg>
        </div>
      </div>

      <motion.div
        className="hero-content-centered"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="hero-text">
          <motion.h1 variants={itemVariants}>
            Hi, I'm <span className="highlight">Shaik Yams </span>
          </motion.h1>
          
          <motion.div className="typewriter" variants={itemVariants}>
            
            <TypeAnimation
              sequence={[
                ' DevOps Engineer',
                1000,
                ' AWS Specialist',
                1000,
                ' Cloud Architect',
                1000,
                ' Kubernetes Administrator',
                1000,
              ]}
              wrapper="span"
              speed={50}
              className="typed-text"
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p className="bio" variants={itemVariants}>
            With good technincal experience in DevOps and AWS, I help businesses scale their infrastructure efficiently.
            I specialize in automating CI/CD pipelines, optimizing cloud resources, and ensuring high availability
            and fault tolerance for modern applications.
          </motion.p>
          
          <motion.div className="cta-buttons" variants={itemVariants}>
            <motion.a
              href="https://drive.google.com/file/d/1IMIHKO2iR2yTnIuyU8VL_7IunErqCpfF/view"
              className="btn primary-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(63, 81, 181, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> View Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="tech-stack"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2>Tech Stack</h2>
        <div className="tech-icons">
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <FaAws size={40} />
            <span>AWS</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <FaDocker size={40} />
            <span>Docker</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <SiKubernetes size={40} />
            <span>Kubernetes</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <SiTerraform size={40} />
            <span>Terraform</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <SiJenkins size={40} />
            <span>Jenkins</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <SiAnsible size={40} />
            <span>Ansible</span>
          </motion.div>
          <motion.div className="tech-icon" whileHover={{ y: -10, scale: 1.1 }}>
            <SiGitlab size={40} />
            <span>GitLab CI</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <h2>Services I Offer</h2>
        
        <div className="services-grid">
          <motion.div 
            className="service-card"
            whileHover={{ 
              y: -10, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="service-icon aws-icon"></div>
            <h3>AWS Cloud Infrastructure</h3>
            <p>Design and implement scalable, secure, and cost-effective AWS architectures tailored to your business needs.</p>
          </motion.div>
          
          <motion.div 
            className="service-card"
            whileHover={{ 
              y: -10, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="service-icon cicd-icon"></div>
            <h3>CI/CD Pipeline Automation</h3>
            <p>Build efficient delivery pipelines that enable rapid and reliable software deployments.</p>
          </motion.div>
          
          <motion.div 
            className="service-card"
            whileHover={{ 
              y: -10, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="service-icon k8s-icon"></div>
            <h3>Kubernetes Orchestration</h3>
            <p>Set up and manage containerized applications with Kubernetes for high availability and scalability.</p>
          </motion.div>
          
          <motion.div 
            className="service-card"
            whileHover={{ 
              y: -10, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="service-icon iac-icon"></div>
            <h3>Infrastructure as Code</h3>
            <p>Implement IaC practices using Terraform, CloudFormation, and Ansible for consistent and version-controlled infrastructure.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
