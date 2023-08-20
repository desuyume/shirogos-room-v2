import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import RoomContentService from '../services/RoomContentService.js';

class RoomContentController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.query;
			const items = await RoomContentService.getAll(type);
			return res.json(items);
		} catch (e) {
			next(e);
		}
	}

	async add(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.query;
			const { cost }: { cost: number } = req.body;
			const img = req.files.img as UploadedFile;

			const item = await RoomContentService.add(+cost, img, type);

			return res.json(item);
		} catch (e) {
			next(e);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { type } = req.query;
			const { id } = req.params;

			const item = await RoomContentService.delete(+id, type);
			return res.json(item);
		} catch (e) {
			next(e);
		}
	}
}

export default new RoomContentController();
