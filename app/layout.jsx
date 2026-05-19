// ═══════════════════════════════════════════════════════════════
// app/layout.jsx
//
// THE ROOT LAYOUT — think of this as the outer HTML shell.
//
// In Next.js 13+ (App Router), every page is wrapped by this file.
// It renders ONCE and stays mounted as the user navigates between
// pages. This is where you put things that never change:
//   → the <html> tag
//   → the <body> tag
//   → global CSS
//   → site-wide metadata (tab title, favicon, SEO description)
//   → fonts
//
// The {children} prop is where the actual page content gets injected.
// ═══════════════════════════════════════════════════════════════

import './globals.css'; // ← Import global styles ONCE here (not in every component)

// ─── METADATA ────────────────────────────────────────────────────
// Next.js reads this exported object and automatically sets the
// <title> and <meta description> tags in the <head> of every page.
// Great for SEO without writing any HTML.
export const metadata = {
  title: 'Dr. Jagath Lal Gangadharan — Neurosurgeon',
  description:
    'HOD & Senior Consultant - Neurosurgery at Rajagiri Hospital. 18+ years experience, 2000+ complex neurosurgical cases.',
  keywords: 'neurosurgeon, brain surgeon, spine surgery, dr jagath lal gangadharan, rajagiri hospital',
};

// ─── ROOT LAYOUT COMPONENT ───────────────────────────────────────
// This is a React Server Component (RSC) — it runs on the SERVER,
// not in the browser. That's why there's no 'use client' directive.
//
// Props:
//   children — the page component for whatever route the user is on
export default function RootLayout({ children }) {
  return (
    // lang="en" helps screen readers and search engines
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
