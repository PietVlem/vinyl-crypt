import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService } from '@core/services';
import { GenreService, StyleService, VinylRecordService } from '@features/dashboard/data-access';
import { DrawerBaseComponent } from '@layouts';
import { releaseYearValidator, urlValidator } from '@shared/utils/validators';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-create-form',
  imports: [DrawerBaseComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  private vinylRecordService = inject(VinylRecordService)
  private genreService = inject(GenreService)
  private styleService = inject(StyleService)
  public drawerService = inject(DrawerService)

  styleSearchValue = signal<string>('metal')
  searchForStyle = this.debouncedSignal(this.styleSearchValue, 500);

  genresQuery = this.genreService.getGenres()
  stylesQuery = this.styleService.getStyles(this.searchForStyle)
  createVinylRecordMutation = this.vinylRecordService.createVinylRecord(
    () => this.drawerService.hide()
  )

  conditionOptions = computed(() => 
    Object.entries(Condition).map(([key, value]) => ({ key, value }))
  )

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number>(0, releaseYearValidator),
    genreId: new FormControl<string>(''),
    // styleId: new FormControl<string>(''),
    condition: new FormControl<Condition>(Condition.Mint),
    coverImage: new FormControl<string>('', urlValidator),
    recordColor: new FormControl<string>(''),
    notes: new FormControl<string>(''),
  });

  debouncedSignal<T>(
    sourceSignal: Signal<T>,
    debounceTimeInMs = 0,
  ): Signal<T> {
    const source$ = toObservable(sourceSignal);
    const debounced$ = source$.pipe(debounceTime(debounceTimeInMs));
    return toSignal(debounced$, {
      initialValue: sourceSignal(),
    });
  }

  addVinyl = () => 
    this.createVinylRecordMutation.mutate(this.vinylCreationForm.value)
}
