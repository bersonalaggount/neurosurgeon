'use client';
import Image from 'next/image';
import useReveal from '@/hooks/useReveal';
import styles from './AboutSection.module.css';

const CREDENTIALS = [
  { label:'Qualification',  value:'MBBS, MS, DNB, MCh, FACS, FRCS' },
  { label:'Specialisation', value:'Brain, Spine & Skull Base Surgery' },
  { label:'Experience',     value:'18+ Years' },
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
              <Image src="/dr-muzammil.png" alt="Dr. Jagath Lal Gangadharan, Consultant Neurosurgeon" fill style={{objectFit:'cover'}}/>
            </div>
            <div className={styles.badge}>Neurosurgery</div>
          </div>
          <div data-reveal="right" style={{'--rv-delay':'0.12s','--rv-dur':'0.9s'}} className={styles.bioCol}>
            <h2 className={`section-title section-title--light ${styles.name}`}>
              Dr. Jagath Lal Gangadharan<br /><em>MBBS, MS, DNB, MCh, FACS, FRCS</em>
            </h2>
            <p className={styles.bio}>
              Trained in Brain and Spine surgery at NIMHANS, Bangalore. Further trained in minimally invasive neurosurgery and Skull base surgery at Weill Cornell Medical College, New York; Head injury at University of Washington, Seattle; Brain tumor surgery at University of Regensburg, Germany and Endovascular neurosurgery at G.B.Pant Hospital, New Delhi.
            </p>
            <p className={styles.bio}>
              Independently operated more than 2000 complex neurosurgical cases. Expert in Gamma knife Radiosurgery, endoscopic neurosurgery for pituitary tumors, neuro-oncology, reconstructive surgery for craniofacial trauma, functional neurosurgery, neurovascular surgery and minimally invasive spine surgery.
            </p>
            <p className={styles.bio}>
              An exceptionally talented Neurosurgeon with more than 18 years of experience.
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
