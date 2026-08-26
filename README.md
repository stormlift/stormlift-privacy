# StormLift website

Static, dependency-free marketing and legal website for StormLift, published at:

`https://stormlift.github.io/stormlift-privacy/`

## Routes

- `/` — marketing homepage
- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Use
- `/training-safety/` — Training Safety
- `/#privacy`, `/#terms`, and `/#contact` — legacy app-compatible entry points

## Local preview

Run a static HTTP server from the repository root, for example:

```sh
python3 -m http.server 4173
```

The site uses native HTML, CSS, and JavaScript with no build step or third-party runtime dependencies. Store and social destinations are centralised in `script.js`.
