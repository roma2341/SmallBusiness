import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { NgForm } from '@angular/forms';

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
  onFormSubmit(f: NgForm){
    if(f.valid){
      //TODO
    }
  }

  ngOnInit() {
  }

}
