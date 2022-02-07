import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
      let requestUrl = environment.apiUrl;
      if(options && options.params){
        let paramsStr = options.params.toString();
        if(paramsStr.length){
          let paramsArray = paramsStr.split('&');
          if(~paramsArray.indexOf('remoteUrl=true')){
            requestUrl = '';
          }
        }
      }
      
        return super.get(requestUrl + url, this.addJwt(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let api_url = environment.apiUrl;
        let isApi = true;

        return super.post(api_url + url, body, this.addJwt(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(environment.apiUrl + url, body, this.addJwt(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(environment.apiUrl + url, this.addJwt(options));
    }

    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            options.headers.append('token', user.token);
        }
        return options;
    }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CustomHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
    provide: Http,
    useFactory: customHttpFactory,
    deps: [XHRBackend, RequestOptions]
};
