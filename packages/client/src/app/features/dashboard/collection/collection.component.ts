import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DrawerService } from '@core/services';
import { VinylRecordService } from '@features/dashboard/data-access';
import { CreateFormComponent } from './create-form/create-form.component';

@Component({
  selector: 'app-protected',
  templateUrl: './collection.component.html',
  imports: [CommonModule],
})
export class CollectionComponent {
  private drawerService = inject(DrawerService)
  private vinylRecordService = inject(VinylRecordService)

  vinylRecordsQuery = this.vinylRecordService.getVinylRecords()

  OpenAddRecordDrawer = () => this.drawerService.show(CreateFormComponent, {})
}