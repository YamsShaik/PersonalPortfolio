import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Cloud, Code, Home, User, Terminal, Briefcase, Menu, X } from 'lucide-react';
import './Navbar.css';

const sections = ['home', 'about', 'skills', 'experience', 'projects'];

const icons = {
  home: Home,
  about: User,
  skills: Code,
  experience: Briefcase,
  projects: Terminal,
};

const MOBILE_MAX = 820; // must match the breakpoint in Navbar.css

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggleRef = useRef(null);
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

  // While the drawer is open: Escape closes it, the page behind can't scroll,
  // and growing the window to desktop width closes it so nothing stays locked.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > MOBILE_MAX) setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMenuOpen]);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* A real click handler is the most reliable way to close on touch screens */}
      {isMenuOpen && (
        <div className="nav-overlay" aria-hidden="true" onClick={() => setIsMenuOpen(false)} />
      )}

      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} aria-label="Main">
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
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div id="nav-menu" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
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

              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;