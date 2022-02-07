import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class MerchantMccService {

  constructor(
    private http: Http
  ) {
  }

  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/merchant_mcc/list', data)
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

      this.http.post('keyboard/merchant_mcc/count', data)
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

  add(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/merchant_mcc', data)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status == 'OK') {
            res(data.data);
          } else {
            res(data);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  }

  delete(data) {
    return new Promise((res, rej) => {

      this.http.delete('keyboard/merchant_mcc/'+data.id, data)
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
