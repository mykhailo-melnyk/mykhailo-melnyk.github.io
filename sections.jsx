// Reusable section primitives
const { useState, useEffect, useRef, useMemo } = React;

function Nav({ onJump, theme, density }) {
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Warsaw" };
      setNow(d.toLocaleTimeString("en-GB", opts) + " CET");
    };
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 20,
      backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      background: scrolled ? "color-mix(in oklab, var(--bg) 78%, transparent)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "background 200ms ease, border-color 200ms ease",
    }}>
      <div style={{
        maxWidth: "var(--maxw)", margin: "0 auto", padding: "16px var(--pad)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onJump("top"); }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            background: "var(--ink)", color: "var(--bg)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--serif)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em",
          }}>M</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 500 }}>mykhailo melnyk</span>
        </a>
        <ul style={{
          display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0,
        }}>
          {items.map(it => (
            <li key={it.id}>
              <a
                href={"#" + it.id}
                onClick={(e) => { e.preventDefault(); onJump(it.id); }}
                style={{ fontSize: 14, color: "var(--ink-2)", padding: "6px 0", position: "relative" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-2)"}
              >{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="mono" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 8, height: 8, borderRadius: 99, background: "var(--accent)",
            boxShadow: "0 0 0 4px color-mix(in oklab, var(--accent) 22%, transparent)",
          }}/>
          <span>{now || "—"}</span>
        </div>
      </div>
    </nav>
  );
}

function SectionLabel({ index, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 16,
      paddingBottom: 24, marginBottom: 40,
      borderBottom: "1px solid var(--line)",
    }}>
      <span className="mono" style={{ color: "var(--accent)" }}>§ {index}</span>
      <span className="mono">{label}</span>
      <span style={{ flex: 1 }} />
      <span className="mono" style={{ opacity: 0.5 }}>scroll ↓</span>
    </div>
  );
}

function Hero({ data }) {
  return (
    <section id="top" style={{
      maxWidth: "var(--maxw)", margin: "0 auto",
      padding: "clamp(40px, 8vw, 96px) var(--pad) clamp(80px, 12vw, 160px)",
      position: "relative",
    }}>
      <div className="mono" style={{ marginBottom: 48, display: "flex", gap: 24, flexWrap: "wrap" }}>
        <span>portfolio / 2026</span>
        <span style={{ color: "var(--ink)" }}>{data.location}</span>
        <span style={{ color: "var(--accent)" }}>● {data.available}</span>
      </div>

      <h1 className="serif" style={{
        margin: 0,
        fontSize: "clamp(56px, 10vw, 148px)",
        lineHeight: 0.92,
        letterSpacing: "-0.035em",
        fontWeight: 500,
      }}>
        {data.name.split(" ").map((w, i, arr) => (
          <span key={i} style={{ display: "block" }}>
            {i === arr.length - 1 ? <em style={{ fontStyle: "italic", color: "var(--accent)" }}>{w}</em> : w}
          </span>
        ))}
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
        gap: "clamp(24px, 5vw, 80px)",
        marginTop: 64,
        alignItems: "start",
      }}>
        <div>
          <div className="mono" style={{ marginBottom: 14 }}>currently</div>
          <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.35, fontWeight: 400 }}>
            {data.role} at Solvd — building MyFitnessPal web and managing ~30 engineers across the org.
          </p>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 14 }}>about</div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: "56ch" }}>
            {data.bio}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 18px", background: "var(--ink)", color: "var(--bg)",
              borderRadius: 999, fontSize: 14, fontWeight: 500,
            }}>
              <span>Get in touch</span>
              <span style={{ fontFamily: "var(--mono)" }}>→</span>
            </a>
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 18px", border: "1px solid var(--ink)", color: "var(--ink)",
              borderRadius: 999, fontSize: 14, fontWeight: 500,
            }}>
              <span>See selected work</span>
            </a>
          </div>
        </div>
      </div>

      <HeroFooter />
    </section>
  );
}

function HeroFooter() {
  return (
    <div style={{
      marginTop: "clamp(60px, 10vw, 128px)",
      paddingTop: 24,
      borderTop: "1px solid var(--line)",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24,
    }}>
      {[
        { k: "yrs shipping", v: "10+" },
        { k: "engineers managed", v: "~30" },
        { k: "laba graduates", v: "200+" },
        { k: "current focus", v: "MyFitnessPal" },
      ].map((s, i) => (
        <div key={i}>
          <div className="mono" style={{ marginBottom: 8 }}>{s.k}</div>
          <div className="serif" style={{ fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: 1, fontWeight: 500 }}>
            {s.v}
          </div>
        </div>
      ))}
    </div>
  );
}

