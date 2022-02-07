import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class KeyboardP2pPayoutService {

  constructor(
    private http: Http
  ) {
  }


  getOne(id) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {};
      const options = new RequestOptions({headers, params});

      this.http.get('keyboard/p2p_payouts/' + id, options)
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

  getLogs(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/p2p_payouts/logs/list', data)
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

  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/p2p_payouts/list', data)
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

      this.http.post('keyboard/p2p_payouts/count', data)
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
