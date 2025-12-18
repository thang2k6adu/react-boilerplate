# React Boilerplate

A modern, production-ready React + TypeScript boilerplate with all the essential features and best practices.

## 🚀 Features

### Core Setup

- ✅ React 18 + TypeScript
- ✅ Vite for fast development and building
- ✅ ESLint + Prettier for code quality
- ✅ EditorConfig for consistent coding style
- ✅ Environment variables support (.env)

### State Management

- ✅ Redux Toolkit for state management
- ✅ Redux Persist for state persistence
- ✅ Redux DevTools integration

### Routing

- ✅ React Router v6+ with lazy loading
- ✅ Public and protected routes
- ✅ 404 Not Found page

### UI / Styling

- ✅ Tailwind CSS with dark mode support
- ✅ Reusable UI components (Button, Input, Modal, Card, Table)
- ✅ Form handling with react-hook-form + Zod validation
- ✅ Global layout with Header and Footer

### Authentication

- ✅ Firebase Authentication
- ✅ Sign In / Sign Up / Forgot Password
- ✅ Social login (Google, Facebook, GitHub)
- ✅ Role-based access control
- ✅ Protected routes

### API / Data Fetching

- ✅ Axios wrapper with interceptors
- ✅ React Query for data fetching and caching
- ✅ Error handling and retry logic

### Utilities

- ✅ Helper functions (debounce, throttle, etc.)
- ✅ Date formatting with dayjs
- ✅ Toast notifications (react-hot-toast)
- ✅ Global error boundary

### Testing

- ✅ Vitest for unit testing
- ✅ Playwright for E2E testing
- ✅ Test coverage setup

### Dev Tools

- ✅ Husky + lint-staged for pre-commit hooks
- ✅ Commitlint for conventional commits
- ✅ GitHub Actions CI/CD
- ✅ Dockerfile for production deployment

### Extras

- ✅ i18n support (English & Vietnamese)
- ✅ SEO with React Helmet
- ✅ Accessibility best practices
- ✅ Analytics ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t react-boilerplate .

# Run Docker container
docker run -p 80:80 react-boilerplate
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── store/           # Redux store and slices
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── constants/       # Constants and enums
├── services/        # API services
├── config/          # Configuration files
└── test/            # Test setup files
```

## 📚 Documentation

- [Coding Guide](./CODING_GUIDE.md) - Workflow chi tiết để implement feature mới
- [Quick Start](./QUICKSTART.md) - Hướng dẫn nhanh để bắt đầu
- [Firebase Setup](./FIREBASE_SETUP.md) - Hướng dẫn setup Firebase
- [React 19 Upgrade](./UPGRADE_REACT19.md) - Hướng dẫn upgrade lên React 19

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_API_BASE_URL` - API base URL
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google, Facebook, GitHub)
3. Copy your Firebase config to `.env`

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/)
