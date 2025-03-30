import { Injectable } from '@angular/core';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

import { AppRouter } from '../../../../../server/src';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  private client = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:6060/trpc',
      }),
    ],
  });

  helloWorld = async () => {
    const resp = await this.client.helloWorld.init.query()
    console.log(resp)
    return resp
  }
}
