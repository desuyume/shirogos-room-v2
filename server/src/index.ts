import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { getDirname } from './utils/getDirname.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import authRouter from './router/authRouter.js';
import InitPassport from './passport.js';
import errorMiddleware from './middlewares/ErrorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.resolve(getDirname(), '..', 'static')));
app.use(fileUpload({}));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true
	})
);
app.use(passport.initialize());
app.use('/api', router);
app.use('/auth', authRouter);
app.use(errorMiddleware);

InitPassport(); // Configure passport.js (set strategies)

const startApp = () => {
	app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
};

startApp();
