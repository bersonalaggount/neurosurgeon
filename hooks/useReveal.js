// ═══════════════════════════════════════════════════════════════
// hooks/useReveal.js
//
// A CUSTOM REACT HOOK — "useReveal"
//
// What's a custom hook?
//   A custom hook is just a JavaScript function whose name starts
//   with "use". It can use other hooks (like useEffect) inside it.
//   The point is to EXTRACT reusable logic so you don't copy-paste
//   the same useEffect into every single component.
//
// What does this hook do?
//   It finds all elements with the class "reveal" inside the page
//   and watches them with IntersectionObserver. When an element
//   scrolls into view, the hook adds the class "visible" to it.
//   The CSS transition on .reveal then animates it into view.
//
// How to use it in a component:
//   import useReveal from '@/hooks/useReveal';
//   export default function SomeSection() {
//     useReveal(); // ← one line, that's it
//     return <section className="reveal">...</section>
//   }
// ═══════════════════════════════════════════════════════════════

'use client'; // hooks that use useEffect must be client-side

import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    // Select all elements that want the reveal animation.
    // We exclude elements inside #home because the Hero component
    // handles its own reveal separately (since it's always in view on load).
    const elements = document.querySelectorAll(
      ':not(#home) .reveal, :not(#home) [class*="reveal"]'
    );

    // IntersectionObserver watches elements and fires a callback
    // whenever they enter or leave the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element entered the viewport → add 'visible' class
            entry.target.classList.add('visible');

            // Unobserve after revealing — we only want to animate ONCE.
            // Keeping it observed would re-hide the element when scrolled away.
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // threshold: 0.12 means the callback fires when 12% of the element
        // is visible. Lower = fires sooner, higher = fires later.
        threshold: 0.12,

        // rootMargin shrinks the effective viewport by 40px at the bottom.
        // This makes elements reveal just BEFORE they fully enter the screen.
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Start observing every element
    elements.forEach((el) => observer.observe(el));

    // Cleanup: when the component that called this hook unmounts,
    // disconnect the observer so it doesn't leak memory.
    return () => observer.disconnect();
  }, []); // empty array → run once when the page mounts
}
