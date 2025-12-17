# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
`
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=your_ga_id
```

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google, Facebook, GitHub (if needed)
4. Copy your Firebase config to `.env`

### 4. Initialize Git Hooks (Optional but Recommended)

```bash
npm run prepare
```

This will set up Husky for pre-commit hooks.

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Type check with TypeScript
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Table.tsx
│   ├── Layout.tsx
│   ├── ErrorBoundary.tsx
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   └── useTheme.ts
├── store/              # Redux store
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
├── utils/              # Utility functions
│   ├── api.ts
│   ├── date.ts
│   └── helpers.ts
├── services/           # API services
├── types/              # TypeScript types
├── constants/          # Constants and enums
└── config/            # Configuration files
```

## 🎨 Customization

### Adding a New Route

1. Create a new page component in `src/pages/`
2. Add route in `src/App.tsx`:

```tsx
const NewPage = React.lazy(() => import('@/pages/NewPage'));

// In Routes:
<Route path="new-page" element={<NewPage />} />;
```

### Adding a New Redux Slice

1. Create slice in `src/store/slices/`
2. Add to `src/store/index.ts`:

```tsx
import newSlice from './slices/newSlice';

const rootReducer = combineReducers({
  // ... existing slices
  newFeature: newSlice,
});
```

### Adding a New UI Component

1. Create component in `src/components/`
2. Export from component file
3. Use in your pages

## 🔐 Authentication

The boilerplate uses Firebase Authentication. To use a different auth provider:

1. Update `src/config/firebase.ts` or create new auth config
2. Update `src/hooks/useAuth.ts` with your auth logic
3. Update `src/store/slices/authSlice.ts` if needed

## 🌐 Internationalization

Add new translations:

1. Add keys to `src/constants/locales/en.json` and `vi.json`
2. Use in components:

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<p>{t('common.welcome')}</p>;
```

## 🧪 Testing

### Unit Tests

Tests are in `src/components/__tests__/` and use Vitest.

### E2E Tests

E2E tests are in `e2e/` and use Playwright.

## 📦 Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## 🐳 Docker Deployment

```bash
# Build image
docker build -t react-boilerplate .

# Run container
docker run -p 80:80 react-boilerplate
```

## 🆘 Troubleshooting

### Module not found errors

Run `npm install` to install all dependencies.

### TypeScript errors

Run `npm run type-check` to see detailed errors.

### Firebase errors

Make sure your `.env` file has correct Firebase configuration.

### Port already in use

Change the port in `vite.config.ts`:

```ts
server: {
  port: 3001, // Change to available port
}
```

## 📚 Next Steps

1. Customize the theme colors in `tailwind.config.js`
2. Add your API endpoints in `src/constants/index.ts`
3. Create your own pages and components
4. Set up your backend API
5. Configure analytics (Google Analytics, etc.)
6. Deploy to your hosting platform

Happy coding! 🎉
