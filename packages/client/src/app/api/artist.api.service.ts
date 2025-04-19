import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../server/src';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class ArtistApiService {
    trpcUtils = inject(trpcUtils);

    getArtists = async (
        input : RouterInput['artist']['get']
    ) : Promise<RouterOutput['artist']['get']> =>
        this.trpcUtils.client.artist.get.query(input)
}
