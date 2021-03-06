import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {
  routing,
  appRoutingProviders
} from './app.routing';
import { HomeComponent } from './home/home.component';

// profile
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit.component';
import { ProfileShowComponent } from './profile/profile-show.component';
import { UnauthorizedComponent } from './unathorized/unauthorized.component';
import { AdminComponent } from './admin/admin.component';

import { AuthService } from './shared/';
import { PingComponent } from './ping/ping.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileShowComponent,
    UnauthorizedComponent,
    AdminComponent,
    PingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    routing
  ],
  providers: [
    AuthService,
    appRoutingProviders,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
