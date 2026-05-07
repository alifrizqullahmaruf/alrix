# ALRIX FOLIO — Case Study

> A self-updatable portfolio with a 60fps physics hero, gyroscope tilt support, and a custom CMS dashboard — built solo with Next.js 16, React 19, and Firebase.

**Role:** Solo Developer (Design, Frontend, Backend, Deployment)
**Timeline:** 3 weeks
**Status:** Live in Production

🔗 **Live demo:** _<add Vercel URL>_
📦 **Repository:** _<add GitHub URL>_

---

## The Problem

Traditional CV PDFs are static, painful to update, and fail to demonstrate frontend craft. A GitHub project list is dry context with no narrative. As a fullstack developer, I needed a single URL that:

1. Could be updated in under 2 minutes — without redeploying
2. Demonstrated personality and technical depth in the first 5 seconds
3. Acted as proof-of-skill itself, not a brochure about my skills

---

## Approach

I designed the portfolio around three principles:

**1. Bold Minimalism**
Single brand color (`#1e3cff`), chunky display typography (Archivo Black), generous whitespace, no decorative noise. The interface should feel intentional, not over-designed.

**2. Animation with purpose**
The hero uses Matter.js to spell "ALRIX FOLIO" in a tidy 2-row arrangement, then gravity activates after 1.5s and everything tumbles. Visitors can drag letters, push them around, and on mobile — tilt their device to control gravity. The animation is the proof of skill.

**3. CMS over redeploys**
Projects shouldn't require a git push. A custom admin dashboard (Firebase Auth + Firestore + image cropper) lets me publish a new project card in minutes from any device.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | RSC + edge deployment on Vercel |
| UI | React 19 + TailwindCSS 4 | Modern primitives, atomic styling |
| Typography | next/font (Archivo Black, Poppins, Inter) | Self-hosted Google Fonts, zero CLS |
| Animation | Matter.js, Framer Motion, GSAP | Physics + UI transitions |
| Database | Firebase Firestore | Realtime reads, no backend to maintain |
| Auth | Firebase Auth | Admin route protection |
| Image edit | react-image-crop | In-browser cropping before upload |
| Deployment | Vercel | Preview deployments, edge caching |

---

## Key Challenges & Solutions

### 1. Hero canvas couldn't measure text correctly
Canvas's `measureText()` runs on mount, but `next/font` swaps in the real font asynchronously. Result: letter widths were measured against fallback fonts, then visually rendered with Archivo Black — layouts looked off.

**Solution:** Gate the canvas init behind `document.fonts.ready`. A small `useEffect` waits for all fonts to finish loading, then triggers the main canvas setup. Layout is now pixel-accurate from frame one.

### 2. iOS gyroscope requires user gesture for permission
Android `deviceorientation` events fire automatically. iOS Safari (since 13) requires `DeviceOrientationEvent.requestPermission()` triggered by a user tap.

**Solution:** Feature-detected the API. On iOS: a "🌀 Enable Tilt" button surfaces after objects settle, which calls `requestPermission()` on tap. On Android: events register silently. Tilt experience is consistent across both platforms without breaking SSR.

### 3. Production deploy showed "Loading projects..." forever
Firebase env vars weren't set in Vercel. Firestore initialized with `undefined` config and `getDocs()` *hung* — never resolved, never threw — leaving the loading state stuck.

**Solution:** Hardened `lib/firebase.ts` to validate `NEXT_PUBLIC_FIREBASE_PROJECT_ID` at module load and throw a clear error if missing. Failures now surface immediately in build logs instead of degrading silently.

### 4. Maintaining 60fps with 21 physics bodies + canvas redraw
The hero renders 10 letter bodies, 6 tech symbols, 5 geometric shapes, plus walls and a mouse constraint — all on one canvas at requestAnimationFrame.

**Solution:** Tuned `frictionAir` and `restitution` per body type, set fixed timestep (`Engine.update(engine, 1000/60)`), and avoided per-frame allocations (font strings cached, body refs reused). Stable 60fps on mid-tier devices.

---

## Results

- 🎯 **Self-publishable in <2 minutes** — admin dashboard with crop tool, no redeploy needed
- ⚡ **Smooth 60fps physics** on mid-tier mobile, including gyroscope tilt
- 📱 **Cross-platform tilt** — works on Android (auto) and iOS (permission-gated)
- 🎨 **Bold Minimalism aesthetic** — single brand color, Archivo Black wordmark, no decorative noise
- 🛡️ **Hardened deployment** — Firebase env validation prevents silent prod failures

---

## What I Learned

- Canvas + web fonts is a footgun until you await `document.fonts.ready`
- iOS Safari's permission gate for sensors is well-intentioned but easy to forget — always feature-detect
- "Hang silently" is the worst failure mode; fail loudly with clear errors at boundaries
- A physics-based hero earns more recruiter time than any "I'm passionate about code" copy

---

## Get in Touch

If you need a developer who ships polished frontends with thoughtful interaction — let's talk.

📧 alifmaruf5923@gmail.com
🔗 LinkedIn: _<add URL>_
🌐 Live demo: _<add URL>_
