'use client';

import useReveal from '@/hooks/useReveal';
import styles from './Appointment.module.css';

export default function Appointment() {
  useReveal();

  return (
    <section className={styles.appointment} id="appointment">
      <div className="container">
        <div className={`reveal ${styles.wrapper}`}>
          
          {/* Left Text Side */}
          <div className={styles.textContent}>
            <div className="section-label">Book a Consultation</div>
            <h2 className="section-title">
              Request an<br /><em>Appointment</em>
            </h2>
            <p className={styles.description}>
              Please fill out the form below with your details and a brief description 
              of your condition. Our clinic coordinator will contact you shortly to 
              confirm your consultation time.
            </p>
          </div>

          {/* Right Form Side */}
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Jane Doe" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="+91" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="service">Reason for Visit</label>
              <select id="service">
                <option value="consultation">General Consultation</option>
                <option value="spine">Spine Issue</option>
                <option value="brain">Brain / Neurological Issue</option>
                <option value="second-opinion">Second Opinion</option>
              </select>
            </div>

            <button type="submit" className={`btn btn--primary ${styles.submitBtn}`}>
              Submit Request
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}