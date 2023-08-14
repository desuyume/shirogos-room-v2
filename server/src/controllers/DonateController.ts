import { Request, Response } from 'express';
import donateService from '../services/DonateService.js';
import { IDonate } from '../types/IDonate.js';
import { isNumber } from '../utils/isNumber.js'

class DonateController {
	async getAll(req: Request, res: Response) {
		try {
			const donates = await donateService.getAll();
			return res.json(donates);
		} catch (e) {
			return res.status(400).json({ message: 'error' });
		}
	}

	async add(req: Request, res: Response) {
		try {
			const donateBody: IDonate = req.body;

			if (!donateBody.username) {
				return res
					.status(400)
					.json({ error: true, message: 'username is required' });
			}
			if (donateBody.amount && !isNumber(donateBody.amount)) {
				return res
					.status(400)
					.json({ error: true, message: 'amount must be a number' });
			}

			const donate = await donateService.addDonate(
				donateBody.username,
				+donateBody.amount,
				donateBody.gifts
			);
			return res.json(donate);
		} catch (e) {
			return res.status(400).json({ message: 'error' });
		}
	}

	async updateAmount(req: Request<{ id: number }>, res: Response) {
		try {
			const { id } = req.params;
			const { addAmount }: { addAmount: string } = req.body;

			if (!addAmount) {
				return res
					.status(400)
					.json({ error: true, message: 'addAmount is required' });
			}
			if (!isNumber(addAmount)) {
				return res
					.status(400)
					.json({ error: true, message: 'addAmount must be a number' });
			}

			const updatedDonate = await donateService.updateAmount(+id, +addAmount);
			return res.json(updatedDonate);
		} catch (e) {
			return res.status(400).json({ message: 'error' });
		}
	}

	async updateGifts(req: Request<{ id: number }>, res: Response) {
		try {
			const { id } = req.params;
			const { gifts }: { gifts: string } = req.body;

			const updatedDonate = await donateService.updateGifts(+id, gifts);
			return res.json(updatedDonate);
		} catch (e) {
			return res.status(400).json({ message: 'error' });
		}
	}

	async delete(req: Request<{ id: number }>, res: Response) {
		try {
			const { id } = req.params;
			const deletedDonate = await donateService.delete(+id);
			return res.json(deletedDonate);
		} catch (e) {
			return res.status(400).json({ message: 'error' });
		}
	}
}

const donateController = new DonateController();
export default donateController;
