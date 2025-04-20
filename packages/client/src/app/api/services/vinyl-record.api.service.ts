import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../../server/src';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class VinylRecordApiService {
    trpcUtils = inject(trpcUtils);

    getVinylRecords = async (
        input : RouterInput['vinyl']['get']
    ) : Promise<RouterOutput['vinyl']['get']> =>
        this.trpcUtils.client.vinyl.get.query(input)

    createVinylRecord = async (
        input : RouterInput['vinyl']['create']
    ) : Promise<RouterOutput['vinyl']['create']> => 
        this.trpcUtils.client.vinyl.create.mutate(input)

    deleteVinylRecords = async (
        input : RouterInput['vinyl']['delete']
    ) : Promise<RouterOutput['vinyl']['delete']> =>
        this.trpcUtils.client.vinyl.delete.mutate(input)
}
