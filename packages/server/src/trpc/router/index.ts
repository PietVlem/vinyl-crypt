import { trpc } from "../trpc";
import { genreRouter } from "./genre";
import { styleRouter } from "./style";
import { userRouter } from "./user";
import { vinylRouter } from "./vinyl";

export const appRouter = trpc.router({
    user: userRouter,
    vinyl: vinylRouter,
    genre: genreRouter,
    style: styleRouter,
})

export type AppRouter = typeof appRouter