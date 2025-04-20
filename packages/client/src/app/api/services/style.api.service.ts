import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from 'app/api/utils/trpc';

import { AppRouter } from '../../../../../server/src';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class StylesApiService {
    trpcUtils = inject(trpcUtils);

    getStyles = async (
        input : RouterInput['style']['get']
    ) : Promise<RouterOutput['style']['get']> =>
        this.trpcUtils.client.style.get.query(input)
}
