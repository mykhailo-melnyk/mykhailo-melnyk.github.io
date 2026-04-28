// Main app — composes sections, wires up Tweaks
const { useEffect: useAppEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "warm",
  "fontPair": "fraunces-inter",
  "density": "comfortable",
  "accentHue": 24,
  "showGrid": false
}/*EDITMODE-END*/;

const THEMES = {
  warm:    { bg: "#f3efe7", bg2: "#ebe6dc", ink: "#16160f", ink2: "#3a3a31", muted: "#7a7669", line: "#cfc8b8" },
  paper:   { bg: "#fafaf6", bg2: "#f1f0ea", ink: "#0e0e0a", ink2: "#3a3a35", muted: "#7d7a72", line: "#dcd9cf" },
  ink:     { bg: "#13130e", bg2: "#1c1c16", ink: "#f3efe7", ink2: "#c8c4b8", muted: "#7c7868", line: "#3a3a30" },
  cool:    { bg: "#eef0ee", bg2: "#e3e6e3", ink: "#0e1212", ink2: "#33393a", muted: "#727b7c", line: "#c9cfcd" },
};

const FONT_PAIRS = {
  "fraunces-inter": { serif: '"Fraunces", Georgia, serif', sans: '"Inter", system-ui, sans-serif' },
  "instrument-inter": { serif: '"Instrument Serif", Georgia, serif', sans: '"Inter", system-ui, sans-serif' },
  "fraunces-mono": { serif: '"Fraunces", Georgia, serif', sans: '"JetBrains Mono", ui-monospace, monospace' },
};

const DENSITY = {
  compact:     { row: "60px", pad: "32px" },
  comfortable: { row: "120px", pad: "44px" },
  airy:        { row: "180px", pad: "56px" },
};

function applyTweaks(t) {
  const root = document.documentElement.style;
  const theme = THEMES[t.theme] || THEMES.warm;
  Object.entries(theme).forEach(([k, v]) => {
    const map = { bg: "--bg", bg2: "--bg-2", ink: "--ink", ink2: "--ink-2", muted: "--muted", line: "--line" };
    root.setProperty(map[k], v);
  });
  // Accent: oklch with user-controlled hue
  const lightness = t.theme === "ink" ? 0.7 : 0.55;
  const chroma = t.theme === "ink" ? 0.13 : 0.14;
  root.setProperty("--accent", `oklch(${lightness} ${chroma} ${t.accentHue})`);

  const pair = FONT_PAIRS[t.fontPair] || FONT_PAIRS["fraunces-inter"];
  root.setProperty("--serif", pair.serif);
  root.setProperty("--sans", pair.sans);

  const d = DENSITY[t.density] || DENSITY.comfortable;
  root.setProperty("--row-gap", d.row);
  root.setProperty("--pad", d.pad);

  document.querySelector(".grid-lines").style.opacity = t.showGrid ? 1 : 0;
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = window.PORTFOLIO;

  useAppEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  const onJump = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Nav onJump={onJump} />
      <Hero data={data} />
      <About data={data} />
      <Skills data={data} />
      <Work data={data} />
      <Experience data={data} />
      <Contact data={data} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio label="Color"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "warm", label: "Warm" },
              { value: "paper", label: "Paper" },
              { value: "cool", label: "Cool" },
              { value: "ink", label: "Ink" },
            ]} />
          <TweakSlider label="Accent hue"
            min={0} max={360} step={1} unit="°"
            value={tweaks.accentHue}
            onChange={(v) => setTweak("accentHue", v)} />
        </TweakSection>

        <TweakSection label="Type">
          <TweakSelect label="Font pairing"
            value={tweaks.fontPair}
            onChange={(v) => setTweak("fontPair", v)}
            options={[
              { value: "fraunces-inter", label: "Fraunces × Inter (default)" },
              { value: "instrument-inter", label: "Instrument Serif × Inter" },
              { value: "fraunces-mono", label: "Fraunces × JetBrains Mono" },
            ]} />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakRadio label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Comfy" },
              { value: "airy", label: "Airy" },
            ]} />
          <TweakToggle label="Show grid columns"
            value={tweaks.showGrid}
            onChange={(v) => setTweak("showGrid", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
