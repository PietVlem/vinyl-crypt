import { ErrorHandler, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const errorHandler = inject(ErrorHandler);

  const authenticated = true;

  if(!authenticated) {
    errorHandler.handleError(new Error('Unauthorized'));
    router.navigate(['/error'], { queryParams: { code: 401 } })
  }

  return authenticated;
};