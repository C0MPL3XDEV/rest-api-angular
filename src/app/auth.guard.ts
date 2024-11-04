import { inject } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';
import { ApiService } from './api.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const apiService = inject(ApiService);

  if (apiService.isAuthenticated()) {
    return true;
  } else {
    alert("Please Log-In To Access to This Page");
    return router.createUrlTree(['/login'], { queryParams: { redirectUrl: state.url }});
  }
};
