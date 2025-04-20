import { trpc } from "../trpc";
import { artistRouter } from "./artist";
import { genreRouter } from "./genre";
import { shareLinkRouter } from "./share-link";
import { styleRouter } from "./style";
import { userRouter } from "./user";
import { vinylRouter } from "./vinyl";

export const appRouter = trpc.router({
    user: userRouter,
    vinyl: vinylRouter,
    genre: genreRouter,
    style: styleRouter,
    artist: artistRouter,
    shareLink: shareLinkRouter,
})

export type AppRouter = typeof appRouter