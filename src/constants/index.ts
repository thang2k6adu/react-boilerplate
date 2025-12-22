export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  BASIC: 'basic',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    FIREBASE_LOGIN: '/auth/firebase/login',
    FIREBASE_REFRESH: '/auth/refresh',
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    DETAIL: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
    ACTIVATE: (id: string) => `/tasks/${id}/activate`,
    COMPLETE: (id: string) => `/tasks/${id}/complete`,
    ACTIVE: '/tasks/active',
  },
} as const;

export const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  TOKEN_EXPIRES_AT: 'tokenExpiresAt',
} as const;

// Export theme constants
export * from './theme';
