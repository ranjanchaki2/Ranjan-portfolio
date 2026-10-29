# Ranjan Chaki — Discipline × Digital

A responsive, single-page personal portfolio created from the supplied brief. The project uses semantic HTML, CSS, and vanilla JavaScript so it can be opened locally without installing packages or running a build step.

## Run locally

1. Extract this folder.
2. Open `index.html` in a modern browser.
3. For a local development server in VS Code, use the Live Server extension or run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Main files

- `index.html` — portfolio content, page metadata, navigation, and six project concept previews.
- `styles.css` — responsive layout, visual tokens, custom project illustrations, animation, and reduced-motion handling.
- `script.js` — native smooth anchor navigation, active-section state, mobile navigation, scroll progress, reveal animations, project filters and detail dialogs, current year, and the interactive learning note.
- `assets/favicon.svg` — matching favicon.
- `assets/og-cover.svg` — social share preview artwork.

## Personalization checklist

- Replace the abstract RC portrait placeholder in the hero with a genuine photograph Ranjan approves for public use. Do not use a generic military photo as though it were Ranjan.
- Update the biography and timeline only with details he confirms.
- Replace suggested skill categories with actual skills, tools, and experience. Avoid unverified proficiency percentages.
- The six project gallery entries are explicitly proposed concepts, not completed projects. Replace concept copy and illustrations with verified project details only after real work exists; add repository or demo links only when they genuinely exist.
- The contact section and footer link to the supplied phone, email, LinkedIn, and GitHub details. Update them only when Ranjan confirms a change.
- Keep military unit, posting, deployment, service ID, live schedule, and other sensitive operational details private.
- Update the `og:image` metadata if the portfolio is deployed to a host where an absolute image URL is required for social previews.

## Notes

- No backend or contact form is included. Email links open the visitor's email client, and the page does not imply that a message was delivered.
- Google Fonts are loaded from a CDN; system fallbacks are included if the fonts cannot be fetched.
- All sections are usable without animation, and the page respects `prefers-reduced-motion`.
