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
  title: 'Dr. Muzammil Ishaq — Neurosurgeon, Kochi',
  description:
    'Neurosurgeon in Kochi, Kerala. Brain surgery, spine surgery, neurotrauma, pain management. MS, MCh. 15+ years, 2500+ surgeries.',
  keywords: 'neurosurgeon kochi, brain surgeon kerala, spine surgery kochi, dr muzammil ishaq',
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
        {/*
          {children} gets replaced by the actual page component.
          Right now we only have one page (app/page.jsx), so
          children will always be the homepage.
        */}
        {children}
      </body>
    </html>
  );
}
