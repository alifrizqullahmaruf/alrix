# Brainstorm: Alrix Portfolio Website

**Date:** 2026-04-04  
**Status:** Ready for Planning  
**Author:** Alif Rizqullah Maruf (Alrix)

---

## What We're Building

A personal portfolio website for **Alrix** (Alif Rizqullah Maruf), a Fullstack Developer & Software Engineering student at Universitas Gadjah Mara. The site replicates the exact layout from the design reference (Qorry'aina's graphic design portfolio) but adapted for a developer profile.

**Stack:** Next.js + TypeScript + Tailwind CSS + GSAP + Framer Motion + Devicons

---

## Design Reference Adaptation

| Element Referensi | Versi Alrix |
|---|---|
| "Graphic Design Portfolio" | "Fullstack Developer Portfolio" |
| PORTO 2024 (scrambled) | ALRIX + FOLIO (scrambled, GSAP) |
| #Branding #Logo #Poster | #Frontend #Backend #Smart_Contract |
| Foto personal (hitam putih) | Placeholder image (foto menyusul) |
| Email + LinkedIn + Behance | Email + LinkedIn + Instagram (@alifrizm) |
| Adobe Ai/Ps/Ae/Id icons | Devicons tech stack icons |
| Karya desain grafis | Project cards (tanpa screenshot dulu) |

---

## Layout & Sections

### Hero Section (Full Width)
```
┌─────────────────────────────────────────────────────────────┐
│  navbar: Alrix [kiri]          Fullstack Developer [kanan]  │
├────────────────┬────────────────────────────────────────────┤
│  ↙ (arrow)     │  [BIRU #1E3CFF — kotak besar]             │
│                │                                            │
│  #Frontend     │        A  L  R  I  X  (GSAP falling)      │
│  #Backend      │     F  O  L  I  O    (GSAP falling)       │
│  #Smart_       │                              2026          │
│  Contract      │                                            │
└────────────────┴────────────────────────────────────────────┘
                                           See More ↓
```

### Tab Navigation
```
[ About Me ] [ Resume ] [ Work ]        [user] [doc] [edit]
```
Dengan underline aktif dan smooth Framer Motion tab transition.

---

### Tab 1 — About Me

**Kiri:** Foto profil (placeholder, hitam putih filter), dengan teks overlay:
```
Hello,
My name
is Alrix
```
Caption bawah: *"I'm a detail-oriented Software Engineering student with hands-on experience in web & mobile development, machine learning, and data pipelines."*

**Kanan — Introduction Card:**
- Headline: *"A Fullstack Developer based in Yogyakarta"*
- Bio: *"While studying Software Engineering at UGM, I've always been passionate about building scalable applications. I love crafting solutions that are not only technically solid but also meaningful — solving real problems through code and innovation."*
- Ilustrasi: developer/coding illustration (dari public library, misal undraw.co)

**Kanan — Get In Touch Cards (3 kotak):**
| Card | Icon | Label |
|---|---|---|
| Email | ✉ | alifrizqullahmaruf2003@mail.ugm.ac.id |
| LinkedIn | in | linkedin.com/in/alirizm/ |
| Instagram | Ig | @alifrizm |

---

### Tab 2 — Resume

**3 Kolom Layout:**

**Kolom 1 — Experience:**
1. `2024` → Bangkit Academy — *ML Cohort (Top 50 Project)* — Sep–Dec 2024
   - Built CNN/GAN/NLP models dengan TensorFlow
   - Led CultureConnect (mood-based café recommendation)
   - Ranked Top 50, Best Presenter

2. `2024` → PKBI — *Mobile App Developer* — Jul–Dec 2024
   - Developed PKBI Click (HR mobile app)
   - Geolocation attendance, leave requests, secure login
   - API integration for nationwide employee data

3. `2023-2024` → UGM — *Teaching Assistant* — Jul 2023–Jun 2024
   - Mentored web dev, Python, UI/UX
   - Supervised Agile project teams

4. `2022-2023` → UGM Stock Club — *Head of Education Division* — Aug 2022–Jan 2023
   - Organized workshops on stock market fundamentals

**Kolom 2 — Expertise & Skills:**

*Expertise (text list):*
- Fullstack Web Development
- Mobile App Development (Flutter)
- Machine Learning & Data Pipelines
- API Design & Database Architecture

*Hardskill (Devicons grid):*
- JavaScript, Python, SQL
- React, Node.js, Flutter
- PostgreSQL, MySQL
- TensorFlow, scikit-learn
- Git, Figma, Docker

*Softskill (badge/hashtag):*
- `#Problem_Solving` `#Teamwork` `#Agile_Scrum` `#Leadership` `#Communication`

**Kolom 3 — Education:**
1. `2022` → Skola/DeepLearning.AI — *TensorFlow Developer Certification (2024)*
2. `2022–Present` → Universitas Gadjah Mada — *Software Engineering Technology (ongoing)*
3. (SMA jika ingin ditampilkan)

---

### Tab 3 — Work (Project Cards)

Grid 2-kolom card layout, tanpa screenshot (placeholder):

