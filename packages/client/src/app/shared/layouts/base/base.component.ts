import { Component } from '@angular/core';
import { SidebarNavComponent } from '@core/components/index';

@Component({
  selector: 'app-layout-base',
  imports: [SidebarNavComponent],
  templateUrl: './base.component.html',
})
export class BaseComponent {}