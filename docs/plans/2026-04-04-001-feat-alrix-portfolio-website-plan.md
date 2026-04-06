---
title: "feat: Build Alrix Portfolio Website"
type: feat
status: completed
date: 2026-04-04
origin: docs/brainstorms/2026-04-04-alrix-portfolio-brainstorm.md
---

# feat: Build Alrix Portfolio Website

## Overview

Build a personal portfolio website for **Alrix** (Alif Rizqullah Maruf), replicating the exact layout from the graphic design portfolio reference image, adapted for a Fullstack Developer profile. The site uses Next.js 16 (App Router), Tailwind CSS v4, GSAP for hero animation, and Framer Motion for scroll/tab animations.

**Key constraint:** This is Next.js 16.2.2 with React 19.2.4 and Tailwind CSS v4 — APIs differ significantly from earlier versions. All config lives in CSS (`@theme` block), not `tailwind.config.js`.

---

## Proposed Solution

A single-page portfolio with:
- **Hero section** — full-width blue block with GSAP falling letter animation ("ALRIX + FOLIO"), category hashtags on the left
- **Tab system** — About Me / Resume / Work with Framer Motion transitions
- **About Me** — profile photo card + bio + 3 contact cards
- **Resume** — 3-column: Experience timeline, Skills (Expertise + Hardskill grid + Softskill badges), Education
- **Work** — Project cards grid (placeholder images)

---

## Technical Architecture

### Server vs Client Component Boundary

```
app/
├── layout.tsx          ← Server Component (fonts, metadata)
├── page.tsx            ← Server Component (shell only)
└── components/
    ├── layout/
    │   ├── Navbar.tsx              ← Server Component (static)
    │   └── TabNavigation.tsx       ← 'use client' (useState for active tab)
    ├── hero/
    │   ├── HeroSection.tsx         ← Server Component (wrapper)
    │   ├── HeroCanvas.tsx          ← 'use client' (GSAP useEffect)
    │   └── HeroCategories.tsx      ← Server Component (static hashtags)
    ├── about/
    │   ├── AboutTab.tsx            ← 'use client' (Framer Motion)
    │   ├── ProfileCard.tsx         ← Server Component
    │   ├── IntroductionCard.tsx    ← Server Component
    │   └── GetInTouchCards.tsx     ← Server Component
    ├── resume/
    │   ├── ResumeTab.tsx           ← 'use client' (Framer Motion scroll)
    │   ├── ExperienceList.tsx      ← Server Component
    │   ├── ExpertiseCard.tsx       ← Server Component
    │   ├── HardSkillGrid.tsx       ← Server Component
    │   ├── SoftSkillBadges.tsx     ← Server Component
    │   └── EducationList.tsx       ← Server Component
    └── work/
        ├── WorkTab.tsx             ← 'use client' (Framer Motion)
        └── ProjectCard.tsx         ← Server Component
```

### Tailwind v4 Design Tokens (globals.css)

