import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '@layouts';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [BaseComponent, CommonModule],
})
export class HomeComponent {
}
