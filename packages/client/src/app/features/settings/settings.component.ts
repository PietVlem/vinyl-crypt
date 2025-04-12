import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@layouts';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, BaseComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['settings/profile']);
  }
}
