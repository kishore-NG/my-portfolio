"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Volunteer Management App",
    description: "A Flutter-based app to manage volunteers, events, and team challenges with real-time updates and role-based access.",
    tech: ["Flutter", "Node.js", "MongoDB"],
    link: "#",
    tag: "Mobile",
    color: "#7c6dfa",
    num: "01",
  },
  {
    title: "Chat Application",
    description: "Real-time chat app using Socket.io with scalable backend architecture, message persistence, and typing indicators.",
    tech: ["Flutter", "Node.js", "Socket.io"],
    link: "#",
    tag: "Full-Stack",
    color: "#fa6d9a",
    num: "02",
  },
];

const techColors: Record<string, { bg: string; border: string }> = {
  Flutter:   { bg: "rgba(83,195,243,0.12)",  border: "rgba(83,195,243,0.35)" },
  "Node.js": { bg: "rgba(104,211,145,0.12)", border: "rgba(104,211,145,0.35)" },
  MongoDB:   { bg: "rgba(104,211,145,0.10)", border: "rgba(104,211,145,0.28)" },
  "Socket.io":{ bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.18)" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .proj-root {
          font-family: 'DM Sans', sans-serif;
          background: #060608;
          min-height: 100vh;
          color: #f0f0f5;
          position: relative;
          overflow: hidden;
        }

        .proj-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 20%, black 30%, transparent 100%);
          pointer-events: none; z-index: 0;
        }

        .orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }

        .proj-inner {
          position: relative; z-index: 1;
          max-width: 960px;
          margin: 0 auto;
          padding: 6rem 2rem 5rem;
        }

        .proj-eyebrow {
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(124,109,250,0.9);
          margin-bottom: 1rem;
          display: flex; align-items: center; gap: 10px;
        }
        .proj-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px;
          background: rgba(124,109,250,0.6);
        }

        .proj-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }

        .proj-title span {
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .proj-subtitle {
          font-size: 1rem; font-weight: 300;
          color: rgba(240,240,245,0.45);
          margin-bottom: 4rem;
          letter-spacing: 0.01em;
        }

        /* Cards */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 500px) {
          .proj-grid { grid-template-columns: 1fr; }
        }

        .proj-card {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .proj-card.active {
          transform: translateY(-6px);
        }

        .proj-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-color, #7c6dfa), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .proj-card.active::before { opacity: 1; }

        /* Huge number watermark */
        .proj-num {
          font-family: 'Syne', sans-serif;
          font-size: 7rem;
          font-weight: 800;
          line-height: 1;
          position: absolute;
          top: -0.8rem; right: 1.2rem;
          opacity: 0.04;
          color: #fff;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .proj-card.active .proj-num { opacity: 0.07; }

        /* Card header */
        .proj-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .proj-tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(124,109,250,0.12);
          border: 1px solid rgba(124,109,250,0.25);
          color: rgba(124,109,250,0.9);
          white-space: nowrap;
        }

        .proj-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .proj-card-desc {
          font-size: 0.9rem;
          line-height: 1.75;
          color: rgba(240,240,245,0.5);
          font-weight: 300;
        }

        /* Tech chips */
        .proj-tech {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
        }

        .tech-chip {
          font-size: 0.76rem;
          font-weight: 500;
          padding: 5px 13px;
          border-radius: 8px;
          border: 1px solid;
          letter-spacing: 0.02em;
        }

        /* Footer link */
        .proj-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.055);
        }

        .proj-link {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(240,240,245,0.55);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s ease, gap 0.2s ease;
          letter-spacing: 0.02em;
        }

        .proj-link:hover { color: #f0f0f5; gap: 12px; }

        .proj-link-arrow {
          font-size: 1rem;
          transition: transform 0.2s ease;
        }

        .proj-link:hover .proj-link-arrow { transform: translate(3px, -3px); }

        .proj-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <div className="proj-root">
        <div className="orb" style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(124,109,250,0.18), transparent 70%)", top: -100, left: -120 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(250,109,154,0.12), transparent 70%)", bottom: 0, right: -80 }} />

        <div className="proj-inner">

          <motion.p className="proj-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            Selected work
          </motion.p>

          <motion.h1
            className="proj-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Things I've<br /><span>built.</span>
          </motion.h1>

          <motion.p
            className="proj-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            A collection of projects I've shipped — mobile, web, and everything in between.
          </motion.p>

          <div className="proj-grid">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                className={`proj-card ${hovered === i ? "active" : ""}`}
                style={{ "--card-color": p.color } as React.CSSProperties}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="proj-num">{p.num}</span>

                <div className="proj-card-top">
                  <h2 className="proj-card-title">{p.title}</h2>
                  <span className="proj-tag">{p.tag}</span>
                </div>

                <p className="proj-card-desc">{p.description}</p>

                <div className="proj-tech">
                  {p.tech.map((t) => {
                    const c = techColors[t] ?? { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)" };
                    return (
                      <span key={t} className="tech-chip" style={{ background: c.bg, borderColor: c.border, color: "#f0f0f5" }}>
                        {t}
                      </span>
                    );
                  })}
                </div>

                <div className="proj-card-footer">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="proj-dot" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                    <span style={{ fontSize: "0.75rem", color: "rgba(240,240,245,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live project</span>
                  </div>
                  <a href={p.link} className="proj-link">
                    View Project
                    <span className="proj-link-arrow">↗</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}