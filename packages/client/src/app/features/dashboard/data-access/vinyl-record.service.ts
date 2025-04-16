import { inject, Injectable } from '@angular/core';
import { VinylRecordApiService } from '@api';
import {
  injectMutation,
  injectQuery,
  QueryClient
} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class VinylRecordService {
  private vinylRecordApiService = inject(VinylRecordApiService)
  private queryClient = inject(QueryClient)

  getVinylRecords = () => injectQuery(() => ({
    queryKey: ['vinylRecords'],
    queryFn: () => this.vinylRecordApiService.getVinylRecords(),
  }))

  createVinylRecord = (successCallback: () => void) => injectMutation(() => ({
    mutationFn: (vinylRecord: any) => 
      this.vinylRecordApiService.createVinylRecord(vinylRecord),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['vinylRecords'] })
      successCallback()
    },
  }))

  deleteVinylRecords = () => injectMutation(() => ({
    mutationFn: (vinylRecord: any) => 
      this.vinylRecordApiService.deleteVinylRecords(vinylRecord),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['vinylRecords'] })
    },
  }))
}
