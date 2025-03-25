import { trpc } from '../lib/trpc'

export const helloWorldRouter = trpc.router({
    init: trpc.procedure.query(() => {
        return 'Hello, World!'
    })
})