import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from '@layouts';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, BaseLayoutComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router)

  ngOnInit(): void {
    this.router.navigate(['dashboard/collection']);
  }
}
