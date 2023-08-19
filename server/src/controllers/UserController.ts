import { Request, Response } from 'express';

class UserController {
	getUser(req: Request, res: Response) {
		return res.json(req.user);
	}

	logout(req: Request, res: Response) {
		req.logout(err => {
			if (err) {
				return res.status(400).json(err);
			}
			return res.json({ message: 'Logout success' });
		});
	}
}

export default new UserController();
