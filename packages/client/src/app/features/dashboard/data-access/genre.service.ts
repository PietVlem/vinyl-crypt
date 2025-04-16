import { inject, Injectable } from '@angular/core';
import { GenresApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genreApiService = inject(GenresApiService)

  getGenres = () => injectQuery(() => ({
    queryKey: ['genres'],
    queryFn: () => this.genreApiService.getGenres(),
  }))
}
