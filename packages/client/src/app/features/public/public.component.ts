import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HelloWorldService, MessageService } from '@app/core';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    standalone: true,
    imports: [BaseLayoutComponent, CommonModule],
})
export class PublicComponent implements OnInit {
  private messageService = inject(MessageService)
  helloWorldService = inject(HelloWorldService);
  message = {};

  ngOnInit(): void {
    this.helloWorldService.helloWorld();
    
    this.messageService.getPublicResource().subscribe((response) => {
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
