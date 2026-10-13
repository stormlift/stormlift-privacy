# StormLift website

Static, dependency-free marketing and legal website for StormLift, published at:

`https://stormlift.github.io/stormlift-privacy/`

## Routes

- `/` — marketing homepage
- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Use
- `/training-safety/` — Training Safety
- `/delete-data` → `/delete-data/` — Delete Your Data
- `/delete-data/it/`, `/delete-data/es/`, `/delete-data/fr/`, `/delete-data/pt-br/` — translated deletion pages
- `/#privacy`, `/#terms`, and `/#contact` — legacy app-compatible entry points

## Local preview

Run a static HTTP server from the repository root, for example:

```sh
python3 -m http.server 4173
```

The site uses native HTML, CSS, and JavaScript with no build step or third-party runtime dependencies. Store and social destinations are centralised in `script.js`.

## Deletion-page localization

The existing site and legal documents are English-only and have no translation
runtime. The deletion page uses the same static HTML architecture for English,
Italian, Spanish, French and Brazilian Portuguese. Native links select a language;
all versions work without JavaScript. Privacy and Terms remain in their published
English form. Keep the five deletion pages aligned when editing their content.
The stable public entry URL is `https://stormlift.app/delete-data`; directory routing
normalizes it to `/delete-data/`. Deployment is not part of CT-01I.
