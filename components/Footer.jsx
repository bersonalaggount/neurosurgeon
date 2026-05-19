import styles from './Footer.module.css';

// Note: No 'use client' needed here as there is no interactivity!

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        
        <div className={styles.brand}>
          <h2 className={styles.name}>Dr. Jagath Lal Gangadharan</h2>
          <p className={styles.title}>Senior Consultant Neurosurgery</p>
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
          <p>© {new Date().getFullYear()} Dr. Jagath Lal Gangadharan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}