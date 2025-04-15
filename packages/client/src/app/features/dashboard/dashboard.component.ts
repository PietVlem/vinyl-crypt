import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routePaths } from '@app/routes';
import { BaseComponent } from '@layouts';
import { dashboardRoutePaths } from './routes';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, BaseComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router)

  ngOnInit(): void {
    this.router.navigate([
      routePaths.DASHBOARD, 
      dashboardRoutePaths.COLLECTION
    ]);
  }
}
