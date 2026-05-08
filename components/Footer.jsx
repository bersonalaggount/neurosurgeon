import styles from './Footer.module.css';

// Note: No 'use client' needed here as there is no interactivity!

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.brand}>
          <h2 className={styles.name}>Dr. Muzammil Ishaq</h2>
          <p className={styles.title}>Consultant Neurosurgeon</p>
        </div>

        <div className={styles.links}>
          <a href="#clinic">The Clinic</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

      </div>
      
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Dr. Muzammil Ishaq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}