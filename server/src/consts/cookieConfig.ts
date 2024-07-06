import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
  sameSite: 'lax', // lax is important, don't use 'strict' or 'none'
  httpOnly: process.env.NODE_ENV !== 'development', // must be true in production
  path: '/',
  secure: process.env.NODE_ENV !== 'development', // must be true in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 1 year
  domain: process.env.NODE_ENV === 'development' ? '' : `kurogo-room.ru`, // the period before is important and intentional
};
