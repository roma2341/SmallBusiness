import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/security/models/user.model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  user:User;
  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

}
