import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject } from '@angular/core';
import { NotificationComponent } from '@core/components';
import { NotificationService } from '@core/services';

@Component({
  selector: 'app-notifications-container',
  imports: [NotificationComponent],
  templateUrl: './notifications-container.component.html',
  styles: `
    :host {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;
      max-height: 100vh;
      padding: 1rem;
      pointer-events: none;
      max-width: 512px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }`,
})
export class NotificationsContainerComponent {
  private notificationService = inject(NotificationService);

  notifications = computed(() => this.notificationService.notifications());
}
