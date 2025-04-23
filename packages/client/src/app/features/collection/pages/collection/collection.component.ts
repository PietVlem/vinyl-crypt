import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DrawerService } from '@core/services';
import { CreateFormComponent } from '@features/collection/components/create-form/create-form.component';
import { VinylRecordService } from '@features/collection/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMusicNotesPlus, phosphorShare, phosphorTrash, phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';
import { DialogService } from '@ngneat/dialog';
import { DialogConfirmComponent, EmptyStateComponent, PaginationComponent } from '@shared/components';
import { ButtonPrimaryDirective, ButtonSecondaryDirective } from '@shared/directives';

@Component({
  selector: 'app-protected',
  templateUrl: './collection.component.html',
  imports: [
    CommonModule, 
    NgIcon, 
    EmptyStateComponent, 
    ButtonPrimaryDirective, 
    ButtonSecondaryDirective,
    PaginationComponent,
  ],
  viewProviders: [
    provideIcons({ 
      phosphorVinylRecord, 
      phosphorTrash, 
      phosphorMusicNotesPlus, 
      phosphorShare 
    })
  ],
})
export class CollectionComponent {
  private drawerService = inject(DrawerService)
  private vinylRecordService = inject(VinylRecordService)
  private dialog = inject(DialogService);

  currentPage = signal<number>(1)

  vinylRecordsQuery = this.vinylRecordService.getVinylRecords(this.currentPage)
  vinylRecordDeleteMutation = this.vinylRecordService.deleteVinylRecords()

  goToPage = (page: number) => {
    const totalPages = this.vinylRecordsQuery.data()?.meta?.totalPages ?? 1;
    if (page < 1 || page > totalPages) return
    this.currentPage.set(page)
  }

  OpenAddRecordDrawer = () => this.drawerService.show(CreateFormComponent, {})

  deleteVinylRecord = (id: string) => {
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Delete Record',
        description: 'Are you sure you want to delete this record? This action cannot be undone.',
        confirmText: 'Delete Record',
        confirmFn: () => this.vinylRecordDeleteMutation.mutate({ ids: [id] })
      },
    });
  }
}