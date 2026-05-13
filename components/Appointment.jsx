'use client';

import { useState } from 'react';
import useReveal from '@/hooks/useReveal';
import styles from './Appointment.module.css';

export default function Appointment() {
  useReveal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('consultation');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          reason,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setPhone('');
        setReason('consultation');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className={styles.appointment} id="appointment">
      <div className="container">
        <div data-reveal="up" className={styles.wrapper}>
          <div className={styles.textContent}>
            <div data-pulse className="section-label">Appointments</div>

            <h2 className="section-title">
              Request a<br />
              <em>Consultation</em>
            </h2>

            <p className={styles.description}>
              Submit the form below. The clinic will contact you
              within 24 hours to confirm your appointment.
              No referral required.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '1.5rem',
              }}
            >
              {['Private', 'No Referral', '24h Response'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    padding: '4px 12px',
                    borderRadius: '99px',
                    background: 'rgba(16,185,129,0.1)',
                    color: '#059669',
                    border: '1px solid rgba(16,185,129,0.25)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>

              <input
                type="text"
                id="name"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>

              <input
                type="tel"
                id="phone"
                placeholder="+91"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="service">Reason for Visit</label>

              <select
                id="service"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="consultation">
                  General Consultation
                </option>

                <option value="spine">
                  Spine Condition
                </option>

                <option value="brain">
                  Brain / Neurological Condition
                </option>

                <option value="second-opinion">
                  Second Opinion
                </option>
              </select>
            </div>

            <button
              type="submit"
              className={`btn btn--primary ${styles.submitBtn}`}
            >
              {status === 'loading'
                ? 'Submitting...'
                : 'Submit Request'}

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  marginLeft: 8,
                  verticalAlign: '-2px',
                }}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {status === 'success' && (
              <p style={{ color: '#059669', marginTop: '1rem' }}>
                Appointment request submitted successfully.
              </p>
            )}

            {status === 'error' && (
              <p style={{ color: '#dc2626', marginTop: '1rem' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}