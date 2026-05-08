// ═══════════════════════════════════════════════════════════════
// components/ServicesSection.jsx
//
// SERVICES SECTION — 6 neurosurgical service cards in a grid.
//
// This is a great example of the DATA-DRIVEN component pattern:
//   1. Define your data as an array of objects (SERVICES below)
//   2. Map over it to render JSX
//   3. Never write the same card markup 6 times — write it once
//
// Each card has: a number, an icon, a title, and a description.
// On hover: background changes, icon lifts, gold underline sweeps.
// ═══════════════════════════════════════════════════════════════

'use client';

import useReveal from '@/hooks/useReveal';
import styles from './ServicesSection.module.css';

// ─── SERVICE DATA ─────────────────────────────────────────────────
// To add a new service: just add an object to this array.
// The component renders it automatically — no HTML changes needed.
const SERVICES = [
  {
    num:   '01',
    title: 'Brain Tumour Surgery',
    desc:  'Microsurgical resection of benign and malignant brain tumours using image-guided, brain-mapping techniques to maximise safety and outcomes.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 4.08 1.94 7.7 4.95 10.02L16 29l7.05-3.98C26.06 22.7 28 19.08 28 15 28 8.373 22.627 3 16 3Z" stroke="#C8A96E" stroke-width="1.4" stroke-linejoin="round"/>
              <circle cx="16" cy="15" r="4" stroke="#C8A96E" stroke-width="1.4"/>
            </svg>`,
  },
  {
    num:   '02',
    title: 'Spine Surgery',
    desc:  'Minimally invasive procedures for disc herniation, spinal stenosis, spondylolisthesis, and spinal deformities. Faster recovery, smaller incisions.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4v24M10 8h12M10 16h12M10 24h12" stroke="#C8A96E" stroke-width="1.4" stroke-linecap="round"/>
            </svg>`,
  },
  {
    num:   '03',
    title: 'Neurotrauma',
    desc:  'Emergency and elective management of traumatic brain injury, skull fractures, spinal cord injury, and epidural or subdural haematomas.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="#C8A96E" stroke-width="1.4"/>
              <path d="M16 10v6l4 4" stroke="#C8A96E" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
  },
  {
    num:   '04',
    title: 'Cerebrovascular Surgery',
    desc:  'Treatment of intracranial aneurysms, arteriovenous malformations (AVMs), and carotid artery disease through surgical and endovascular approaches.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8M8 16c0 4.418 3.582 8 8 8M8 16h16" stroke="#C8A96E" stroke-width="1.4" stroke-linecap="round"/>
            </svg>`,
  },
  {
    num:   '05',
    title: 'Peripheral Nerve Surgery',
    desc:  'Surgical decompression, repair, and reconstruction of peripheral nerves affected by entrapment, trauma, or tumour infiltration.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 6c0 0-4 3-4 8s4 8 4 8M20 6c0 0 4 3 4 8s-4 8-4 8M8 16h16" stroke="#C8A96E" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
  },
  {
    num:   '06',
    title: 'Pain Management',
    desc:  'Interventional techniques including nerve blocks, epidural injections, and neuromodulation to deliver lasting, surgery-free pain relief.',
    icon:  `<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="6" width="16" height="20" rx="3" stroke="#C8A96E" stroke-width="1.4"/>
              <path d="M12 12h8M12 17h5" stroke="#C8A96E" stroke-width="1.4" stroke-linecap="round"/>
            </svg>`,
  },
];

export default function ServicesSection() {
  useReveal();

  return (
    <section className={styles.services} id="services">
      <div className="container">

        <div className="section-label reveal">What We Treat</div>
        <h2 className="section-title reveal">
          Neurosurgical <em>Services</em>
        </h2>
        <p className={`reveal ${styles.subtitle}`}>
          Comprehensive care across the full spectrum of brain and spine conditions.
        </p>

        {/* ── Cards grid ── */}
        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <div
              key={service.num}
              // Stagger each card's reveal delay based on its column position
              // Cards in the same row reveal together. Column = index % 3.
              className={`reveal reveal--delay-${index % 3} ${styles.card}`}
            >
              {/* Small numbered label e.g. "01" */}
              <div className={styles.cardNum}>{service.num}</div>

              {/* SVG Icon — same dangerouslySetInnerHTML pattern as ClinicSection */}
              <div
                className={styles.cardIcon}
                dangerouslySetInnerHTML={{ __html: service.icon }}
              />

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>

              {/*
                This is the gold underline that sweeps in on hover.
                It's a pseudo-element in CSS (::after) — see the module.
              */}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
