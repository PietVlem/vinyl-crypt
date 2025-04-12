import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VinylRecordApiService } from '@api';
import { DRAWER_CONTEXT_TOKEN, DrawerService } from '@core/services';
import { DrawerBaseComponent } from '@layouts';

@Component({
  selector: 'app-create-form',
  imports: [DrawerBaseComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-form.component.html',
})
export class CreateFormComponent {
  private vinylRecordApi = inject(VinylRecordApiService);
  private drawerData = inject(DRAWER_CONTEXT_TOKEN);
  public drawerService = inject(DrawerService);

  loading = signal<boolean>(false);

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>(''),
    year: new FormControl<number>(0),
    notes: new FormControl<string>(''),
  });

  addVinyl = async () => {
    try {
      this.loading.set(true);
      const { title, year, notes } = this.vinylCreationForm.value;
      console.log(title, year, notes)
      if(!title || !year || !notes) return
      await this.vinylRecordApi.createVinylRecord({
        title,
        year,
        notes,
      })
    } catch (error) {
      console.error('Error creating vinyl record:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
