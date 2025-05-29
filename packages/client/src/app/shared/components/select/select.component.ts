import { Component, computed, DestroyRef, ElementRef, inject, input, model, OnInit, output, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

  control = input.required<FormControl<string | null>>();
  searchable = input<boolean>(false);
  options = input<SelectOption[]>([])
  loading = input<boolean>(false);
  placeholder = input<string>('');
  createFn = input<((data: { value: string }) => void) | undefined>(undefined);

  searchModel = model<string>('');

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  open = signal<boolean>(false);
  selectedLabel = signal<string>('');

  ngOnInit(): void {
    this.setSelectedLabel()
    
    this.control().statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.setSelectedLabel())
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

    const searchInput = this.searchInput();
    if (this.open() && this.searchable() && searchInput) {
      setTimeout(() => searchInput.nativeElement.focus(), 50);
    }
  }

  selectOption = (option: SelectOption) => {
    this.control().setValue(option.id);
    this.control().markAsDirty();
    this.close();
  };

  createEmit = async() => {
    const fn = this.createFn();
    if(!fn) return;

    const value = this.searchModel();
    fn({ value });
  }
}
