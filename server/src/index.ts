import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { getDirname } from './utils/getDirname.js';
import session from 'express-session';
import passport from 'passport';
import authRouter from './router/authRouter.js';
import InitPassport from './passport.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true
	})
);
app.use(express.json());
app.use(express.static(path.resolve(getDirname(), '..', 'static')));
app.use(fileUpload({}));
app.set('trust proxy', 1);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: process.env.NODE_ENV === 'development' ? false : true,
			httpOnly: process.env.NODE_ENV === 'development' ? false : true,
			sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
			maxAge: 1000 * 60 * 60 * 24,
		}
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
app.use('/auth', authRouter);

InitPassport(); // Configure passport.js (serialize, deserialize, set strategies, etc)

const startApp = () => {
	app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
};

startApp();
