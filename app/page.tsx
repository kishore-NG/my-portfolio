"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROLES = ["Mobile Developer", "Web Developer", "UI/UX Enthusiast", "React Native Dev"];

function TypewriterText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="typewriter">
      {displayed}
      <span className="cursor">|</span>
    </span>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="magnetic-btn"
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

function FloatingOrb({ style }: { style: React.CSSProperties }) {
  return <div className="orb" style={style} />;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const skills = ["React Native", "Next.js", "TypeScript", "Node.js", "Tailwind", "Figma"];
  const stats = [{ label: "Projects", value: "20+" }, { label: "Experience", value: "3 Yrs" }, { label: "Clients", value: "12+" }];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #060608;
          --surface: #0e0e12;
          --border: rgba(255,255,255,0.07);
          --accent: #7c6dfa;
          --accent2: #fa6d9a;
          --accent3: #6dfacc;
          --text: #f0f0f5;
          --muted: rgba(240,240,245,0.45);
          --glow: rgba(124,109,250,0.35);
        }

        body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); overflow-x: hidden; }

        main {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Noise texture overlay */
        main::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          width: 100%;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,109,250,0.12);
          border: 1px solid rgba(124,109,250,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .badge-dot {
          width: 6px; height: 6px;
          background: var(--accent3);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--text);
        }

        .headline .accent-word {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .role-line {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--muted);
          font-weight: 300;
          letter-spacing: 0.01em;
          height: 2rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .role-prefix {
          color: var(--muted);
        }

        .typewriter {
          color: var(--accent3);
          font-weight: 500;
        }

        .cursor {
          animation: blink 1s step-end infinite;
          color: var(--accent);
        }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .divider-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--accent) 0%, transparent 70%);
          opacity: 0.3;
        }

        .bottom-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .magnetic-btn {
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 14px;
          letter-spacing: 0.02em;
          transition: box-shadow 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: white;
          box-shadow: 0 0 30px var(--glow);
        }

        .btn-primary:hover { box-shadow: 0 0 50px rgba(124,109,250,0.55); }

        .btn-ghost {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }

        .btn-ghost:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }

        .stats {
          display: flex;
          gap: 2rem;
        }

        .stat-item {
          text-align: right;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, var(--muted));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 2px;
        }

        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .skill-tag {
          font-size: 0.78rem;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--muted);
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
        }

        .skill-tag:hover {
          color: var(--text);
          border-color: rgba(124,109,250,0.4);
          background: rgba(124,109,250,0.08);
        }

        .card-3d-wrapper {
          perspective: 1000px;
        }

        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          z-index: 1;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollDown 1.8s ease-in-out infinite;
        }

        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 640px) {
          .bottom-row { flex-direction: column; }
          .stats { justify-content: flex-start; }
          .stat-item { text-align: left; }
        }
      `}</style>

      <main ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="grid-bg" />

        <FloatingOrb style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(124,109,250,0.2), transparent 70%)", top: "-10%", left: "-15%" }} />
        <FloatingOrb style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(250,109,154,0.15), transparent 70%)", bottom: "0%", right: "-10%" }} />
        <FloatingOrb style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(109,250,204,0.1), transparent 70%)", top: "40%", right: "20%" }} />

        <div className="content">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="badge">
              <div className="badge-dot" />
              Available for work
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="card-3d-wrapper"
            style={{ rotateX, rotateY }}
          >
            <motion.h1
              className="headline"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I'm{" "}
              <span className="accent-word">Kishore</span>
              <br />
              I build things
              <br />
              for the web.
            </motion.h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div
            className="role-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="role-prefix">Currently crafting →</span>
            <TypewriterText words={ROLES} />
          </motion.div>

          {/* Skills */}
          <motion.div
            className="skills-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            {skills.map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </motion.div>

          <motion.div
            className="divider-line"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Actions + Stats */}
          <motion.div
            className="bottom-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <div className="actions">
              <MagneticButton>
                <span className="btn-primary magnetic-btn">View Projects →</span>
              </MagneticButton>
              <MagneticButton>
                <span className="btn-ghost magnetic-btn">Get in Touch</span>
              </MagneticButton>
            </div>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="scroll-line" />
          scroll
        </motion.div>
      </main>
    </>
  );
}