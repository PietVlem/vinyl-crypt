import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '@components/buttons/login-button.component';
import { LogoutButtonComponent } from '@components/buttons/logout-button.component';
import { SignupButtonComponent } from '@components/buttons/signup-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LoginButtonComponent, LogoutButtonComponent, SignupButtonComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private auth = inject(AuthService)
  isAuthenticated$ = this.auth.isAuthenticated$;
  isAuthenticated = toSignal(this.isAuthenticated$, { initialValue: false });
  
  mainMenuIsOpen = signal<boolean>(false);
  profileMenuIsOpen = signal<boolean>(false);

  toggleMainMenu = () => this.mainMenuIsOpen.set(!this.mainMenuIsOpen())
  toggleProfileMenu = () => this.profileMenuIsOpen.set(!this.profileMenuIsOpen())
}
