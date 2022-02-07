import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class KeyboardMerchantService {

  constructor(
    private http: Http
  ) {
  }


  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/merchant/list', data)
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

  create(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/merchant', data)
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

  getCountList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/merchant/count', data)
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
