import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class KeyboardPaymentDetailsService {

  constructor(
    private http: Http
  ) {
  }

  getShowsList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/payment_details/show_list', data)
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
  getSender(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/payment_details/sender', data)
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
