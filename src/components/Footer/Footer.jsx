import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowUp,
} from 'react-icons/fa';
import './Footer.css';

const contacts = [
  { Icon: FaEnvelope, label: 'shaikowais47@gmail.com', href: 'mailto:shaikowais47@gmail.com' },
  { Icon: FaPhone, label: '+91 8309574762', href: 'tel:+918309574762' },
  { Icon: FaMapMarkerAlt, label: 'Nellore, Andhra Pradesh' },
];

const socials = [
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/YamsShaik' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaik-yams-194097334/' },
  { Icon: FaBriefcase, label: 'Naukri', href: 'https://www.naukri.com/mnjuser/profile?id=&altresid' },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <p className="footer-status">
          <span className="footer-dot" /> Open to DevOps and cloud roles
        </p>

        <h2 className="footer-title">Let&apos;s build something reliable.</h2>

        <ul className="footer-contact">
          {contacts.map(({ Icon, label, href }) => (
            <li key={label}>
              <Icon className="footer-icon" aria-hidden="true" />
              {href ? <a href={href}>{label}</a> : <span>{label}</span>}
            </li>
          ))}
        </ul>

        <div className="footer-social">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={label}
              title={label}
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            Made with <FaHeart className="footer-heart" aria-label="love" /> by Shaik Yams
            <span className="footer-year"> · {new Date().getFullYear()}</span>
          </p>
          <button type="button" className="to-top" onClick={scrollTop} aria-label="Back to top">
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;