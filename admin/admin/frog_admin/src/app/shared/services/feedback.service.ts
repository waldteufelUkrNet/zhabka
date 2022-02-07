import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class FeedbackService {

  constructor(
    private http: Http
  ) {
  }


  getList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/list', data)
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

  getEmailList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/email_list', data)
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

  addFeedbackEmail(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/email/add', data)
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

  removeFeedbackEmail(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/email/remove', data)
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
  
  blockOne(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/block', data)
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

  sendSms(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/feedback/send_sms', data)
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
