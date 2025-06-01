import { inject, Injectable, Signal } from '@angular/core';
import { ArtistAliasApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class ArtistAliasService {
  private artistAliasApiService = inject(ArtistAliasApiService)

  getArtistAliases = (
    searchQuery: Signal<string>,
  ) => injectQuery(() => ({
    enabled: searchQuery().length > 2,
    queryKey: ['artists', searchQuery()],
    queryFn: () => this.artistAliasApiService.getArtistsAliases({ searchQuery: searchQuery() }),
  }))
}