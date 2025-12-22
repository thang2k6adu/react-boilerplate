export const COLORS = {
  PRIMARY: '#10b981',
  PRIMARY_LIGHT: '#d1fae5',
  PRIMARY_DARK: '#059669',

  SECONDARY: '#6366f1',
  SECONDARY_LIGHT: '#e0e7ff',

  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',

  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#374151',
  GRAY_800: '#1f2937',
  GRAY_900: '#111827',

  BG_PRIMARY: '#ffffff',
  BG_SECONDARY: '#f9fafb',
  BG_TERTIARY: '#f3f4f6',

  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6b7280',
  TEXT_TERTIARY: '#9ca3af',
  TEXT_INVERSE: '#ffffff',

  BORDER: '#e5e7eb',
  BORDER_LIGHT: '#f3f4f6',

  DARK: {
    BG_PRIMARY: '#1f2937',
    BG_SECONDARY: '#111827',
    TEXT_PRIMARY: '#f9fafb',
    TEXT_SECONDARY: '#d1d5db',
  },
} as const;

export const FONTS = {
  FAMILY: {
    PRIMARY:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    MONO: 'ui-monospace, "Menlo", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
  },

  SIZE: {
    XS: '12px',
    SM: '14px',
    BASE: '16px',
    LG: '18px',
    XL: '20px',
    '2XL': '24px',
    '3XL': '30px',
    '4XL': '36px',
  },

  WEIGHT: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
  },

  LINE_HEIGHT: {
    TIGHT: 1.25,
    NORMAL: 1.5,
    RELAXED: 1.625,
    LOOSE: 2,
  },
} as const;

export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
  XL: '32px',
  '2XL': '48px',
  '3XL': '64px',
} as const;

export const BORDER_RADIUS = {
  NONE: '0',
  SM: '4px',
  DEFAULT: '6px',
  MD: '8px',
  LG: '12px',
  XL: '16px',
  '2XL': '20px',
  FULL: '9999px',
} as const;

export const SHADOWS = {
  NONE: 'none',
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

export const TRANSITIONS = {
  FAST: '150ms ease-in-out',
  DEFAULT: '200ms ease-in-out',
  SLOW: '300ms ease-in-out',
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  OFFCANVAS: 1040,
  MODAL_BACKDROP: 1050,
  MODAL: 1060,
  POPOVER: 1070,
  TOOLTIP: 1080,
} as const;
