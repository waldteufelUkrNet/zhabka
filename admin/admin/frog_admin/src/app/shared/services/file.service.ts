import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class FileService {

  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  uploadFile(file, params = {}) {
    return new Promise((res, rej) => {
      const formData = new FormData();
      const headers = new Headers();
      formData.append('file', file
      );
      const options = new RequestOptions({headers, params});
      this.http.post('file', formData, options)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status === 'OK') {
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

  uploadLogoFile(file, params = {}) {
    return new Promise((res, rej) => {
      const formData = new FormData();
      const headers = new Headers();
      formData.append('file', file
      );
      const options = new RequestOptions({headers, params});
      this.http.post('file/logo', formData, options)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status === 'OK') {
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

  deleteFile(file) {
    return new Promise((res, rej) => {
      let params = {file: file};
      const headers = new Headers();
      const options = new RequestOptions({headers, params});
      this.http.delete('file', options)
        .toPromise()
        .then(response => {
          const data = JSON.parse(response['_body']);
          if (data.status === 'OK') {
            res(true);
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
