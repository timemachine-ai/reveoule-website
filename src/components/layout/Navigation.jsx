/**
 * Navigation Component
 * Clean navigation bar with slide-in mobile menu
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

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
    <>
      <motion.nav
        className="navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navigation__container container">
          {/* Mobile Menu Toggle - Left side on mobile */}
          <button
            className={`navigation__toggle ${isMobileMenuOpen ? 'navigation__toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="navigation__toggle-line"></span>
            <span className="navigation__toggle-line"></span>
            <span className="navigation__toggle-line"></span>
          </button>

          {/* Logo - Centered on mobile */}
          <Link to="/" className="navigation__logo">
            <span className="navigation__logo-text">Rêveoulé</span>
            <span className="navigation__logo-tagline">Skincare & Beauty</span>
          </Link>

          {/* Desktop Navigation Links */}
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
                        <path d="M6 8L2 4h8l-4 4z" />
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
                    className={`navigation__link ${location.pathname === link.path ? 'navigation__link--active' : ''
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
            <button className="navigation__globe">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z" />
                <path d="M21 15H3" />
                <path d="M21 9H3" />
              </svg>
            </button>
            <Link to="/signin" className="navigation__signin">Sign in</Link>
            <Link to="/join" className="navigation__join-btn">Join</Link>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="navigation__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="navigation__sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="navigation__sidebar-header">
                <Link to="/" className="navigation__sidebar-logo" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="navigation__logo-text">Rêveoulé</span>
                  <span className="navigation__logo-tagline">Skincare & Beauty</span>
                </Link>
              </div>

              <ul className="navigation__sidebar-links">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.path}
                    className="navigation__sidebar-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`navigation__sidebar-link ${location.pathname === link.path ? 'navigation__sidebar-link--active' : ''
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Sidebar Auth Buttons */}
              <div className="navigation__sidebar-actions">
                <Link
                  to="/signin"
                  className="navigation__sidebar-signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/join"
                  className="navigation__sidebar-join"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
