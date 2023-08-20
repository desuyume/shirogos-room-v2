import { PrismaClient } from '@prisma/client';
import fileUpload from 'express-fileupload';
import path from 'path';
import { getDirname } from '../utils/getDirname.js';
import { v4 } from 'uuid';
import fs from 'fs';
import { createFoldersIfNotExists } from '../utils/createFoldersIfNotExists.js';
import ApiError from '../exceptions/ApiError.js'

const prisma = new PrismaClient();

class RoomContentService {
	async getAll(type) {
		let items;
		switch (type) {
			case 'panopticon':
				items = await prisma.panopticon.findMany();
				break;
			case 'background':
				items = await prisma.roomBackground.findMany();
				break;
			default:
				throw ApiError.BadRequest(`Wrong content type`);
		}
		return items;
	}

	async add(cost: number, img: fileUpload.UploadedFile, type) {
		let item;
		const imgName = v4() + '.jpg';

		switch (type) {
			case 'panopticon':
				createFoldersIfNotExists(['panopticons']);
				img.mv(
					path.resolve(getDirname(), '..', 'static', 'panopticons', imgName)
				);

				item = await prisma.panopticon.create({
					data: {
						cost,
						img: imgName
					}
				});
				break;
			case 'background':
				createFoldersIfNotExists(['backgrounds']);
				img.mv(
					path.resolve(getDirname(), '..', 'static', 'backgrounds', imgName)
				);

				item = await prisma.roomBackground.create({
					data: {
						cost,
						img: imgName
					}
				});
				break;
			default:
				throw ApiError.BadRequest(`Wrong content type`);
		}

		return item;
	}

	async delete(id: number, type) {
		let item;
		switch (type) {
			case 'panopticon':
				item = await prisma.panopticon.delete({
					where: {
						id
					}
				});

				if (
					fs.existsSync(
						path.join(getDirname(), '..', 'static', 'panopticons', item.img)
					)
				) {
					fs.unlinkSync(
						path.resolve(getDirname(), '..', 'static', 'panopticons', item.img)
					);
				}
				break;
			case 'background':
				item = await prisma.roomBackground.delete({
					where: {
						id
					}
				});

				if (
					fs.existsSync(
						path.join(getDirname(), '..', 'static', 'backgrounds', item.img)
					)
				) {
					fs.unlinkSync(
						path.resolve(getDirname(), '..', 'static', 'backgrounds', item.img)
					);
				}
				break;
			default:
				throw ApiError.BadRequest(`Wrong content type`);
		}

		return item;
	}
}

export default new RoomContentService();
