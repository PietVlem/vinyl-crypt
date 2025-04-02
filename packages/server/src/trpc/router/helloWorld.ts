import { protectedProcedure, publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const helloWorldRouter = trpc.router({
    public: publicProcedure.query(() => {
        return {
            message: 'Hello, World!'
        }
    }),

    protected: protectedProcedure.query(() => {
        return {
            message: 'Hello, World! - Protected -'
        }
    })
})