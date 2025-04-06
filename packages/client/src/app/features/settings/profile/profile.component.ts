import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [CommonModule],
    standalone: true
})
export class ProfileComponent {
  private auth = inject(AuthService)
  
  user$ = this.auth.user$;
}