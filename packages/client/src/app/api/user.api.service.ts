import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../server/src';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    trpcUtils = inject(trpcUtils);

    getOrCreateUser = async ( 
        input : RouterInput['user']['getOrCreate']
    ) : Promise<RouterOutput['user']['getOrCreate']> => 
        this.trpcUtils.client.user.getOrCreate.query(input)
}
