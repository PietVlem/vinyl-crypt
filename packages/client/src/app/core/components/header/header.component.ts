import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent, SignupButtonComponent } from '@components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMusicNotes } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LoginButtonComponent, SignupButtonComponent, CommonModule, NgIcon],
  providers: [provideIcons({ phosphorMusicNotes })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private auth = inject(AuthService)
  private doc = inject(DOCUMENT)

  isAuthenticated$ = this.auth.isAuthenticated$;
  isAuthenticated = toSignal(this.isAuthenticated$, { initialValue: false });

  user$ = this.auth.user$;
  user = toSignal(this.user$, { initialValue: null });
  
  mainMenuIsOpen = signal<boolean>(false);
  profileMenuIsOpen = signal<boolean>(false);

  toggleMainMenu = () => this.mainMenuIsOpen.set(!this.mainMenuIsOpen())
  toggleProfileMenu = () => this.profileMenuIsOpen.set(!this.profileMenuIsOpen())

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
