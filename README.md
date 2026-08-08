# Math for AI Papers

A static, paper-oriented mathematics course for AI/ML.

## What is included

- One routed lesson page per day/topic.
- 22 lessons: the 15-module core, six specialist tracks, and a paper-reading practicum.
- Three worked examples per lesson.
- Practice questions on every lesson page.
- MathJax 3 with the TeX-to-SVG renderer for mathematical notation.
- Responsive layout with no build step.

## Run locally

Because the site is static, serve the repository directory with any HTTP server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The site is compatible with GitHub Pages because it uses only relative static assets and hash-based routing. Configure Pages to publish from the repository root on the `main` branch.

## Math authoring rule

Write inline math as `\\(...\\)` and display math as `\\[...\\]`. Do not use plain-text substitutes for symbols when a LaTeX form exists.
