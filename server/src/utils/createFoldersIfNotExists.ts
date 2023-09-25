import fs from 'fs';
import path from 'path';

export const createFoldersIfNotExists = (folders: string[]) => {
	try {
		const pathArr = [__dirname, '..', '..', 'static'];

		folders.forEach(folder => {
			pathArr.push(folder);
		});
		
		if (!fs.existsSync(path.join(...pathArr)) || !path.join(...pathArr)) {
			console.log('work');
			
			fs.mkdirSync(path.join(...pathArr), {recursive: true});
		}
	} catch (err) {
		console.error(err);
	}
};