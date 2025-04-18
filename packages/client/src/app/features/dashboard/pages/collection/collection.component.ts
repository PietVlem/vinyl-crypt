import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DrawerService } from '@core/services';
import { CreateFormComponent } from '@features/dashboard/components/create-form/create-form.component';
import { VinylRecordService } from '@features/dashboard/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorTrash, phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';
import { EmptyStateComponent } from '@shared/components';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
  selector: 'app-protected',
  templateUrl: './collection.component.html',
  imports: [CommonModule, NgIcon, EmptyStateComponent, ButtonPrimaryDirective],
  viewProviders: [provideIcons({ phosphorVinylRecord, phosphorTrash })]
})
export class CollectionComponent {
  private drawerService = inject(DrawerService)
  private vinylRecordService = inject(VinylRecordService)

  vinylRecordsQuery = this.vinylRecordService.getVinylRecords()
  vinylRecordDeleteMutation = this.vinylRecordService.deleteVinylRecords()

  OpenAddRecordDrawer = () => this.drawerService.show(CreateFormComponent, {})

  deleteVinylRecord = (id: string) => 
    this.vinylRecordDeleteMutation.mutate({ ids: [id] })
}