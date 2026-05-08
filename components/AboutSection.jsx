// ═══════════════════════════════════════════════════════════════
// components/AboutSection.jsx
//
// DR. MUZAMMIL ISHAQ — PERSONAL PROFILE SECTION
//
// Dark background section. Shows:
//   - Portrait placeholder (replace with <Image> when you have a photo)
//   - Biography paragraphs
//   - Credentials grid (qualification, specialisation, location, languages)
//
// ABOUT NEXT.JS <Image> COMPONENT:
//   Next.js has a special <Image> component (from 'next/image') that:
//   - Automatically resizes images for different screen sizes
//   - Lazy-loads them (only downloads when visible)
//   - Prevents layout shift while loading
//   When you have a real photo, replace the placeholder div with:
//   import Image from 'next/image';
//   <Image src="/dr-muzammil.jpg" alt="Dr. Muzammil Ishaq" fill />
//   Put the photo in the /public folder as /public/dr-muzammil.jpg
// ═══════════════════════════════════════════════════════════════

'use client';
import Image from 'next/image';
import useReveal from '@/hooks/useReveal';
import styles from './AboutSection.module.css';

// ─── CREDENTIALS DATA ────────────────────────────────────────────
// The 2x2 grid of credential tiles at the bottom of the bio
const CREDENTIALS = [
  { label: 'Qualification',   value: 'MS, MCh Neurosurgery'         },
  { label: 'Specialisation',  value: 'Brain, Spine & Peripheral Nerves' },
  { label: 'Location',        value: 'Kochi, Kerala'                 },
  { label: 'Languages',       value: 'English, Malayalam, Arabic'    },
];

export default function AboutSection() {
  useReveal(); // activate scroll-reveal for .reveal elements in this section

  return (
    <section className={styles.about} id="about">

      {/* Large watermark text — decorative background word */}
      {/* aria-hidden hides it from screen readers (it's purely decorative) */}
      <div className={styles.watermark} aria-hidden="true">
        NEUROSURGERY
      </div>

      <div className="container">

        {/* Section label — styled differently since background is dark */}
        <div className={`section-label reveal ${styles.label}`}>
          About the Doctor
        </div>

        {/* Two-column: portrait left, bio right */}
        <div className={styles.grid}>

          {/* ── LEFT: Portrait ── */}
          <div className={`reveal ${styles.portraitCol}`}>
            <div className={styles.portraitFrame}>

              {/*
                PLACEHOLDER — Replace this entire div with a real <Image> when ready.
                Example replacement:
                  import Image from 'next/image';
                  <Image
                    src="/dr-muzammil.jpg"
                    alt="Dr. Muzammil Ishaq, Consultant Neurosurgeon"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
              */}

                
                  <Image
                    src="/dr-muzammil.png"
                    alt="Dr. Muzammil Ishaq, Consultant Neurosurgeon"
                    fill
                    style={{ objectFit: 'cover' }}
                  />


            </div>

            {/* Gold badge overlapping the portrait card */}
            <div className={styles.badge}>MCh Neurosurgery</div>
          </div>

          {/* ── RIGHT: Bio + Credentials ── */}
          <div className={`reveal reveal--delay-1 ${styles.bioCol}`}>

            <h2 className={`section-title section-title--light ${styles.name}`}>
              Dr. Muzammil Ishaq<br />
              <em>MS, MCh (Neurosurgery)</em>
            </h2>

            <p className={styles.bio}>
              Dr. Muzammil Ishaq is a highly qualified consultant neurosurgeon based
              in Kochi, Kerala, with extensive training in the diagnosis and surgical
              management of conditions affecting the brain, spine, and peripheral nervous
              system. His practice is built on a foundation of academic rigour, technical
              precision, and genuine patient empathy.
            </p>

            <p className={styles.bio}>
              After completing his MS in General Surgery and his MCh in Neurosurgery,
              Dr. Ishaq has continued to pursue advanced training in minimally invasive
              spine surgery, neuro-oncology, and functional neurosurgery — bringing global
              standards of care to patients in Kerala.
            </p>

            <p className={styles.bio}>
              He is committed to clear communication: explaining complex neurological
              conditions in language patients and their families can understand, and
              involving them fully in every treatment decision.
            </p>

            {/* ── Credentials grid ── */}
            {/* 2x2 grid of credential tiles */}
            <div className={styles.credentials}>
              {CREDENTIALS.map((cred) => (
                <div key={cred.label} className={styles.credential}>
                  <div className={styles.credLabel}>{cred.label}</div>
                  <div className={styles.credValue}>{cred.value}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
