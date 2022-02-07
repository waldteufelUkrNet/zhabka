import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: {
      valid: false,
      value: ''
    },
    password: {
      valid: false,
      value: ''
    }
  };

  sendAccess = false;
  showErrors = false;
  sendError;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {

  }

  setInputValue(event, field) {
    if (event.setval) {
      this.loginForm[field].value = event.value;
      this.loginForm[field].valid = event.valid;
    }
  }

  loginAction(){
    this.showErrors = true;
    if(this.loginForm.email.valid && this.loginForm.password.valid){
      this.sendAccess = true;
    } else {

    }

    if(this.sendAccess){
      this.userService.login(this.loginForm.email.value, this.loginForm.password.value)
        .then(logData => {

        })
        .catch(err => {
          this.sendError = err;
        });
    }
  }

}
