import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class KeyboardUsersService {

  constructor(
    private http: Http
  ) {
  }


  getOne(id) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {};
      const options = new RequestOptions({headers, params});

      this.http.get('keyboard/users/' + id, options)
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

  getDevices(id) {
    return new Promise((res, rej) => {
      const headers = new Headers();
      let params = {};
      const options = new RequestOptions({headers, params});

      this.http.get('keyboard/users/devices/' + id, options)
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

  unblockUser(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/unblock', data)
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


  blockUser(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/block', data)
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


  blockDevice(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/block_device', data)
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

  unblockDevice(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/unblock_device', data)
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



  blockPayment(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/block_payment', data)
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

  blockP2pPayment(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/block_p2p_payment', data)
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

  unblockPayment(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/unblock_payment', data)
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

  unblockP2pPayment(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/unblock_p2p_payment', data)
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

  getUserP2pList(user_id) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/user_p2p_list', {user_id})
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

      this.http.post('keyboard/users/list', data)
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

  getDevicesBlackList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/device/black_list', data)
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


  getCountDevicesBlackList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/device/black_list/count', data)
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

      this.http.post('keyboard/users/count', data)
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

  getVersionsList(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/versions/list', data)
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

  addVersion(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/versions/add', data)
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

  getOffer(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/offer/get', {name: data.value})
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

  setOffer(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/offer/set', data)
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

  removeVersion(data) {
    return new Promise((res, rej) => {

      this.http.post('keyboard/users/versions/remove', data)
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
