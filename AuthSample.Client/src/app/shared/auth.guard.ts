import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.authenticated()) {
      if (this.auth.isAdmin()) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
  }

}
