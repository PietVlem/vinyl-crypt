import { Validators } from '@angular/forms';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const releaseYearValidator = [
    Validators.required,
    Validators.min(1600),
    Validators.max(new Date().getFullYear()),
]

export const imgUrlValidator = [
    Validators.pattern(urlRegex),
]