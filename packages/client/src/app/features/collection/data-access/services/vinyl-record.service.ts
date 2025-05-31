import { inject, Injectable, Signal } from '@angular/core';
import { VinylRecordApiService } from '@api';
import { NotificationService } from '@core/services';
import {
  injectMutation,
  QueryClient
} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class VinylRecordService {
  private vinylRecordApiService = inject(VinylRecordApiService)
  private queryClient = inject(QueryClient)
  private notificationService = inject(NotificationService);

  createVinylRecord = (successCallback: () => void) => injectMutation(() => ({
    mutationFn: (vinylRecord: any) => 
      this.vinylRecordApiService.createVinylRecord(vinylRecord),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['vinylRecords'] })
      this.notificationService.success(
        'Successfully created!',
        'Your vinyl record has been successfully created.',
      )
      successCallback()
    },
  }))
}
