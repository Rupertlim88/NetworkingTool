export type Theme = 'teal' | 'midnight' | 'aurora';

export const THEMES: readonly Theme[] = ['teal', 'midnight', 'aurora'] as const;

export const THEME_LABELS: Record<Theme, string> = {
  teal: 'Teal',
  midnight: 'Midnight',
  aurora: 'Aurora',
};

export const DEFAULT_THEME: Theme = 'teal';

export const THEME_STORAGE_KEY = 'theme';
