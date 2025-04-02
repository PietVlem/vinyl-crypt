import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HelloWorldService, MessageService } from '@app/core';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
    selector: 'app-protected',
    templateUrl: './protected.component.html',
    imports: [BaseLayoutComponent, CommonModule],
    standalone: true
})
export class ProtectedComponent implements OnInit {
  private messageService = inject(MessageService)
  helloWorldService = inject(HelloWorldService);

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
}
