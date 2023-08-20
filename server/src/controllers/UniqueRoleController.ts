import { NextFunction, Request, Response } from 'express';
import UniqueRoleService from '../services/UniqueRoleService.js';
import { Prisma } from '@prisma/client';
import ApiError from '../exceptions/ApiError.js';

class UniqueRoleController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.query;

			if (type !== 'adjectives' && type !== 'nouns') {
				throw ApiError.BadRequest('wrong roles type');
			}

			const roles = await UniqueRoleService.getAll(type);
			return res.json(roles);
		} catch (e) {
			next(e);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.query;
			const { title } = req.body;

			if (type !== 'adjectives' && type !== 'nouns') {
				throw ApiError.BadRequest('wrong roles type');
			}

			const createdRole = await UniqueRoleService.add(title, type);
			return res.json(createdRole);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code == 'P2002') {
					throw ApiError.BadRequest('role already exists');
				}
			}
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const deletedRole = await UniqueRoleService.delete(+id);
			return res.json(deletedRole);
		} catch (e) {
			next(e);
		}
	}
}

export default new UniqueRoleController();
