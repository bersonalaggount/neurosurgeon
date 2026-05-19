'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import useReveal from '@/hooks/useReveal';
import styles from './Hero.module.css';

export default function Hero() {
  useReveal();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('#home [data-reveal]'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('is-visible'), i * 90);
        });
      });
    });
  }, []);

  // Animated counters
  useEffect(() => {
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const step = Math.ceil(target / (1800 / 16));

      const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur.toLocaleString() + suffix;
          if (cur >= target) clearInterval(t);
        }, 16);
      }, { threshold: 0.5 });
      obs.observe(el);
    });
  }, []);

  // Parallax grid
  useEffect(() => {
    const grid = document.querySelector('[data-parallax]');
    if (!grid) return;
    const fn = () => { grid.style.transform = `translateY(${window.scrollY * 0.18}px)`; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <Image src="/hero-bg.png" alt="" fill priority
        style={{ objectFit: 'cover', zIndex: 0 }} />

      <div className={styles.bgGrid} data-parallax />
      <div className={styles.bgOverlay} />

      <div className={`container ${styles.content}`}>

        {/* Doctor photo */}
        <div data-reveal="left" style={{ '--rv-dur': '0.9s' }} className={styles.photoCol}>
          <div className={styles.photoFrame}>
            <Image src="/dr-muzammil.png" alt="Dr. Muzammil Ishaq" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Main info */}
        <div className={styles.infoCol}>

          <h1 data-reveal="up" style={{ '--rv-delay': '0s' }} className={styles.name}>
            Dr. Jagath Lal Gangadharan
          </h1>

          <div data-reveal="up" style={{ '--rv-delay': '0.08s' }} className={styles.qualLine}>
            MS (General Surgery) · MCh (Neurosurgery)
          </div>

          <p data-reveal="up" style={{ '--rv-delay': '0.15s' }} className={styles.tagline}>
            HOD & Senior Consultant Neurosurgeon, Rajagiri Hospital, Kochi
          </p>

          {/* Stats row */}
          <div data-reveal="up" style={{ '--rv-delay': '0.22s' }} className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum} data-counter="20" data-suffix="+">0+</span>
              <span className={styles.statLabel}>Years</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum} data-counter="2000" data-suffix="+">0+</span>
              <span className={styles.statLabel}>Surgeries</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum} data-counter="98" data-suffix="%">0%</span>
              <span className={styles.statLabel}>Satisfaction</span>
            </div>
          </div>

          {/* CTA */}
          <div data-reveal="up" style={{ '--rv-delay': '0.3s' }} className={styles.cta}>
            <button className={styles.bookBtn} onClick={() => scrollTo('appointment')}>
              Book Appointment Now
            </button>
            <div className={styles.availTag}>
              <span className={styles.dot} />
              Accepting new patients
            </div>
          </div>

        </div>

      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
