
// The '@/' alias means "start from the root of the project".
// So '@/components/Navbar' = './components/Navbar.jsx'
import Navbar          from '@/components/Navbar';
import Hero            from '@/components/Hero';
import ClinicSection   from '@/components/ClinicSection';
import AboutSection    from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import Appointment     from '@/components/Appointment';
import ContactSection  from '@/components/ContactSection';
import Footer          from '@/components/Footer';
import CaseTriage      from '@/components/CaseTriage';
import OutcomeProof    from '@/components/OutcomeProof';


export default function HomePage() {
  return (
    <>
      <Navbar />
      <CaseTriage />
      <main>
        <Hero />
        <OutcomeProof />
        <AboutSection />
        <ClinicSection />
        <ServicesSection />
        <Appointment />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}