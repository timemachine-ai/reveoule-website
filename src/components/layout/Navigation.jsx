/**
 * Navigation Component
 * Premium navigation bar with scroll behavior
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [snowfallEnabled, setSnowfallEnabled] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Plans', path: '/plans' },
    { name: 'Resources', path: '/about', hasDropdown: true },
  ];

  const resourceLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Skin Advisor', path: '/skin-advisor' },
  ];

  return (
    <motion.nav
      className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navigation__container container">
        {/* Logo */}
        <Link to="/" className="navigation__logo">
          <span className="navigation__logo-text">Rêveoulé</span>
          <span className="navigation__logo-tagline">Skincare & Beauty</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navigation__links">
          {navLinks.map((link) => (
            <li key={link.path} className="navigation__item">
              {link.hasDropdown ? (
                <div
                  className="navigation__dropdown"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <button className="navigation__link navigation__link--dropdown">
                    {link.name}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 8L2 4h8l-4 4z"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        className="navigation__dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {resourceLinks.map((resource) => (
                          <Link
                            key={resource.path}
                            to={resource.path}
                            className="navigation__dropdown-link"
                          >
                            {resource.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`navigation__link ${
                    location.pathname === link.path ? 'navigation__link--active' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="navigation__actions">
          <Link to="/affiliate" className="navigation__action-link">
            Become an Affiliate
          </Link>
          <button
            className={`navigation__snowfall-toggle ${snowfallEnabled ? 'navigation__snowfall-toggle--active' : ''}`}
            onClick={() => setSnowfallEnabled(!snowfallEnabled)}
            aria-label="Toggle snowfall"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5M2 12h20M7 7l5 5 5-5M7 17l5-5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="navigation__globe">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="10" cy="10" r="8" strokeWidth="1.5"/>
              <path d="M2 10h16M10 2a8 8 0 018 8 8 8 0 01-8 8" strokeWidth="1.5"/>
            </svg>
          </button>
          <Link to="/signin" className="navigation__signin">Sign in</Link>
          <Link to="/join" className="navigation__join-btn">Join</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`navigation__toggle ${isMobileMenuOpen ? 'navigation__toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="navigation__toggle-line"></span>
          <span className="navigation__toggle-line"></span>
          <span className="navigation__toggle-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navigation__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="navigation__mobile-links">
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  className="navigation__mobile-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`navigation__mobile-link ${
                      location.pathname === link.path ? 'navigation__mobile-link--active' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snowfall Effect */}
      {snowfallEnabled && (
        <div className="navigation__snowfall">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="navigation__snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navigation;
