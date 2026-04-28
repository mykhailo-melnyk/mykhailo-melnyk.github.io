// Projects section with filterable grid + hover preview
const { useState: usePState, useMemo: usePMemo } = React;

function Work({ data }) {
  const [filter, setFilter] = usePState("All");
  const [hovered, setHovered] = usePState(null);

  const years = usePMemo(() => {
    const ys = Array.from(new Set(data.projects.map(p => p.year))).sort().reverse();
    return ["All", ...ys];
  }, [data.projects]);

  const filtered = filter === "All"
    ? data.projects
    : data.projects.filter(p => p.year === filter);

  return (
    <section id="work" style={{
      maxWidth: "var(--maxw)", margin: "0 auto", padding: "var(--row-gap) var(--pad)",
    }}>
      <SectionLabel index="03" label="Selected Work" />

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        marginBottom: 32, flexWrap: "wrap", gap: 16,
      }}>
        <h2 className="serif" style={{
          margin: 0, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1, fontWeight: 500, letterSpacing: "-0.02em",
        }}>
          A small set of things<br />
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>I'm proud of.</em>
        </h2>
        <div style={{ display: "flex", gap: 4, padding: 4, border: "1px solid var(--line)", borderRadius: 999 }}>
          {years.map(y => (
            <button key={y}
              onClick={() => setFilter(y)}
              style={{
                padding: "8px 14px", borderRadius: 999, border: "none",
                background: filter === y ? "var(--ink)" : "transparent",
                color: filter === y ? "var(--bg)" : "var(--ink-2)",
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.04em",
                textTransform: "uppercase", cursor: "pointer",
              }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--line)" }}>
        {filtered.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onHover={setHovered} hovered={hovered === p.id} />
        ))}
      </ol>
    </section>
  );
}

function ProjectRow({ project, index, onHover, hovered }) {
  return (
    <li
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "relative",
        borderBottom: "1px solid var(--line)",
        padding: "32px 0",
        cursor: "pointer",
        transition: "padding 200ms ease",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "60px minmax(0, 1.4fr) minmax(0, 1fr) 80px",
        gap: 24, alignItems: "center",
      }}>
        <span className="mono" style={{ color: hovered ? "var(--accent)" : "var(--muted)", transition: "color 150ms" }}>
          /{String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <div className="serif" style={{
            fontSize: "clamp(28px, 4.4vw, 56px)",
            lineHeight: 1, letterSpacing: "-0.02em",
            fontWeight: 500,
            color: hovered ? "var(--accent)" : "var(--ink)",
            transition: "color 200ms ease, transform 200ms ease",
            transform: hovered ? "translateX(8px)" : "translateX(0)",
          }}>
            {project.name}
          </div>
          <div style={{ marginTop: 10, fontSize: 15, color: "var(--ink-2)", maxWidth: "52ch" }}>
            {project.tagline}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.stack.map((s, i) => (
            <span key={i} className="mono" style={{
              padding: "4px 8px",
              border: "1px solid var(--line)",
              borderRadius: 4,
              background: hovered ? "var(--bg-2)" : "transparent",
              transition: "background 200ms ease",
            }}>{s}</span>
          ))}
        </div>
        <span className="mono" style={{ textAlign: "right", color: "var(--muted)" }}>{project.year}</span>
      </div>

      {/* Expanded summary on hover */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "60px minmax(0, 1.4fr) minmax(0, 1fr) 80px",
        gap: 24,
        maxHeight: hovered ? 200 : 0,
        opacity: hovered ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 350ms ease, opacity 250ms ease, margin-top 200ms ease",
        marginTop: hovered ? 20 : 0,
      }}>
        <span />
        <p style={{ margin: 0, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: "60ch" }}>
          {project.summary}
        </p>
        <div className="mono" style={{ alignSelf: "start", color: "var(--muted)" }}>
          role · {project.role}
        </div>
        <span />
      </div>

      <ProjectPreview project={project} active={hovered} />
    </li>
  );
}

function ProjectPreview({ project, active }) {
  // Floating preview card — different visual per project tone
  const tones = {
    warm: { bg: "#e7d7c9", fg: "#7a3a22", line: "#c9a98a" },
    cool: { bg: "#d5dee0", fg: "#314a52", line: "#9eb4ba" },
    neutral: { bg: "#dcd6c8", fg: "#3a3a31", line: "#bbb29c" },
    ink: { bg: "#16160f", fg: "#f3efe7", line: "#444439" },
  };
  const t = tones[project.tone] || tones.neutral;

  return (
    <div style={{
      position: "absolute",
      right: 100, top: "50%",
      transform: `translateY(-50%) ${active ? "scale(1) rotate(-2deg)" : "scale(0.6) rotate(0deg)"}`,
      width: 240, height: 156,
      background: t.bg, color: t.fg,
      border: `1px solid ${t.line}`,
      opacity: active ? 1 : 0,
      transition: "opacity 250ms ease, transform 350ms cubic-bezier(.2,.8,.2,1)",
      pointerEvents: "none",
      boxShadow: active ? "0 24px 60px -20px rgba(22,22,15,0.35)" : "none",
      overflow: "hidden", zIndex: 5,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, ${t.line}40 14px 15px)`,
      }} />
      <div style={{ position: "absolute", top: 12, left: 14, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.05em", opacity: 0.7 }}>
        {project.id} / preview
      </div>
      <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.15, fontWeight: 500 }}>
        {project.name}
      </div>
      <div style={{
        position: "absolute", top: 12, right: 14,
        fontFamily: "var(--mono)", fontSize: 11, opacity: 0.7,
      }}>{project.year}</div>
    </div>
  );
}

window.Work = Work;
