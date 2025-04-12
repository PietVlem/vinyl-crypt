import { inject, Injectable } from '@angular/core';
import { UserApiService } from '@api';
import { AuthService } from "@auth0/auth0-angular";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    auth = inject(AuthService);
    userApi = inject(UserApiService);
}
