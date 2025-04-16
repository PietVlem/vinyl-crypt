import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-signup-button',
    template: `
    <button class="rounded-md bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-800" (click)="handleSignUp()">Sign Up</button>
  `,
})
export class SignupButtonComponent {
  private auth = inject(AuthService)

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/callback',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  }
}