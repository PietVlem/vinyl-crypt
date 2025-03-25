import { Component, inject, OnInit } from '@angular/core';
import { HelloWorldService } from '@core/services/hello-world.service';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
  selector: 'app-home',
  imports: [BaseLayoutComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  helloWorldService = inject(HelloWorldService);

  ngOnInit(): void {
    console.log("on init")
    this.helloWorldService.helloWorld();
  }
}
