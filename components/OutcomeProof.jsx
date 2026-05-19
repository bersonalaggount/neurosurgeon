'use client';
import useReveal from '@/hooks/useReveal';
import styles from './OutcomeProof.module.css';

const AWARDS = [
  { title: 'Participated in the Final investigators meeting of STICH–II', desc: 'New Castle University, UK at Amsterdam on Feb 2, 2013.' },
  { title: 'Travel fellowship to attend the Japan–Indian neurosurgical conference', desc: '17–20 November 2012 at Osaka, Japan. Presented a poster on “Pilocytic astrocytoma variants in Pediatric population.”' },
  { title: 'First prize for poster in SPINE 2011', desc: 'Annual conference of the Association of spine surgeons of India on “Can DTI predict outcome in acute deterioration of degenerative cervical spine disease?” a research on acute spine injury at Bangalore, September 2011.' },
  { title: 'Young neurosurgeon fellowship award', desc: '8th Asian Congress of Neurological Surgeons, 22-24 November 2010 - Kuala Lumpur, Malaysia. Presented a clinical research study on use of DTI in acute spinal injury.' },
  { title: 'Young neurosurgeon fellowship award', desc: '9th International conference on cerebrovascular surgery 2009, at Nagoya, Japan. Presented a clinical study on Spinal AV fistulas.' },
  { title: 'Co-guide in the Best poster award at Neurocon 2008', desc: 'Annual national conference of NSI at Pune for a clinical study “Rathkes cleft cyst: can pre operative radiological diagnosis help in preventing complications?” by Raghunath A.' },
  { title: 'B Braun Medical Trust Foundation award', desc: 'Outstanding achievement in post graduate medical studies in the field of Neurosurgery, 2007.' },
  { title: 'Best Paper Award (2nd prize)', desc: '63rd Annual National Conference of Association of Surgeons of India, Pune, India, 2003 on original clinical research study on various surgical approaches to carcinoma of Gastroesophageal junction, post graduate thesis.' },
  { title: 'National talent search Examination Award', desc: '(National Council for Educational Research and Training) of the Department of Human Resources and Development, Govt. of India, 1989.' },
];

const PUBS = [
  { title: 'Tuberculous spinal subdural abscess in an infant with dermal sinus', desc: 'Dhaval Shukla, Jagathlal Gangadharan, Bhagavatula Indiradevi, Sudhir Ambekar. Neurology India 237, vol 60, issue 2 Mar-Apr 2012.' },
  { title: 'Spinal ependymoma presenting with visual and hearing impairment - An unusual sequelae', desc: 'Jagathlal Gangadharan, Paritosh Pandey, Vani Santosh, Rose Dawn Bharath. Indian Journal of Neurosurgery 169-171, vol 1 issue 2 July–Dec 2012.' },
  { title: 'A rare vascular complication of transsphenoidal surgery', desc: 'D. I. Bhat & G. Jagatlal & B. Indira Devi. Neurochirurgica 155(1), 131-134, January 2013.' },
  { title: 'Posterior clinoid process meningioma', desc: 'Dhaval Shukla, Jagathlal Gangadharan, Arindom kakati, Bhagavatula Indiradevi. Clin Neurol Neurosurg. 115, 1517–1519, January 2013.' },
  { title: 'Can Diffusion Tensor imaging predict outcome in acute traumatic deterioration of degenerative cervical spine disease', desc: 'Jagathlal Gangadharan, G.G. Sharath kumar, Chandrajit Prasad, Sampath Somanna, Bhagavatula IndiraDevi. Indian Journal of Neurotrauma. 2013.' },
  { title: 'Suprasellar arachnoid cyst - the lessons learned', desc: 'Jagath lal Gangadharan, Dhaval Shukla, Dhananjay Bhat, Sampath S, Bhagavatula Indiradevi. Journal of Neuro Endoscopy, vol 2 page 10, 2013.' },
  { title: 'Clinical, radiological, surgical, and pathological determinants of olfactory groove schwannoma', desc: 'Andi Sadayandi Ramesh, Jagath Lal Gangadharan, Anita Mahadevan, Aravinda Hanumanthapura Ramalingaiah, Bhagavathula Indiradevi. Indian Journal of Neurosurgery 3(2) May-August 2014.' },
  { title: 'Acute infarct following Pituitary surgery - a new pathophysiology proposed', desc: 'KVL NarasingaRao, Jagath lal Gangadharan, Vikas V, Sampath S. Journal of Neurosurgery in Rural Practice 434-436, 5(2), 2014.' },
];

export default function OutcomeProof() {
  useReveal();
  return (
    <section className={styles.section} id="outcomes">
      <div className={styles.meshBg} aria-hidden="true" />
      <div className="container">
        <div data-reveal="up" data-pulse className="section-label">Academic Excellence</div>
        <h2 data-reveal="up" style={{ '--rv-delay': '0.06s' }} className="section-title">
          Awards, Fellowships <em>&amp; Publications</em>
        </h2>
        <p data-reveal="up" style={{ '--rv-delay': '0.12s', marginBottom: '40px' }} className={styles.subtitle}>
          A career dedicated to advancing neurosurgical research, recognised globally through numerous awards and publications.
        </p>

        {/* Awards */}
        <div data-reveal="up" className={styles.pubsSection} style={{ marginBottom: '60px' }}>
          <h3 className={styles.subheading}>Fellowships &amp; Awards</h3>
          <div className={styles.pubsList}>
            {AWARDS.map((a, i) => (
              <div key={i} className={styles.pubItem}>
                <div className={styles.pubTitle}>{a.title}</div>
                <div className={styles.pubMeta}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div data-reveal="up" className={styles.pubsSection}>
          <h3 className={styles.subheading}>Selected Publications</h3>
          <div className={styles.pubsList}>
            {PUBS.map((p, i) => (
              <div key={i} className={styles.pubItem}>
                <div className={styles.pubTitle}>{p.title}</div>
                <div className={styles.pubMeta}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
