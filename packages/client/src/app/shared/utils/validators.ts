import { Validators } from '@angular/forms';

export const releaseYearValidator = [
    Validators.required,
    Validators.min(1600),
    Validators.max(new Date().getFullYear()),
]

export const urlValidator = [
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
]