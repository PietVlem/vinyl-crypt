import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import nocache from 'nocache';

import { messagesRouter } from './api/messages/messages.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.set("json spaces", 2);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);

app.use('/trpc', trpcExpress.createExpressMiddleware({ 
  router: appRouter, 
  createContext
}));

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
