'use client';
import useReveal from '@/hooks/useReveal';
import styles from './ServicesSection.module.css';

const SERVICES = [
  {
    num: '01', title: 'Brain Tumour Surgery',
    desc: 'Resection of benign and malignant brain tumours using image-guided and brain-mapping techniques.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3C9.373 3 4 8.373 4 15c0 4.08 1.94 7.7 4.95 10.02L16 29l7.05-3.98C26.06 22.7 28 19.08 28 15 28 8.373 22.627 3 16 3Z" stroke="#10b981" stroke-width="1.4" stroke-linejoin="round"/><circle cx="16" cy="15" r="4" stroke="#10b981" stroke-width="1.4"/></svg>`,
  },
  {
    num: '02', title: 'Spine Surgery',
    desc: 'Disc herniation, spinal stenosis, spondylolisthesis, spinal deformities. Minimally invasive where possible.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4v24M10 8h12M10 16h12M10 24h12" stroke="#10b981" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  },
  {
    num: '03', title: 'Neurotrauma',
    desc: 'Traumatic brain injury, skull fractures, spinal cord injury, epidural and subdural haematomas.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="#10b981" stroke-width="1.4"/><path d="M16 10v6l4 4" stroke="#10b981" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    num: '04', title: 'Cerebrovascular Surgery',
    desc: 'Intracranial aneurysms, arteriovenous malformations, carotid artery disease. Surgical and endovascular.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8M8 16c0 4.418 3.582 8 8 8M8 16h16" stroke="#10b981" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  },
  {
    num: '05', title: 'Peripheral Nerve Surgery',
    desc: 'Decompression, repair, and reconstruction of nerves affected by entrapment, trauma, or tumour.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M12 6s-4 3-4 8 4 8 4 8M20 6s4 3 4 8-4 8-4 8M8 16h16" stroke="#10b981" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    num: '06', title: 'Pain Management',
    desc: 'Nerve blocks, epidural injections, and neuromodulation for chronic pain conditions.',
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="8" y="6" width="16" height="20" rx="3" stroke="#10b981" stroke-width="1.4"/><path d="M12 12h8M12 17h5" stroke="#10b981" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  },
];

const DELAY = ['0s', '0.1s', '0.2s', '0s', '0.1s', '0.2s'];

export default function ServicesSection() {
  useReveal();

  return (
    <section className={styles.services} id="services">
      <div className="container">

        <div
          data-reveal="up"
          data-pulse
          className="section-label"
        >
          Services
        </div>

        <h2
          data-reveal="up"
          style={{ '--rv-delay': '0.07s' }}
          className="section-title"
        >
          Areas of <em>Practice</em>
        </h2>

        <p
          data-reveal="up"
          style={{ '--rv-delay': '0.13s' }}
          className={styles.subtitle}
        >
          Brain, spine, and peripheral nerve conditions.
        </p>

        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              data-reveal="up"
              data-lift
              data-glint
              style={{ '--rv-delay': DELAY[i] }}
              className={styles.card}
            >
              <div className={styles.cardNum}>{svc.num}</div>
              <div className={styles.cardIcon} dangerouslySetInnerHTML={{ __html: svc.icon }} />
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
