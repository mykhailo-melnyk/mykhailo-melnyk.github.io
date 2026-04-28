// Mobile-first portfolio experience — distinct UX, shared data
const { useState: useMState, useEffect: useMEffect, useRef: useMRef } = React;

function MobileApp({ data }) {
  return (
    <div style={{ paddingBottom: 96 }}>
      <MobileHeader data={data} />
      <MobileHero data={data} />
      <MobileAbout data={data} />
      <MobileSkills data={data} />
      <MobileWork data={data} />
      <MobileExperience data={data} />
      <MobileContact data={data} />
      <MobileFooter />
      <MobileBottomBar email={data.email} />
    </div>
  );
}

function MobileHeader({ data }) {
  const [open, setOpen] = useMState(false);
  const items = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];
  const jump = (id) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 150);
  };
  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px",
        background: "color-mix(in oklab, var(--bg) 86%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 26, height: 26, borderRadius: 6,
            background: "var(--ink)", color: "var(--bg)",
            display: "grid", placeItems: "center",
            fontFamily: "var(--serif)", fontSize: 15, fontWeight: 600,
          }}>M</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>mykhailo melnyk</span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="menu" style={{
          width: 38, height: 38, border: "1px solid var(--line)", borderRadius: 999,
          background: "transparent", display: "grid", placeItems: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <line x1="2" y1={open ? "7" : "4"} x2="12" y2={open ? "7" : "4"} stroke="var(--ink)" strokeWidth="1.4" style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "center", transition: "all 200ms" }}/>
            <line x1="2" y1={open ? "7" : "10"} x2="12" y2={open ? "7" : "10"} stroke="var(--ink)" strokeWidth="1.4" style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "center", transition: "all 200ms" }}/>
          </svg>
        </button>
      </header>
      {open && (
        <div style={{
          position: "fixed", inset: "60px 0 0 0", zIndex: 25,
          background: "var(--bg)", padding: "32px 24px",
        }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map((it, i) => (
              <li key={it.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <button onClick={() => jump(it.id)} style={{
                  width: "100%", textAlign: "left", padding: "20px 0",
                  background: "transparent", border: "none",
                  fontFamily: "var(--serif)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em",
                  color: "var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "baseline",
                }}>
                  <span>{it.label}</span>
                  <span className="mono" style={{ color: "var(--muted)" }}>0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function MobileHero({ data }) {
  return (
    <section style={{ padding: "32px 22px 56px" }}>
      <div className="mono" style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 6 }}>
        <span>{data.location}</span>
        <span style={{ color: "var(--accent)" }}>● {data.available}</span>
      </div>
      <h1 className="serif" style={{
        margin: 0, fontSize: "clamp(56px, 16vw, 84px)", lineHeight: 0.92,
        letterSpacing: "-0.035em", fontWeight: 500,
      }}>
        Mykhailo<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>Melnyk</em>
      </h1>
      <p className="serif" style={{
        marginTop: 28, fontSize: 22, lineHeight: 1.35, fontWeight: 400, color: "var(--ink)",
      }}>
        {data.role} at Solvd — building MyFitnessPal web and managing ~30 engineers.
      </p>
      <p style={{ marginTop: 18, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
        {data.bio}
      </p>
      <div style={{
        marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--line)",
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
      }}>
        {[
          { k: "yrs shipping", v: "10+" },
          { k: "engineers managed", v: "~30" },
          { k: "laba graduates", v: "200+" },
          { k: "current focus", v: "MyFitnessPal" },
        ].map((s, i) => (
          <div key={i}>
            <div className="mono" style={{ marginBottom: 6 }}>{s.k}</div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1, fontWeight: 500 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileSectionHead({ index, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 12,
      paddingBottom: 14, marginBottom: 24, borderBottom: "1px solid var(--line)",
    }}>
      <span className="mono" style={{ color: "var(--accent)" }}>§ {index}</span>
      <span className="mono">{label}</span>
    </div>
  );
}

function MobileAbout({ data }) {
  return (
    <section id="about" style={{ padding: "56px 22px" }}>
      <MobileSectionHead index="01" label="About" />
      {data.longBio.map((p, i) => (
        <p key={i} className="serif" style={{
          margin: i === 0 ? "0 0 18px" : "0 0 18px",
          fontSize: i === 0 ? 22 : 18,
          lineHeight: 1.45, fontWeight: i === 0 ? 500 : 400,
          color: i === 0 ? "var(--ink)" : "var(--ink-2)",
        }}>{p}</p>
      ))}
      <div style={{
        marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)",
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16,
      }}>
        {[
          { k: "based in", v: data.location },
          { k: "timezone", v: "CET — UTC+1" },
          { k: "languages", v: "English, Ukrainian, Polish" },
          { k: "open to", v: "Senior IC & lead" },
        ].map((row, i) => (
          <div key={i}>
            <div className="mono" style={{ marginBottom: 5 }}>{row.k}</div>
            <div style={{ fontSize: 14 }}>{row.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileSkills({ data }) {
  const [active, setActive] = useMState(0);
  return (
    <section id="skills" style={{ padding: "56px 22px" }}>
      <MobileSectionHead index="02" label="Skills & Tools" />
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 24, paddingBottom: 4 }}>
        {data.skills.map((g, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flexShrink: 0, padding: "8px 14px", borderRadius: 999,
            border: "1px solid " + (active === i ? "var(--ink)" : "var(--line)"),
            background: active === i ? "var(--ink)" : "transparent",
            color: active === i ? "var(--bg)" : "var(--ink-2)",
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>{g.group}</button>
        ))}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {data.skills[active].items.map((it, j) => (
          <li key={j} style={{
            display: "flex", alignItems: "baseline", gap: 14,
            padding: "10px 0", borderBottom: "1px solid var(--line)",
          }}>
            <span className="mono" style={{ minWidth: 24, opacity: 0.45 }}>·{String(j + 1).padStart(2, "0")}</span>
            <span style={{ fontSize: 16 }}>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MobileWork({ data }) {
  return (
    <section id="work" style={{ padding: "56px 22px" }}>
      <MobileSectionHead index="03" label="Selected Work" />
      <h2 className="serif" style={{
        margin: "0 0 28px", fontSize: 36, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.02em",
      }}>
        Things I'm<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>proud of.</em>
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.projects.map((p, i) => <MobileProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

function MobileProjectCard({ project, index }) {
  const tones = {
    warm: { bg: "#e7d7c9", fg: "#7a3a22", line: "#c9a98a" },
    cool: { bg: "#d5dee0", fg: "#314a52", line: "#9eb4ba" },
    neutral: { bg: "#dcd6c8", fg: "#3a3a31", line: "#bbb29c" },
    ink: { bg: "#16160f", fg: "#f3efe7", line: "#444439" },
  };
  const t = tones[project.tone] || tones.neutral;
  return (
    <article style={{
      border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden",
      background: "var(--bg-2)",
    }}>
      <div style={{
        position: "relative", height: 110, background: t.bg, color: t.fg,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, ${t.line}40 14px 15px)`,
      }}>
        <div style={{ position: "absolute", top: 12, left: 14, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.05em", opacity: 0.7 }}>
          /{String(index + 1).padStart(2, "0")} · {project.id}
        </div>
        <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "var(--mono)", fontSize: 10, opacity: 0.7 }}>
          {project.year}
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.1, fontWeight: 500 }}>
          {project.name}
        </div>
      </div>
      <div style={{ padding: "16px 16px 18px" }}>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>{project.tagline}</div>
        <div className="mono" style={{ marginTop: 12, color: "var(--muted)" }}>role · {project.role}</div>
        <p style={{ margin: "12px 0 14px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
          {project.summary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.stack.map((s, i) => (
            <span key={i} className="mono" style={{
              padding: "3px 7px", border: "1px solid var(--line)", borderRadius: 4, fontSize: 10,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MobileExperience({ data }) {
  return (
    <section id="experience" style={{ padding: "56px 22px" }}>
      <MobileSectionHead index="04" label="Experience" />
      <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
        {data.experience.map((row, i) => (
          <li key={i} style={{
            position: "relative", paddingLeft: 18, paddingBottom: 24,
            borderLeft: i === data.experience.length - 1 ? "none" : "1px solid var(--line)",
          }}>
            <span style={{
              position: "absolute", left: -5, top: 4,
              width: 9, height: 9, borderRadius: 999,
              background: "var(--bg)", border: "1.5px solid var(--accent)",
            }} />
            <div className="mono" style={{ marginBottom: 4 }}>{row.from} — {row.to}</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.2 }}>{row.role}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{row.org}</div>
            <div style={{ marginTop: 8, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>{row.note}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MobileContact({ data }) {
  return (
    <section id="contact" style={{ padding: "56px 22px 32px" }}>
      <MobileSectionHead index="05" label="Contact" />
      <h2 className="serif" style={{
        margin: 0, fontSize: 44, lineHeight: 0.95, letterSpacing: "-0.025em", fontWeight: 500,
      }}>
        Let's make<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>something good.</em>
      </h2>
      <p style={{ marginTop: 20, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
        Open to senior IC and lead engineering roles. Best place to start is a short note about what you're building.
      </p>
      <a href={"mailto:" + data.email} style={{
        display: "inline-flex", alignItems: "center", gap: 10, marginTop: 22,
        padding: "14px 20px", background: "var(--ink)", color: "var(--bg)",
        borderRadius: 999, fontSize: 14, fontWeight: 500,
      }}>
        <span>{data.email}</span>
        <span style={{ fontFamily: "var(--mono)" }}>↗</span>
      </a>
      <div style={{ marginTop: 32 }}>
        <div className="mono" style={{ marginBottom: 12 }}>elsewhere</div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {data.social.map((s, i) => (
            <li key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "14px 0", borderTop: "1px solid var(--line)",
              borderBottom: i === data.social.length - 1 ? "1px solid var(--line)" : "none",
            }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{s.label}</span>
              <a href={s.href} className="mono" style={{ color: "var(--ink-2)" }}>{s.handle} ↗</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MobileFooter() {
  return (
    <footer style={{
      padding: "20px 22px", borderTop: "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div className="mono">© 2026 mykhailo melnyk</div>
      <div className="mono" style={{ opacity: 0.6 }}>last updated 04.28.2026</div>
    </footer>
  );
}

function MobileBottomBar({ email }) {
  return (
    <div style={{
      position: "fixed", bottom: 14, left: 14, right: 14, zIndex: 20,
      display: "flex", gap: 8, padding: 6,
      background: "color-mix(in oklab, var(--ink) 92%, transparent)",
      backdropFilter: "blur(12px)",
      borderRadius: 999, color: "var(--bg)",
    }}>
      <a href={"mailto:" + email} style={{
        flex: 1, padding: "12px 16px", borderRadius: 999,
        background: "var(--accent)", color: "var(--bg)",
        textAlign: "center", fontSize: 13, fontWeight: 500,
      }}>Email me</a>
      <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} style={{
        flex: 1, padding: "12px 16px", borderRadius: 999,
        textAlign: "center", fontSize: 13, fontWeight: 500, color: "var(--bg)",
      }}>See work</a>
    </div>
  );
}

window.MobileApp = MobileApp;
