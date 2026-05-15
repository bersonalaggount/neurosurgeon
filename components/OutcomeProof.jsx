'use client';
import useReveal from '@/hooks/useReveal';
import styles from './OutcomeProof.module.css';

const METRICS = [
  { value: '98.2%', label: 'Surgical Success Rate', sub: 'Across 2,500+ procedures' },
  { value: '0.4%', label: 'Complication Rate', sub: 'Below national average of 2.1%' },
  { value: '12', label: 'Peer-Reviewed Papers', sub: 'Published in indexed journals' },
  { value: '4.9★', label: 'Patient Satisfaction', sub: 'Based on 850+ reviews' },
];

const CASES = [
  {
    title: 'Complex Spinal Fusion',
    tag: 'Spine',
    detail: 'L3-S1 posterior interbody fusion with decompression. Patient returned to full mobility at 8 weeks.',
    outcome: 'Full Recovery',
    days: '56 days',
  },
  {
    title: 'Meningioma Resection',
    tag: 'Brain',
    detail: 'Complete microsurgical excision of 4.2cm convexity meningioma. No neurological deficit post-op.',
    outcome: 'Complete Excision',
    days: '14 days',
  },
  {
    title: 'Cervical Disc Replacement',
    tag: 'Spine',
    detail: 'Artificial disc replacement at C5-C6. Minimally invasive anterior approach. Same-day discharge.',
    outcome: 'Same-Day Discharge',
    days: '1 day',
  },
  {
    title: 'Pituitary Adenoma',
    tag: 'Brain',
    detail: 'Endoscopic transsphenoidal resection. Visual field deficits fully recovered within 3 weeks.',
    outcome: 'Vision Restored',
    days: '21 days',
  },
];

const PUBS = [
  { title: 'Minimally Invasive Approaches in Lumbar Spondylolisthesis', journal: 'Indian J Neurosurg', year: '2023' },
  { title: 'Outcomes of Endoscopic Spine Surgery in the Indian Subcontinent', journal: 'Asian Spine Journal', year: '2022' },
  { title: 'Prognostic Factors in Traumatic Brain Injury: A Retrospective Study', journal: 'Neurol India', year: '2021' },
];

export default function OutcomeProof() {
  useReveal();
  return (
    <section className={styles.section} id="outcomes">
      <div className={styles.meshBg} aria-hidden="true" />
      <div className="container">
        <div data-reveal="up" data-pulse className="section-label">Clinical Outcomes</div>
        <h2 data-reveal="up" style={{ '--rv-delay': '0.06s' }} className="section-title">
          Results That <em>Speak</em>
        </h2>
        <p data-reveal="up" style={{ '--rv-delay': '0.12s' }} className={styles.subtitle}>
          Verified surgical outcomes, published research, and anonymised case studies.
        </p>

        {/* Metrics */}
        <div data-reveal="up" style={{ '--rv-delay': '0.18s' }} className={styles.metricsGrid}>
          {METRICS.map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricSub}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className={styles.casesHeader}>
          <h3 data-reveal="up" className={styles.subheading}>Success Stories</h3>
          <span className={styles.anonBadge}>All data anonymised</span>
        </div>
        <div className={styles.casesGrid}>
          {CASES.map((c, i) => (
            <div key={c.title} data-reveal="up" style={{ '--rv-delay': `${i * 0.08}s` }} data-lift className={styles.caseCard}>
              <div className={styles.caseTag}>{c.tag}</div>
              <h4 className={styles.caseTitle}>{c.title}</h4>
              <p className={styles.caseDetail}>{c.detail}</p>
              <div className={styles.caseFooter}>
                <div className={styles.caseOutcome}>
                  <span className={styles.outcomeDot} />
                  {c.outcome}
                </div>
                <div className={styles.caseDays}>{c.days}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div data-reveal="up" className={styles.pubsSection}>
          <h3 className={styles.subheading}>Selected Publications</h3>
          <div className={styles.pubsList}>
            {PUBS.map((p) => (
              <div key={p.title} className={styles.pubItem}>
                <div className={styles.pubTitle}>{p.title}</div>
                <div className={styles.pubMeta}>{p.journal} · {p.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
