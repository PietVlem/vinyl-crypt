import { inject, Injectable } from '@angular/core';
import { ShareLinkApiService } from '@api';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable({
    providedIn: 'root'
})
export class ShareLinkService {
    private shareLinkApiService = inject(ShareLinkApiService)
    private queryClient = inject(QueryClient)

    getShareLinks = () => injectQuery(() => ({
        queryKey: ['shareLinks'],
        queryFn: () => this.shareLinkApiService.getShareLinks(),
    }))

    createShareLink = () => injectMutation(() => ({
        mutationFn: (data: any) =>
            this.shareLinkApiService.createShareLink(data),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['shareLinks'] })
        }
    }))
}
