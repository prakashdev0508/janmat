This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

### Install dependencies

```bash
npm install
```

### Run unit + integration tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run coverage

```bash
npm run test:coverage
```

### Run e2e smoke tests

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

### CI-ready verification

```bash
npm run lint
npm test
npm run test:e2e
```

## A/B Experiments

The app includes a basic experiment framework in `lib/experiments.ts`.

- Experiment registry lives in `EXPERIMENTS`.
- Variant assignment is deterministic per session key.
- Assigned variants are persisted in cookies.
- Exposure events are sent to `POST /api/experiments/exposure`.

To add a new experiment:

1. Add a new definition in `EXPERIMENTS`.
2. Resolve variant via `getExperimentVariant`.
3. Persist/read the experiment cookie with `getExperimentCookieName` + `readCookieValue`.
4. Log exposure through `logExperimentExposure`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
