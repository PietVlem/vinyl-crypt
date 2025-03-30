import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-logout-button',
    template: `
    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600" (click)="handleLogout()">Log Out</button>
  `,
    standalone: true
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);
  private doc = inject(DOCUMENT)
  
  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}