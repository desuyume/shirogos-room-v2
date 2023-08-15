import { Request, Response } from 'express';
import UniqueRoleService from '../services/UniqueRoleService.js';
import { Prisma } from '@prisma/client';

class UniqueRoleController {
	async getAll(req: Request, res: Response) {
		try {
			const { type } = req.query;

			if (type !== 'adjectives' && type !== 'nouns') {
				return res.status(400).json({
					error: true,
					message: 'wrong roles type'
				});
			}

			const roles = await UniqueRoleService.getAll(type);
			return res.json(roles);
		} catch (e) {
			return res.status(500).json({ message: 'internal error' });
		}
	}

	async add(req: Request, res: Response) {
		try {
			const { type } = req.query;
			const { title } = req.body;

			if (type !== 'adjectives' && type !== 'nouns') {
				return res.status(400).json({
					error: true,
					message: 'wrong roles type'
				});
			}

			const createdRole = await UniqueRoleService.add(title, type);
			return res.json(createdRole);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code == 'P2002') {
					return res.status(400).json({ message: 'role already exists' });
				}
			}
			return res.status(500).json({ message: 'internal error' });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedRole = await UniqueRoleService.delete(+id);
			return res.json(deletedRole);
		} catch (e) {
			return res.status(500).json({ message: 'internal error' });
		}
	}
}

export default new UniqueRoleController();
