import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HelloWorldService, MessageService } from '@app/core';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [BaseLayoutComponent, CommonModule],
    standalone: true,
})
export class HomeComponent {
    private messageService = inject(MessageService)
    private helloWorldService = inject(HelloWorldService);

    message = signal({});

    ngOnInit(): void {
        this.helloWorldService.public();

        this.messageService.getPublicResource().subscribe((response) => {
            const { data, error } = response;

            if (data) {
                this.message.set(data)
            }

            if (error) {
                this.message.set(error)
            }
        });
    }
}
