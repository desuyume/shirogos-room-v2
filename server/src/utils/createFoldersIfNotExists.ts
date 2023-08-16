import fs from 'fs';
import { getDirname } from './getDirname.js';
import path from 'path';

export const createFoldersIfNotExists = (folders: string[]) => {
	try {
		const pathArr = [getDirname(), '..', 'static'];

		folders.forEach(folder => {
			pathArr.push(folder);
		});
		
		if (!fs.existsSync(path.join(...pathArr))) {
			fs.mkdirSync(path.join(...pathArr), {recursive: true});
		}
	} catch (err) {
		console.error(err);
	}
};
