import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

import { appRouter } from './router';

dotenv.config(); 
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there, 👼 from my nightmare');
});

const createContext = ({
    req, res
}: trpcExpress.CreateExpressContextOptions) => ({})
type Context = Awaited<ReturnType<typeof createContext>>

app.use('/trpc', trpcExpress.createExpressMiddleware({ 
    router: appRouter, 
    createContext
}));

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server 🏃 at http://localhost:${port}`);
});