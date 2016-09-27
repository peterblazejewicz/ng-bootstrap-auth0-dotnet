import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  // Configure Auth0
  lock = new Auth0Lock(environment.clientID, environment.domain, {});
  // Store profile object in auth class
  userProfile: any = undefined;

  constructor(private router: Router) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        // Redirect if there is a saved url to do so.
        let redirectUrl: string = localStorage.getItem('redirect_url');
        if (redirectUrl !== undefined) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirect_url');
        }
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public isAdmin() {
    return this.userProfile
      && this.userProfile.app_metadata
      && this.userProfile.app_metadata.roles
      && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['']);
  };

}
