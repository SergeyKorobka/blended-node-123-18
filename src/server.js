import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { logger } from './middleware/logger.js';
import routerProducts from './routes/productsRoutes.js';
// import createHttpError from 'http-errors';

const app = express();
const PORT = process.env.PORT || 3030;

// app.get('/error-test', () => {
//   throw createHttpError(404, 'error');
// });

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(routerProducts);

app.use(notFound);
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
