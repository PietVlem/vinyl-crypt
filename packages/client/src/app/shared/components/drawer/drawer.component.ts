import { Portal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, ComponentRef, inject } from '@angular/core';
import { DrawerService } from '@core/services';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drawer',
  imports: [AsyncPipe, PortalModule],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  drawerService = inject(DrawerService);

  drawerPortalComponent: Observable<Portal<ComponentRef<unknown>> | null> = of(null)

  ngOnInit() {
    this.drawerPortalComponent = this.drawerService.getPortal();
  }
}
