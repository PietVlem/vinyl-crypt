import { Injectable, inject } from '@angular/core';
import { VinylRecordApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class VinylRecordService {
  private vinylRecordApiService = inject(VinylRecordApiService)

  getVinylRecords = () => injectQuery(() => ({
    queryKey: ['vinylRecords'],
    queryFn: () => this.vinylRecordApiService.getVinylRecords(),
  }))
}
