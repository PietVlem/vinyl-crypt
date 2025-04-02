import { TRPCError, initTRPC } from '@trpc/server';
 
interface Context {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}
 
const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
export const router = t.router;
 
export const protectedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});