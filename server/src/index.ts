import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

const startApp = () => {
	app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
};

startApp();
