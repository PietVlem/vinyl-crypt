import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [BaseLayoutComponent, CommonModule],
    standalone: true
})
export class ProfileComponent {
  private auth = inject(AuthService)
  
  user$ = this.auth.user$;
}