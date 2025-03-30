import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BaseLayoutComponent } from '@layouts/base/base.component';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [BaseLayoutComponent, CommonModule],
    standalone: true
})
export class ProfileComponent {
  private auth = inject(AuthService)
  
  title = 'Decoded ID Token';
  user$ = this.auth.user$;
}