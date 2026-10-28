# Buturo Bartolomei

A minimal, responsive personal portfolio built with plain HTML, CSS, and JavaScript.

## Structure

- `index.html`: About, AI for downtown businesses, Experience & Research, Selected Project, Education & Skills, Community, and a song of the week in the footer.
- `assets/portfolio.css`: responsive layout, typography, light/dark themes, and print styles.
- `assets/portfolio.js`: theme preference, active-section navigation, footer year, and the weekly song rotation.
- `assets/monogram.svg`: favicon.

No framework, package installation, build step, analytics, or external font service is required. The content remains readable without JavaScript.

## Editing

Edit the section text in `index.html`. Change the colors in the CSS variables at the top of `assets/portfolio.css` (`--accent` is for text and links, `--pink` is decorative only). Avoid adding course solutions, private support records, unpublished research details, or operational homelab secrets.

## Song of the week

The song list is the `songs` array in `assets/portfolio.js`: 52 entries of `[title, artist, year]`, with the year optional. The pick changes every Monday and cycles through the list from the `epoch` date (a Monday), so the cycle repeats yearly. Links go to YouTube and Spotify searches; nothing is embedded and no third-party scripts load. To add songs, keep the list at 52 entries (swap one out) so the yearly cycle stays aligned, and keep `Christmas Time Is Here` at position 50 for the week of December 21. The static song in `index.html` is a no-JavaScript fallback; update it occasionally.

## GitHub Pages

The site files are at the repository root. In the repository's Pages settings, select **Deploy from a branch**, **main**, and **/(root)**, then save. Availability for private repositories depends on the GitHub plan. Do not make a private repository public without reviewing its full history first.

The October 2026 refresh preserves prior pages and assets for continuity; the current homepage uses the new portfolio assets. Application prep and interview documents are kept separately in Google Docs.

## Content maintenance

Current snapshot: October 27, 2026. The AI for downtown businesses section describes four tools that are in the design stage and not yet built (status badges say so): change a badge to "prototype with synthetic data" only after a working demo exists, and to "client pilot" only after a pilot has happened. Do not add client names, testimonials, results, or prices until they exist and the client has agreed, and keep the fair-housing and allergen guardrails and the not-affiliated-with-the-university line. Keep coursework marked in progress until completed. SPI Lab is described as attending lab meetings, not as research or active membership; change this only if the user joins a research team. WolvSec contribution is currently CTF idea development. Blue Arbor is a student homelab with a fictional company; modeled systems are not represented as deployed applications.
