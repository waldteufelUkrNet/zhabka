import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import {reject} from "q";

@Injectable()
export class SettingsService {

  constructor(
    private http: Http
  ) {
  }

  getSettings(params = {}) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      const options = new RequestOptions({headers, params});

      this.http.get('settings/static', options)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status == 'OK') {
            res(data.data);
          } else {
            rej(data.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }

  saveSettings(data) {
    return new Promise((res, rej) => {
      this.http.put('settings/static', data)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status == 'OK') {
            res(data.data);
          } else {
            rej(data.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }
}
