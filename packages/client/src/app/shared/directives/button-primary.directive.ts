import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appButtonPrimary]'
})
export class ButtonPrimaryDirective {
  @HostBinding('class') hostClasses = `inline-flex justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-800`;
}