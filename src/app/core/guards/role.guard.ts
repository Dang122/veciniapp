import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const authUser = localStorage.getItem('auth_user');
  const userRole = authUser ? JSON.parse(authUser).rol : null; 
 // Obtén el rol del usuario desde localStorage

  if (userRole && userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/error_404']); // Redirige a la página de error 404 si no tiene acceso
    return false;
  }
};