'use client';

import useReveal from '@/hooks/useReveal';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  useReveal();

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        
        <div className="section-label reveal">Get in Touch</div>
        <h2 className="section-title reveal">
          Clinic <em>Location</em>
        </h2>

        <div className={styles.grid}>
          {/* Left Details */}
          <div className={`reveal ${styles.details}`}>
            <div className={styles.infoBlock}>
              <h3>Clinic Address</h3>
              <p>123 Medical Corridor, Phase 2<br />Kochi, Kerala 682001<br />India</p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3>Contact Hours</h3>
              <p>Monday – Friday: 9:00 AM – 5:00 PM<br />Saturday: 9:00 AM – 1:00 PM<br />Sunday: Closed</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Direct Lines</h3>
              <p>Phone: +91 98765 43210<br />Email: clinic@drmuzammil.com</p>
            </div>
          </div>

          {/* Right Map Placeholder */}
          <div className={`reveal reveal--delay-1 ${styles.mapFrame}`}>
            <div className={styles.mapPlaceholder}>
              <span>Google Maps Embed Goes Here</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}