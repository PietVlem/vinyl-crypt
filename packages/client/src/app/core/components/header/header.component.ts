import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  mainMenuIsOpen = signal<boolean>(false);
  profileMenuIsOpen = signal<boolean>(false);

  toggleMainMenu = () => this.mainMenuIsOpen.set(!this.mainMenuIsOpen())
  toggleProfileMenu = () => this.profileMenuIsOpen.set(!this.profileMenuIsOpen())
}
