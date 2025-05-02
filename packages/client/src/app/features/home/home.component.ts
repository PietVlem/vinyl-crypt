import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { CoreAuthService } from '@core/services';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [
        ButtonPrimaryDirective,
    ],
    styles: `
        :host {
            display: block;
            height: 100dvh;
        }
    `
})
export class HomeComponent {
    private auth = inject(AuthService)
    public coreAuth = inject(CoreAuthService)

    isAuthenticated$ = this.auth.isAuthenticated$;
    isAuthenticated = toSignal(this.isAuthenticated$, { initialValue: false });

    user$ = this.auth.user$;
    user = toSignal(this.user$, { initialValue: null });
}
