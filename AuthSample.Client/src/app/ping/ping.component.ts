import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment'
import {
  AuthService
} from '../shared';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent {

  message: string = '';

  constructor(private auth: AuthService, private http: Http, private authHttp: AuthHttp) { }

  public ping() {
    this.message = '';
    this.http.get(`${environment.apiUrl}/api/ping`)
      .map(res => res.text())
      .subscribe(
      data => {
        this.message = data;
      },
      error => this.message = error.toString()
      );
  }

  public claims() {
    this.message = '';
    this.authHttp.get(`${environment.apiUrl}/api/claims`)
      .map(res => res.text())
      .subscribe(
      data => this.message = data,
      error => this.message = error.toString()
      );
  }

  public securedPing() {
    this.message = '';
    this.authHttp.get(`${environment.apiUrl}/api/ping/secure`)
      .map(res => res.text())
      .subscribe(
      data => this.message = data,
      error => this.message = error.toString()
      );
  }
}
