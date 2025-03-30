import { Component } from '@angular/core';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [BaseLayoutComponent],
    standalone: true,
})
export class HomeComponent {}
