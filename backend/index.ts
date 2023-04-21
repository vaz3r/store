import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import User from './Routes/User';
import Products from './Routes/Products';
import Wishlist from './Routes/Wishlist';

import { SendResponse } from './utils';

dotenv.config();
const GATEWAY_PORT = process.env.GATEWAY_PORT;

const app: Express = express();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Routes
app.use('/api/v1/user', User);
app.use('/api/v1/products', Products);
app.use('/api/v1/wishlist', Wishlist);

app.get('/', (req: Request, res: Response) => {
    return SendResponse(res, 200, { Message: "Store App Server." });
});

app.listen(GATEWAY_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${GATEWAY_PORT}`);
});