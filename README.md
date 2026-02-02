# Block Mine Trading App

React + Vite application for a crypto and trading platform. Includes authentication, account dashboard, deposits, withdrawals, and legal pages.

## Tech Stack
- React 18 + Vite
- Firebase Auth + Firestore
- Tailwind CSS

## Getting Started
1. Install dependencies:
	- `npm install`
2. Create a local environment file:
	- Copy `.env.example` to `.env` and fill in values.
3. Start the dev server:
	- `npm run dev`

## Environment Variables
The app requires the following variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_CLOUDINARY_CLOUD_NAME`

## Scripts
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run test` — run tests
- `npm run test:watch` — run tests in watch mode
- `npm run format` — format files with Prettier
- `npm run format:check` — check formatting

## CI
GitHub Actions runs lint, tests, and format checks on pull requests and pushes to `main`.
