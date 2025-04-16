import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DrawerService } from '@core/services';
import { GenreService, VinylRecordService } from '@features/dashboard/data-access';
import { DrawerBaseComponent } from '@layouts';

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

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>(''),
    year: new FormControl<number>(0),
    genreId: new FormControl<string>(''),
    condition: new FormControl<string>(''),
    notes: new FormControl<string>(''),
  });

  addVinyl = () => {
    const { title, year, notes } = this.vinylCreationForm.value;
    if (!title || !year || !notes) return
    this.createVinylRecordMutation.mutate(this.vinylCreationForm.value)
  }
}
