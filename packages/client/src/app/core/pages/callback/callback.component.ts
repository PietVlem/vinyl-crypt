import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserApiService } from '@app/api';
import { AuthService } from '@auth0/auth0-angular';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  standalone: true,
  imports: [BaseLayoutComponent],
})
export class CallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private userApi = inject(UserApiService);
  private router = inject(Router);

  error$ = this.auth.error$;
  error = toSignal(this.error$, { initialValue: null });

  ngOnInit() {
    this.auth.user$.subscribe({
      next: async (auth0Profile) => {
        if (auth0Profile?.sub && auth0Profile?.email) {
          const user = await this.userApi.getOrCreateUser({
            auth0Id: auth0Profile.sub,
            email: auth0Profile.email,
            name: auth0Profile.name
          })

          if(user) {
            this.router.navigate(['/settings/profile']);
            return
          }
        }
        this.router.navigate(['/error'], { queryParams: { errorCode: 500 } });
      },
      error: (err) => { 
        this.router.navigate(['/error'], { queryParams: { errorCode: 500 } });
      }
    })
  }
}