import { NextFunction, Request, Response } from 'express';
import donateService from '../services/DonateService.js';
import { IDonate } from '../types/IDonate.js';
import { isNumber } from '../utils/isNumber.js'
import ApiError from '../exceptions/ApiError.js'

class DonateController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const donates = await donateService.getAll();
			return res.json(donates);
		} catch (e) {
			next(e);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		try {
			const donateBody: IDonate = req.body;

			if (!donateBody.username) {
				throw ApiError.BadRequest('username is required');
			}
			if (donateBody.amount && !isNumber(donateBody.amount)) {
				throw ApiError.BadRequest('amount must be a number');
			}

			const donate = await donateService.addDonate(
				donateBody.username,
				+donateBody.amount,
				donateBody.gifts
			);
			return res.json(donate);
		} catch (e) {
			next(e);
		}
	}

	async updateAmount(req: Request<{ id: number }>, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { addAmount }: { addAmount: string } = req.body;

			if (!addAmount) {
				throw ApiError.BadRequest('addAmount is required');
			}
			if (!isNumber(addAmount)) {
				throw ApiError.BadRequest('addAmount must be a number');
			}

			const updatedDonate = await donateService.updateAmount(+id, +addAmount);
			return res.json(updatedDonate);
		} catch (e) {
			next(e);
		}
	}

	async updateGifts(req: Request<{ id: number }>, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { gifts }: { gifts: string } = req.body;

			const updatedDonate = await donateService.updateGifts(+id, gifts);
			return res.json(updatedDonate);
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request<{ id: number }>, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const deletedDonate = await donateService.delete(+id);
			return res.json(deletedDonate);
		} catch (e) {
			next(e);
		}
	}
}

export default new DonateController();
