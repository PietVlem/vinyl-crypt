import { trpc } from "../trpc";
import { helloWorldRouter } from "./helloWorld";

export const appRouter = trpc.router({
    helloWorld: helloWorldRouter
})

export type AppRouter = typeof appRouter