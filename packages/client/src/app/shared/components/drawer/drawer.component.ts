import { Component, computed, inject } from '@angular/core';
import { DrawerService } from '@core/services';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  drawerService = inject(DrawerService);
}
