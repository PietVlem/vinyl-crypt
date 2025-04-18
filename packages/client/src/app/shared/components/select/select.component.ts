import { Component, computed, ElementRef, input, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretUpDown, phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { ClickOutsideDirective, StylingInputDirective } from '@shared/directives';

interface Option {
  id: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [ClickOutsideDirective, StylingInputDirective, NgIcon],
  templateUrl: './select.component.html',
  providers: [
    provideIcons({ phosphorCaretUpDown, phosphorCheck }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    }
  ],
})
export class SelectComponent implements ControlValueAccessor {
  searchable = input<boolean>(false);
  options = input<Option[]>([
    {
      id: '1',
      value: 'Option 1',
    },
    {
      id: '2',
      value: 'Option 2',
    },
    {
      id: '3',
      value: 'Option 3',
    }
  ])

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  open = signal<boolean>(false);
  selectedId = signal<string | null>(null);

  selectedLabel = computed(() => 
    this.options().find((option) => option.id === this.selectedId())?.value
  )

  close = () => this.open.set(false);
  toggleOpen = () => {
    this.open.update((prev) => !prev);
    this.onTouched();
    if (this.open() && this.searchable() && this.searchInput) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 50);
    }
  }

  selectOption = (option: Option) => {
    this.selectedId.set(option.id);
    this.onChange(option.id);
    this.close();
  };

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  writeValue = (obj: string): void => this.selectedId.set(obj);
  registerOnChange = (fn: any): void => this.onChange = fn
  registerOnTouched = (fn: any): void => this.onTouched = fn
}
