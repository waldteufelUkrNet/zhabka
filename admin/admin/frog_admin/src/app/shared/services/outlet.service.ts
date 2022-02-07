import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import {reject} from "q";

@Injectable()
export class OutletService {

  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  getRandomOne() {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {};
      const options = new RequestOptions({headers, params});

      this.http.get('outlet/random_info', options)
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

  getList(params = {}) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      const options = new RequestOptions({headers, params});

      this.http.get('outlet/list', options)
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

  getCountList(params = {}) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      const options = new RequestOptions({headers, params});

      this.http.get('outlet/count', options)
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

  autocomplete(search, params = {}) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {search};
      const options = new RequestOptions({headers, params});

      this.http.get('outlet/autocomplete', options)
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

  getOne(id) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {};
      const options = new RequestOptions({headers, params});

      this.http.get('outlet/info/' + id, options)
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

  updateOutlet(id, data){
    return new Promise((res, rej) => {
      this.http.put('outlet/' + id, data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  createOutlet(data){
    return new Promise((res, rej) => {
      this.http.post('outlet', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  savePhone(data){
    return new Promise((res, rej) => {
      this.http.post('outlet/phone', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  deletePhone(id){
    return new Promise((res, rej) => {
      this.http.delete('outlet/phone/' + id)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  saveBundle(data){
    return new Promise((res, rej) => {
      this.http.post('outlet/bundle', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  deleteBundle(id){
    return new Promise((res, rej) => {
      this.http.delete('outlet/bundle/' + id)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  saveFN(data){
    return new Promise((res, rej) => {
      this.http.post('outlet/fiscal', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  saveWorkTime(data){
    return new Promise((res, rej) => {
      this.http.post('outlet/worktime', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  deleteFN(id){
    return new Promise((res, rej) => {
      this.http.delete('outlet/fiscal/' + id)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  savePhoto(data){
    return new Promise((res, rej) => {
      this.http.post('outlet/photo', data)
        .toPromise()
        .then(response => {
          const resp = JSON.parse(response['_body']);
          if (resp.status && resp.status === "OK") {
            res(resp.data);
          } else {
            rej(resp.error);
          }
        })
        .catch(error => {
          rej(error);
        });
    })
  }

  deletePhoto(file) {
    return new Promise((res, rej) => {
      let params = {file: file};
      const headers = new Headers();
      const options = new RequestOptions({headers, params});
      this.http.delete('outlet/photo', options)
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
