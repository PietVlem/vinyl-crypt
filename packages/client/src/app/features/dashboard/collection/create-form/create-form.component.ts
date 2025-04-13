import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DRAWER_CONTEXT_TOKEN, DrawerService } from '@core/services';
import { VinylRecordService } from '@features/dashboard/data-access';
import { DrawerBaseComponent } from '@layouts';

@Component({
  selector: 'app-create-form',
  imports: [DrawerBaseComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  private drawerData = inject(DRAWER_CONTEXT_TOKEN);
  private vinylRecordService = inject(VinylRecordService);
  public drawerService = inject(DrawerService);

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>(''),
    year: new FormControl<number>(0),
    notes: new FormControl<string>(''),
  });

  createVinylRecordMutation = this.vinylRecordService.createVinylRecord();

  addVinyl = () => {
    const { title, year, notes } = this.vinylCreationForm.value;
    if (!title || !year || !notes) return
    this.createVinylRecordMutation.mutate(this.vinylCreationForm.value)
    this.drawerService.hide();
  }
}
