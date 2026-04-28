// Portfolio content — sourced from Mykhailo Melnyk's CV
const PORTFOLIO = {
  name: "Mykhailo Melnyk",
  role: "Senior Software Engineer",
  location: "Krakow, Poland",
  available: "Open to senior IC and lead engineering roles",
  bio: "Senior Software Engineer with 10+ years building scalable, high-performance web and mobile applications across health & fitness, residential, and hospitality. Full-stack on JavaScript/TypeScript, React, Next.js, and Node.js — and four years leading Solvd LABA's JS/TS/React track.",
  longBio: [
    "I build production web and mobile software end-to-end — from architecture and CI/CD through delivery — and have spent the last decade shipping for global user bases at Solvd and Bizico.",
    "At Solvd I work on MyFitnessPal: developing user-facing features in Next.js and React, supporting Node.js services and REST APIs, integrating Stripe-based payment flows, and migrating a legacy Ruby on Rails stack to a modern TypeScript + Next.js one.",
    "Concurrently, I manage a team of ~30 JavaScript/TypeScript engineers across Solvd's portfolio — owning performance reviews, staffing, and career development plans. For four years I also led Solvd LABA's JS/TS/React/Next.js track, mentoring 200+ graduates and a team of ~5 mentors.",
    "I'm comfortable adopting emerging tools — including AI-assisted development with Claude Code — to ship maintainable software faster."
  ],
  email: "mmelnyk@solvd.com",
  social: [
    { label: "Email", href: "mailto:mmelnyk@solvd.com", handle: "mmelnyk@solvd.com" },
    { label: "Company", href: "https://www.solvd.com", handle: "solvd.com" },
    { label: "LABA", href: "https://laba.solvd.com", handle: "laba.solvd.com" },
    { label: "GitHub", href: "https://github.com/mykhailo-melnyk", handle: "github.com/mykhailo-melnyk" },
  ],
  skills: [
    {
      group: "Languages",
      items: ["JavaScript", "TypeScript"]
    },
    {
      group: "Frameworks",
      items: ["React", "Next.js", "Node.js", "React Native", "React Native Web"]
    },
    {
      group: "State & Data",
      items: ["Redux", "React Query", "REST APIs", "MySQL", "PostgreSQL", "Firebase"]
    },
    {
      group: "UI & Tooling",
      items: ["MUI", "Ant Design", "Tailwind", "Stripe", "Datadog", "GitHub Actions", "Git", "Claude Code"]
    },
    {
      group: "Practice",
      items: ["Engineering management", "Mentorship", "Curriculum design", "Performance & CDPs", "Cross-functional delivery", "Legacy migration"]
    }
  ],
  projects: [
    {
      id: "mfp-web",
      year: "2020–Now",
      name: "MyFitnessPal — Web",
      tagline: "Scalable web experiences for a leading global health & fitness platform.",
      role: "Senior Software Engineer · Solvd",
      stack: ["Next.js", "React", "TypeScript", "React Query", "Node.js", "Stripe", "Ruby on Rails"],
      summary: "Develop and maintain user-facing features in Next.js and React for a large global user base. Integrate and maintain Stripe-based payment flows, support backend services and REST APIs, and configure CI/CD pipelines. Optimized application performance and page load times across the funnel. Led the migration of the legacy Ruby on Rails stack to a modern Next.js + TypeScript codebase — preserving SEO, SLA, and the Stripe integration while rebuilding the page architecture.",
      tone: "warm",
    },
    {
      id: "solvd-management",
      year: "2023–Now",
      name: "Solvd JS/TS Engineering Org",
      tagline: "Engineering Manager for ~30 JavaScript/TypeScript engineers.",
      role: "Engineering Manager · Solvd",
      stack: ["JavaScript", "TypeScript", "React", "Node.js"],
      summary: "Manage a team of ~30 engineers delivering client projects across Solvd's portfolio. Own performance reviews and merit decisions, staff engineers onto projects by skill and need, and build/track Career Development Plans for each report. Partner with delivery and account teams to keep client projects on the rails.",
      tone: "ink",
    },
    {
      id: "laba",
      year: "2022–2025",
      name: "Solvd LABA — JS/TS/React Track",
      tagline: "200+ graduates mentored, 5 mentors led, four years end-to-end.",
      role: "Mentor & Lead Tutor · Solvd LABA",
      stack: ["JavaScript", "TypeScript", "React", "Next.js", "Redux", "React Query"],
      summary: "Led the JS/TS/React/Next.js program end-to-end — curriculum design, lectures, live coding, and 1:1 mentorship. Managed a team of ~5 mentors, ran code reviews and student evaluations, and designed/graded exams gating progression. 200+ graduates went on to real commercial projects.",
      tone: "neutral",
    },
    {
      id: "hotel-app",
      year: "2014–2020",
      name: "Hotel Application",
      tagline: "Booking, door access, and on-site ordering — no reception needed.",
      role: "Software Engineer · Bizico",
      stack: ["React Native", "React Native Web", "React", "Redux", "Firebase", "Ruby on Rails", "PostgreSQL"],
      summary: "Planned, developed, tested, deployed, and maintained web and mobile applications for a hospitality client. Shipped the app through the App Store and Google Play, ran ongoing support and troubleshooting, and helped manage the team.",
      tone: "warm",
    },
  ],
  experience: [
    { role: "Engineering Manager (concurrent)", org: "Solvd", from: "Feb 2023", to: "Now", note: "Manage ~30 JS/TS engineers across Solvd's portfolio. Performance reviews, staffing, CDPs, and delivery partnership." },
    { role: "Senior Software Engineer", org: "Solvd — MyFitnessPal", from: "Aug 2020", to: "Now", note: "Next.js + React features for a global user base. Stripe payments, Node REST APIs, CI/CD, and a Rails → Next.js migration." },
    { role: "Mentor & Lead Tutor", org: "Solvd LABA", from: "Jan 2022", to: "Dec 2025", note: "Led JS/TS/React/Next.js track. Curriculum, lectures, ~5 mentors managed, 200+ graduates placed on commercial projects." },
    { role: "Software Engineer", org: "Bizico (Chernivtsi, Ukraine)", from: "Feb 2014", to: "May 2020", note: "Hotel app: booking, door access, in-room ordering. React Native + Web, Redux, Firebase, Rails, PostgreSQL." },
    { role: "M.Sc. System Analysis", org: "Chernivtsi National University", from: "2014", to: "2015", note: "Master's degree in System Analysis." },
    { role: "B.Sc. System Analysis", org: "Chernivtsi National University", from: "2010", to: "2014", note: "Bachelor's degree in System Analysis." },
  ],
  writing: [
    { title: "JS/TS/React/Next.js curriculum, four years", outlet: "Solvd LABA", year: "2022–25" },
    { title: "Mentoring 200+ engineers into commercial work", outlet: "Solvd LABA", year: "2022–25" },
    { title: "Adopting AI-assisted development (Claude Code)", outlet: "Internal practice", year: "2025" },
  ],
};

window.PORTFOLIO = PORTFOLIO;
