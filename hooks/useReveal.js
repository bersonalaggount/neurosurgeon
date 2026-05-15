'use client';
import { useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   useReveal — scroll-triggered entrance animations (singleton)

   HOW IT WORKS:
   1. On first call, injects a <style> block and creates ONE
      IntersectionObserver that watches all [data-reveal] elements.
   2. When an element enters the viewport, it gets class "is-visible"
      which triggers the CSS transition.
   3. Subsequent calls from other components just re-scan the DOM
      for new [data-reveal] elements and observe them.

   KEY FIX: The transition is declared on the HIDDEN state, not the
   visible state. This gives the browser time to parse the transition
   BEFORE the class change, preventing instant snapping.

   HMR FIX: All singleton checks use DOM queries (not module-level
   booleans) so they survive hot module replacement correctly.
   ═══════════════════════════════════════════════════════════════ */

// We store the observer and scroll handler on the window object
// so they persist across HMR module re-evaluations.
const GLOBAL_KEY = '__useReveal';

function getGlobals() {
  if (typeof window === 'undefined') return null;
  if (!window[GLOBAL_KEY]) {
    window[GLOBAL_KEY] = {
      observer: null,
      scrollHandler: null,
      mountCount: 0,
    };
  }
  return window[GLOBAL_KEY];
}

function injectStyles() {
  if (typeof document === 'undefined') return;

  // Check the DOM, not a module-level boolean — survives HMR.
  if (document.getElementById('__reveal-styles')) return;

  const style = document.createElement('style');
  style.id = '__reveal-styles';
  style.textContent = `
    /* ── Scroll progress bar ── */
    #__scroll-progress {
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, #10b981, #3b82f6);
      z-index: 99999;
      pointer-events: none;
      transition: width 0.12s linear;
    }

    /* ─────────────────────────────────────────────────────────────
       HIDDEN STATE
       The transition is declared HERE so the browser has it parsed
       before the class toggle. This is critical for smooth animations.
    ───────────────────────────────────────────────────────────── */
    [data-reveal] {
      opacity: 0 !important;
      transition:
        opacity   var(--rv-dur, 0.7s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s),
        transform var(--rv-dur, 0.7s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s) !important;
    }
    [data-reveal="up"]    { transform: translateY(44px) !important; }
    [data-reveal="left"]  { transform: translateX(-52px) !important; }
    [data-reveal="right"] { transform: translateX(52px) !important; }
    [data-reveal="scale"] { transform: scale(0.9) translateY(28px) !important; }
    [data-reveal="fade"]  { transform: none !important; }

    /* ─────────────────────────────────────────────────────────────
       VISIBLE STATE — transition back to natural position.
    ───────────────────────────────────────────────────────────── */
    [data-reveal].is-visible {
      opacity: 1 !important;
      transform: none !important;
    }

    /* ─────────────────────────────────────────────────────────────
       CARD LIFT — hover effect for cards
    ───────────────────────────────────────────────────────────── */
    [data-lift] {
      transition:
        transform  0.38s cubic-bezier(0.25, 1, 0.5, 1),
        box-shadow 0.38s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }
    /* When an element has BOTH data-reveal and data-lift,
       the reveal transition takes priority until visible */
    [data-reveal][data-lift] {
      transition:
        opacity   var(--rv-dur, 0.7s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s),
        transform var(--rv-dur, 0.7s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s) !important;
    }
    [data-reveal][data-lift].is-visible {
      transition:
        opacity   var(--rv-dur, 0.7s) cubic-bezier(0.16, 1, 0.3, 1) var(--rv-delay, 0s),
        transform 0.38s cubic-bezier(0.25, 1, 0.5, 1),
        box-shadow 0.38s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }
    [data-lift]:hover {
      transform: translateY(-7px) scale(1.016) !important;
      box-shadow:
        0 0 0 1px rgba(16, 185, 129, 0.12),
        0 18px 44px -8px rgba(16, 185, 129, 0.22),
        0 6px 16px -4px rgba(59, 130, 246, 0.14) !important;
    }

    /* ─────────────────────────────────────────────────────────────
       GLINT — shimmer sweep on hover
    ───────────────────────────────────────────────────────────── */
    [data-glint] { position: relative; overflow: hidden; }
    [data-glint]::before {
      content: '';
      position: absolute;
      top: -50%; left: -65%;
      width: 38%; height: 200%;
      background: linear-gradient(
        105deg,
        transparent 35%,
        rgba(255, 255, 255, 0.25) 50%,
        transparent 65%
      );
      transform: skewX(-18deg);
      pointer-events: none;
      z-index: 10;
      transition: left 0s;
    }
    [data-glint]:hover::before {
      left: 130%;
      transition: left 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }

    /* ─────────────────────────────────────────────────────────────
       AMBIENT BLOBS — floating colour orbs
    ───────────────────────────────────────────────────────────── */
    [data-blob] {
      position: absolute;
      border-radius: 50%;
      filter: blur(72px);
      pointer-events: none;
      z-index: 0;
      animation: __blob 13s ease-in-out infinite alternate;
    }
    @keyframes __blob {
      0%   { transform: translate(0, 0)        scale(1);    }
      40%  { transform: translate(28px, -22px) scale(1.06); }
      100% { transform: translate(-16px, 18px) scale(0.96); }
    }

    /* ─────────────────────────────────────────────────────────────
       PULSING DOT — prepended to section labels
    ───────────────────────────────────────────────────────────── */
    [data-pulse]::before {
      content: '';
      display: inline-block;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #10b981;
      margin-right: 8px;
      vertical-align: 1px;
      animation: __pulse-dot 2.2s ease-in-out infinite;
    }
    @keyframes __pulse-dot {
      0%, 100% { opacity: 1;   transform: scale(1);   }
      50%      { opacity: 0.3; transform: scale(0.5); }
    }

    /* ─────────────────────────────────────────────────────────────
       BUTTON PRESS — subtle spring on all buttons
    ───────────────────────────────────────────────────────────── */
    button {
      transition:
        transform  0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.2s ease,
        background 0.2s ease !important;
    }
    button:hover  { transform: translateY(-2px) !important; }
    button:active { transform: scale(0.96) !important; }

    /* ─────────────────────────────────────────────────────────────
       INPUT FOCUS — emerald ring
    ───────────────────────────────────────────────────────────── */
    input:focus, select:focus, textarea:focus {
      outline: none !important;
      border-color: #10b981 !important;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15) !important;
      transition: box-shadow 0.18s, border-color 0.18s !important;
    }

    /* ─────────────────────────────────────────────────────────────
       PAGE ENTER — entire <main> fades up on first load
    ───────────────────────────────────────────────────────────── */
    @keyframes __page-in {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    main { animation: __page-in 0.65s cubic-bezier(0.16, 1, 0.3, 1) both; }

    /* ─────────────────────────────────────────────────────────────
       STAT NUMBER — emerald→blue gradient text
    ───────────────────────────────────────────────────────────── */
    [data-stat-num] {
      background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ─────────────────────────────────────────────────────────────
       REDUCED MOTION — respect user's OS preference
    ───────────────────────────────────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      [data-reveal], [data-reveal].is-visible {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      [data-blob] { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
}

function getOrCreateObserver() {
  const g = getGlobals();
  if (!g) return null;
  if (g.observer) return g.observer;

  g.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Double-rAF ensures the browser has painted the hidden state
          // before we toggle to visible. This prevents the "flash" where
          // elements appear at their final position instantly.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add('is-visible');
            });
          });
          g.observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  return g.observer;
}

function observeNewElements() {
  const observer = getOrCreateObserver();
  if (!observer) return;
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
    observer.observe(el);
  });
}

function setupScrollProgress() {
  const g = getGlobals();
  if (!g) return;

  // Check the DOM for existing bar — survives HMR.
  let bar = document.getElementById('__scroll-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = '__scroll-progress';
    document.body.prepend(bar);
  }

  // Only add listener if we don't already have one
  if (g.scrollHandler) return;

  g.scrollHandler = () => {
    const total = document.body.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const el = document.getElementById('__scroll-progress');
    if (el) el.style.width = `${Math.min((window.scrollY / total) * 100, 100)}%`;
  };
  window.addEventListener('scroll', g.scrollHandler, { passive: true });
}

export default function useReveal() {
  useEffect(() => {
    const g = getGlobals();
    if (!g) return;

    g.mountCount++;
    injectStyles();
    setupScrollProgress();

    // Small delay to ensure DOM is fully painted before observing.
    // This prevents elements from being observed before styles are applied.
    const timerId = setTimeout(() => {
      observeNewElements();
    }, 50);

    return () => {
      clearTimeout(timerId);
      g.mountCount--;

      // Only tear down global resources when ALL components unmount
      if (g.mountCount <= 0) {
        g.mountCount = 0;
        if (g.observer) {
          g.observer.disconnect();
          g.observer = null;
        }
        if (g.scrollHandler) {
          window.removeEventListener('scroll', g.scrollHandler);
          g.scrollHandler = null;
        }
        // Don't remove the style tag — it might be needed if
        // components re-mount (e.g. during navigation)
      }
    };
  }, []);
}
