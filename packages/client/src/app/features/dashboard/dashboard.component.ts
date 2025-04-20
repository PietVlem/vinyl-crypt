import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { routePaths } from '@app/routes';
import { BaseComponent } from '@layouts';
import { dashboardRoutePaths } from './routes';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, BaseComponent, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router)

  subNav = [
    {
      title: 'Collection',
      path: this.createSubRoute(dashboardRoutePaths.COLLECTION),
    },
    {
      title: 'Share Links',
      path: this.createSubRoute(dashboardRoutePaths.SHARE_LINKS),
    }
  ]

  createSubRoute(childRoute: string) {
    return `/${routePaths.DASHBOARD}/${childRoute}`;
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;

    if (currentUrl === `/${routePaths.DASHBOARD}`) {
      this.router.navigate([
        routePaths.DASHBOARD,
        dashboardRoutePaths.COLLECTION
      ]);
    }
  }
}
