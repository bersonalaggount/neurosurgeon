'use client';
import useReveal from '@/hooks/useReveal';
import styles from './ClinicSection.module.css';

const PILLARS = [
  { title:'Non-Surgical First',  desc:'Conservative treatment before any surgical intervention.',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 3.25a.75.75 0 0 0-.75.75v3.75H6.5a.75.75 0 0 0 0 1.5h3.75v3.75a.75.75 0 0 0 1.5 0v-3.75h3.75a.75.75 0 0 0 0-1.5h-3.75V7.5a.75.75 0 0 0-.75-.75Z" fill="#10b981"/></svg>` },
  { title:'Unified Records',  desc:'All scans, notes, and history in one system.',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2a9 9 0 1 0 0 18A9 9 0 0 0 11 2Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm-1 3.75v4.19l-2.97 2.97 1.06 1.06L11 12.56V7.25H10Z" fill="#10b981"/></svg>` },
  { title:'Clear Communication', desc:'Every diagnosis explained in plain language.',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm-.75 3.5v5.19l3.47 3.47 1.06-1.06-3.03-3.03V7h-1.5Z" fill="#10b981"/></svg>` },
  { title:'Individualised Care',     desc:'Treatment plans built around the patient, not a protocol.',
    icon:`<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2a9 9 0 1 0 0 18A9 9 0 0 0 11 2Zm0 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" fill="#10b981"/></svg>` },
];

export default function ClinicSection() {
  useReveal();
  return (
    <section className={styles.clinic} id="clinic">
      <div data-blob aria-hidden="true" style={{
        position:'absolute', top:'-60px', left:'-80px',
        width:360, height:360, background:'rgba(16,185,129,0.1)'
      }}/>
      <div className="container">
        <div data-reveal="up" data-pulse className="section-label">The Clinic</div>
        <div className={styles.grid}>
          <div data-reveal="left" style={{'--rv-dur':'0.85s'}} className={styles.textCol}>
            <h2 className="section-title">
              Neurosurgery, Rehabilitation<br /><em>&amp; Pain Management</em>
            </h2>
            <p className={styles.para}>
              One clinic covering neurosurgery, physical rehabilitation,
              interventional pain management, and physiotherapy.
            </p>
            <p className={styles.para}>
              When surgery is required, the surgeon has access to your
              complete history, imaging, and prior treatment records.
            </p>
            <a href="#about" className="text-link" onClick={(e)=>{
              e.preventDefault();
              const el=document.getElementById('about');
              if(el) window.scrollTo({top:el.offsetTop-80,behavior:'smooth'});
            }}>About Dr. Ishaq →</a>
          </div>
          <div data-reveal="right" style={{'--rv-delay':'0.14s','--rv-dur':'0.85s'}} className={styles.pillars}>
            {PILLARS.map((p) => (
              <div key={p.title} data-lift data-glint className={styles.pillar}>
                <div className={styles.pillarIcon} dangerouslySetInnerHTML={{__html:p.icon}}/>
                <div>
                  <h4 className={styles.pillarTitle}>{p.title}</h4>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
