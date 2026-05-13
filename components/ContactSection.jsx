'use client';
import useReveal from '@/hooks/useReveal';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  useReveal();
  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div data-reveal="up" data-pulse className="section-label">Contact</div>
        <h2 data-reveal="up" style={{'--rv-delay':'0.08s'}} className="section-title">
          Find <em>Us</em>
        </h2>
        <div className={styles.grid}>
          <div data-reveal="left" className={styles.details}>
            <div className={styles.infoBlock}>
              <h3>Address</h3>
              <p>Kochi, Kerala<br/>India</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Hours</h3>
              <p>Mon–Fri: 9 AM – 5 PM<br/>Saturday: 9 AM – 1 PM<br/>Sunday: Closed</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Phone &amp; Email</h3>
              <p>+91 98765 43210<br/>clinic@drmuzammil.com</p>
            </div>
            <a
              href="https://maps.app.goo.gl/iuVvwi9TcN8eFQbu7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              Get Directions →
            </a>
          </div>
          <div data-reveal="right" style={{'--rv-delay':'0.12s'}} className={styles.mapFrame}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251479.2362207!2d76.1369651!3d9.9868381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala%2C%20India!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location — Kochi, Kerala"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
