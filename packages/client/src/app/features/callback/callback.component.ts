import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    standalone: false
})
export class CallbackComponent {
  private auth = inject(AuthService);
  error$ = this.auth.error$;
  error = toSignal(this.error$, { initialValue: null });
}