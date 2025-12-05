## Logic by fred — Wearable Art

Single Page Application built with Vite + React + TypeScript, styled with Tailwind and shadcn-ui. Features a product catalogue with 3D gallery (React Three Fiber) and a cart powered by Zustand.

### Development

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:8080

### Build

```bash
npm run build
npm run preview
```

### Deployment

Configured for GitHub Pages. Ensure the repository is `logicbyfred` so the Vite `base` `/logicbyfred/` is correct, then push to `main`. A workflow in `.github/workflows/deploy.yml` handles build and deploy.
