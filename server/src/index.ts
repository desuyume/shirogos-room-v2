import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { getDirname } from './utils/getDirname.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.CLIENT_URL
	})
);
app.use(express.json());
app.use(express.static(path.resolve(getDirname(), '..', 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const startApp = () => {
	app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
};

startApp();
