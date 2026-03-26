"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const socials = [
  { label: "GitHub", handle: "@kishore-dev", icon: "⌥", href: "#" },
  { label: "LinkedIn", handle: "in/kishore", icon: "◈", href: "#" },
  { label: "Twitter", handle: "@kishore", icon: "◇", href: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ct-root {
          font-family: 'DM Sans', sans-serif;
          background: #060608;
          min-height: 100vh;
          color: #f0f0f5;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none; z-index: 0;
        }

        .orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }

        .ct-layout {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          max-width: 940px;
          width: 100%;
          padding: 5rem 2rem;
          align-items: start;
        }

        @media (max-width: 700px) {
          .ct-layout { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* LEFT */
        .ct-eyebrow {
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(124,109,250,0.9);
          margin-bottom: 1rem;
          display: flex; align-items: center; gap: 10px;
        }
        .ct-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px;
          background: rgba(124,109,250,0.6);
        }

        .ct-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 1.4rem;
        }

        .ct-title span {
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ct-desc {
          font-size: 0.92rem;
          line-height: 1.8;
          color: rgba(240,240,245,0.45);
          font-weight: 300;
          margin-bottom: 2.5rem;
        }

        .ct-divider {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 2rem;
        }

        .ct-socials { display: flex; flex-direction: column; gap: 0.9rem; }

        .ct-social-item {
          display: flex; align-items: center;
          gap: 14px;
          text-decoration: none;
          color: rgba(240,240,245,0.5);
          font-size: 0.88rem;
          font-weight: 400;
          transition: color 0.2s ease;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .ct-social-item:hover {
          color: #f0f0f5;
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }

        .ct-social-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(124,109,250,0.1);
          border: 1px solid rgba(124,109,250,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem;
          flex-shrink: 0;
          color: rgba(124,109,250,0.8);
        }

        .ct-social-info { display: flex; flex-direction: column; gap: 1px; }
        .ct-social-label { font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(240,240,245,0.25); }
        .ct-social-handle { font-weight: 500; }

        /* RIGHT — Form */
        .ct-form-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 2.4rem;
          position: relative;
          overflow: hidden;
        }

        .ct-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,109,250,0.5), transparent);
        }

        .ct-fields { display: flex; flex-direction: column; gap: 1.1rem; }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ct-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,240,245,0.35);
          transition: color 0.2s ease;
        }

        .ct-field.is-focused .ct-label { color: rgba(124,109,250,0.8); }

        .ct-input, .ct-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 400;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 13px 16px;
          color: #f0f0f5;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
          resize: none;
        }

        .ct-input::placeholder, .ct-textarea::placeholder { color: rgba(240,240,245,0.2); }

        .ct-input:focus, .ct-textarea:focus {
          border-color: rgba(124,109,250,0.5);
          background: rgba(124,109,250,0.05);
          box-shadow: 0 0 0 3px rgba(124,109,250,0.08);
        }

        .ct-textarea { min-height: 130px; padding-top: 14px; }

        .ct-submit {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #7c6dfa, #fa6d9a);
          color: white;
          box-shadow: 0 0 28px rgba(124,109,250,0.28);
          transition: box-shadow 0.3s ease, transform 0.2s ease, opacity 0.2s ease;
          width: 100%;
          letter-spacing: 0.02em;
          margin-top: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .ct-submit:hover:not(:disabled) { box-shadow: 0 0 44px rgba(124,109,250,0.45); transform: translateY(-2px); }
        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Toast */
        .ct-toast {
          position: fixed;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          padding: 12px 24px;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 500;
          z-index: 100;
          backdrop-filter: blur(16px);
          border: 1px solid;
          white-space: nowrap;
        }

        .ct-toast.success {
          background: rgba(104,211,145,0.12);
          border-color: rgba(104,211,145,0.3);
          color: #68d391;
        }

        .ct-toast.error {
          background: rgba(250,109,109,0.12);
          border-color: rgba(250,109,109,0.3);
          color: #fa6d6d;
        }
      `}</style>

      <div className="ct-root">
        <div className="orb" style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(124,109,250,0.18), transparent 70%)", top: -100, left: -120 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(250,109,154,0.12), transparent 70%)", bottom: 0, right: -80 }} />

        <div className="ct-layout">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <p className="ct-eyebrow">Let's talk</p>
            <h1 className="ct-title">Get in<br /><span>touch.</span></h1>
            <p className="ct-desc">Have a project in mind or just want to say hi? My inbox is always open — I'll get back to you as soon as I can.</p>
            <div className="ct-divider" />
            <div className="ct-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="ct-social-item">
                  <div className="ct-social-icon">{s.icon}</div>
                  <div className="ct-social-info">
                    <span className="ct-social-label">{s.label}</span>
                    <span className="ct-social-handle">{s.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="ct-form-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "3rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
              >
                <div style={{ fontSize: "2.5rem" }}>✦</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 700 }}>Message sent!</h3>
                <p style={{ color: "rgba(240,240,245,0.45)", fontSize: "0.9rem", fontWeight: 300 }}>Thanks for reaching out — I'll be in touch soon.</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  style={{ marginTop: "0.5rem", background: "rgba(124,109,250,0.1)", border: "1px solid rgba(124,109,250,0.25)", color: "rgba(124,109,250,0.9)", padding: "10px 22px", borderRadius: "10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="ct-fields">
                {(["name", "email", "message"] as const).map((field) => (
                  <div key={field} className={`ct-field ${focused === field ? "is-focused" : ""}`}>
                    <label className="ct-label">{field === "name" ? "Your Name" : field === "email" ? "Email Address" : "Message"}</label>
                    {field === "message" ? (
                      <textarea
                        name={field}
                        className="ct-textarea"
                        placeholder={field === "message" ? "What's on your mind?" : ""}
                        value={form[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    ) : (
                      <input
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        className="ct-input"
                        placeholder={field === "name" ? "John Doe" : "john@example.com"}
                        value={form[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        required
                      />
                    )}
                  </div>
                ))}
                <button type="submit" className="ct-submit" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <><div className="spinner" /> Sending…</>
                  ) : "Send Message →"}
                </button>
                {status === "error" && (
                  <p style={{ textAlign: "center", color: "#fa6d6d", fontSize: "0.82rem", marginTop: "0.2rem" }}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div className="ct-toast success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            ✓ Message delivered successfully
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}