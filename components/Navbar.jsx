'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'The Clinic', href: '#clinic'      },
  { label: 'About',      href: '#about'       },
  { label: 'Services',   href: '#services'    },
  { label: 'Book',       href: '#appointment' },
  { label: 'Contact',    href: '#contact'     },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark]             = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode: persist + apply
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Smooth scroll
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        {/* Brand */}
        <a href="#home" className={styles.brand} onClick={(e) => handleNavClick(e, '#home')}>
          <Image src="/logo.png" alt="Dr. Muzammil Ishaq Logo" width={180} height={50}
            style={{ objectFit: 'contain' }} priority />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark mode toggle */}
        <button
          className={styles.themeToggle}
          onClick={toggleDark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? (
            /* Sun icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        {/* Book button */}
        <button className={styles.bookBtn} onClick={(e) => handleNavClick(e, '#appointment')}>
          Request Appointment
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>

      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.mobileLink}
              onClick={(e) => handleNavClick(e, link.href)}>
              {link.label}
            </a>
          ))}
          <button className={styles.mobileThemeBtn} onClick={toggleDark}>
            {dark ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
