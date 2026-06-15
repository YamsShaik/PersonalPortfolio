import React, { useEffect, useRef } from 'react';
import './Experience.css';
import { FaJenkins, FaAws, FaDocker, FaCode } from 'react-icons/fa';
import { SiKubernetes, SiGrafana } from 'react-icons/si';

const Experience = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerTimeline = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
      observerTimeline.observe(item);
    });

    return () => {
      observerTimeline.disconnect();
    };
  }, []);

  const achievements = [
    {
      id: 1,
      title: "CI/CD Implementation",
      description: "Developed and maintained pipelines using Jenkins, GitHub Actions, and GitLab CI/CD",
      impact: "Reduced deployment time by 40%",
      icon: <FaJenkins />
    },
    {
      id: 2,
      title: "AWS Infrastructure Automation",
      description: "Automated infrastructure provisioning with Terraform and CloudFormation",
      impact: "Reduced manual efforts by 70%",
      icon: <FaAws />
    },
    {
      id: 3,
      title: "Kubernetes Deployment",
      description: "Deployed and managed clusters on AWS EKS for microservices",
      impact: "Ensured high availability and fault tolerance",
      icon: <SiKubernetes />
    },
    {
      id: 4,
      title: "Containerization Strategy",
      description: "Implemented Docker and Kubernetes for streamlined application deployment",
      impact: "Minimized environment inconsistencies",
      icon: <FaDocker />
    },
    {
      id: 5,
      title: "DevSecOps Integration",
      description: "Integrated security tools into CI/CD pipelines",
      impact: "Enhanced early vulnerability detection",
      icon: <FaCode />
    },
    {
      id: 6,
      title: "Cloud Monitoring",
      description: "Configured monitoring using CloudWatch, Prometheus, and Grafana",
      impact: "Improved system observability and incident response time",
      icon: <SiGrafana />
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="section-header">
          <h2>Professional Experience</h2>
          <div className="underline"></div>
          <h3>DevOps Engineer at ProCorp</h3>
          <p className="duration">July 2023 - Present | Hyderabad, India</p>
        </div>

        <div className="experience-content">
          <div className="achievements-container">
            <h3 className="sub-heading">Key Achievements</h3>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <div className="impact">
                    <span>Impact:</span> {achievement.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-container" ref={timelineRef}>
            <h3 className="sub-heading">Experience Timeline</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Infrastructure Automation</h4>
                  <p>Automated AWS resources with Terraform and CloudFormation</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Kubernetes Implementation</h4>
                  <p>Deployed and managed clusters, ensuring high availability</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>DevSecOps Integration</h4>
                  <p>Enhanced security with tools like OWASP ZAP and SonarQube</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Monitoring Setup</h4>
                  <p>Configured CloudWatch, Prometheus, and Grafana dashboards</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Cost Optimization</h4>
                  <p>Reduced AWS costs by 30% while maintaining performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;