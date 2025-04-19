import { inject, Injectable, Signal } from '@angular/core';
import { ArtistApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artistApiService = inject(ArtistApiService)

  getArtists = (
    searchQuery: Signal<string>,
) => injectQuery(() => ({
    enabled: searchQuery().length > 2,
    queryKey: ['styles', searchQuery()],
    queryFn: () => this.artistApiService.getArtists({ searchQuery: searchQuery() }),
  }))
}