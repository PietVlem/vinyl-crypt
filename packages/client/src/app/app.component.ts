import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {
  private auth = inject(AuthService);
  isAuth0Loading$ = this.auth.isLoading$;

}