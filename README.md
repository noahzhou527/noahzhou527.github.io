# Rockbond CPT208 Portfolio
Rockbond is a CPT208 Human-Centric Computing project for Group C2-5.
Track / Topic: Go Climbers.

## Links

Website: [https://noahzhou527.github.io](https://noahzhou527.github.io)

GitHub repository: [https://github.com/noahzhou527/noahzhou527.github.io](https://github.com/noahzhou527/noahzhou527.github.io)

The project presents a playful web-based climbing community experience.
It helps climbers discover routes, record progress, and stay socially motivated.
The site is built as a static GitHub Pages portfolio.

Main entry file: `index.html`.
Styling file: `styles.css`.
Interaction file: `script.js`.
Image assets are stored in the `image/` folder.

The page covers project overview, motivation, stakeholders, personas, and user research.
It also includes the journey map, user requirements, ideation process, and Crazy Eights sketches.
Later sections compare design alternatives and link to the low-fi and high-fi Figma prototypes.
The final design direction is a hybrid model combining progress tracking and community motivation.

## Current Portfolio Structure

The current site is organised as a single-page portfolio with these main modules:

1. Motivation & Research
2. User Requirements
3. Ideation & Alternatives
4. Technical Implementation
5. Evaluation & Reflection
6. References & Appendices

The team roles section appears near the top as an introductory team overview, but it is not part of the main numbered navigation.
Each numbered module includes a small "Back to nav" shortcut beside the module label.

## Prototype and System Links

The portfolio links to:

- a low-fidelity Figma prototype for the selected hybrid concept
- a high-fidelity Figma prototype for the refined mobile flow
- the deployed Rockbond web app system at [https://rockbond.vercel.app](https://rockbond.vercel.app)

The technical implementation section explains the frontend-only architecture.
The prototype uses React/Vite in the deployed system, browser `localStorage` for lightweight persistence, mock data for realistic content, and Vercel for hosting.

## Evidence and Media Assets

The `image/` folder now includes:

- `member1.jpg` to `member4.jpg` for team role cards
- `persona1.png` and `persona2.png` for persona presentation
- `journey_map.png` for the current-state journey map
- `brainstorming1.jpg`, `brainstorming2.jpg`, `crazy_eights1.jpg`, and `crazy_eights2.jpg` for ideation evidence
- `interview/interview1.jpg` to `interview/interview5.jpg` for evidence-of-life interview photos
- `system_architecture.png` for the technical architecture diagram
- `changes/` screenshots showing before/after usability refinements

The evaluation section uses the `image/changes/` assets to document four alpha-testing refinements:

- bottom navigation optimisation
- card layout and information density improvement
- stronger achievement and notification feedback
- clearer separation of friends and recommended partners

## Interaction and Layout Notes

The static page uses `script.js` for smooth scrolling, reveal animations, heading navigation shortcuts, persona-card labels, particles, and subtle glow movement.
Most long supporting content is placed behind compact expandable buttons so the main page remains scannable.
Expanded content uses a slightly different visual treatment from the main body to indicate supplementary material.

To view locally, open `index.html` in a browser.
No build step or package installation is required.
The site uses HTML, CSS, and vanilla JavaScript only.
External fonts are loaded from Google Fonts.

Appendices list the ethics information sheet, consent form, and ethics approval document.
This repository is intended for coursework presentation and project documentation.
