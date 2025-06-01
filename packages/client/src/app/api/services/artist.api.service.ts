import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../../server/src';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class ArtistApiService {
    trpcUtils = inject(trpcUtils);
    
    createArtist = async (
        input : RouterInput['artist']['create']
    ) : Promise<RouterOutput['artist']['create']> =>
        this.trpcUtils.client.artist.create.mutate(input)
}
