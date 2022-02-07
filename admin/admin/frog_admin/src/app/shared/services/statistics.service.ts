import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class StatisticsService {

  constructor(
    private http: Http
  ) {
  }


  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/statistics/list', data)
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
