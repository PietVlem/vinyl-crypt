import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';

dotenv.config(); 
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there, 👼 from my nightmare');
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server 🏃 at http://localhost:${port}`);
});