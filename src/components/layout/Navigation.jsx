/**
 * Navigation Component
 * Fiverr Pro-inspired navigation bar with search
 */

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.nav
      className="navigation"
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

        {/* Search Bar */}
        <form className="navigation__search" onSubmit={handleSearch}>
          <svg className="navigation__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <circle cx="9" cy="9" r="7" strokeWidth="1.5" />
            <path d="m14 14 5 5" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="navigation__search-input"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
              <path d="M2 10h16M10 2a8 8 0 018 8 8 8 0 01-8 8" strokeWidth="1.5" />
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
            {/* Mobile Search */}
            <form className="navigation__mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                className="navigation__mobile-search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="navigation__mobile-search-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <circle cx="9" cy="9" r="7" strokeWidth="1.5" />
                  <path d="m14 14 5 5" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </form>

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
                    className={`navigation__mobile-link ${location.pathname === link.path ? 'navigation__mobile-link--active' : ''
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="navigation__mobile-actions">
              <Link to="/signin" className="navigation__mobile-signin">Sign in</Link>
              <Link to="/join" className="navigation__mobile-join">Join</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
