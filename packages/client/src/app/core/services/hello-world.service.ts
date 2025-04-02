import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

import { AppRouter } from '../../../../../server/src';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  private auth = inject(AuthService)

  authToken = signal<string|undefined>(undefined)

  constructor() {
    this.auth.getAccessTokenSilently().subscribe(
      (token) => this.authToken.set(token)
    )
  }

  private client = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:6060/trpc',
        headers: () => {
          return {
            Authorization: `Bearer ${this.authToken()}`
          }
        }
      }),
    ],
  });

  public = async () => {
    const resp = await this.client.helloWorld.public.query()
    console.log(resp)
    return resp
  }

  protected = async () => {
    const resp = await this.client.helloWorld.protected.query()
    console.log(resp)
    return resp
  }
}
