import { trpc } from "../trpc";
import { helloWorldRouter } from "./helloWorld";
import { userRouter } from "./user";

export const appRouter = trpc.router({
    user: userRouter,
    helloWorld: helloWorldRouter
})

export type AppRouter = typeof appRouter