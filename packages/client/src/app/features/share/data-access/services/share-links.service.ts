import { inject, Injectable, Signal } from '@angular/core';
import { ShareLinkApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

interface getSharedDataInput {
  token: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShareLinksService {
  shareLinkApiService = inject(ShareLinkApiService);

  checkToken = (token: string) => this.shareLinkApiService.checkToken({ token })

  getSharedData = (
    token: Signal<string>,
    enabled: Signal<boolean>,
    password?: Signal<string>
  ) => injectQuery(() => ({
    enabled,
    queryKey: ['get-shared-data', token()],
    queryFn: () => this.shareLinkApiService.getSharedData({
      token: token(),
      ...(password && { password: password() })
    }),
  }));
}
