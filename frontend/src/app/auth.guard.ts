import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authServiceL: AuthService = inject(AuthService);
  if (authServiceL.user) {
    return true; 
  } else {
    return false; 
  }
};
