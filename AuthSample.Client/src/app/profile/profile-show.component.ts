import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.css']
})
export class ProfileShowComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
