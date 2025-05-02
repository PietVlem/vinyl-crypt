import { Component, DestroyRef, ElementRef, inject, input, model, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretUpDown, phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { ClickOutsideDirective, StylingInputDirective } from '@shared/directives';

export interface SelectOption {
  id: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [ClickOutsideDirective, StylingInputDirective, NgIcon, FormsModule],
  templateUrl: './select.component.html',
  providers: [
    provideIcons({ phosphorCaretUpDown, phosphorCheck })
  ],
})
export class SelectComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  control = input.required<FormControl<string | null>>();
  searchable = input<boolean>(false);
  options = input<SelectOption[]>([])
  loading = input<boolean>(false);
  placeholder = input<string>('');
  searchModel = model<string>('');

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  open = signal<boolean>(false);
  selectedLabel = signal<string>('');

  ngOnInit(): void {
    this.setSelectedLabel()
    
    const controlSubscription = this.control().statusChanges
      .subscribe(() => this.setSelectedLabel())

    this.destroyRef.onDestroy(() => controlSubscription.unsubscribe());
  }

  setSelectedLabel = () => {
    this.selectedLabel.set(this.options().find(
      option => option.id === this.control().value)?.value || ''
    );
  }

  close = () => this.open.set(false);

  toggleOpen = () => {
    this.open.update((prev) => !prev);
    this.control().markAsTouched();
    if (this.open() && this.searchable() && this.searchInput) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 50);
    }
  }

  selectOption = (option: SelectOption) => {
    this.control().setValue(option.id);
    this.control().markAsDirty();
    this.close();
  };
}
