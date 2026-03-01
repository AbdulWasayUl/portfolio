# Abdul Wasay — Portfolio

Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Dark/Light mode** — Smooth animated toggle with system preference detection
- **10 languages** — English, Urdu, Arabic, Hindi, Chinese, Spanish, French, German, Japanese, Korean
- **RTL support** — Full right-to-left layout for Urdu and Arabic
- **Fully responsive** — Mobile, tablet, and desktop optimized
- **Smooth animations** — Framer Motion scroll reveals, hover effects, page transitions
- **SEO optimized** — Metadata, Open Graph, Twitter cards, semantic HTML
- **Accessible** — ARIA labels, keyboard navigation, semantic elements
- **Performance optimized** — Next.js Image optimization, font loading, code splitting

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, providers
│   ├── page.tsx            # Main page assembling all sections
│   └── globals.css         # Global styles, Tailwind layers, neon effects
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed nav with theme/language controls
│   │   └── Footer.tsx      # Footer with socials and back-to-top
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section with profile image
│   │   ├── About.tsx       # About, education, categorized skills
│   │   ├── Experience.tsx  # Timeline-style work experience
│   │   ├── Projects.tsx    # Project cards grid
│   │   └── Contact.tsx     # Contact form with validation
│   ├── ui/
│   │   ├── Button.tsx      # Reusable button/link component
│   │   ├── SectionWrapper.tsx  # Animated section container
│   │   ├── ProjectCard.tsx # Project card with hover effects
│   │   ├── GlassCard.tsx   # Glassmorphism card wrapper
│   │   └── SocialIcons.tsx # Social media icon links
│   ├── ThemeProvider.tsx   # Dark/light mode context
│   └── I18nProvider.tsx    # Internationalization context
├── data/
│   └── portfolio.ts        # All portfolio content data
├── i18n/
│   ├── index.ts            # Locale config, types, utilities
│   └── locales/            # 10 language JSON files
│       ├── en.json
│       ├── ur.json
│       ├── ar.json
│       ├── hi.json
│       ├── zh.json
│       ├── es.json
│       ├── fr.json
│       ├── de.json
│       ├── ja.json
│       └── ko.json
└── lib/
    └── utils.ts            # Utility functions (cn)
```

## License

MIT
