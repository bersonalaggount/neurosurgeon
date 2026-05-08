// ═══════════════════════════════════════════════════════════════
// components/Hero.jsx
//
// THE HERO SECTION — the first thing visitors see.
// Full-viewport height, dramatic typography, animated stat cards.
//
// Why 'use client'?
//   We use useEffect to:
//     1. Animate the stat counters when they come into view
//     2. Add a parallax scroll effect on the background grid
//     3. Trigger the reveal animations on mount
// ═══════════════════════════════════════════════════════════════

'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from './Hero.module.css';

// ─── STATS DATA ───────────────────────────────────────────────────
// Keeping data separate from JSX makes it easier to update numbers
// without digging through markup.
const STATS = [
  { num: 15,   suffix: '+', label: 'Years of Practice'    },
  { num: 2500, suffix: '+', label: 'Surgeries Performed'  },
  { num: 98,   suffix: '%', label: 'Patient Satisfaction' },
];

export default function Hero() {

  // ─── COUNTER ANIMATION ──────────────────────────────────────────
  // When the stat numbers scroll into view, they count up from 0.
  // We use IntersectionObserver — a browser API that fires a callback
  // when an element enters the viewport. Much more efficient than
  // checking scroll position every frame.
  useEffect(() => {
    const statEls = document.querySelectorAll('[data-counter]');

    statEls.forEach((el) => {
      const target  = parseInt(el.getAttribute('data-counter'), 10);
      const suffix  = el.getAttribute('data-suffix') || '';
      const duration = 1600; // ms
      const step = Math.ceil(target / (duration / 16)); // ~60fps

      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect(); // stop watching once triggered

        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          // toLocaleString adds comma separators: 2500 → "2,500"
          el.textContent = current.toLocaleString() + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }, []); // run once on mount

  // ─── PARALLAX BACKGROUND ────────────────────────────────────────
  // Moves the grid background at half the scroll speed — creates
  // a sense of depth as the user scrolls.
  useEffect(() => {
    const grid = document.querySelector('[data-parallax]');
    if (!grid) return;

    const handleScroll = () => {
      grid.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── REVEAL ANIMATIONS ON MOUNT ─────────────────────────────────
  // Hero elements are already in the viewport on page load, so the
  // IntersectionObserver in the hook below won't catch them.
  // We manually add 'visible' after a tiny delay to trigger the CSS animation.
  useEffect(() => {
    const reveals = document.querySelectorAll('#home .reveal');
    reveals.forEach((el) => {
      // Small timeout so the animation is noticeable (not instant)
      setTimeout(() => el.classList.add('visible'), 100);
    });
  }, []);

  // ─── SMOOTH SCROLL HELPER ───────────────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  // ─── RENDER ─────────────────────────────────────────────────────
  return (
    <section className={styles.hero} id="home">

      {/* 1. Add the Background Image */}
      <Image
        src="/hero-bg.png"
        alt="Luxury Clinic Background"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      />

      {/* Subtle dot-grid background — parallaxes on scroll */}
      <div className={styles.bgGrid} data-parallax />

      {/* Radial gradient overlay — makes the text readable over the grid */}
      <div className={styles.bgOverlay} />

      {/* ── MAIN CONTENT GRID ── */}
      {/* Two columns: left = text, right = stats card */}
      <div className={`container ${styles.content}`}>

        {/* Left column */}
        <div className={styles.left}>

          {/* Eyebrow label — "Consultant Neurosurgeon · Kochi, Kerala" */}
          <div className={`reveal ${styles.eyebrow}`}>
            <span className={styles.eyebrowLine} />
            Consultant Neurosurgeon · Kochi, Kerala
          </div>

          {/* Main headline */}
          <h1 className={`reveal reveal--delay-1 ${styles.title}`}>
            Precision Care<br />
            <em>for the Brain &amp; Spine</em>
          </h1>

          {/* Supporting paragraph */}
          <p className={`reveal reveal--delay-2 ${styles.subtitle}`}>
            Board-certified neurosurgical expertise delivered with compassion,
            clarity, and the highest standards of evidence-based medicine.
          </p>

          {/* Call-to-action buttons */}
          <div className={`reveal reveal--delay-3 ${styles.actions}`}>
            <button
              className="btn btn--primary"
              onClick={() => scrollTo('appointment')}
            >
              Book a Consultation
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => scrollTo('clinic')}
            >
              About the Clinic
            </button>
          </div>
        </div>

        {/* Right column — stats card */}
        <div className={`reveal reveal--delay-2 ${styles.right}`}>

          {/* White card with three stats */}
          <div className={styles.card}>
            {STATS.map((stat, index) => (
              // React.Fragment lets us return multiple elements without a wrapper div.
              // The <> shorthand works the same as <React.Fragment>.
              <>
                <div key={stat.label} className={styles.stat}>
                  {/*
                    data-counter and data-suffix are custom HTML attributes.
                    Our useEffect above reads them to know what to animate to.
                    This is a clean way to pass config to a DOM-based animation.
                  */}
                  <span
                    className={styles.statNum}
                    data-counter={stat.num}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix} {/* start at 0, JS counts up */}
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>

                {/* Divider line between stats (but not after the last one) */}
                {index < STATS.length - 1 && (
                  <div key={`divider-${index}`} className={styles.divider} />
                )}
              </>
            ))}
          </div>

          {/* "Available" pill badge */}
          <div className={styles.availableBadge}>
            {/* Green pulse dot */}
            <span className={styles.dot} />
            Available for consultations
          </div>

        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      {/* Animated line at the bottom that pulses to invite scrolling */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
