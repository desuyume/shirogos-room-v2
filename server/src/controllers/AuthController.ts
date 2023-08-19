import { Request, Response } from 'express'

class AuthController {
	authTwitchCallback(req: Request, res: Response) {
		// Successful authentication, redirect home.
		res.redirect(`${process.env.CLIENT_URL}/room/create`);
	}
}

export default new AuthController();