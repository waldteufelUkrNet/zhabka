import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class KeyboardMccLibService {

  constructor(
    private http: Http
  ) {
  }


  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/mcc/list', data)
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

  update(id, data) {
    return new Promise((res, rej) => {

      this.http.put('keyboard/mcc/'+id, data)
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

      this.http.post('keyboard/mcc/count', data)
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
