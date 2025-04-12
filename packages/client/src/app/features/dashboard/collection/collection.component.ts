import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { VinylRecordApiService } from '@api';
import { DrawerService } from '@core/services';
import { CreateFormComponent } from './create-form/create-form.component';

@Component({
  selector: 'app-protected',
  templateUrl: './collection.component.html',
  imports: [CommonModule],
  standalone: true
})
export class CollectionComponent implements OnInit {
  private vinylRecordApi = inject(VinylRecordApiService)
  private drawerService = inject(DrawerService)

  ngOnInit(): void {
    try {
      this.vinylRecordApi.getVinylRecords().then((response) => {
        console.log({response})
      })
    } catch (error) {
      console.error('Error fetching vinyl records:', error)
    }
  }

  OpenAddRecordDrawer = () => this.drawerService.show(CreateFormComponent, {})
}