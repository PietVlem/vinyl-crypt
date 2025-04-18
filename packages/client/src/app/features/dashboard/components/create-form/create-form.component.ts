import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService } from '@core/services';
import { GenreService, StyleService, VinylRecordService } from '@features/dashboard/data-access';
import { DrawerBaseComponent } from '@layouts';
import { SelectComponent } from '@shared/components';
import { ButtonPrimaryDirective, ButtonSecondaryDirective, StylingInputDirective } from '@shared/directives';
import { debouncedSignal } from '@shared/utils/signal-utils';
import { releaseYearValidator, urlValidator } from '@shared/utils/validators';
import { HorizontalFormGroupComponent } from '../horizontal-form-group/horizontal-form-group.component';

@Component({
  selector: 'app-create-form',
  imports: [
    DrawerBaseComponent, 
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule, 
    StylingInputDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    HorizontalFormGroupComponent,
    SelectComponent
  ],
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  private vinylRecordService = inject(VinylRecordService)
  private genreService = inject(GenreService)
  private styleService = inject(StyleService)
  public drawerService = inject(DrawerService)

  styleSearchValue = signal<string>('metal')
  searchForStyle = debouncedSignal(this.styleSearchValue, 500);

  genresQuery = this.genreService.getGenres()
  stylesQuery = this.styleService.getStyles(this.searchForStyle)
  createVinylRecordMutation = this.vinylRecordService.createVinylRecord(
    () => this.drawerService.hide()
  )

  conditionSelectOptions = computed(() =>
    Object.entries(Condition).map(([key, value]) => ({
      id: value,
      value: key.replace('_', ' '),
    }))
  )

  genreSelectOptions = computed(() =>
    this.genresQuery.data()?.map((genre) => ({
      id: genre.id,
      value: genre.name,
    })) ?? []
  )

  styleSelectOptions = computed(() =>
    this.stylesQuery.data()?.map((style) => ({
      id: style.id,
      value: style.name,
    })) ?? []
  )

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number>(2025, [Validators.required, ...releaseYearValidator]),
    genreId: new FormControl<string>('', [Validators.required]),
    styleId: new FormControl<string>(''),
    condition: new FormControl<Condition>(Condition.Mint),
    coverImage: new FormControl<string>('', urlValidator),
    recordColor: new FormControl<string>(''),
    notes: new FormControl<string>(''),
  });

  addVinyl = () => {
    if (this.vinylCreationForm.invalid) {
      this.vinylCreationForm.markAllAsTouched();
      return;
    }

    this.createVinylRecordMutation.mutate(this.vinylCreationForm.value)
  }
}
