"use client";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1.1rem 0;
          transition: padding 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .nav-root.scrolled { padding: 0.7rem 0; }

        .nav-pill {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(6,6,8,0.6);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          height: 56px;
          position: relative;
        }

        .nav-root.scrolled .nav-pill {
          background: rgba(6,6,8,0.85);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
        }

        /* Pill top shine */
        .nav-pill::before {
          content: '';
          position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Logo */
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: #f0f0f5;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-logo-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          box-shadow: 0 0 10px rgba(124,109,250,0.6);
          animation: pulse 2.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(124,109,250,0.6); }
          50% { box-shadow: 0 0 18px rgba(250,109,154,0.7); }
        }

        /* Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          list-style: none;
        }

        @media (max-width: 560px) { .nav-links { display: none; } }

        .nav-link {
          position: relative;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 400;
          color: rgba(240,240,245,0.5);
          padding: 6px 14px;
          border-radius: 10px;
          transition: color 0.2s ease;
          letter-spacing: 0.01em;
        }

        .nav-link:hover { color: rgba(240,240,245,0.85); }

        .nav-link.active {
          color: #f0f0f5;
          font-weight: 500;
        }

        /* Active pill indicator */
        .nav-link-bg {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: rgba(124,109,250,0.12);
          border: 1px solid rgba(124,109,250,0.2);
          z-index: -1;
        }

        /* CTA button */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          color: white;
          box-shadow: 0 0 20px rgba(124,109,250,0.25);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-cta:hover { box-shadow: 0 0 32px rgba(124,109,250,0.45); transform: translateY(-1px); }

        @media (max-width: 400px) { .nav-cta { display: none; } }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
        }

        @media (max-width: 560px) { .nav-hamburger { display: flex; } }

        .ham-bar {
          width: 20px; height: 2px;
          background: rgba(240,240,245,0.7);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .nav-hamburger.open .ham-bar:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .nav-hamburger.open .ham-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open .ham-bar:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(6,6,8,0.97);
          z-index: 90;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          backdrop-filter: blur(20px);
        }

        .mobile-link {
          font-family: 'Syne', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: rgba(240,240,245,0.4);
          text-decoration: none;
          letter-spacing: -0.03em;
          transition: color 0.2s ease;
        }

        .mobile-link:hover, .mobile-link.active { color: #f0f0f5; }

        .mobile-link.active {
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mobile-cta {
          margin-top: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 12px 30px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          color: white;
          text-decoration: none;
          box-shadow: 0 0 30px rgba(124,109,250,0.35);
        }

        /* Outer wrapper for centering */
        .nav-outer {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1rem 1.5rem;
          pointer-events: none;
        }

        .nav-outer > * { pointer-events: all; }
      `}</style>

      {/* Navbar */}
      <div className={`nav-outer`}>
        <motion.div
          className={`nav-pill ${scrolled ? "scrolled" : ""}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-dot" />
            Kishore
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link href={l.href} className={`nav-link ${isActive ? "active" : ""}`}>
                    {isActive && (
                      <motion.div
                        className="nav-link-bg"
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <Link href="/contact" className="nav-cta">Hire me ↗</Link>
            <button
              className={`nav-hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <div className="ham-bar" />
              <div className="ham-bar" />
              <div className="ham-bar" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={l.href} className={`mobile-link ${pathname === l.href ? "active" : ""}`}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link href="/contact" className="mobile-cta">Hire me ↗</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}