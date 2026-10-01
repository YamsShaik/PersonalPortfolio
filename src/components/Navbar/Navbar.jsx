import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Cloud, Code, Home, User, Terminal, Briefcase, Mail, Menu, X } from 'lucide-react';
import './Navbar.css';

const sections = ['home', 'about', 'skills', 'experience', 'projects'];

const icons = {
  home: Home,
  about: User,
  skills: Code,
  experience: Briefcase,
  projects: Terminal,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const reduce = useReducedMotion();

  // Highlight the section currently in view
  useEffect(() => {
    const handleScroll = () => {
      const all = [...sections, 'contact'];
      const position = window.scrollY + 100;
      for (const section of all) {
        const el = document.getElementById(section);
        if (el && position >= el.offsetTop && position < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile drawer on outside click or Escape
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <div className="nav-overlay" aria-hidden="true" />}

      <nav ref={navRef} className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} aria-label="Main">
        <div className="navbar-container">
          <Link to="/" className="logo" onClick={() => handleNavClick('home')}>
            <span className="logo-mark">
              <Cloud size={20} />
            </span>
            <span className="logo-text">Shaik Yams</span>
            <img
              className="logo-flag"
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India flag"
              width="22"
              height="15"
            />
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              {sections.map((section) => {
                const Icon = icons[section];
                const isActive = activeSection === section;
                return (
                  <li key={section}>
                    <Link
                      to={section === 'home' ? '/' : `/${section}`}
                      onClick={() => handleNavClick(section)}
                      className={isActive ? 'active' : ''}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="nav-pill"
                          transition={
                            reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }
                          }
                        />
                      )}
                      <Icon size={17} className="nav-icon" />
                      <span className="nav-text">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                    </Link>
                  </li>
                );
              })}

              <li className="contact-item">
                <Link to="/contact" className="contact-button" onClick={() => handleNavClick('contact')}>
                  <Mail size={17} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;