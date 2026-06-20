import React, { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaBriefcase , FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    useEffect(() => {
        const footer = document.querySelector('.compact-footer');
        if (!footer) return;
        
        const animationLayer = document.querySelector('.footer-animation-layer');
        if (!animationLayer) return;
        
        // Create floating particles
        const createParticles = () => {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.classList.add('floating-particle');
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                particle.style.width = `${Math.random() * 4 + 2}px`;
                particle.style.height = particle.style.width;
                animationLayer.appendChild(particle);
            }
        };
        
        // Create gradient orbs
        const createOrbs = () => {
            for (let i = 0; i < 3; i++) {
                const orb = document.createElement('div');
                orb.classList.add('gradient-orb');
                orb.style.left = `${Math.random() * 80 + 10}%`;
                orb.style.top = `${Math.random() * 60 + 20}%`;
                orb.style.animationDuration = `${Math.random() * 8 + 10}s`;
                orb.style.animationDelay = `${Math.random() * 3}s`;
                animationLayer.appendChild(orb);
            }
        };
        
        // Mouse ripple effect
        const createRipple = (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            
            const rect = footer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            footer.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        };
        
        // Social icon burst effect
        const createBurst = (element) => {
            const rect = element.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            
            for (let i = 0; i < 6; i++) {
                const burst = document.createElement('div');
                burst.classList.add('icon-burst');
                
                const x = (rect.left + rect.width / 2) - footerRect.left;
                const y = (rect.top + rect.height / 2) - footerRect.top;
                
                burst.style.left = `${x}px`;
                burst.style.top = `${y}px`;
                burst.style.setProperty('--angle', `${(360 / 6) * i}deg`);
                
                footer.appendChild(burst);
                
                setTimeout(() => burst.remove(), 800);
            }
        };
        
        createParticles();
        createOrbs();
        
        footer.addEventListener('mousemove', createRipple);
        
        const socialIcons = document.querySelectorAll('.social-link');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => createBurst(icon));
        });
        
        // Cleanup
        return () => {
            footer.removeEventListener('mousemove', createRipple);
            document.querySelectorAll('.floating-particle, .gradient-orb, .ripple-effect, .icon-burst').forEach(el => el.remove());
        };
    }, []);

    return (
        <footer className="compact-footer">
            <div className="footer-animation-layer"></div>
            
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-info">
                        <div className="info-item">
                            <FaEnvelope className="info-icon" />
                            <a href="mailto:shaikowais47@gmail.com">shaikowais47@gmail.com</a>
                        </div>
                        <div className="info-divider"></div>
                        <div className="info-item">
                            <FaPhone className="info-icon" />
                            <a href="tel:+918309574762">+91 8309574762</a>
                        </div>
                        <div className="info-divider"></div>
                        <div className="info-item">
                            <span className="location-text">Nellore, Andhra Pradesh</span>
                        </div>
                    </div>
                    
                    <div className="footer-social">
                        <a href="https://github.com/YamsShaik" target="_blank" rel="noopener noreferrer" className="social-link">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/shaik-yams-194097334/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.naukri.com/mnjuser/profile?id=&altresid" target="_blank" rel="noopener noreferrer" className="social-link">
                            <FaBriefcase />
                        </a>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p className="copyright-text">
                        Made with <FaHeart className="heart-icon" /> by Shaik Yams
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;