function About({ data }) {
  return (
    <section id="about" style={{
      maxWidth: "var(--maxw)", margin: "0 auto", padding: "var(--row-gap) var(--pad)",
    }}>
      <SectionLabel index="01" label="About" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
        gap: "clamp(32px, 6vw, 96px)",
      }}>
        <div>
          <Portrait />
          <div className="mono" style={{ marginTop: 14, lineHeight: 1.6 }}>
            <div>fig. 1 — portrait</div>
            <div style={{ opacity: 0.6 }}>krakow, poland · 2026</div>
          </div>
        </div>
        <div>
          {data.longBio.map((p, i) => (
            <p key={i} className="serif" style={{
              margin: i === 0 ? "0 0 24px" : "0 0 24px",
              fontSize: i === 0 ? "clamp(22px, 2.4vw, 30px)" : "clamp(18px, 1.8vw, 22px)",
              lineHeight: 1.45,
              fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? "var(--ink)" : "var(--ink-2)",
              maxWidth: "44ch",
            }}>{p}</p>
          ))}
          <div style={{
            marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)",
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 540,
          }}>
            {[
              { k: "based in", v: data.location },
              { k: "timezone", v: "CET — UTC+1" },
              { k: "languages", v: "English (B1), Ukrainian, Polish" },
              { k: "open to", v: "Senior IC & lead roles" },
            ].map((row, i) => (
              <div key={i}>
                <div className="mono" style={{ marginBottom: 6 }}>{row.k}</div>
                <div style={{ fontSize: 15 }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  // Tasteful placeholder portrait — striped panel with monospace label
  return (
    <div style={{
      aspectRatio: "4/5", width: "100%",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      position: "relative", overflow: "hidden",
      backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, rgba(22,22,15,0.045) 22px 23px)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "grid", placeItems: "center",
      }}>
        <svg viewBox="0 0 120 150" width="58%" style={{ opacity: 0.85 }}>
          <circle cx="60" cy="48" r="22" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          <path d="M14 142 C 22 100, 98 100, 106 142" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="mono" style={{
        position: "absolute", top: 12, left: 12, color: "var(--ink)",
        background: "var(--bg)", padding: "4px 8px", border: "1px solid var(--line)",
      }}>portrait</div>
      <div className="mono" style={{
        position: "absolute", bottom: 12, right: 12, color: "var(--muted)",
      }}>4:5 · placeholder</div>
    </div>
  );
}

function Skills({ data }) {
  return (
    <section id="skills" style={{
      maxWidth: "var(--maxw)", margin: "0 auto", padding: "var(--row-gap) var(--pad)",
    }}>
      <SectionLabel index="02" label="Skills & Tools" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 0,
        borderTop: "1px solid var(--line)",
      }}>
        {data.skills.map((g, i) => (
          <div key={i} style={{
            padding: "32px 24px 32px 0",
            borderBottom: "1px solid var(--line)",
            borderRight: i < data.skills.length - 1 ? "1px solid var(--line)" : "none",
            paddingLeft: i === 0 ? 0 : 24,
          }}>
            <div className="mono" style={{ marginBottom: 18, color: "var(--accent)" }}>0{i + 1} — {g.group}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {g.items.map((it, j) => (
                <li key={j} style={{
                  display: "flex", alignItems: "baseline", gap: 12,
                  fontSize: 16,
                }}>
                  <span className="mono" style={{ minWidth: 28, opacity: 0.45 }}>·{String(j + 1).padStart(2, "0")}</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ data }) {
  return (
    <section id="experience" style={{
      maxWidth: "var(--maxw)", margin: "0 auto", padding: "var(--row-gap) var(--pad)",
    }}>
      <SectionLabel index="04" label="Experience" />
      <div>
        {data.experience.map((row, i) => (
          <ExperienceRow key={i} row={row} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({ row }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 1fr",
        gap: 24, alignItems: "baseline",
        padding: "22px 0",
        borderTop: "1px solid var(--line)",
        cursor: "default",
      }}
    >
      <span className="mono">{row.from} — {row.to}</span>
      <div>
        <div className="serif" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 500, lineHeight: 1.2 }}>{row.role}</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{row.org}</div>
      </div>
      <div style={{
        fontSize: 15, color: "var(--ink-2)", maxWidth: "44ch",
        opacity: open ? 1 : 0.65, transition: "opacity 200ms",
      }}>{row.note}</div>
    </div>
  );
}

function Contact({ data }) {
  return (
    <section id="contact" style={{
      maxWidth: "var(--maxw)", margin: "0 auto", padding: "var(--row-gap) var(--pad) 100px",
    }}>
      <SectionLabel index="05" label="Contact" />
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
        gap: "clamp(32px, 6vw, 96px)", alignItems: "start",
      }}>
        <div>
          <h2 className="serif" style={{
            margin: 0, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.025em", fontWeight: 500,
          }}>
            Let's make<br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>something good.</em>
          </h2>
          <p style={{ marginTop: 28, fontSize: 17, color: "var(--ink-2)", maxWidth: "44ch", lineHeight: 1.5 }}>
            Open to senior IC and lead engineering roles. Best place to start is a short note about
            what you're building and what kind of engineer you need.
          </p>
          <a href={"mailto:" + data.email} style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            marginTop: 32, padding: "16px 22px",
            background: "var(--ink)", color: "var(--bg)", borderRadius: 999,
            fontSize: 15, fontWeight: 500,
          }}>
            <span>{data.email}</span>
            <span style={{ fontFamily: "var(--mono)" }}>↗</span>
          </a>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 16 }}>elsewhere</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {data.social.map((s, i) => (
              <li key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                padding: "16px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === data.social.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <span style={{ fontSize: 16, fontWeight: 500 }}>{s.label}</span>
                <a href={s.href} className="mono" style={{ color: "var(--ink-2)" }}>{s.handle} ↗</a>
              </li>
            ))}
          </ul>
          <div className="mono" style={{ marginTop: 28, opacity: 0.7, lineHeight: 1.7 }}>
            <div>response time</div>
            <div style={{ color: "var(--ink)" }}>usually within 24 hrs (mon — fri)</div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: 120, paddingTop: 24,
      borderTop: "1px solid var(--line)",
      display: "flex", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div className="mono">© 2026 mykhailo melnyk — built by hand</div>
      <div className="mono" style={{ opacity: 0.6 }}>last updated 04.27.2026</div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, About, Skills, Experience, Contact });
