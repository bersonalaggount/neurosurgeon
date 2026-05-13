// ═══════════════════════════════════════════════════════════════
// app/page.jsx
//
// THE HOMEPAGE — this is what users see at yoursite.com/
//
// In Next.js App Router, every "page.jsx" inside the /app folder
// is a route. This one (at app/page.jsx) maps to the root URL "/".
//
// Think of this file as the DIRECTOR:
//   It doesn't contain any HTML of its own.
//   It simply imports every section-component and stacks them
//   in order, top to bottom. Clean, readable, and easy to reorganise.
//
// THE COMPONENT MAP:
//   <Navbar />         ← sticky top navigation bar
//   <Hero />           ← full-screen opening section
//   <ClinicSection />  ← "about the clinic" paragraphs
//   <AboutSection />   ← Dr. Muzammil's personal profile
//   <ServicesSection />← 6 service cards
//   <Appointment />    ← booking form
//   <ContactSection /> ← address, phone, map
//   <Footer />         ← site footer
// ═══════════════════════════════════════════════════════════════

// Each import grabs a component from the /components folder.
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

// This is a React Server Component (no 'use client' needed).
// Server Components render on the server and send plain HTML to
// the browser — faster initial page load, better SEO.
export default function HomePage() {
  return (
    // Navbar is OUTSIDE <main> so the page-enter animation
    // (which uses transform) doesn't break position:fixed.
    <>
      <Navbar />
      <main>
        <Hero />
        <ClinicSection />
        <AboutSection />
        <ServicesSection />
        <Appointment />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
