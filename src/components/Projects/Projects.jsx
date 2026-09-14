import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "CI/CD Pipeline for Multi-Language Microservices",
      platform: "AWS EKS",
      description: "Developed a CI/CD pipeline using GitHub Actions to automate the build, testing, and deployment of microservices written in Java, Python, and Go. Integrated ArgoCD for continuous deployment, ensuring seamless rollout of updates to an AWS EKS cluster.",
      skills: ["GitHub Actions", "ArgoCD", "AWS EKS", "ALB Ingress Controller", "Route 53", "CI/CD"],
      impact: "Improved deployment speed by 70%, enhanced release reliability, ensured seamless traffic routing with custom DNS, and optimized application performance across different microservices through automated pipelines.",
      github: "https://github.com/ShaikYams97/ultimate-devops-project-demo.git"
    },
    {
      id: 2,
      title: "CI/CD Pipeline and Kubernetes Deployment",
      platform: "Kubernetes",
      description: "Designed and implemented a robust CI/CD pipeline using GitHub Actions to automate the build, testing, and deployment of the Wanderlust travel booking platform. Containerized the application using Docker and orchestrated deployment on AWS using Kubernetes.",
      skills: ["GitHub Actions", "Docker", "Kubernetes", "AWS", "Prometheus", "Grafana", "CI/CD"],
      impact: "Enhanced deployment efficiency, reduced manual intervention, and improved application monitoring and security through automated workflows.",
      github: "https://github.com/ShaikYams97/Wanderlust-Mega-Project.git"
    },
    {
      id: 3,
      title: "Azure DevOps CI/CD Pipeline to AKS",
      platform: "Azure Kubernetes Service (AKS)",
      description: "Built an end-to-end CI/CD pipeline using Azure DevOps Pipelines to build, test, and containerize a microservices application, pushing images to Azure Container Registry (ACR) and deploying to Azure Kubernetes Service (AKS) using Helm charts. Implemented multi-stage YAML pipelines with approval gates for staging and production environments.",
      skills: ["Azure DevOps", "AKS", "ACR", "Helm", "YAML Pipelines", "CI/CD"],
      impact: "Cut release cycle time by 65%, standardized deployments across environments with Helm, and eliminated manual approval bottlenecks through automated gated releases.",
      github: ""
    },
    {
      id: 4,
      title: "Infrastructure as Code on Azure with Terraform",
      platform: "Azure (Terraform)",
      description: "Automated provisioning of Azure infrastructure using Terraform, including Virtual Networks, Subnets, AKS clusters, Azure Key Vault, and Storage Accounts. Structured reusable Terraform modules and integrated remote state management with Azure Blob Storage for team collaboration.",
      skills: ["Terraform", "Azure VNet", "AKS", "Key Vault", "Azure Storage", "IaC"],
      impact: "Reduced infrastructure provisioning time by 75%, enforced consistent environment configuration, and enabled safe collaborative changes via remote state locking.",
      github: ""
    },
    {
      id: 5,
      title: "Azure Monitoring, Alerting & Cost Optimization",
      platform: "Azure Monitor & Log Analytics",
      description: "Implemented centralized observability for Azure workloads using Azure Monitor, Log Analytics workspaces, and Application Insights. Configured custom alert rules, Workbooks dashboards, and Azure Cost Management budgets with automated Teams/Slack notifications for anomalies.",
      skills: ["Azure Monitor", "Log Analytics", "Application Insights", "Azure Cost Management", "KQL"],
      impact: "Reduced mean time to detect incidents by 55% and identified cost-saving opportunities that lowered monthly cloud spend by 20%.",
      github: ""
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="animated-bg">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <div 
        className="mouse-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects-wrapper">
          <div className="project-tabs">
            {projects.map(project => (
              <div 
                key={project.id}
                className={`project-tab ${selectedTab === project.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(project.id)}
              >
                <span className="project-number">0{project.id}</span>
                <div className="tab-content">
                  <h3>{project.title}</h3>
                  <p className="platform">{project.platform}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="project-details-container">
            {projects.filter(p => p.id === selectedTab).map(project => (
              <div key={project.id} className="project-details">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-btn">
                      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Code
                    </a>
                  ) : null}
                </div>
                
                <div className="project-content">
                  <p className="description">{project.description}</p>
                  
                  <div className="skills-container">
                    <h4>Technologies Used</h4>
                    <div className="skills">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="impact-container">
                    <h4>Impact</h4>
                    <p className="impact">{project.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;