Tailwind v4 uses `@theme` block instead of `tailwind.config.js`. All custom tokens are defined as CSS variables here:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-blue-main: #1E3CFF;
  --color-blue-secondary: #3B5BFF;
  --color-blue-hover: #2A4DFF;
  --color-neutral-black: #111111;
  --color-neutral-dark: #333333;
  --color-neutral-medium: #888888;
  --color-neutral-light: #E0E0E0;
  --color-bg-white: #FFFFFF;
  --color-bg-light: #F5F5F5;
  --color-bg-card: #FAFAFA;

  /* Fonts */
  --font-poppins: var(--font-poppins-var);
  --font-inter: var(--font-inter-var);

  /* Border radius */
  --radius-card: 16px;
}
```

### Font Setup (layout.tsx)

Poppins is NOT a variable font — weights must be declared explicitly:

```tsx
// app/layout.tsx
import { Poppins, Inter } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins-var',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter-var',
})
```

### GSAP Integration Pattern

GSAP manipulates the DOM and must only run client-side:

```tsx
// app/components/hero/HeroCanvas.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroCanvas() {
  const lettersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lettersRef.current, {
        y: -200,
        rotation: () => Math.random() * 60 - 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'bounce.out',
      })
    })
    return () => ctx.revert() // cleanup
  }, [])
  // ...
}
```

### Icon Library

Use `react-icons` for everything — it includes both devicon set (`Di*`) and Feather/Lucide icons (`Fi*`/`Lu*`). Compatible with React 19:

- **Tech icons:** `react-icons/di` — `DiReact`, `DiNodejs`, `DiPython`, `DiFlutter`, `DiPostgresql`, etc.
- **UI icons:** `react-icons/fi` — `FiMail`, `FiLinkedin`, `FiInstagram`

---

## Implementation Phases

### Phase 1: Foundation Setup

**Goal:** Working base with fonts, design tokens, dependencies installed.

**Tasks:**
- [ ] Install dependencies: `gsap`, `framer-motion`, `react-icons`
- [ ] Update `app/layout.tsx` — Poppins + Inter fonts with CSS variables, update metadata (`title: "Alrix — Fullstack Developer"`)
- [ ] Update `app/globals.css` — add full `@theme` design token block (colors, fonts, radius)
- [ ] Update `app/page.tsx` — replace boilerplate with portfolio shell structure
- [ ] Add `public/placeholder-profile.jpg` — gray gradient placeholder image

**Files to create/modify:**
- `app/layout.tsx` — font setup
- `app/globals.css` — design tokens
- `app/page.tsx` — shell
- `package.json` — new deps

**Success criteria:**
- `npm run dev` works without errors
- Poppins font renders in browser
- Blue `#1E3CFF` available as Tailwind class `bg-blue-main`

---

### Phase 2: Navbar + Hero Section

**Goal:** Hero looks identical to reference — blue box with GSAP falling text, arrow + hashtags on left.

**Tasks:**
- [ ] Create `app/components/layout/Navbar.tsx` — "Alrix" left, "Fullstack Developer Portfolio" right, avatar icon left
- [ ] Create `app/components/hero/HeroCategories.tsx` — black diagonal arrow + `#Frontend #Backend #Smart_Contract` hashtag list
- [ ] Create `app/components/hero/HeroCanvas.tsx` (`'use client'`) — blue `#1E3CFF` rounded box, GSAP animation for "ALRIX" + "FOLIO" letters falling into scattered positions + "2026" bottom-left
- [ ] Create `app/components/hero/HeroSection.tsx` — two-column layout: left (HeroCategories) + right (HeroCanvas)
- [ ] Add "See More ↓" button below hero

**GSAP Letter Animation Detail:**
- Split "ALRIX" and "FOLIO" into individual `<span>` elements
- Each letter: random initial rotation (-30° to +30°), drop from y: -200
- Stagger: 0.08s per letter
- Ease: `bounce.out`
- Final positions: scattered/overlapping as in reference image (use absolute positioning within blue box)
- "2026" text: appears last with fade-in

**Layout (matching reference):**
```
[←] [15%]  |  [85%: blue box]
arrow+tags  |  ALRIX+FOLIO (GSAP)
            |  2026
```

**Files:**
- `app/components/layout/Navbar.tsx`
- `app/components/hero/HeroSection.tsx`
- `app/components/hero/HeroCanvas.tsx` (`'use client'`)
- `app/components/hero/HeroCategories.tsx`

**Success criteria:**
- Letters animate on page load with falling/bouncing effect
- Blue box fills ~85% of width
- Hashtag categories visible on left

---

### Phase 3: Tab Navigation + About Me Tab

**Goal:** Functional tab system + complete About Me content.

**Tasks:**
- [ ] Create `app/components/layout/TabNavigation.tsx` (`'use client'`) — "About Me / Resume / Work" tabs, active underline, 3 icon buttons (user/doc/edit) on right, Framer Motion underline animation
- [ ] Create `app/components/about/ProfileCard.tsx` — dark rounded card, grayscale placeholder photo, text overlay "Hello, / My name / is Alrix", caption at bottom
- [ ] Create `app/components/about/IntroductionCard.tsx` — headline "A Fullstack Developer based in Yogyakarta", bio paragraph, coding illustration (use `react-icons` or inline SVG)
- [ ] Create `app/components/about/GetInTouchCards.tsx` — 3 cards: Email (black bg), LinkedIn (blue bg), Instagram (white/light bg), with `FiMail`, `FiLinkedin`, `FiInstagram` icons
- [ ] Create `app/components/about/AboutTab.tsx` (`'use client'`) — two-column layout: ProfileCard left, IntroductionCard + GetInTouchCards right, Framer Motion fade-in on mount
- [ ] Wire tab switching in `app/page.tsx` — `useState('about')`, render correct tab content

