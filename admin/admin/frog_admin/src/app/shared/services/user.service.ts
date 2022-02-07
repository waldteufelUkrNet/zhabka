import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {LinkPipe} from '../../shared';

@Injectable()
export class UserService {
  User;

  constructor(
    private http: Http,
    private router: Router,
    private linkPipe: LinkPipe
  ) {
    this.checkLogin();
  }

  login(email, password) {
    return new Promise((res, rej) => {
      this.http.post('admin/signin', {email, password})
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            this.User = resp.data;
            localStorage.setItem('user', JSON.stringify(this.User));
            this.router.navigate([this.linkPipe.transform('/')]);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }

  getUser(){
    return this.User;
  }

  register(email, password) {
    return new Promise((res, rej) => {
      this.http.post('admin/signup', {email, password})
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            this.User = resp.data;
            localStorage.setItem('user', JSON.stringify(this.User));
            this.router.navigate([this.linkPipe.transform('/')]);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate([this.linkPipe.transform('/login')])
  }

  forgot(email) {
    return new Promise((res, rej) => {
      this.http.post('admin/forgot', {email})
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(true);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }

  checkLogin() {
    if (typeof localStorage !== 'undefined') {
      this.User = JSON.parse(localStorage.getItem('user'));
      if (this.User && this.User.token) {
        return this.User;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}
