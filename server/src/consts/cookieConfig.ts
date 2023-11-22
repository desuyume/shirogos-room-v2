import { CookieOptions } from 'express'

export const cookieConfig: CookieOptions = {
	domain: process.env.CLIENT_DOMAIN_URL,
	maxAge: 7 * 24 * 60 * 60 * 1000,
	httpOnly: true,
	sameSite: 'none',
	secure: true,
}