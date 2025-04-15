import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  template: `
    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600" (click)="handleLogin()">Log In</button>
  `,
})
export class LoginButtonComponent {
  private auth = inject(AuthService)

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/callback',
      },
      authorizationParams: {
        prompt: 'login',
      },
    })
  }
}