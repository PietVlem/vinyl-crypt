import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { validateAccessToken } from '../middleware/auth0.middleware';

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      await validateAccessToken(req, res, () => {});

      const { auth } = req;

      if(!auth) return null

      return {
        id: auth.payload?.sub,
      };
    }
    return null;
  }

  const user = await getUserFromHeader();

  return {
    user,
  };
}
type Context = Awaited<ReturnType<typeof createContext>>