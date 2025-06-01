import { inject, Injectable, Signal } from '@angular/core';
import { ArtistApiService } from '@api';
import { NotificationService } from '@core/services';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artistApiService = inject(ArtistApiService)
  private notificationService = inject(NotificationService)
  private queryClient = inject(QueryClient)

  createArtist = () => injectMutation(() => ({
    mutationFn: (data: { value: string }) => 
      this.artistApiService.createArtist({ name: data.value.trim() }),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['artists'] })

      this.notificationService.success(
        'Successfully created!',
        'Your Artist has been added to the database.',
      )
    },
    onError: (error: any) => {
      console.error('Error creating artist:', error);
    },
  }))
}