"use client";
import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";

const skills = [
  { name: "Flutter", icon: "🐦", color: "rgba(83,195,243,0.15)", border: "rgba(83,195,243,0.35)" },
  { name: "Node.js", icon: "⬡", color: "rgba(104,211,145,0.15)", border: "rgba(104,211,145,0.35)" },
  { name: "Next.js", icon: "▲", color: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)" },
  { name: "MongoDB", icon: "🍃", color: "rgba(104,211,145,0.12)", border: "rgba(104,211,145,0.3)" },
  { name: "TypeScript", icon: "TS", color: "rgba(49,120,198,0.15)", border: "rgba(49,120,198,0.35)" },
  { name: "React", icon: "⚛", color: "rgba(97,219,251,0.12)", border: "rgba(97,219,251,0.3)" },
];

const timeline = [
  { year: "2024", title: "Full-Stack SaaS Builder", desc: "Focused on building scalable SaaS products end-to-end." },
  { year: "2023", title: "Mobile Dev Focus", desc: "Shipped multiple Flutter apps to production across platforms." },
  { year: "2022", title: "Started Web Journey", desc: "Began with Next.js and Node.js, fell in love with the stack." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  }),
};

export default function About() {
  return (
    <PageWrapper>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: #060608;
          min-height: 100vh;
          color: #f0f0f5;
          position: relative;
          overflow: hidden;
        }

        .about-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 20%, black 30%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(124,109,250,0.18), transparent 70%);
          top: -100px; left: -120px;
        }
        .orb-2 {
          position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(250,109,154,0.12), transparent 70%);
          bottom: 0; right: -80px;
        }

        .about-inner {
          position: relative; z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 6rem 2rem 5rem;
        }

        /* Header */
        .about-eyebrow {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(124,109,250,0.9);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .about-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: rgba(124,109,250,0.6);
        }

        .about-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 1.8rem;
        }

        .about-title span {
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Bio card */
        .bio-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem 2.2rem;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          margin-bottom: 3rem;
        }

        .bio-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,109,250,0.5), transparent);
        }

        .bio-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(240,240,245,0.7);
          font-weight: 300;
        }

        .bio-text strong {
          color: #f0f0f5;
          font-weight: 500;
        }

        /* Section label */
        .section-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* Skills */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 0.8rem;
          margin-bottom: 3.5rem;
        }

        .skill-card {
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid;
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .skill-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }

        .skill-icon {
          font-size: 1rem;
          width: 26px;
          text-align: center;
          flex-shrink: 0;
          font-family: monospace;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0; top: 6px; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(124,109,250,0.5), transparent);
        }

        .tl-item {
          position: relative;
          padding-left: 1.8rem;
          padding-bottom: 2rem;
        }

        .tl-item:last-child { padding-bottom: 0; }

        .tl-dot {
          position: absolute;
          left: -1.5rem;
          top: 5px;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #7c6dfa;
          box-shadow: 0 0 12px rgba(124,109,250,0.6);
          transform: translateX(-4px);
        }

        .tl-year {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(124,109,250,0.8);
          margin-bottom: 4px;
        }

        .tl-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .tl-desc {
          font-size: 0.88rem;
          color: rgba(240,240,245,0.5);
          line-height: 1.6;
          font-weight: 300;
        }

        /* CTA */
        .about-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 13px 26px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
        }

        .cta-primary {
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          color: white;
          box-shadow: 0 0 28px rgba(124,109,250,0.3);
        }

        .cta-primary:hover { box-shadow: 0 0 42px rgba(124,109,250,0.5); transform: translateY(-2px); }

        .cta-ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(240,240,245,0.8);
        }

        .cta-ghost:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.18); transform: translateY(-2px); }
      `}</style>

      <div className="about-root">
        <div className="orb-1" />
        <div className="orb-2" />

        <div className="about-inner">

          {/* Header */}
          <motion.p className="about-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            About me
          </motion.p>

          <motion.h1
            className="about-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting digital<br /><span>experiences.</span>
          </motion.h1>

          {/* Bio */}
          <motion.div
            className="bio-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="bio-text">
              I'm <strong>Kishore</strong>, a developer who cares deeply about both the code behind the scenes and the experience in front of it.
              I specialise in <strong>Flutter, Node.js</strong>, and modern web technologies — building systems that are
              as scalable as they are delightful to use. Currently focused on shipping <strong>SaaS products</strong> and levelling up across the full stack.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
            <h2 className="section-label">Stack</h2>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  className="skill-card"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  style={{ background: s.color, borderColor: s.border, color: "#f0f0f5" }}
                >
                  <span className="skill-icon">{s.icon}</span>
                  {s.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <h2 className="section-label">Journey</h2>
            <div className="timeline">
              {timeline.map((t, i) => (
                <motion.div key={t.year} className="tl-item" custom={i} variants={fadeUp} initial="hidden" animate="show">
                  <div className="tl-dot" />
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-desc">{t.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>
            <h2 className="section-label">Let's connect</h2>
            <div className="about-cta">
              <button className="cta-btn cta-primary">View My Work →</button>
              <button className="cta-btn cta-ghost">Download Résumé</button>
            </div>
          </motion.div>

        </div>
      </div>
    </PageWrapper>
  );
}