**Contact data:**
- Email: alifrizqullahmaruf2003@mail.ugm.ac.id
- LinkedIn: linkedin.com/in/alirizm/
- Instagram: @alifrizm

**Files:**
- `app/components/layout/TabNavigation.tsx` (`'use client'`)
- `app/components/about/AboutTab.tsx` (`'use client'`)
- `app/components/about/ProfileCard.tsx`
- `app/components/about/IntroductionCard.tsx`
- `app/components/about/GetInTouchCards.tsx`

**Success criteria:**
- Clicking tabs switches content smoothly
- Active tab has underline indicator
- All 3 contact cards render with correct icons and labels

---

### Phase 4: Resume Tab

**Goal:** Complete 3-column resume matching reference layout.

**Tasks:**
- [ ] Create `app/components/resume/ExperienceList.tsx` — timeline cards with:
  - Blue pill badge (year range)
  - Company name + role
  - Bullet point achievements
  - Progress bar / date range line at bottom
  - Experiences: Bangkit Academy, PKBI, UGM TA, UGM Stock Club
- [ ] Create `app/components/resume/ExpertiseCard.tsx` — collapsible section header "Expertise", text list of 4 expertise areas
- [ ] Create `app/components/resume/HardSkillGrid.tsx` — "Hardskill" section with grid of tech icons using `react-icons/di`:
  - Row 1: JavaScript, Python, SQL, Java
  - Row 2: React, Node.js, Flutter
  - Row 3: PostgreSQL, MySQL
  - Row 4: TensorFlow, Git, Figma
- [ ] Create `app/components/resume/SoftSkillBadges.tsx` — "Softskill" section with hashtag badge pills: `#Problem_Solving` `#Teamwork` `#Agile_Scrum` `#Leadership` `#Communication`
- [ ] Create `app/components/resume/EducationList.tsx` — dark rounded cards:
  - 2024: DeepLearning.AI — TensorFlow Developer Certification
  - 2022–present: Universitas Gadjah Mada — Software Engineering Technology
- [ ] Create `app/components/resume/ResumeTab.tsx` (`'use client'`) — CSS grid 3-column layout, Framer Motion scroll-triggered fade-in for each section

**Layout:**
```
[Experience col] | [Expertise+Hardskill+Softskill col] | [Education col]
```

**Files:**
- `app/components/resume/ResumeTab.tsx` (`'use client'`)
- `app/components/resume/ExperienceList.tsx`
- `app/components/resume/ExpertiseCard.tsx`
- `app/components/resume/HardSkillGrid.tsx`
- `app/components/resume/SoftSkillBadges.tsx`
- `app/components/resume/EducationList.tsx`

**Success criteria:**
- 3-column grid renders correctly
- All 4 experience entries show with correct dates and bullets
- Tech icons render from react-icons/di
- Sections animate in on scroll

---

### Phase 5: Work Tab

**Goal:** Project cards grid with placeholder images.

**Tasks:**
- [ ] Create `app/components/work/ProjectCard.tsx` — card component with:
  - Placeholder image (gray bg with project icon)
  - Project name (Poppins bold)
  - Short description
  - Tech stack badge row (small colored pills)
  - GitHub + Live Demo button row (if applicable)
- [ ] Create `app/components/work/WorkTab.tsx` (`'use client'`) — 2-column grid, Framer Motion staggered card entrance
- [ ] Add project data:
  - CultureConnect — TensorFlow, NLP, Python, Scikit-learn — "Mood-based café recommendation system — Top 50 Bangkit Academy 2024"
  - PKBI Click — Flutter, Node.js, PostgreSQL — "Mobile HR app with geolocation attendance & secure login"
  - (2 placeholder cards for future projects)

**Files:**
- `app/components/work/WorkTab.tsx` (`'use client'`)
- `app/components/work/ProjectCard.tsx`

**Success criteria:**
- 2×2 grid of project cards
- Cards animate in with stagger on tab switch
- Tech stack badges render per project

---

### Phase 6: Polish & Responsive

**Goal:** Pixel-perfect finish, mobile responsive, all animations smooth.

