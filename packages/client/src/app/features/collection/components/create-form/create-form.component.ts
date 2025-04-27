import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService, NotificationService } from '@core/services';
import { VinylRecordService } from '@features/collection/data-access';
import { SelectsHelpersService } from '@features/collection/helpers';
import { DrawerBaseComponent } from '@layouts';
import { SelectComponent } from '@shared/components';
import { ButtonPrimaryDirective, ButtonSecondaryDirective, StylingInputDirective } from '@shared/directives';
import { imgUrlValidator, releaseYearValidator } from '@shared/utils/validators';
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
  private notificationService = inject(NotificationService)
  public selectsHelpersService = inject(SelectsHelpersService)
  public drawerService = inject(DrawerService)

  createVinylRecordMutation = this.vinylRecordService.createVinylRecord(
    () => {
      this.drawerService.hide()
      this.notificationService.success(
        'Successfully created!',
        'Your vinyl record has been successfully created.',
      )
    }
  )

  vinylCreationForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number>(2025, [Validators.required, ...releaseYearValidator]),
    genreId: new FormControl<string>('', [Validators.required]),
    styleId: new FormControl<string>(''),
    condition: new FormControl<Condition>(Condition.Mint),
    coverImage: new FormControl<string>('', imgUrlValidator),
    recordColor: new FormControl<string>(''),
    artistId: new FormControl<string>(''),
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
