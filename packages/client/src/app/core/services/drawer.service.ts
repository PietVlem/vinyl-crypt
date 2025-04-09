import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  isShown = signal(false);

  show = () => this.isShown.set(true);
  hide = () => this.isShown.set(false);

}
