import { inject, Injectable } from '@angular/core';
import type { inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../../server/src';
 
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class GenreApiService {
    trpcUtils = inject(trpcUtils);

    getGenres = async () : Promise<RouterOutput['genre']['get']> =>
        this.trpcUtils.client.genre.get.query()
}
