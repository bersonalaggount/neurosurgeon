'use client';
import Image from 'next/image';
import useReveal from '@/hooks/useReveal';
import styles from './AboutSection.module.css';

const CREDENTIALS = [
  { label:'Qualification',  value:'MS, MBBS, MCh Neurosurgery'            },
  { label:'Specialisation', value:'Brain, Spine & Peripheral Nerves' },
  { label:'Languages',      value:'English, Malayalam, Hindi'       },
];

export default function AboutSection() {
  useReveal();
  return (
    <section className={styles.about} id="about">
      <div data-blob aria-hidden="true" style={{
        position:'absolute', bottom:'5%', right:'-60px',
        width:320, height:320, background:'rgba(12, 255, 255, 0.1)', animationDelay:'-5s'
      }}/>
      <div className={styles.watermark} aria-hidden="true">NEUROSURGERY</div>
      <div className="container">
        <div data-reveal="up" data-pulse className={`section-label ${styles.label}`}>About</div>
        <div className={styles.grid}>
          <div data-reveal="left" style={{'--rv-dur':'0.9s'}} className={styles.portraitCol}>
            <div className={styles.portraitFrame}>
              <Image src="/dr-muzammil.png" alt="Dr. Muzammil Ishaq, Consultant Neurosurgeon" fill style={{objectFit:'cover'}}/>
            </div>
            <div className={styles.badge}>Neurosurgery</div>
          </div>
          <div data-reveal="right" style={{'--rv-delay':'0.12s','--rv-dur':'0.9s'}} className={styles.bioCol}>
            <h2 className={`section-title section-title--light ${styles.name}`}>
              Dr. Muzammil Ishaq<br /><em>MS, MCh (Neurosurgery)</em>
            </h2>
            <p className={styles.bio}>
              MS in General Surgery. MCh in Neurosurgery.
              Operates on conditions affecting the brain, spine,
              and peripheral nervous system.
            </p>
            <p className={styles.bio}>
              Additional training in minimally invasive spine surgery,
              neuro-oncology, and functional neurosurgery.
            </p>
            <p className={styles.bio}>
              15+ years of experience coupled with 2500+ surgeries performed.
            </p>
            <div className={styles.credentials}>
              {CREDENTIALS.map((c) => (
                <div key={c.label} data-lift className={styles.credential}>
                  <div className={styles.credLabel}>{c.label}</div>
                  <div className={styles.credValue}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
