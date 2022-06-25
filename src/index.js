import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import Router from './routes.js';

const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use(morgan('tiny'));

app.use(Router);

app.listen(3000, () => console.log('Server is running'));

export default app;