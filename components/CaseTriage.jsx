'use client';
import { useState, useEffect } from 'react';
import styles from './CaseTriage.module.css';

const STEPS = [
  {
    id: 'type',
    question: 'What type of condition are you seeking treatment for?',
    options: [
      { value: 'brain', label: 'Brain / Cranial', icon: '🧠' },
      { value: 'spine', label: 'Spine / Back', icon: '🦴' },
      { value: 'nerve', label: 'Peripheral Nerve', icon: '⚡' },
      { value: 'pain', label: 'Chronic Pain', icon: '💊' },
    ],
  },
  {
    id: 'diagnosis',
    question: 'Do you have a formal diagnosis?',
    options: [
      { value: 'yes-diagnosis', label: 'Yes, confirmed by a doctor', icon: '✓' },
      { value: 'suspected', label: 'Suspected but not confirmed', icon: '?' },
      { value: 'no-diagnosis', label: 'No diagnosis yet', icon: '—' },
    ],
  },
  {
    id: 'imaging',
    question: 'Do you have recent imaging (MRI, CT, X-ray)?',
    options: [
      { value: 'mri', label: 'Yes — MRI available', icon: '📊' },
      { value: 'ct', label: 'Yes — CT scan available', icon: '📊' },
      { value: 'other-imaging', label: 'Yes — other imaging', icon: '📊' },
      { value: 'no-imaging', label: 'No imaging yet', icon: '📋' },
    ],
  },
  {
    id: 'urgency',
    question: 'How would you describe your situation?',
    options: [
      { value: 'surgical', label: 'Referred for surgery', icon: '🔴' },
      { value: 'second-opinion', label: 'Seeking second opinion', icon: '🟡' },
      { value: 'consultation', label: 'Initial consultation', icon: '🟢' },
    ],
  },
];

function getPriority(answers) {
  let score = 0;
  if (['brain', 'spine'].includes(answers.type)) score += 2;
  if (answers.diagnosis === 'yes-diagnosis') score += 3;
  if (['mri', 'ct'].includes(answers.imaging)) score += 2;
  if (answers.urgency === 'surgical') score += 3;
  if (answers.urgency === 'second-opinion') score += 2;
  
  if (score >= 7) return { level: 'priority', title: 'Priority Surgical Consultation', desc: 'Based on your responses, you qualify for an expedited surgical evaluation. A coordinator will contact you within 4 hours.', color: '#dc3545' };
  if (score >= 4) return { level: 'standard', title: 'Specialist Consultation', desc: 'Your case has been flagged for specialist review. Expect a callback within 24 hours to schedule your appointment.', color: '#f59e0b' };
  return { level: 'general', title: 'General Consultation', desc: 'We\'ll schedule a comprehensive initial consultation. A coordinator will reach out within 48 hours.', color: '#1B7A5A' };
}

export default function CaseTriage() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('triageSeen', 'true');
  }, []);

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [STEPS[step].id]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setResult(getPriority(newAnswers));
    }
  };

  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, triage: answers, priority: result?.level }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (_) { 
      setError(true);
    }
    setIsSubmitting(false);
  };

  const reset = () => {
    setStep(0); setAnswers({}); setResult(null); setSubmitted(false);
    setContact({ name: '', phone: '', email: '' });
  };

  const toggleOpen = () => {
    if (!isOpen) sessionStorage.setItem('triageSeen', 'true');
    setIsOpen(!isOpen);
  };

  const currentStep = STEPS[step];
  const progress = result ? 100 : ((step) / STEPS.length) * 100;

  return (
    <div className={styles.floatingWrapper}>
      
      {/* The floating Quiz Card */}
      {isOpen && (
        <div className={styles.card}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close">
            ✕
          </button>
          
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>

          {!result && !submitted && (
            <div className={styles.stepContent}>
              <div className={styles.stepMeta}>
                <span className={styles.stepNum}>Step {step + 1} of {STEPS.length}</span>
              </div>
              <h3 className={styles.question}>{currentStep.question}</h3>
              <div className={styles.options}>
                {currentStep.options.map((opt) => (
                  <button
                    key={opt.value}
                    className={styles.optionBtn}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button className={styles.backBtn} onClick={() => setStep(step - 1)}>
                  ← Back
                </button>
              )}
            </div>
          )}

          {result && !submitted && (
            <div className={styles.resultContent}>
              <div className={styles.resultBadge} style={{ background: result.color }}>
                {result.level === 'priority' ? '⚡' : result.level === 'standard' ? '📋' : '✓'} {result.title}
              </div>
              <p className={styles.resultDesc}>{result.desc}</p>
              
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <input type="text" placeholder="Full Name" required value={contact.name}
                    onChange={(e) => setContact({...contact, name: e.target.value})} />
                  <input type="tel" placeholder="Phone Number" required value={contact.phone}
                    onChange={(e) => setContact({...contact, phone: e.target.value})} />
                </div>
                <input type="email" placeholder="Email Address" required value={contact.email}
                  onChange={(e) => setContact({...contact, email: e.target.value})} />
                <div className={styles.formActions}>
                  <button type="submit" className={`btn btn--primary ${styles.submitBtn}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                  </button>
                  <button type="button" className={styles.resetBtn} onClick={reset}>Start Over</button>
                </div>
                {error && <p style={{color: '#dc2626', marginTop: '12px', fontSize: '0.85rem'}}>There was an error saving. Please ensure Sheet2 is created and try again.</p>}
              </form>
            </div>
          )}

          {submitted && (
            <div className={styles.resultContent}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Submitted</h3>
              <p className={styles.resultDesc}>
                Your information has been received. A clinical coordinator will contact you soon.
              </p>
              <button className={styles.resetBtn} onClick={() => { reset(); setIsOpen(false); }}>Close</button>
            </div>
          )}
        </div>
      )}

      {/* Bubble Button */}
      <button className={styles.bubbleBtn} onClick={toggleOpen}>
        <span className={styles.bubbleIcon}>📋</span>
        Triage Quiz
      </button>

    </div>
  );
}
