import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from "@layouts";
import ERROR_DATA from './errorData';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [BaseComponent],
  templateUrl: './error.component.html',
})

export class ErrorComponent {
  route = inject(ActivatedRoute)
  errorData = signal(ERROR_DATA);

  activeErrorObject = computed(() => {
    const { errorCode } = this.route.snapshot.data;
    const code = this.route.snapshot.queryParams['code'];
    const activeErrorCode = errorCode ?? (code && parseInt(code)) ?? 404;

    return this.errorData().find(({ code }) => code === activeErrorCode);
  })
}
