// ═══════════════════════════════════════════════════════════════
// components/ClinicSection.jsx
//
// "ABOUT THE CLINIC" SECTION
//
// This section appears right after the Hero and gives visitors
// an overview of the clinic's philosophy and approach.
//
// Layout: Two-column grid
//   Left → text (heading + three paragraphs + link)
//   Right → four "pillar" cards (care philosophy highlights)
//
// This is a Server Component (no 'use client') because it has
// no interactivity — it just renders static content.
// We still get reveal animations because those are handled by
// the useReveal hook called from a parent client component.
// ═══════════════════════════════════════════════════════════════

'use client';

import useReveal from '@/hooks/useReveal';
import styles from './ClinicSection.module.css';

// ─── PILLARS DATA ────────────────────────────────────────────────
// The four philosophy cards on the right.
// Storing them as data (rather than inline JSX) makes them easy
// to add, remove, or edit without touching the markup.
const PILLARS = [
  {
    title: 'Preventative First',
    desc:  'We exhaust every non-surgical option before considering intervention.',
    // SVG icon as a string — rendered via dangerouslySetInnerHTML below
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 3.25a.75.75 0 0 0-.75.75v3.75H6.5a.75.75 0 0 0 0 1.5h3.75v3.75a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-.75-.75Z" fill="#C8A96E"/>
    </svg>`,
  },
  {
    title: 'Integrated Records',
    desc:  'All imaging, history, and treatment notes unified in one system.',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2a9 9 0 1 0 0 18A9 9 0 0 0 11 2Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm-1 3.75v4.19l-2.97 2.97 1.06 1.06L11 12.56V7.25H10Z" fill="#C8A96E"/>
    </svg>`,
  },
  {
    title: 'World-Class Surgery',
    desc:  'When needed, surgical expertise of the highest international standard.',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm-.75 3.5v5.19l3.47 3.47 1.06-1.06-3.03-3.03V7h-1.5Z" fill="#C8A96E"/>
    </svg>`,
  },
  {
    title: 'Patient-Centred',
    desc:  'Every care plan is designed around the individual, not a protocol.',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2a9 9 0 1 0 0 18A9 9 0 0 0 11 2Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" fill="#C8A96E"/>
    </svg>`,
  },
];

export default function ClinicSection() {
  // Activate scroll-reveal animations for elements in this section
  useReveal();

  return (
    // id="clinic" lets the navbar link #clinic scroll here
    <section className={styles.clinic} id="clinic">
      <div className="container">

        {/* Small all-caps label above the heading */}
        <div className="section-label reveal">About the Clinic</div>

        {/* Two-column grid: text left, pillars right */}
        <div className={styles.grid}>

          {/* ── LEFT: Text ── */}
          <div className={`reveal ${styles.textCol}`}>
            <h2 className="section-title">
              A Singular Focus on<br />
              <em>Neurological Wellbeing</em>
            </h2>

            <p className={styles.para}>
              Here at Dr. Ishaq&apos;s practice, we have a unique understanding of how
              the spine relates to the rest of the nervous system. Our team includes a
              board-certified physician in neurosurgery alongside specialists in physical
              medicine and rehabilitation, interventional pain management, and licensed
              physical therapists trained to treat the full spectrum of spinal and
              neurological conditions.
            </p>

            <p className={styles.para}>
              We take a preventative-care approach with all patients — and in many cases,
              through interventional pain management and physical therapy techniques, we
              are able to help patients live pain-free and avoid surgery altogether.
            </p>

            <p className={styles.para}>
              When surgery becomes necessary, Dr. Ishaq has immediate access to all aspects
              of the patient&apos;s records, imaging, and previous treatments — enabling the
              delivery of truly excellent, personalised care, all under one roof.
            </p>

            {/* Link that scrolls to the About section */}
            <a
              href="#about"
              className="text-link"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('about');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }}
            >
              Meet Dr. Muzammil Ishaq →
            </a>
          </div>

          {/* ── RIGHT: Pillar cards ── */}
          <div className={`reveal reveal--delay-1 ${styles.pillars}`}>
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className={styles.pillar}>

                {/* Icon — dangerouslySetInnerHTML renders the SVG string as real HTML.
                    It's called "dangerous" because user-supplied content could inject
                    malicious scripts. Here it's safe because WE wrote the SVG. */}
                <div
                  className={styles.pillarIcon}
                  dangerouslySetInnerHTML={{ __html: pillar.icon }}
                />

                <div>
                  <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                  <p className={styles.pillarDesc}>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
