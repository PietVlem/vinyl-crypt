import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base/base.component';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, BaseLayoutComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['settings/profile']);
  }
}
