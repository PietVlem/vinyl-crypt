import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService } from '@core/services';
import { GenreService, VinylRecordService } from '@features/dashboard/data-access';
import { DrawerBaseComponent } from '@layouts';
import { releaseYearValidator, urlValidator } from '@shared/utils/validators';

@Component({
  selector: 'app-create-form',
  imports: [DrawerBaseComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  private vinylRecordService = inject(VinylRecordService)
  private genreService = inject(GenreService)
  public drawerService = inject(DrawerService)

  genresQuery = this.genreService.getGenres()
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
    condition: new FormControl<Condition>(Condition.Mint),
    coverImage: new FormControl<string>('', urlValidator),
    notes: new FormControl<string>(''),
  });

  addVinyl = () => 
    this.createVinylRecordMutation.mutate(this.vinylCreationForm.value)
}