**Tasks:**
- [ ] **Mobile responsive** — stack 2-col layouts to 1-col on mobile, hero adapts (categories hidden on mobile or below), tab scrollable
- [ ] **Hover effects** — experience cards: subtle scale + shadow; project cards: lift + shadow; contact cards: background shift
- [ ] **Scroll animations review** — ensure Framer Motion `viewport` triggers work correctly (only animate once)
- [ ] **Typography audit** — verify Poppins weights render correctly (700 for headings, 400 for body, 800 for hero letters)
- [ ] **Color audit** — verify all blues are `#1E3CFF`, not Tailwind defaults
- [ ] **GSAP cleanup** — verify `ctx.revert()` prevents memory leaks on remount
- [ ] **Metadata** — update `layout.tsx` metadata: title, description, og:image placeholder
- [ ] **Accessibility** — add `alt` text to images, ARIA labels to icon-only buttons, ensure tab focus order correct

**Success criteria:**
- Mobile (375px) renders correctly
- No layout overflow on any breakpoint
- GSAP animation triggers only once (not on every tab switch)
- Lighthouse performance score > 80

---

## Acceptance Criteria

### Functional
- [ ] Hero GSAP animation plays on page load — letters fall and settle in scattered positions
- [ ] Tab navigation switches between About Me / Resume / Work with smooth Framer Motion transition
- [ ] All 3 contact links are clickable (Email: `mailto:`, LinkedIn: new tab, Instagram: new tab)
- [ ] Resume shows all 4 experience entries, skill icons, and 2 education cards
- [ ] Work tab shows CultureConnect and PKBI Click project cards
- [ ] Site is responsive on mobile (375px) and desktop (1280px+)

### Design
- [ ] Fonts: Poppins used for all headings, Inter/Poppins for body
- [ ] Primary blue: `#1E3CFF` — hero bg, LinkedIn card, active tab indicator, badge pills
- [ ] Card `border-radius: 16px` throughout
- [ ] Soft shadows on cards
- [ ] Grayscale filter on profile placeholder photo

### Technical
- [ ] Zero TypeScript errors (`npm run build` succeeds)
- [ ] GSAP only runs client-side (`'use client'` + `useEffect`)
- [ ] No `tailwind.config.js` — all tokens in `globals.css` `@theme` block
- [ ] Fonts loaded via `next/font/google` (no CLS)

---

## Dependencies to Install

```bash
npm install gsap framer-motion react-icons
```

No `@devicons/react` needed — `react-icons` includes devicons via `Di*` prefix and has React 19 compatibility.

---

## System-Wide Impact

### Interaction Graph
Page load → `HeroCanvas` mounts → `useEffect` fires → GSAP animates letters → cleanup on unmount via `ctx.revert()`. Tab click → `TabNavigation` updates `activeTab` state in `page.tsx` → correct tab component renders → Framer Motion `AnimatePresence` handles enter/exit.

### State Lifecycle Risks
- GSAP context (`ctx`) created in `useEffect` — must call `ctx.revert()` in cleanup to prevent stale animations if component remounts
- Tab state lives in `page.tsx` — single source of truth, no risk of desync

### Performance Notes
- Poppins at 5 weights = ~150KB. Consider subset to `latin` only (already planned)
- GSAP is ~30KB gzipped — acceptable for portfolio
- Framer Motion ~45KB — acceptable

---

## Key Decisions Carried Forward from Brainstorm

(see brainstorm: docs/brainstorms/2026-04-04-alrix-portfolio-brainstorm.md)

1. **GSAP for hero** — falling letter physics not achievable with CSS alone
2. **react-icons over @devicons/react** — single package, React 19 compatible, covers both tech icons (Di*) and UI icons (Fi*)
3. **Placeholder for profile photo** — not blocking, replaceable with real photo later
4. **`#Smart_Contract` as hero category** — differentiator from typical fullstack developers
5. **Mobile-first** — design reference is mobile-sized, so mobile is primary viewport

---

## Sources

- **Origin brainstorm:** [docs/brainstorms/2026-04-04-alrix-portfolio-brainstorm.md](../brainstorms/2026-04-04-alrix-portfolio-brainstorm.md)
- **Next.js fonts guide:** `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- **Server/Client components:** `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- **CV source:** `app/docs/CV Alif Rizqullah Maruf - Software Engineer.pdf`
