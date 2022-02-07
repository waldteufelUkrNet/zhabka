import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user;
  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {

  }

}
