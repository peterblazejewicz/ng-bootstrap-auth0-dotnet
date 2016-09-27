import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from '../shared/';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  address: String;

  constructor(private auth: AuthService, private authHttp: AuthHttp, private router: Router) {
    if (auth.userProfile.user_metadata && auth.userProfile.user_metadata.address) {
      this.address = auth.userProfile.user_metadata.address;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    let data: any = JSON.stringify({
      user_metadata: {
        address: this.address
      }
    });

    this.authHttp
      .patch('https://' + environment.domain + '/api/v2/users/' + this.auth.userProfile.user_id, data, { headers: headers })
      .map(response => response.json())
      .subscribe(
      response => {
        this.auth.userProfile = response;
        localStorage.setItem('profile', JSON.stringify(response));
        this.router.navigate(['/profile']);
      },
      error => alert(error.json().message)
      );
  }

}
