import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-empty-state',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorVinylRecord })],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  title = input.required<string>();
  description = input.required<string>();
  buttonText = input<string>('Add');
  iconName = input<string>('phosphorVinylRecord');

  create = output();
}
