# Mykhailo Melnyk

**Senior Software Engineer** | 10+ Years Experience | React, Next.js, TypeScript, Node.js

🌐 **[View Live Portfolio →](https://mykhailo-melnyk.github.io)**

## About

Senior Software Engineer with 10+ years building scalable web and mobile applications. Currently at Solvd working on MyFitnessPal, managing ~30 engineers, and mentoring 200+ developers through LABA.

This repository contains my personal portfolio website showcasing my professional experience, skills, and projects.

## 🛠 Tech Stack

The portfolio is built with a intentionally minimal, zero-build architecture:

- **React 18** (via CDN/UMD) - Component-based UI
- **Babel Standalone** - JSX transformation in the browser
- **Vanilla CSS** with CSS Variables - Theming system
- **Google Fonts** - Typography (Fraunces, Inter, JetBrains Mono)
- **No build process** - Direct browser execution for simplicity

## ✨ Features

- **🎨 Customizable Themes** - 4 color schemes (Warm, Paper, Cool, Ink)
- **📐 Responsive Design** - Adapts to all screen sizes
- **⚙️ Tweaks Panel** - Real-time customization of theme, typography, and layout
- **📊 Grid System** - 12-column grid with optional overlay
- **🚀 Zero Build** - No compilation needed, just static files
- **♿ Accessible** - Semantic HTML and keyboard navigation

## 🚀 Local Development

1. Clone the repository:
```bash
git clone https://github.com/mykhailo-melnyk/mykhailo-melnyk.github.io.git
cd mykhailo-melnyk.github.io
```

2. Start a local server (required due to CORS):
```bash
python3 -m http.server 8000
# or
npx http-server
```

3. Open in browser:
```
http://localhost:8000
```

## 📝 Customization

### Update Content
Edit `data.jsx` to modify:
- Personal information
- Skills and technologies
- Projects and experience
- Contact details

### Modify Themes
Edit `app.jsx` to adjust:
- Color schemes in `THEMES` object
- Font pairings in `FONT_PAIRS`
- Layout density in `DENSITY`

### Add/Remove Sections
Edit `sections.jsx` to customize the layout and components.

## 🔧 Project Structure

```
├── index.html          # Main HTML entry point
├── app.jsx            # Main React app and theme logic
├── data.jsx           # Portfolio content and data
├── sections.jsx       # UI components for each section
├── projects.jsx       # Project cards and filtering
└── tweaks-panel.jsx   # Theme customization panel
```

## 📫 Contact

- **Email:** [mmelnyk@solvd.com](mailto:mmelnyk@solvd.com)
- **GitHub:** [github.com/mykhailo-melnyk](https://github.com/mykhailo-melnyk)
- **Company:** [Solvd](https://www.solvd.com)

## 📄 License

© 2026 Mykhailo Melnyk. All rights reserved.

---

*This portfolio was designed with [Claude Design](https://claude.ai/design) and implemented with [Claude Code](https://github.com/anthropics/claude-code).*