| Project | Stack | Deskripsi |
|---|---|---|
| CultureConnect | TensorFlow, NLP, Python | Mood-based café recommendation system, Top 50 Bangkit |
| PKBI Click | Flutter, Node.js, PostgreSQL | Mobile HR app dengan geolocation & secure login |
| (Tambah project lain) | — | — |

Setiap card: nama project, deskripsi singkat, tech stack badges, tombol GitHub (jika ada) & Live Demo.

---

## Design Tokens

```json
{
  "fonts": {
    "primary": "Poppins (400/500/600/700/800)",
    "secondary": "Inter (400/500/600)",
    "fallback": ["Montserrat", "sans-serif"]
  },
  "colors": {
    "blue_main": "#1E3CFF",
    "blue_secondary": "#3B5BFF",
    "blue_hover": "#2A4DFF",
    "black": "#111111",
    "dark_gray": "#333333",
    "medium_gray": "#888888",
    "light_gray": "#E0E0E0",
    "bg_white": "#FFFFFF",
    "bg_light": "#F5F5F5",
    "bg_card": "#FAFAFA"
  },
  "ui": {
    "border_radius": "16px",
    "shadow": "soft/subtle",
    "style": "modern minimal"
  }
}
```

---

## Libraries & Dependencies

| Library | Versi | Kegunaan |
|---|---|---|
| `next` | existing | Framework |
| `tailwindcss` | existing | Styling |
| `gsap` | latest | Hero scrambled text animation |
| `framer-motion` | latest | Scroll animations, tab transitions |
| `devicons` / `@devicons/react` | latest | Tech stack icons |
| `react-icons` | latest | UI icons (email, LinkedIn, Instagram) |
| `@next/font` | built-in | Poppins + Inter via Google Fonts |

---

## Animation Plan

### GSAP — Hero Scrambled Text
- Huruf "ALRIX" dan "FOLIO" jatuh dari atas dengan rotasi acak
- Setiap huruf punya delay berbeda (stagger effect)
- Settle ke posisi final yang "berantakan tapi terencana" (seperti referensi)
- Trigger: on page load

### Framer Motion
- **Scroll animations:** Setiap section fade-in + slide-up saat masuk viewport
- **Tab transition:** Smooth fade + slide saat switch tab About/Resume/Work
- **Card hover:** Scale up subtle + shadow increase saat hover experience/project cards

### CSS Transitions
- Button hover states
- Badge hover
- Navbar link underline

---

## Component Structure

```
app/
├── page.tsx                          ← root page
├── layout.tsx                        ← font setup (Poppins + Inter)
├── globals.css                       ← design tokens as CSS vars
└── components/
    ├── layout/
    │   ├── Navbar.tsx                ← nama kiri + judul kanan
    │   └── TabNavigation.tsx         ← tab bar + active indicator
    ├── hero/
    │   ├── HeroSection.tsx           ← wrapper
    │   ├── HeroCanvas.tsx            ← kotak biru + GSAP text
    │   └── HeroCategories.tsx        ← hashtag kiri + arrow
    ├── about/
    │   ├── AboutTab.tsx              ← tab wrapper
    │   ├── ProfileCard.tsx           ← foto + overlay text
    │   ├── IntroductionCard.tsx      ← bio card
    │   └── GetInTouchCards.tsx       ← 3 contact cards
    ├── resume/
    │   ├── ResumeTab.tsx             ← tab wrapper (3-col grid)
    │   ├── ExperienceList.tsx        ← timeline experience
    │   ├── ExpertiseCard.tsx         ← text expertise
    │   ├── HardSkillGrid.tsx         ← devicons grid
    │   ├── SoftSkillBadges.tsx       ← hashtag badges
    │   └── EducationList.tsx         ← education cards
    └── work/
        ├── WorkTab.tsx               ← tab wrapper
        └── ProjectCard.tsx           ← card per project
```

---

## Key Decisions

1. **GSAP untuk hero** — Lebih powerful dari CSS animation untuk efek fisika huruf jatuh yang kompleks
2. **Framer Motion untuk sisanya** — Cocok dengan React ecosystem, scroll-trigger mudah
3. **Devicons untuk tech icons** — Library paling lengkap untuk developer tech stack
4. **Placeholder dulu untuk foto & project screenshot** — Tidak blocking, bisa diganti kapan saja
5. **Mobile-first layout** — Karena referensi tampak seperti mobile app, pastikan responsive
6. **#Smart_Contract sebagai kategori** — Menambah differentiator unik dari developer biasa

---

## Open Questions

*Semua telah terjawab saat brainstorming.*

---

## Resolved Questions

- [x] Hero text → ALRIX + FOLIO (GSAP falling effect)
- [x] Kategori hero → #Frontend, #Backend, #Smart_Contract
- [x] Foto profil → Placeholder dulu
- [x] Kontak → Email + LinkedIn + Instagram (@alifrizm)
- [x] Work section → Project cards tanpa screenshot
- [x] Icon library → Devicons
- [x] Animasi tambahan → Framer Motion (scroll + tab) + hover effects

---

## Next Step

Run `/ce:plan` untuk generate implementation plan step-by-step.
