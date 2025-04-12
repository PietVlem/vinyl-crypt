import { Component } from '@angular/core';
import { FooterComponent, HeaderComponent } from '@core/components/index';

@Component({
  selector: 'app-layout-base',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './base.component.html',
  standalone: true,
})
export class BaseComponent {

}
