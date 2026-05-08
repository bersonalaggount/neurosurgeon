// ═══════════════════════════════════════════════════════════════
// components/Navbar.jsx
//
// THE NAVIGATION BAR — fixed at the top of every page.
//
// Why 'use client'?
//   This component uses:
//     - useState  → to track if the mobile menu is open/closed
//     - useEffect → to add a scroll listener (can't do that on server)
//   Any time you use React hooks OR browser APIs (window, document),
//   you MUST add 'use client' at the top of the file.
//   Without it, Next.js tries to render it on the server and crashes.
//
// Structure:
//   <nav>
//     ├── Brand (name + title, links back to top)
//     ├── Desktop links (hidden on mobile)
//     ├── "Request Appointment" button (hidden on mobile)
//     └── Hamburger button (visible on mobile only)
//   <MobileMenu> (shown/hidden based on state)
// ═══════════════════════════════════════════════════════════════

'use client'; // ← REQUIRED because we use useState and useEffect
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css'; // ← Component-scoped styles

// ─── NAV LINKS DATA ──────────────────────────────────────────────
// Storing links as an array means we can .map() over them instead
// of copy-pasting <a> tags. Add a new link here and it appears
// in BOTH the desktop menu and mobile menu automatically.
const NAV_LINKS = [
  { label: 'The Clinic', href: '#clinic'      },
  { label: 'About',      href: '#about'       },
  { label: 'Services',   href: '#services'    },
  { label: 'Book',       href: '#appointment' },
  { label: 'Contact',    href: '#contact'     },
];

export default function Navbar() {
  // ─── STATE ────────────────────────────────────────────────────
  // useState returns [currentValue, setterFunction].
  // When the setter is called, React re-renders the component.

  const [scrolled, setScrolled]         = useState(false);  // has user scrolled past 40px?
  const [mobileOpen, setMobileOpen]     = useState(false);  // is the hamburger menu open?

  // ─── SCROLL EFFECT ────────────────────────────────────────────
  // useEffect runs AFTER the component mounts in the browser.
  // The empty [] dependency array means "run this once on mount".
  // We add a scroll event listener that adds a CSS class when the
  // user scrolls down — this triggers the frosted-glass nav style.
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY = how many pixels the user has scrolled down
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // CLEANUP: When the component unmounts (user leaves the page),
    // we remove the listener to prevent memory leaks.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // ← empty array = run once on mount only

  // ─── SMOOTH SCROLL ────────────────────────────────────────────
  // Intercept anchor-link clicks and scroll smoothly, accounting
  // for the 72px height of the fixed navbar so content isn't hidden.
  const handleNavClick = (e, href) => {
    e.preventDefault();                              // stop browser's default jump
    setMobileOpen(false);                            // close mobile menu if open
    const target = document.querySelector(href);     // find the target section
    if (!target) return;
    const offset = 80;                               // navbar height + breathing room
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // ─── RENDER ───────────────────────────────────────────────────
  return (
    // We conditionally add the 'scrolled' CSS class.
    // Template literals: `${condition ? 'class' : ''}` adds class when true.
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>

      {/* Inner wrapper — handles flex layout of brand/links/button */}
      <div className={styles.inner}>

        {/* ── BRAND ── */}
        {/* Clicking the brand name scrolls back to the very top */}
        {/* ── BRAND ── */}
        {/* Clicking the brand logo scrolls back to the very top */}
        <a
          href="#home"
          className={styles.brand}
          onClick={(e) => handleNavClick(e, '#home')}
        >
          {/* 2. Replace the text spans with your Image */}
          <Image 
            src="/logo.png" 
            alt="Dr. Muzammil Ishaq Logo"
            width={180} 
            height={50} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </a>

        {/* ── DESKTOP NAV LINKS ── */}
        {/* Hidden on mobile via CSS (display: none below 768px) */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            // key= is required when rendering lists in React.
            // React uses it to track which items change. Use something unique.
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.link}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── BOOK APPOINTMENT BUTTON ── */}
        <button
          className={styles.bookBtn}
          onClick={(e) => handleNavClick(e, '#appointment')}
        >
          Request Appointment
        </button>

        {/* ── HAMBURGER (mobile only) ── */}
        {/* aria-label makes it accessible for screen readers */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)} // toggle open/closed
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {/* Three lines that animate into an X when open */}
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* ── MOBILE MENU ── */}
      {/* The mobileOpen && ... pattern is called "conditional rendering".
          If mobileOpen is false, nothing renders. If true, the div appears. */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
}
