import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService } from '@core/services';
import { UserVinylRecordService } from '@features/collection/data-access';
import { SelectsHelpersService } from '@features/collection/helpers';
import { DrawerBaseComponent } from '@layouts';
import { SelectComponent } from '@shared/components';
import { ButtonPrimaryDirective, ButtonSecondaryDirective, StylingInputDirective } from '@shared/directives';
import { imgUrlValidator } from '@shared/utils/validators';
import dayjs from 'dayjs';
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
  private userVinylRecordService = inject(UserVinylRecordService)
  public selectsHelpersService = inject(SelectsHelpersService)
  public drawerService = inject(DrawerService)

  createVinylRecordMutation = this.userVinylRecordService.createVinylRecord(
    () => this.drawerService.hide()
  )

  vinylCreationForm = new FormGroup({
    /* user vinyl */
    condition: new FormControl<Condition>(Condition.Mint),
    notes: new FormControl<string>(''),
    purchaseDate: new FormControl<Date | null>(null),
    /* vinyl */
    title: new FormControl<string>('', [Validators.required]),
    artistId: new FormControl<string>(''),
    genreId: new FormControl<string>('', [Validators.required]),
    styleId: new FormControl<string>(''),
    /* vinyl variant */
    releaseDate: new FormControl<Date | null>(null, [Validators.required]),
    coverImage: new FormControl<string>('', imgUrlValidator),
    recordColor: new FormControl<string>(''),
  });

  addVinyl = () => {
    if (this.vinylCreationForm.invalid) {
      this.vinylCreationForm.markAllAsTouched();
      return;
    }

    this.createVinylRecordMutation.mutate({
      ...this.vinylCreationForm.value,
      releaseDate: dayjs(this.vinylCreationForm.value.releaseDate).toDate() ?? undefined,
      purchaseDate: dayjs(this.vinylCreationForm.value.purchaseDate).toDate() ?? undefined,
    })
  }
}
