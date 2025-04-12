import { trpc } from "../trpc";
import { helloWorldRouter } from "./helloWorld";
import { userRouter } from "./user";
import { vinylRouter } from "./vinyl";

export const appRouter = trpc.router({
    user: userRouter,
    vinyl: vinylRouter,
    helloWorld: helloWorldRouter
})

export type AppRouter = typeof appRouter