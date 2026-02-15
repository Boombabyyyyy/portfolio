# [azfar.codes](https://azfar.codes/) — My Corner of the Internet

> _"I don't always write clean code, but when I do, I make sure the portfolio looks absolutely insane."_

Hey there! I'm **Azfar Faheem Mustafa** — Technical Lead, full-stack dev, and someone who genuinely believes `console.log("it works!")` counts as debugging. Welcome to the source code of my portfolio.

## What's Inside

This isn't your average "here's my resume on a webpage" situation. This thing has:

- **Floating 3D tech logos** — React, Docker, TypeScript and other icons drifting around like they're in space
- **A giant React atom** — because what else would a React dev put as their hero?
- **Custom cursor** — with a trailing ring because the default cursor is boring
- **Scroll-synced parallax** — everything moves at different speeds, it's cinematic
- **Staggered entrance animations** — sections animate in like a Marvel intro (okay, almost)
- **Buttery smooth scrolling** — powered by Lenis, your scroll wheel will thank you
- **Fully responsive** — looks great on everything from a phone to an ultrawide

## Built With

| Layer | Tech |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (Turbopack) |
| 3D Engine | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Smooth Scroll | [Lenis](https://github.com/studio-freight/lenis) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) + [Skill Icons](https://skillicons.dev) |
| Fonts | Space Grotesk + Inter (via Google Fonts) |

## Getting Started

```bash
# Clone it
git clone https://github.com/Boombabyyyyy/portfolio.git
cd portfolio

# Install dependencies
npm install

# Fire it up
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and try not to stare at the floating logos for too long. 

## Project Structure

```
src/
├── app/              # Next.js app router (page, layout, globals)
├── components/
│   ├── 3d/           # React Three Fiber scenes (HeroGeo, FloatingParticles, Scene)
│   ├── sections/     # Page sections (Hero, About, Experience, Skills, Projects, Contact)
│   └── ui/           # Navbar, CustomCursor, SmoothScroll
└── data/             # Portfolio content (experience, projects, skills)
```

## Design Philosophy

Dark mode only. Neon green (#0AFF9D) and purple (#A960EE) accents. Glassmorphism everywhere. If it doesn't glow, it doesn't belong. Inspired by sites like [landonorris.com](https://landonorris.com) because even my portfolio deserves the F1 treatment.

## Deployment

Works great on [Vercel](https://vercel.com) (zero config), or can be statically exported for GitHub Pages:

```bash
npm run build
```

## Find Me

- [LinkedIn](https://www.linkedin.com/in/azfar-faheem-mustafa-365b5517b)
- [GitHub](https://github.com/Boombabyyyyy)
- [Email](mailto:azfar.faheem@gmail.com)

---