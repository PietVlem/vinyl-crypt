import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareLinkService } from '@features/collection/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorEye, phosphorEyeSlash, phosphorX } from '@ng-icons/phosphor-icons/regular';
import { DialogRef } from '@ngneat/dialog';
import { ButtonPrimaryDirective, ButtonSecondaryDirective } from '@shared/directives';
import { ShareTypeEnum, shareTypeOptions } from './share-type-options';

@Component({
  selector: 'app-dialog-create-share-link',
  imports: [
    ButtonSecondaryDirective, 
    ButtonPrimaryDirective, 
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [provideIcons({ phosphorX, phosphorEye, phosphorEyeSlash })],
  templateUrl: './dialog-create-share-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCreateShareLinkComponent {
  shareLinkService = inject(ShareLinkService);
  ref: DialogRef<{}, boolean> = inject(DialogRef);

  shareTypeOptions = signal(shareTypeOptions);
  passwordFieldShown = signal(false);
  passwordInputShown = signal(false);

  createShareLinkForm = new FormGroup({
    shareType: new FormControl<ShareTypeEnum>(ShareTypeEnum.COLLECTION),
    password: new FormControl<string>(''),
    // expiresAt: new FormControl<Date | null>(null),
  })

  createShareLinkMutation = this.shareLinkService.createShareLink(
    () => this.ref.close(true),
  )

  togglePasswordField = () => 
    this.passwordFieldShown.update((prev) => {
      const newValue = !prev;
      !newValue && this.createShareLinkForm.patchValue({
        password: ''
      });
      return newValue;
    });

  togglePasswordInput = () => 
    this.passwordInputShown.update((prev) => !prev)

  createShareLink = () =>
    this.createShareLinkMutation.mutate(this.createShareLinkForm.value)
  

  constructor() {
    this.ref.updateConfig({
      closeButton: false,
      width: '512px',
    });
  }
}
