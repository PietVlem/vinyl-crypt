import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DrawerService, HelloWorldService, MessageService } from '@app/core';

@Component({
    selector: 'app-protected',
    templateUrl: './collection.component.html',
    imports: [CommonModule],
    standalone: true
})
export class CollectionComponent implements OnInit {
  private messageService = inject(MessageService)
  private helloWorldService = inject(HelloWorldService);
  private drawerService = inject(DrawerService);

  message = {};

  ngOnInit(): void {
    this.helloWorldService.protected();

    this.messageService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;

      if (data) {
        this.message = data;
      }

      if (error) {
        this.message = error;
      }
    });
  }

  OpenAddRecordDrawer() {
    this.drawerService.show()
  }
}
