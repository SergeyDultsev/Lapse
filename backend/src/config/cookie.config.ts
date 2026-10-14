const UNITS: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

/**
 * Конвертирует строку вида '15m', '7d', '3600' в миллисекунды.
 * Некорректное значение возвращает fallback.
 */
export function expiresInToMs(
  value: string | undefined,
  fallback: number,
): number {
  if (!value) return fallback;

  const match = value.trim().match(/^(\d+)\s*(s|m|h|d)?$/i);
  if (!match) return fallback;

  const amount = Number(match[1]);
  const unit = (match[2] ?? 's').toLowerCase();

  return amount * UNITS[unit];
}

export type AuthCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  maxAge: number;
  path: string;
};

export const cookieConfig: {
  secure: boolean;
  access: AuthCookieOptions;
  refresh: AuthCookieOptions;
} = {
  secure: process.env.COOKIE_SECURE === 'true',
  access: {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: expiresInToMs(process.env.JWT_ACCESS_EXPIRES_IN, 15 * 60 * 1000),
    path: '/',
  },
  refresh: {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: expiresInToMs(
      process.env.JWT_REFRESH_EXPIRES_IN,
      7 * 24 * 60 * 60 * 1000,
    ),
    path: '/',
  },
};
